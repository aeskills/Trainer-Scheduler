import { Readable } from "node:stream";
import { randomUUID } from "node:crypto";
import { logger } from "firebase-functions";
import { auth as gauth, drive as gdrive, drive_v3 } from "@googleapis/drive";
import {
  DRIVE_AUTH_MODE,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REFRESH_TOKEN,
  IS_EMULATOR,
  secretValue,
} from "../config";

export interface UploadedFile {
  id: string;
  link: string;
  thumbUrl: string;
}

/** Storage-provider abstraction for photo uploads. */
export interface DriveService {
  readonly mode: "oauth" | "service_account" | "mock";
  findFolder(name: string, parentId: string): Promise<string | null>;
  createFolder(name: string, parentId: string): Promise<string>;
  uploadFile(opts: { name: string; parentId: string; mimeType: string; data: Buffer }): Promise<UploadedFile>;
  makePublic(fileId: string): Promise<void>;
  trash(fileId: string): Promise<void>;
}

const FOLDER_MIME = "application/vnd.google-apps.folder";
const q = (s: string) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
export const thumbFor = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w480`;

class GoogleDriveService implements DriveService {
  constructor(
    readonly mode: "oauth" | "service_account",
    private readonly api: drive_v3.Drive,
  ) {}

  async findFolder(name: string, parentId: string) {
    const res = await this.api.files.list({
      q: `name = '${q(name)}' and '${q(parentId)}' in parents and mimeType = '${FOLDER_MIME}' and trashed = false`,
      fields: "files(id,name)",
      pageSize: 1,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    return res.data.files?.[0]?.id ?? null;
  }

  async createFolder(name: string, parentId: string) {
    const res = await this.api.files.create({
      requestBody: { name, mimeType: FOLDER_MIME, parents: [parentId] },
      fields: "id",
      supportsAllDrives: true,
    });
    if (!res.data.id) throw new Error(`Drive folder creation failed for "${name}"`);
    return res.data.id;
  }

  async uploadFile(opts: { name: string; parentId: string; mimeType: string; data: Buffer }) {
    const res = await this.api.files.create({
      requestBody: { name: opts.name, parents: [opts.parentId] },
      media: { mimeType: opts.mimeType, body: Readable.from(opts.data) },
      fields: "id,webViewLink",
      supportsAllDrives: true,
    });
    const id = res.data.id!;
    return { id, link: res.data.webViewLink ?? `https://drive.google.com/file/d/${id}/view`, thumbUrl: thumbFor(id) };
  }

  async makePublic(fileId: string) {
    await this.api.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
      supportsAllDrives: true,
    });
  }

  async trash(fileId: string) {
    await this.api.files.update({ fileId, requestBody: { trashed: true }, supportsAllDrives: true });
  }
}

/** In-memory stand-in used in the emulator when no Drive credentials are configured. */
class MockDriveService implements DriveService {
  readonly mode = "mock" as const;
  private folders = new Map<string, string>();
  async findFolder(name: string, parentId: string) {
    return this.folders.get(`${parentId}/${name}`) ?? null;
  }
  async createFolder(name: string, parentId: string) {
    const id = `mockfolder_${randomUUID().slice(0, 8)}`;
    this.folders.set(`${parentId}/${name}`, id);
    logger.info(`📁 [MOCK DRIVE] created folder "${name}" in ${parentId} → ${id}`);
    return id;
  }
  async uploadFile(opts: { name: string; parentId: string; data: Buffer }) {
    const id = `mockfile_${randomUUID().slice(0, 8)}`;
    logger.info(`🖼️ [MOCK DRIVE] uploaded "${opts.name}" (${Math.round(opts.data.length / 1024)} KB) → ${id}`);
    return { id, link: `https://drive.google.com/file/d/${id}/view`, thumbUrl: "" };
  }
  async makePublic() {}
  async trash(fileId: string) {
    logger.info(`🗑️ [MOCK DRIVE] trashed ${fileId}`);
  }
}

let cached: DriveService | null = null;

export function getDriveService(): DriveService {
  if (cached) return cached;
  const mode = DRIVE_AUTH_MODE.value() === "service_account" ? "service_account" : "oauth";

  if (mode === "oauth") {
    const clientId = GOOGLE_OAUTH_CLIENT_ID.value();
    const clientSecret = secretValue(GOOGLE_OAUTH_CLIENT_SECRET);
    const refreshToken = secretValue(GOOGLE_OAUTH_REFRESH_TOKEN);
    if (!clientId || !clientSecret || !refreshToken) {
      if (IS_EMULATOR) {
        logger.warn("Drive OAuth credentials missing – using MOCK Drive (emulator only).");
        return (cached = new MockDriveService());
      }
      throw new Error("Google Drive OAuth credentials are not configured. See docs/SETUP.md.");
    }
    const client = new gauth.OAuth2(clientId, clientSecret);
    client.setCredentials({ refresh_token: refreshToken });
    return (cached = new GoogleDriveService("oauth", gdrive({ version: "v3", auth: client })));
  }

  // Service account (Workspace Shared Drive) – uses the function's runtime identity.
  const sa = new gauth.GoogleAuth({ scopes: ["https://www.googleapis.com/auth/drive"] });
  return (cached = new GoogleDriveService("service_account", gdrive({ version: "v3", auth: sa })));
}
