import { Visit } from "../types";

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validates whether a visit has met all criteria for final submission.
 * Mirrors the server-side validator in functions/src/visits/validation.ts.
 */
export function validateForSubmit(visit: Pick<Visit, "schools" | "photos" | "adobeGalleryDone">): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!visit.schools || visit.schools.length === 0) {
    missing.push("Add at least one school");
    return { ok: false, missing, warnings };
  }

  visit.schools.forEach((s, i) => {
    const label = s.name?.trim() ? `"${s.name.trim()}"` : `School ${i + 1}`;

    if (!s.name?.trim()) {
      missing.push(`School ${i + 1}: Name required`);
    }

    if (s.targetStudents === null || s.targetStudents === undefined || s.targetStudents <= 0) {
      missing.push(`${label}: Target students number required`);
    }

    if (s.trainedStudents === null || s.trainedStudents === undefined || s.trainedStudents < 0) {
      missing.push(`${label}: Students trained count required`);
    }

    const photoList = visit.photos?.[s.id] || [];
    if (photoList.length < 1) {
      missing.push(`${label}: At least 1 photo uploaded`);
    }

    if (
      s.targetStudents !== null &&
      s.trainedStudents !== null &&
      s.trainedStudents > s.targetStudents
    ) {
      warnings.push(`${label}: Students trained (${s.trainedStudents}) exceeds target (${s.targetStudents})`);
    }
  });

  if (!visit.adobeGalleryDone) {
    missing.push("Confirmation of top pictures uploaded to Adobe Express gallery");
  }

  return {
    ok: missing.length === 0,
    missing,
    warnings,
  };
}
