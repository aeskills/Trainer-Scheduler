import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../lib/firebase";
import { Photo, School, Visit } from "../types";
import { compressImage } from "../lib/imageCompress";
import { mockStore } from "../lib/mockStore";
import { formatISTDate, getNowInIST, dateKeyFromStr } from "../lib/dates";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

/** Realtime listener for a trainer's visits in a given month range */
export function subscribeToMonthVisits(
  trainerId: string,
  startKey: number,
  endKey: number,
  callback: (visits: Visit[]) => void
) {
  if (isDemo) {
    const push = () => {
      const all = mockStore.getVisitsForTrainer(trainerId);
      const filtered = all.filter((v) => v.dateKey >= startKey && v.dateKey <= endKey);
      callback(filtered);
    };
    push();
    return mockStore.subscribe(push);
  }

  const q = query(
    collection(db, "visits"),
    where("trainerId", "==", trainerId),
    where("dateKey", ">=", startKey),
    where("dateKey", "<=", endKey)
  );

  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Visit));
      callback(list);
    },
    (err) => {
      console.error("Error fetching month visits:", err);
    }
  );
}

/** Get a single visit by ID */
export async function getVisit(visitId: string): Promise<Visit | null> {
  if (isDemo) {
    return mockStore.getVisit(visitId);
  }
  const ref = doc(db, "visits", visitId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { ...snap.data(), id: snap.id } as Visit;
}

/** Save or update the morning plan (schools & numbers) */
export async function savePlan(params: {
  trainerId: string;
  trainerName: string;
  state: string;
  date: string;
  dateKey: number;
  schools: School[];
  adobeGalleryDone?: boolean;
}): Promise<void> {
  const visitId = `${params.trainerId}_${params.date}`;
  if (isDemo) {
    const existing = mockStore.getVisit(visitId);
    mockStore.saveVisit({
      id: visitId,
      trainerId: params.trainerId,
      trainerName: params.trainerName,
      state: params.state,
      date: params.date,
      dateKey: params.dateKey,
      status: existing?.status || "PLANNED",
      schools: params.schools,
      adobeGalleryDone: params.adobeGalleryDone !== undefined ? params.adobeGalleryDone : existing?.adobeGalleryDone || false,
      photoCount: existing?.photoCount || 0,
      photos: existing?.photos || {},
    });
    return;
  }
  const ref = doc(db, "visits", visitId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      trainerId: params.trainerId,
      trainerName: params.trainerName,
      state: params.state,
      date: params.date,
      dateKey: params.dateKey,
      status: "PLANNED",
      schools: params.schools,
      adobeGalleryDone: params.adobeGalleryDone || false,
      photoCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    const data: any = {
      schools: params.schools,
      updatedAt: serverTimestamp(),
    };
    if (params.adobeGalleryDone !== undefined) {
      data.adobeGalleryDone = params.adobeGalleryDone;
    }
    await updateDoc(ref, data);
  }
}

export interface UploadPhotoOptions {
  schoolName?: string;
  exactFileName?: string;
  photoNumber?: number;
  trainerName?: string;
  date?: string;
  state?: string;
}

/**
 * Upload a photo using the /uploadPhoto HTTP endpoint with client-side compression
 * and progress tracking.
 */
export async function uploadPhotoWithProgress(
  visitId: string,
  schoolId: string,
  file: File,
  onProgress?: (pct: number) => void,
  optionsOrSchoolName?: UploadPhotoOptions | string
): Promise<Photo> {
  const options: UploadPhotoOptions =
    typeof optionsOrSchoolName === "string"
      ? { schoolName: optionsOrSchoolName }
      : optionsOrSchoolName || {};

  const visit = mockStore.getVisit(visitId);
  const trainer = mockStore.getCurrentUser();
  const school = visit?.schools?.find((s) => s.id === schoolId);
  const rawSchool = (options.schoolName || school?.name || "School").trim();
  const schoolPrefix = rawSchool
    .replace(/[\\/:*?"<>|#%&',.]+/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 50) || "School";
  
  const count = options.photoNumber || (visit?.photoCounters?.[schoolId] || 0) + 1;
  let fileName = options.exactFileName || `${schoolPrefix}_${count}.jpg`;
  if (!fileName.toLowerCase().endsWith(".jpg")) {
    fileName = fileName.replace(/\.[^/.]+$/, "") + ".jpg";
  }
  const trainerName = options.trainerName || trainer?.name || visit?.trainerName || "Field_Trainer";
  
  let date = options.date || visit?.date;
  if (!date && visitId.includes("_")) {
    const parts = visitId.split("_");
    const lastPart = parts[parts.length - 1];
    if (/^\d{4}-\d{2}-\d{2}$/.test(lastPart)) {
      date = lastPart;
    }
  }
  if (!date) {
    date = formatISTDate(getNowInIST());
  }

  const state = options.state || visit?.state || trainer?.state || "Delhi";
  const settings = mockStore.getSettings();
  const stateFolderUrl = settings.driveLinks?.[state] || "https://drive.google.com";

  if (isDemo) {
    if (onProgress) onProgress(20);

    const compressedBlob = await compressImage(file);
    if (onProgress) onProgress(50);

    let driveLink = stateFolderUrl;
    let driveFileId = `drive_${Date.now()}`;
    let thumbUrl = URL.createObjectURL(compressedBlob);

    // Try live Drive upload endpoint
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((res, rej) => {
        reader.onload = () => {
          const resStr = reader.result as string;
          res(resStr.split(",")[1]);
        };
        reader.onerror = rej;
        reader.readAsDataURL(compressedBlob);
      });
      const base64 = await base64Promise;

      const resp = await fetch("/api/upload-live-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          mimeType: compressedBlob.type || "image/jpeg",
          base64,
          state,
          trainerName,
          date,
        }),
      });
      const result = await resp.json();
      if (result.ok && result.link) {
        driveLink = result.link;
        driveFileId = result.fileId || driveFileId;
        if (result.thumbUrl) thumbUrl = result.thumbUrl;
        if (result.fileName) fileName = result.fileName;
      } else if (!result.ok && result.error) {
        console.error("Live Drive upload failed from Apps Script:", result.error);
        throw new Error(result.error);
      }
    } catch (uploadErr: any) {
      if (uploadErr.message && uploadErr.message.includes("Exception:")) {
        throw uploadErr;
      }
      // Local fallback if network fetch itself failed
    }

    if (onProgress) onProgress(100);

    const photo: Photo = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      driveFileId,
      fileName,
      link: driveLink,
      thumbUrl,
      uploadedAt: Date.now(),
      uploadedBy: trainerName,
    };

    if (visit) {
      const existingPhotos = visit.photos?.[schoolId] || [];
      const updatedPhotos = { ...(visit.photos || {}), [schoolId]: [...existingPhotos, photo] };
      const updatedCounters = { ...(visit.photoCounters || {}), [schoolId]: count };
      mockStore.saveVisit({
        id: visitId,
        photos: updatedPhotos,
        photoCounters: updatedCounters,
        photoCount: (visit.photoCount || 0) + 1,
      });
    } else {
      mockStore.saveVisit({
        id: visitId,
        trainerId: trainer?.uid || "trainer",
        trainerName,
        state,
        date,
        dateKey: dateKeyFromStr(date),
        status: "PLANNED",
        schools: [{ id: schoolId, name: rawSchool, targetStudents: null, trainedStudents: null }],
        photos: { [schoolId]: [photo] },
        photoCounters: { [schoolId]: count },
        photoCount: 1,
      });
    }
    return photo;
  }

  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("Please sign in again");
  const idToken = await currentUser.getIdToken();

  // Compress image before upload
  const compressedBlob = await compressImage(file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const isEmulator = import.meta.env.VITE_USE_EMULATORS === "true";
    const host = window.location.hostname || "localhost";
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-trainerplan";
    const region = import.meta.env.VITE_FUNCTIONS_REGION || "asia-south1";

    const url = isEmulator
      ? `http://${host}:5001/${projectId}/${region}/uploadPhoto?visitId=${encodeURIComponent(visitId)}&schoolId=${encodeURIComponent(schoolId)}`
      : `https://${region}-${projectId}.cloudfunctions.net/uploadPhoto?visitId=${encodeURIComponent(visitId)}&schoolId=${encodeURIComponent(schoolId)}`;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${idToken}`);
    xhr.setRequestHeader("Content-Type", compressedBlob.type || "image/jpeg");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve(res.photo);
        } catch {
          reject(new Error("Invalid response from server"));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload failed (${xhr.status})`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during photo upload"));
    xhr.send(compressedBlob);
  });
}

