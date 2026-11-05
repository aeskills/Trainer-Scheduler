import React, { useRef, useState, useMemo } from "react";
import { Camera, Trash2, ExternalLink, Image as ImageIcon, Loader2, AlertCircle, Building, CheckCircle2, ChevronDown } from "lucide-react";
import { Photo, School } from "../../types";
import { AssignedSchool } from "../../lib/trainersData";
import { Input } from "../ui/Input";
import { uploadPhotoWithProgress, deletePhotoCallable } from "../../services/visitsApi";

interface SchoolCardProps {
  index: number;
  school: School;
  photos: Photo[];
  visitId: string;
  trainerName?: string;
  visitDate?: string;
  state?: string;
  isReadOnly: boolean;
  assignedSchools?: AssignedSchool[];
  driveFolderUrl?: string;
  onUpdateSchool: (updated: Partial<School>) => void;
  onPhotoUploaded: (photo: Photo) => void;
  onPhotoDeleted: (photoId: string) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  index,
  school,
  photos,
  visitId,
  trainerName,
  visitDate,
  state,
  isReadOnly,
  assignedSchools = [],
  driveFolderUrl,
  onUpdateSchool,
  onPhotoUploaded,
  onPhotoDeleted,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentUploadingIndex, setCurrentUploadingIndex] = useState<number>(0);
  const [totalUploadingFiles, setTotalUploadingFiles] = useState<number>(0);
  const [currentUploadingFileName, setCurrentUploadingFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Find if current entered school name matches any assigned school
  const matchedAssigned = useMemo(() => {
    if (!school.name) return null;
    const nameLower = school.name.trim().toLowerCase();
    return assignedSchools.find((s) => s.name.trim().toLowerCase() === nameLower) || null;
  }, [school.name, assignedSchools]);

  const handleSchoolNameChange = (val: string) => {
    const found = assignedSchools.find(
      (s) => s.name.trim().toLowerCase() === val.trim().toLowerCase()
    );
    if (found) {
      onUpdateSchool({
        name: found.name,
        targetStudents: found.targetStudents ?? school.targetStudents,
      });
    } else {
      onUpdateSchool({ name: val });
    }
  };

  const handleSelectAssignedSchool = (asSchool: AssignedSchool) => {
    onUpdateSchool({
      name: asSchool.name,
      targetStudents: asSchool.targetStudents,
    });
    setShowPicker(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    if (!school.name?.trim()) {
      setUploadError("Please enter the school name first before uploading photos.");
      return;
    }

    const files = Array.from(fileList);
    setUploadError(null);
    setUploading(true);
    setTotalUploadingFiles(files.length);

    // Clean school prefix (e.g. "DPS", "VIS")
    const rawSchool = school.name.trim();
    const schoolPrefix = rawSchool
      .replace(/[\\/:*?"<>|#%&',.]+/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 50) || "School";

    // Track starting number from photos already uploaded for this school
    let currentCount = photos.length;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentUploadingIndex(i + 1);
        setUploadProgress(0);

        currentCount += 1;
        const exactFileName = `${schoolPrefix}_${currentCount}.jpg`;
        setCurrentUploadingFileName(exactFileName);

        const newPhoto = await uploadPhotoWithProgress(
          visitId,
          school.id,
          file,
          (pct) => setUploadProgress(pct),
          {
            schoolName: school.name,
            exactFileName,
            photoNumber: currentCount,
            trainerName,
            date: visitDate,
            state,
          }
        );
        onPhotoUploaded(newPhoto);
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload photo to Drive");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setCurrentUploadingIndex(0);
      setTotalUploadingFiles(0);
      setCurrentUploadingFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (isReadOnly) return;
    setDeletingId(photoId);
    try {
      await deletePhotoCallable(visitId, school.id, photoId);
      onPhotoDeleted(photoId);
    } catch (err: any) {
      alert("Failed to delete photo: " + (err.message || "Error"));
    } finally {
      setDeletingId(null);
    }
  };

  const isTrainedExceedingTarget =
    school.targetStudents !== null &&
    school.trainedStudents !== null &&
    school.trainedStudents > school.targetStudents;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm flex flex-col gap-5">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {school.name?.trim() ? school.name : `School ${index + 1}`}
          </h3>
          {matchedAssigned && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <CheckCircle2 className="w-3 h-3" />
              Assigned School
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isReadOnly && assignedSchools.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="text-[11px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 dark:hover:bg-violet-900/60 px-2.5 py-1 rounded-lg border border-violet-200/70 dark:border-violet-800 transition-colors flex items-center gap-1"
            >
              <Building className="w-3 h-3" />
              <span>Choose Assigned ({assignedSchools.length})</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Quick Assigned School Picker Drawer/Dropdown */}
      {showPicker && !isReadOnly && assignedSchools.length > 0 && (
        <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/40 p-3 max-h-56 overflow-y-auto flex flex-col gap-1.5 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-violet-100 dark:border-violet-900 text-xs font-bold text-violet-900 dark:text-violet-200">
            <span>Select from your assigned schools list:</span>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="text-[11px] text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {assignedSchools.map((asSchool) => (
              <button
                key={asSchool.id}
                type="button"
                onClick={() => handleSelectAssignedSchool(asSchool)}
                className={`text-left p-2 rounded-lg text-xs font-medium transition-colors border ${
                  school.name === asSchool.name
                    ? "bg-violet-600 text-white border-violet-600 font-bold"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200/60 dark:border-slate-700 hover:border-violet-300"
                }`}
              >
                <div className="truncate font-semibold">{asSchool.name}</div>
                <div className="text-[10px] opacity-80 flex items-center gap-2 mt-0.5">
                  {asSchool.district && <span>📍 {asSchool.district}</span>}
                  <span>🎯 Target: {asSchool.targetStudents}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inputs: School Name, Target, Trained */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <Input
            label="School Name"
            placeholder="Type or pick assigned school..."
            disabled={isReadOnly}
            value={school.name}
            list={`assigned-schools-${index}`}
            onChange={(e) => handleSchoolNameChange(e.target.value)}
          />
          {/* HTML5 datalist for autocomplete */}
          <datalist id={`assigned-schools-${index}`}>
            {assignedSchools.map((asSchool) => (
              <option key={asSchool.id} value={asSchool.name}>
                {asSchool.district ? `${asSchool.district} - Target: ${asSchool.targetStudents}` : `Target: ${asSchool.targetStudents}`}
              </option>
            ))}
          </datalist>

          {/* Matched School Info Pill */}
          {matchedAssigned && (
            <div className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-x-3 gap-y-0.5">
              {matchedAssigned.district && <span>📍 District: <strong>{matchedAssigned.district}</strong></span>}
              {matchedAssigned.principalContact && (
                <span>📞 Principal: {matchedAssigned.principalName ? `${matchedAssigned.principalName} (${matchedAssigned.principalContact})` : matchedAssigned.principalContact}</span>
              )}
              {matchedAssigned.spocContact && (
                <span>👤 SPOC: {matchedAssigned.spocName ? `${matchedAssigned.spocName} (${matchedAssigned.spocContact})` : matchedAssigned.spocContact}</span>
              )}
            </div>
          )}
        </div>

        <div>
          <Input
            label="Target Students"
            type="number"
            min={1}
            placeholder="e.g. 50"
            disabled={isReadOnly}
            value={school.targetStudents === null ? "" : school.targetStudents}
            onChange={(e) =>
              onUpdateSchool({
                targetStudents: e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          />
        </div>

        <div>
          <Input
            label="Students Trained Today"
            type="number"
            min={0}
            placeholder="Filled after visit"
            disabled={isReadOnly}
            value={school.trainedStudents === null ? "" : school.trainedStudents}
            onChange={(e) =>
              onUpdateSchool({
                trainedStudents: e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
            helperText={
              isTrainedExceedingTarget ? "⚠️ Trained exceeds target students" : undefined
            }
          />
        </div>
      </div>


      {/* Photo Upload Section */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            Visit Photos (At least 1 required)
          </label>
          <div className="flex items-center gap-2">
            {driveFolderUrl && (
              <a
                href={driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                title="Open State Google Drive Folder"
              >
                <span>Drive Folder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {!isReadOnly && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 flex items-center gap-1 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                Upload Photo
              </button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900 p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-violet-700 dark:text-violet-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {totalUploadingFiles > 1
                  ? `Uploading ${currentUploadingIndex} of ${totalUploadingFiles}: ${currentUploadingFileName || "photo"}...`
                  : `Uploading ${currentUploadingFileName || "photo"} to Drive...`}
              </span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-violet-200 dark:bg-violet-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-violet-600 h-full transition-all duration-150"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
          <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-3 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Photo Gallery Grid */}
        {photos.length === 0 ? (
          <div
            onClick={!isReadOnly ? () => fileInputRef.current?.click() : undefined}
            className={`rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center gap-2 ${
              !isReadOnly ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isReadOnly ? "No photos uploaded" : "No photos added yet"}
              </p>
              {!isReadOnly && (
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tap to upload school session & training photos
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div
                key={p.id}
                className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800"
              >
                {p.thumbUrl ? (
                  <img
                    src={p.thumbUrl}
                    alt={p.fileName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 p-2 text-center">
                    {p.fileName}
                  </div>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors"
                    title="View on Google Drive"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {!isReadOnly && (
                    <button
                      type="button"
                      disabled={deletingId === p.id}
                      onClick={() => handleDeletePhoto(p.id)}
                      className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                      title="Delete photo"
                    >
                      {deletingId === p.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white truncate">
                  {p.fileName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
