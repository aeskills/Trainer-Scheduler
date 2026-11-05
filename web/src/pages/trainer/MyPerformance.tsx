import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Target,
  Camera,
  Calendar,
  Award,
  ChevronRight,
  ArrowUpRight,
  FileSpreadsheet,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useAuth } from "../../hooks/useAuth";
import { fetchVisitsWithFilter } from "../../services/adminApi";
import { Visit } from "../../types";
import { computeTrainerAnalytics, TrainerAnalytics } from "../../lib/analytics";
import { Skeleton } from "../../components/ui/Skeleton";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export const MyPerformance: React.FC = () => {
  const { appUser } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTrainerVisits() {
      if (!appUser?.uid) return;
      setLoading(true);
      try {
        const list = await fetchVisitsWithFilter({ trainerId: appUser.uid, maxLimit: 100 });
        setVisits(list);
      } catch (err) {
        console.error("Error loading trainer visits:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTrainerVisits();
  }, [appUser?.uid]);

  const analytics = useMemo(() => {
    if (!appUser) return null;
    return computeTrainerAnalytics(visits, appUser);
  }, [visits, appUser]);

  if (loading || !analytics) {
    return (
      <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-pulse">
        <Skeleton className="h-32 w-full rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-violet-800/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Personal Impact Scorecard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
            My Field Performance
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {appUser?.name} • {appUser?.state} Territory • Total{" "}
            <strong>{analytics.totalVisits} visits logged</strong>
          </p>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Overall Score
            </span>
            <span className="text-2xl font-black text-violet-400">
              {analytics.score}/100
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex flex-col items-center justify-center font-extrabold shadow-md shadow-violet-500/30">
            <span className="text-[10px] uppercase font-bold text-violet-200">Grade</span>
            <span className="text-base leading-none">{analytics.grade}</span>
          </div>
        </div>
      </div>

      {/* 4 Performance KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Completion % */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Completion Rate
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            {analytics.completionRate}%
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${analytics.completionRate}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {analytics.submittedVisits} submitted • {analytics.missedVisits} missed
          </p>
        </div>

        {/* Students Reached */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Students Reached
            </span>
            <Target className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">
            {analytics.trainedStudents}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-violet-500 h-full rounded-full"
              style={{ width: `${Math.min(100, analytics.achievementRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {analytics.achievementRate}% of {analytics.targetStudents} target
          </p>
        </div>

        {/* Schools Covered */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Schools Covered
            </span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            {analytics.totalSchoolsVisited}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: "85%" }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Across {analytics.totalVisits} visit days
          </p>
        </div>

        {/* Photos Uploaded */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Photos Uploaded
            </span>
            <Camera className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            {analytics.totalPhotos}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (analytics.avgPhotosPerVisit / 3) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Avg {analytics.avgPhotosPerVisit} photos / visit
          </p>
        </div>
      </div>

      {/* Daily Progress Chart */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          Students Trained vs. Target Goal
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Tracking daily attendance against plan goals
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.dailyTrend}>
              <XAxis dataKey="dateLabel" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1b4b",
                  borderColor: "#4338ca",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="trainedStudents" name="Trained Students" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="targetStudents" name="Target Goal" fill="#94A3B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* School Visit Log */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              My School Visit Records
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              History of all schools visited and verification status
            </p>
          </div>

          <Link
            to="/"
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 inline-flex items-center gap-1"
          >
            <span>Open Calendar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">Date</th>
                <th className="p-3">School Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Target</th>
                <th className="p-3">Trained</th>
                <th className="p-3">Photos</th>
                <th className="p-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {analytics.schoolLogs.map((log, idx) => (
                <tr key={`${log.visitId}_${idx}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {log.date}
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {log.schoolName}
                  </td>
                  <td className="p-3">
                    <Badge status={log.status} size="sm" />
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {log.targetStudents}
                  </td>
                  <td className="p-3 font-bold text-violet-600 dark:text-violet-400">
                    {log.status === "SUBMITTED" ? log.trainedStudents : "-"}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {log.photosCount} photos
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/visit/${log.date}`}
                      className="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-300 font-semibold text-xs inline-block"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
