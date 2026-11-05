import React, { useState, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, Calendar, Filter, Users, MapPin } from "lucide-react";
import { fetchAllTrainers, fetchVisitsWithFilter, exportVisitsToSpreadsheet } from "../../services/adminApi";
import { AppUser, Visit } from "../../types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { formatISTDate, getNowInIST, dateKeyFromStr } from "../../lib/dates";

export const AdminExport: React.FC = () => {
  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [startDate, setStartDate] = useState<string>(() => {
    const d = getNowInIST();
    d.setDate(1); // 1st of current month
    return formatISTDate(d);
  });
  const [endDate, setEndDate] = useState<string>(formatISTDate(getNowInIST()));
  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [trainerFilter, setTrainerFilter] = useState<string>("ALL");

  const [previewVisits, setPreviewVisits] = useState<Visit[]>([]);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  useEffect(() => {
    async function loadTrainers() {
      const list = await fetchAllTrainers();
      setTrainers(list);
    }
    loadTrainers();
  }, []);

  const handleFetchPreview = async () => {
    setLoadingPreview(true);
    try {
      const results = await fetchVisitsWithFilter({
        startDateKey: startDate ? dateKeyFromStr(startDate) : undefined,
        endDateKey: endDate ? dateKeyFromStr(endDate) : undefined,
        state: stateFilter !== "ALL" ? stateFilter : undefined,
        trainerId: trainerFilter !== "ALL" ? trainerFilter : undefined,
        maxLimit: 1000,
      });
      setPreviewVisits(results);
    } catch (err: any) {
      alert("Error querying visits: " + err.message);
    } finally {
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    handleFetchPreview();
  }, [startDate, endDate, stateFilter, trainerFilter]);

  const handleExport = (type: "xlsx" | "csv") => {
    if (previewVisits.length === 0) {
      alert("No visits to export with current filters.");
      return;
    }
    setExporting(true);
    try {
      exportVisitsToSpreadsheet(previewVisits, type);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Export Visits Report</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Download complete school visit logs, student counts and photo proof links
            </p>
          </div>
        </div>
      </div>

      {/* Filter Card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Export Filter Criteria</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">State</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            >
              <option value="ALL">All States</option>
              <option value="UP">UP</option>
              <option value="UK">UK</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Trainer</label>
            <select
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            >
              <option value="ALL">All Trainers</option>
              {trainers.map((t) => (
                <option key={t.uid} value={t.uid}>
                  {t.name} ({t.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Matching records found: <strong className="text-violet-600">{previewVisits.length}</strong>
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              disabled={previewVisits.length === 0 || exporting}
              onClick={() => handleExport("csv")}
              icon={<FileText className="w-4 h-4 text-emerald-600" />}
              className="flex-1 sm:flex-initial"
            >
              Export CSV
            </Button>

            <Button
              size="md"
              disabled={previewVisits.length === 0 || exporting}
              onClick={() => handleExport("xlsx")}
              icon={<FileSpreadsheet className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              Download Excel (.xlsx)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