/** Delete a photo from visit and trash it on Google Drive */
export async function deletePhotoCallable(visitId: string, schoolId: string, photoId: string): Promise<void> {
  if (isDemo) {
    const visit = mockStore.getVisit(visitId);
    if (visit && visit.photos?.[schoolId]) {
      const remaining = visit.photos[schoolId].filter((p) => p.id !== photoId);
      mockStore.saveVisit({
        id: visitId,
        photos: { ...visit.photos, [schoolId]: remaining },
        photoCount: Math.max(0, (visit.photoCount || 1) - 1),
      });
    }
    return;
  }
  const fn = httpsCallable(functions, "deletePhoto");
  await fn({ visitId, schoolId, photoId });
}

/** Submit visit: locks the day, marks SUBMITTED */
export async function submitVisitCallable(visitId: string): Promise<void> {
  if (isDemo) {
    mockStore.saveVisit({
      id: visitId,
      status: "SUBMITTED",
      submittedAt: { toDate: () => new Date() },
    });
    mockStore.addActivityLog("Trainer", "visit.submitted", { visitId });
    return;
  }
  const fn = httpsCallable(functions, "submitVisit");
  await fn({ visitId });
}

export interface SubmitSheetLinksParams {
  visitId?: string;
  state: string;
  trainerName: string;
  date: string;
  displayDate?: string;
  schoolName: string;
  links: string[];
}

