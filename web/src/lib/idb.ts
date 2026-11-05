import { get, set, del } from "idb-keyval";
import { School } from "../types";

export interface DraftPlan {
  visitDate: string;
  schools: School[];
  adobeGalleryDone: boolean;
  savedLocallyAt: number;
}

const draftKey = (userId: string, dateStr: string) => `tp_draft_${userId}_${dateStr}`;

export async function saveLocalDraft(userId: string, dateStr: string, schools: School[], adobeGalleryDone = false): Promise<void> {
  try {
    const data: DraftPlan = {
      visitDate: dateStr,
      schools,
      adobeGalleryDone,
      savedLocallyAt: Date.now(),
    };
    await set(draftKey(userId, dateStr), data);
  } catch (err) {
    console.warn("Could not save local draft to IndexedDB:", err);
  }
}

export async function getLocalDraft(userId: string, dateStr: string): Promise<DraftPlan | null> {
  try {
    const draft = await get<DraftPlan>(draftKey(userId, dateStr));
    return draft || null;
  } catch {
    return null;
  }
}

export async function clearLocalDraft(userId: string, dateStr: string): Promise<void> {
  try {
    await del(draftKey(userId, dateStr));
  } catch {
    // Ignore error
  }
}
