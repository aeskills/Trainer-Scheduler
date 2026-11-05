import { useEffect, useRef } from "react";
import { School } from "../types";
import { saveLocalDraft } from "../lib/idb";

/**
 * Automatically saves working visit draft to IndexedDB with debounce
 * to prevent losing entered data during connectivity drops.
 */
export function useAutosaveDraft(
  userId: string | undefined,
  dateStr: string,
  schools: School[],
  adobeGalleryDone: boolean,
  enabled: boolean = true
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || !userId || !dateStr) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveLocalDraft(userId, dateStr, schools, adobeGalleryDone);
    }, 1000); // 1s debounce

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [userId, dateStr, schools, adobeGalleryDone, enabled]);
}
