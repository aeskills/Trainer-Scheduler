import React, { useMemo } from "react";
import { ExternalLink, CheckCircle2, AlertCircle, FileSpreadsheet, Send, Check } from "lucide-react";
import { Button } from "../ui/Button";

interface SubmitChecklistProps {
  adobeGalleryUrl?: string;
  activitySheetUrl?: string;
  stateName?: string;
  trainerName?: string;
  availableSchools?: { id: string; name: string }[];
  selectedSchoolName?: string;
  onSelectSchoolName?: (name: string) => void;
  adobeGalleryDone: boolean;
  onToggleAdobeGallery: (done: boolean) => void;
  activityLinksText: string;
  onChangeActivityLinksText: (text: string) => void;
  onSubmitLinksToSheet?: () => Promise<void>;
  isSubmittingLinks?: boolean;
  linksSubmittedCount?: number;
  sheetSubmittedTab?: string;
  missingItems: string[];
  warnings: string[];
  onSubmit: () => void;
  submitting: boolean;
  isReadOnly: boolean;
}

export const SubmitChecklist: React.FC<SubmitChecklistProps> = ({
  adobeGalleryUrl,
  activitySheetUrl,
  stateName = "Delhi",
  trainerName = "Trainer",
  availableSchools = [],
  selectedSchoolName,
  onSelectSchoolName,
  adobeGalleryDone,
  onToggleAdobeGallery,
  activityLinksText,
  onChangeActivityLinksText,
  onSubmitLinksToSheet,
  isSubmittingLinks = false,
  linksSubmittedCount = 0,
  sheetSubmittedTab,
  missingItems,
  warnings,
  onSubmit,
  submitting,
  isReadOnly,
}) => {
  const isValid = missingItems.length === 0;

  // Extract detected links from textarea
  const detectedLinks = useMemo(() => {
    return activityLinksText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5 && (s.startsWith("http://") || s.startsWith("https://")));
  }, [activityLinksText]);

  if (isReadOnly) {
    return (
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
              Day's Work Submitted & Locked
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              All school visit data and Adobe Express activities are safely recorded.
              {linksSubmittedCount > 0 && ` (${linksSubmittedCount} activity links submitted)`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {activitySheetUrl && (
            <a
              href={activitySheetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>State Activity Sheet ({stateName})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {adobeGalleryUrl && (
            <a
              href={adobeGalleryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
            >
              <span>Adobe Express Gallery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm flex flex-col gap-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Submission Verification</h3>
        <span className="text-xs text-slate-400 font-medium">Step 2 of 2</span>
      </div>

      {/* 1. FIRST BOX: State Adobe Express Gallery (Moved to first position) */}
      <div className="rounded-xl border border-violet-100 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/20 p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-violet-950 dark:text-violet-200">
              State Adobe Express Gallery
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-400 mt-0.5">
              Upload the best/top photos of today's training to the state gallery.
            </p>
          </div>

          <a
            href={adobeGalleryUrl || "https://new.express.adobe.com"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-600/30 transition-colors shrink-0"
          >
            <span>Open Adobe Express Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-3 pt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={adobeGalleryDone}
            onChange={(e) => onToggleAdobeGallery(e.target.checked)}
            className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            I have uploaded top pictures to the Adobe Express gallery
          </span>
        </label>
      </div>

      {/* 2. NEW BOX: Adobe Express Activity Submission Links */}
      <div className="rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                <FileSpreadsheet className="w-4 h-4" />
              </span>
              <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                State Adobe Express Activity Sheet ({stateName})
              </p>
            </div>
            <p className="text-xs text-indigo-700/90 dark:text-indigo-300/80 mt-1">
              Paste multiple student published links together (5–7+ links). Each link will be written on a separate row under your name tab in the state sheet.
            </p>
          </div>

          {activitySheetUrl && (
            <a
              href={activitySheetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shadow-xs shrink-0"
            >
              <span>Open State Activity Sheet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* School selection if multiple schools */}
        {availableSchools.length > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              Select School for these links:
            </label>
            <select
              value={selectedSchoolName || availableSchools[0]?.name || ""}
              onChange={(e) => onSelectSchoolName?.(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1.5 focus:ring-2 focus:ring-indigo-500"
            >
              {availableSchools.map((s, idx) => (
                <option key={s.id || idx} value={s.name}>
                  {s.name || `School ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Textarea for Bulk Links */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Published Adobe Express Links (paste all links here):
            </label>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                detectedLinks.length > 0
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {detectedLinks.length} {detectedLinks.length === 1 ? "link" : "links"} detected
            </span>
          </div>

          <textarea
            rows={5}
            value={activityLinksText}
            onChange={(e) => onChangeActivityLinksText(e.target.value)}
            placeholder="Paste your links together here (one per line):&#10;https://new.express.adobe.com/published/v2/urn:aaid:sc:AP:...&#10;https://new.express.adobe.com/published/v2/urn:aaid:sc:AP:...&#10;https://new.express.adobe.com/published/v2/urn:aaid:sc:AP:..."
            className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
          />
        </div>

        {/* Submission Actions & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            {sheetSubmittedTab || linksSubmittedCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {linksSubmittedCount > 0 ? `${linksSubmittedCount} links` : "Links"} recorded in tab: {sheetSubmittedTab || trainerName}
                </span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Links are automatically formatted with Date & School into your personal sheet tab.
              </span>
            )}
          </div>

          {onSubmitLinksToSheet && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={detectedLinks.length === 0 || isSubmittingLinks}
              loading={isSubmittingLinks}
              onClick={onSubmitLinksToSheet}
              icon={<Send className="w-3.5 h-3.5 text-indigo-600" />}
              className="shrink-0"
            >
              Submit Links to Google Sheet
            </Button>
          )}
        </div>
      </div>

      {/* Warnings (e.g. trained > target) */}
      {warnings.length > 0 && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3.5 flex flex-col gap-1 text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Notice:</span>
          </div>
          {warnings.map((w, i) => (
            <p key={i} className="pl-5 text-[11px]">• {w}</p>
          ))}
        </div>
      )}

      {/* Missing items helper text */}
      {!isValid && (
        <div className="rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col gap-1.5">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Required before submission:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingItems.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-[11px] font-medium"
              >
                ✕ {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Final Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Once submitted, the day is locked and can only be amended by an administrator.
        </p>

        <Button
          size="lg"
          disabled={!isValid || submitting}
          loading={submitting}
          onClick={onSubmit}
          className="w-full sm:w-auto"
        >
          Submit Day's Work
        </Button>
      </div>
    </div>
  );
};