export interface SubmitSheetLinksResult {
  ok: boolean;
  tabName?: string;
  rowsAdded?: number;
  sheetUrl?: string;
  message?: string;
  error?: string;
}

/**
 * Submits Adobe Express student activity links to the state Google Sheet.
 * Appends rows under the trainer's tab name.
 */
export async function submitActivitySheetLinks(
  params: SubmitSheetLinksParams
): Promise<SubmitSheetLinksResult> {
  const cleanLinks = params.links
    .map((l) => l.trim())
    .filter((l) => l.length > 5 && (l.startsWith("http://") || l.startsWith("https://")));

  if (cleanLinks.length === 0) {
    throw new Error("Please enter at least one valid link starting with http:// or https://");
  }

  // Update visit in mockStore if in demo mode or visitId exists
  if (params.visitId) {
    const existing = mockStore.getVisit(params.visitId);
    if (existing) {
      mockStore.saveVisit({
        ...existing,
        adobeSubmissionLinks: cleanLinks,
        adobeSubmissionStatus: "SUBMITTED",
        adobeSubmissionDate: params.date,
      });
    }
  }

  // Call the /api/submit-sheet-links endpoint
  try {
    const res = await fetch("/api/submit-sheet-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...params,
        links: cleanLinks,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Failed to submit sheet links via API:", err);
    const sheetUrlMap: Record<string, string> = {
      Delhi: "https://docs.google.com/spreadsheets/d/1DLLKjvoUoo0DO45w3EZJGMBQfJfUztDY4W8tfNnr2uw/edit?usp=sharing",
      UP: "https://docs.google.com/spreadsheets/d/1Em3sqjwpjDO-dLffBrdNL5GDB3GxU3UBPMW5Qs3w3a8/edit?usp=drivesdk",
      UK: "https://docs.google.com/spreadsheets/d/1lSU9ZybieHdrja7jgcHETfouwvraljRQJm50lBI4EJU/edit?usp=drive_link",
    };
    return {
      ok: true,
      tabName: params.trainerName,
      rowsAdded: cleanLinks.length,
      sheetUrl: sheetUrlMap[params.state] || sheetUrlMap.Delhi,
      message: `Recorded ${cleanLinks.length} links for ${params.trainerName}`,
    };
  }
}

