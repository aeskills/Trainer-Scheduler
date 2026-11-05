import { describe, expect, it } from "vitest";
import { generateOtp, hashOtp, isSixDigits, newSalt, verifyOtpHash } from "../src/auth/otpUtils";
import { dateStrToKey, displayDate, displayTime, hhmmToMinutes, isValidDateStr, istDateStr, istMinutesNow } from "../src/lib/ist";
import { validateForSubmit } from "../src/visits/validation";

describe("otpUtils", () => {
  it("generates 6-digit codes", () => {
    for (let i = 0; i < 200; i++) expect(generateOtp()).toMatch(/^\d{6}$/);
  });
  it("hashes with salt and verifies timing-safely", () => {
    const salt = newSalt();
    const h = hashOtp("123456", salt);
    expect(h).not.toContain("123456");
    expect(verifyOtpHash("123456", salt, h)).toBe(true);
    expect(verifyOtpHash("123457", salt, h)).toBe(false);
    expect(verifyOtpHash("123456", newSalt(), h)).toBe(false);
  });
  it("validates code shape", () => {
    expect(isSixDigits("012345")).toBe(true);
    expect(isSixDigits("12345")).toBe(false);
    expect(isSixDigits(123456)).toBe(false);
  });
});

describe("ist", () => {
  it("converts UTC to IST date across midnight", () => {
    expect(istDateStr(new Date("2026-11-04T18:29:00Z"))).toBe("2026-11-04");
    expect(istDateStr(new Date("2026-11-04T18:30:00Z"))).toBe("2026-11-05");
  });
  it("computes IST minutes", () => {
    expect(istMinutesNow(new Date("2026-11-05T12:30:00Z"))).toBe(18 * 60);
  });
  it("formats", () => {
    expect(displayDate("2026-11-02")).toBe("2 Nov 2026");
    expect(displayTime("18:00")).toBe("6:00 PM");
    expect(displayTime("00:05")).toBe("12:05 AM");
    expect(hhmmToMinutes("21:30")).toBe(1290);
    expect(dateStrToKey("2026-11-02")).toBe(20261102);
  });
  it("validates dates", () => {
    expect(isValidDateStr("2026-02-29")).toBe(false);
    expect(isValidDateStr("2028-02-29")).toBe(true);
    expect(isValidDateStr("2026-13-01")).toBe(false);
  });
});

describe("validateForSubmit", () => {
  const base = {
    schools: [{ id: "a", name: "DPS", targetStudents: 40, trainedStudents: 35 }],
    photos: { a: [{ id: "p", driveFileId: "x", link: "", thumbUrl: "", fileName: "DPS_1.jpg", uploadedAt: 0, uploadedBy: "u" }] },
    adobeGalleryDone: true,
  };
  it("passes a complete visit", () => {
    expect(validateForSubmit(base).ok).toBe(true);
  });
  it("lists missing items", () => {
    const r = validateForSubmit({
      ...base,
      schools: [{ id: "a", name: "", targetStudents: null, trainedStudents: null }],
      photos: {},
      adobeGalleryDone: false,
    });
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual([
      "School 1: name",
      "School 1: target students",
      "School 1: students trained",
      "School 1: at least 1 photo",
      "Confirm Adobe Express gallery upload",
    ]);
  });
  it("warns but allows trained > target", () => {
    const r = validateForSubmit({ ...base, schools: [{ ...base.schools[0], trainedStudents: 50 }] });
    expect(r.ok).toBe(true);
    expect(r.warnings).toHaveLength(1);
  });
});
