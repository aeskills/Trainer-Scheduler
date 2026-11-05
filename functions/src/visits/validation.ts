import { Visit } from "../types";

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  warnings: string[];
}

/** Mirrors web/src/lib/visitValidation.ts – keep the two in sync. */
export function validateForSubmit(visit: Pick<Visit, "schools" | "photos" | "adobeGalleryDone">): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];
  if (!visit.schools?.length) missing.push("Add at least one school");

  visit.schools.forEach((s, i) => {
    const label = s.name?.trim() || `School ${i + 1}`;
    if (!s.name?.trim()) missing.push(`School ${i + 1}: name`);
    if (!Number.isInteger(s.targetStudents) || (s.targetStudents ?? 0) <= 0) missing.push(`${label}: target students`);
    if (!Number.isInteger(s.trainedStudents) || (s.trainedStudents ?? -1) < 0) missing.push(`${label}: students trained`);
    if ((visit.photos?.[s.id]?.length ?? 0) < 1) missing.push(`${label}: at least 1 photo`);
    if (
      Number.isInteger(s.targetStudents) &&
      Number.isInteger(s.trainedStudents) &&
      (s.trainedStudents as number) > (s.targetStudents as number)
    ) {
      warnings.push(`${label}: trained (${s.trainedStudents}) is more than target (${s.targetStudents})`);
    }
  });

  if (!visit.adobeGalleryDone) missing.push("Confirm Adobe Express gallery upload");
  return { ok: missing.length === 0, missing, warnings };
}
