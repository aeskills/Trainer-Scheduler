import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Sparkles, Building2, Calendar as CalendarIcon, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAutosaveDraft } from "../../hooks/useAutosaveDraft";
import { getVisit, savePlan, submitVisitCallable, submitActivitySheetLinks } from "../../services/visitsApi";
import { getAppSettings } from "../../services/adminApi";
import { getLocalDraft, clearLocalDraft } from "../../lib/idb";
import { validateForSubmit } from "../../lib/visitValidation";
import { displayDateWithDay, displaySheetDate, dateKeyFromStr, isPastIST, isTodayIST } from "../../lib/dates";
import { Photo, School, Visit } from "../../types";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { SchoolCard } from "../../components/visit/SchoolCard";
import { SubmitChecklist } from "../../components/visit/SubmitChecklist";
import { SuccessCelebration } from "../../components/visit/SuccessCelebration";
import { Skeleton } from "../../components/ui/Skeleton";

export const VisitPage: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { appUser, role } = useAuth();
  const isAdmin = role === "admin";

  const dateStr = paramDate || "";
  const visitId = appUser?.uid ? `${appUser.uid}_${dateStr}` : "";

  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingPlan, setSavingPlan] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form states
  const [schoolCount, setSchoolCount] = useState<number>(1);
  const [schools, setSchools] = useState<School[]>([
    { id: "s1", name: "", targetStudents: null, trainedStudents: null },
  ]);
  const [photosMap, setPhotosMap] = useState<Record<string, Photo[]>>({});
  const [adobeGalleryDone, setAdobeGalleryDone] = useState<boolean>(false);
  const [adobeGalleryUrl, setAdobeGalleryUrl] = useState<string>("");
  const [driveFolderUrl, setDriveFolderUrl] = useState<string>("");

  // Activity Submission Links states
  const [activityLinksText, setActivityLinksText] = useState<string>("");
  const [selectedSchoolName, setSelectedSchoolName] = useState<string>("");
  const [activitySheetUrl, setActivitySheetUrl] = useState<string>("");
  const [isSubmittingLinks, setIsSubmittingLinks] = useState<boolean>(false);
  const [linksSubmittedCount, setLinksSubmittedCount] = useState<number>(0);
  const [sheetSubmittedTab, setSheetSubmittedTab] = useState<string>("");

  const isPast = isPastIST(dateStr);
  const isToday = isTodayIST(dateStr);
  const isSubmitted = visit?.status === "SUBMITTED";
  const isMissed = visit?.status === "MISSED";
  // Trainers can only edit PLANNED visits for today (or create today/future)
  const isReadOnly = isSubmitted || (isMissed && !isAdmin) || (isPast && !isAdmin);

  // Enable local IndexedDB autosave for drafts while editing
  useAutosaveDraft(appUser?.uid, dateStr, schools, adobeGalleryDone, !isReadOnly);

  useEffect(() => {
    if (!appUser?.uid || !dateStr) return;

    let mounted = true;

    async function loadData() {
      setLoading(true);
      try {
        // Load app settings for Adobe Express gallery link & Drive link
        const settings = await getAppSettings();
        const sheetUrlMap: Record<string, string> = {
          Delhi: "https://docs.google.com/spreadsheets/d/1DLLKjvoUoo0DO45w3EZJGMBQfJfUztDY4W8tfNnr2uw/edit?usp=sharing",
          UP: "https://docs.google.com/spreadsheets/d/1Em3sqjwpjDO-dLffBrdNL5GDB3GxU3UBPMW5Qs3w3a8/edit?usp=drivesdk",
          UK: "https://docs.google.com/spreadsheets/d/1lSU9ZybieHdrja7jgcHETfouwvraljRQJm50lBI4EJU/edit?usp=drive_link",
        };
        if (mounted && appUser?.state) {
          setAdobeGalleryUrl(settings.stateLinks?.[appUser.state] || "");
          setDriveFolderUrl(settings.driveLinks?.[appUser.state] || "");
          setActivitySheetUrl(
            settings.activitySheetLinks?.[appUser.state] ||
            sheetUrlMap[appUser.state] ||
            sheetUrlMap.Delhi
          );
        }

        // Fetch visit from Firestore
        const existing = await getVisit(visitId);

        if (mounted && existing) {
          setVisit(existing);
          if (existing.schools?.length) {
            setSchoolCount(existing.schools.length);
            setSchools(existing.schools);
            if (!selectedSchoolName && existing.schools[0]?.name) {
              setSelectedSchoolName(existing.schools[0].name);
            }
          }
          setPhotosMap(existing.photos || {});
          setAdobeGalleryDone(existing.adobeGalleryDone || false);

          if (existing.adobeSubmissionLinks?.length) {
            setActivityLinksText(existing.adobeSubmissionLinks.join("\n"));
            setLinksSubmittedCount(existing.adobeSubmissionLinks.length);
          }
          if (existing.adobeSubmissionStatus === "SUBMITTED") {
            setSheetSubmittedTab(existing.trainerName || appUser?.name || "Trainer");
          }
        } else if (mounted && appUser) {
          // If no visit exists, check for offline local draft
          const localDraft = await getLocalDraft(appUser.uid, dateStr);
          if (localDraft && localDraft.schools?.length) {
            setSchools(localDraft.schools);
            setSchoolCount(localDraft.schools.length);
            setAdobeGalleryDone(localDraft.adobeGalleryDone);
          }
        }
      } catch (err) {
        console.error("Failed to load visit data:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [appUser?.uid, dateStr, visitId]);

  // Handle changing number of schools (1-10)
  const handleCountChange = (count: number) => {
    if (isReadOnly) return;
    setSchoolCount(count);

    setSchools((prev) => {
      const next: School[] = [];
      for (let i = 0; i < count; i++) {
        if (prev[i]) {
          next.push(prev[i]);
        } else {
          next.push({
            id: `s_${Date.now()}_${i}`,
            name: "",
            targetStudents: null,
            trainedStudents: null,
          });
        }
      }
      return next;
    });
  };

  const handleUpdateSchool = (idx: number, patch: Partial<School>) => {
    setSchools((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  };

  const handlePhotoUploaded = (schoolId: string, photo: Photo) => {
    setPhotosMap((prev) => ({
      ...prev,
      [schoolId]: [...(prev[schoolId] || []), photo],
    }));
  };

  const handlePhotoDeleted = (schoolId: string, photoId: string) => {
    setPhotosMap((prev) => ({
      ...prev,
      [schoolId]: (prev[schoolId] || []).filter((p) => p.id !== photoId),
    }));
  };

  // Step 1: Save Morning Plan
  const handleSavePlan = async () => {
    if (!appUser?.uid) return;
    setSavingPlan(true);
    setSaveSuccessMsg(null);

    try {
      await savePlan({
        trainerId: appUser.uid,
        trainerName: appUser.name,
        state: appUser.state,
        date: dateStr,
        dateKey: dateKeyFromStr(dateStr),
        schools,
        adobeGalleryDone,
      });

      setSaveSuccessMsg("Morning plan saved! Date is marked as Planned.");
      setTimeout(() => setSaveSuccessMsg(null), 4000);

      // Refresh local visit state
      const updated = await getVisit(visitId);
      if (updated) setVisit(updated);
    } catch (err: any) {
      alert("Failed to save plan: " + (err.message || "Error"));
    } finally {
      setSavingPlan(false);
    }
  };

  // Submit bulk Adobe Express activity links to the state Google Sheet
  const handleSubmitLinksToSheet = async () => {
    if (!appUser?.name) return;
    const clean = activityLinksText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5 && (s.startsWith("http://") || s.startsWith("https://")));

    if (clean.length === 0) {
      alert("Please enter at least one valid Adobe Express link (starting with http:// or https://)");
      return;
    }

    setIsSubmittingLinks(true);
    try {
      const schoolName = selectedSchoolName || schools[0]?.name || "School Visit";
      const displayDate = displaySheetDate(dateStr);
      const res = await submitActivitySheetLinks({
        visitId,
        state: appUser.state || "Delhi",
        trainerName: appUser.name,
        date: dateStr,
        displayDate,
        schoolName,
        links: clean,
      });

      setLinksSubmittedCount(clean.length);
      setSheetSubmittedTab(res.tabName || appUser.name);
      setSaveSuccessMsg(`Recorded ${clean.length} activity links into Google Sheet (tab: "${res.tabName || appUser.name}")!`);
      setTimeout(() => setSaveSuccessMsg(null), 5000);

      // Refresh local visit state
      const updated = await getVisit(visitId);
      if (updated) setVisit(updated);
    } catch (err: any) {
      alert("Error submitting links to Google Sheet: " + (err.message || "Failed to submit"));
    } finally {
      setIsSubmittingLinks(false);
    }
  };

  // Step 2: Final Submit Day's Work
  const handleSubmitDay = async () => {
    if (!visitId) return;

    // First ensure latest school numbers are saved
    setSubmitting(true);
    try {
      await savePlan({
        trainerId: appUser!.uid,
        trainerName: appUser!.name,
        state: appUser!.state,
        date: dateStr,
        dateKey: dateKeyFromStr(dateStr),
        schools,
        adobeGalleryDone,
      });

      // If trainer entered activity links that haven't been submitted yet, auto-submit them
      const clean = activityLinksText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5 && (s.startsWith("http://") || s.startsWith("https://")));
      if (clean.length > 0 && linksSubmittedCount === 0) {
        try {
          const schoolName = selectedSchoolName || schools[0]?.name || "School Visit";
          const displayDate = displaySheetDate(dateStr);
          await submitActivitySheetLinks({
            visitId,
            state: appUser!.state || "Delhi",
            trainerName: appUser!.name,
            date: dateStr,
            displayDate,
            schoolName,
            links: clean,
          });
          setLinksSubmittedCount(clean.length);
          setSheetSubmittedTab(appUser!.name);
        } catch (linkErr) {
          console.warn("Auto-submitting links notice:", linkErr);
        }
      }

      // Call cloud function to validate & lock
      await submitVisitCallable(visitId);

      // Clear offline draft
      await clearLocalDraft(appUser!.uid, dateStr);

      const refreshed = await getVisit(visitId);
      if (refreshed) setVisit(refreshed);

      setShowCelebration(true);
    } catch (err: any) {
      alert("Submission check: " + (err.message || "Failed to submit"));
    } finally {
      setSubmitting(false);
    }
  };

  // Validate for submission checklist
  const validation = validateForSubmit({
    schools,
    photos: photosMap,
    adobeGalleryDone,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {displayDateWithDay(dateStr)}
              </h1>
              {visit?.status && <Badge status={visit.status} />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>
                {isToday
                  ? "Today's visit"
                  : isPast
                  ? "Past visit date"
                  : "Upcoming visit date"}
              </span>
            </p>
          </div>
        </div>

        {/* Status Lock Warning or Save Plan Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isReadOnly ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitted ? "Day Submitted & Locked" : "Locked (Past Date)"}</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="md"
              loading={savingPlan}
              onClick={handleSavePlan}
              icon={<Save className="w-4 h-4 text-violet-600" />}
            >
              Save Plan
            </Button>
          )}
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-800 dark:text-violet-300 font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-violet-600" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* STEP 1: Morning Plan – School Count Selector */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[11px] font-bold mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Step 1: Morning Plan</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Number of schools visiting today
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select 1 to 10 schools to auto-generate containers for each visit.
          </p>
        </div>

        {/* Count Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              disabled={isReadOnly}
              onClick={() => handleCountChange(num)}
              className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${
                schoolCount === num
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/30 scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Generated School Cards */}
      <div className="flex flex-col gap-5">
        {schools.map((school, idx) => (
          <SchoolCard
            key={school.id || idx}
            index={idx}
            school={school}
            photos={photosMap[school.id] || []}
            visitId={visitId}
            trainerName={appUser?.name || "Trainer"}
            visitDate={dateStr}
            state={appUser?.state || "Delhi"}
            isReadOnly={isReadOnly}
            assignedSchools={appUser?.assignedSchools || []}
            driveFolderUrl={driveFolderUrl}
            onUpdateSchool={(patch) => handleUpdateSchool(idx, patch)}
            onPhotoUploaded={(photo) => handlePhotoUploaded(school.id, photo)}
            onPhotoDeleted={(photoId) => handlePhotoDeleted(school.id, photoId)}
          />
        ))}
      </div>

      {/* STEP 2: Submission Checklist & Verification */}
      <SubmitChecklist
        adobeGalleryUrl={adobeGalleryUrl}
        activitySheetUrl={activitySheetUrl}
        stateName={appUser?.state || "Delhi"}
        trainerName={appUser?.name || "Trainer"}
        availableSchools={schools.map((s, i) => ({ id: s.id || `s${i}`, name: s.name || `School ${i + 1}` }))}
        selectedSchoolName={selectedSchoolName || schools[0]?.name || ""}
        onSelectSchoolName={setSelectedSchoolName}
        adobeGalleryDone={adobeGalleryDone}
        onToggleAdobeGallery={setAdobeGalleryDone}
        activityLinksText={activityLinksText}
        onChangeActivityLinksText={setActivityLinksText}
        onSubmitLinksToSheet={handleSubmitLinksToSheet}
        isSubmittingLinks={isSubmittingLinks}
        linksSubmittedCount={linksSubmittedCount}
        sheetSubmittedTab={sheetSubmittedTab}
        missingItems={validation.missing}
        warnings={validation.warnings}
        onSubmit={handleSubmitDay}
        submitting={submitting}
        isReadOnly={isReadOnly}
      />


      {/* Celebration Modal on Successful Submit */}
      {showCelebration && (
        <SuccessCelebration
          dateDisplay={displayDateWithDay(dateStr)}
          onClose={() => {
            setShowCelebration(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};
