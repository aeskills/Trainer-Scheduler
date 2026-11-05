import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, CheckCircle2, Clock, XCircle, MapPin, Sparkles, TrendingUp, ArrowUpRight, BarChart3, Trophy, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { fetchAllTrainers, fetchVisitsWithFilter } from "../../services/adminApi";
import { formatISTDate, getNowInIST } from "../../lib/dates";
import { AppUser, Visit } from "../../types";
import { Skeleton } from "../../components/ui/Skeleton";

export const AdminDashboard: React.FC = () => {
  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const todayStr = formatISTDate(getNowInIST());

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [trainerList, visitList] = await Promise.all([
          fetchAllTrainers(),
          fetchVisitsWithFilter({ maxLimit: 300 }),
        ]);
        setTrainers(trainerList);
        setVisits(visitList);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Today's visit metrics
  const todayVisits = visits.filter((v) => v.date === todayStr);
  const todaySubmitted = todayVisits.filter((v) => v.status === "SUBMITTED").length;
  const todayPlanned = todayVisits.filter((v) => v.status === "PLANNED").length;
  const todayMissed = todayVisits.filter((v) => v.status === "MISSED").length;

  const pendingApprovalTrainers = trainers.filter((t) => t.status === "Pending").length;
  const activeTrainers = trainers.filter((t) => t.status === "Approved").length;

  // State-wise visits chart data
  const stateCounts: Record<string, { state: string; submitted: number; planned: number; missed: number }> = {
    UP: { state: "UP", submitted: 0, planned: 0, missed: 0 },
    UK: { state: "UK", submitted: 0, planned: 0, missed: 0 },
    Delhi: { state: "Delhi", submitted: 0, planned: 0, missed: 0 },
  };

  visits.forEach((v) => {
    const s = v.state || "UP";
    if (!stateCounts[s]) stateCounts[s] = { state: s, submitted: 0, planned: 0, missed: 0 };
    if (v.status === "SUBMITTED") stateCounts[s].submitted += 1;
    else if (v.status === "PLANNED") stateCounts[s].planned += 1;
    else if (v.status === "MISSED") stateCounts[s].missed += 1;
  });

  const stateChartData = Object.values(stateCounts);

  // Status breakdown for Pie Chart
  const statusPieData = [
    { name: "Submitted", value: visits.filter((v) => v.status === "SUBMITTED").length, color: "#10B981" },
    { name: "Planned", value: visits.filter((v) => v.status === "PLANNED").length, color: "#8B5CF6" },
    { name: "Missed", value: visits.filter((v) => v.status === "MISSED").length, color: "#F43F5E" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Welcome & Alert Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            System Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            TrainerPlan Operations
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Tracking {activeTrainers} field trainers across UP, UK & Delhi • Date: <strong>{todayStr}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to="/admin/calendar"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Trainer Calendar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/admin/performance"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-400/40 hover:bg-violet-900/50 text-white font-bold text-xs transition-all self-start sm:self-auto"
          >
            <TrendingUp className="w-4 h-4 text-violet-300" />
            <span>Performance Dashboard</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {pendingApprovalTrainers > 0 && (
            <Link
              to="/admin/trainers?status=Pending"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
            >
              <span>{pendingApprovalTrainers} pending approvals</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Today's KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today Submitted</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            {todaySubmitted}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Visits completed with photos</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today Planned</span>
            <span className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">
            {todayPlanned}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Awaiting day submission</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today Missed</span>
            <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <XCircle className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-2">
            {todayMissed}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Visits not submitted</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Trainers</span>
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            {activeTrainers}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Approved in system</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State-wise Breakdown Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">State Activity Breakdown</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Visits recorded by state</p>
            </div>
            <Link
              to="/admin/performance?tab=statewise"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-1 hover:underline"
            >
              <span>Full State Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateChartData}>
                <XAxis dataKey="state" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    borderColor: "#4338ca",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="submitted" name="Submitted" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="planned" name="Planned" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="missed" name="Missed" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Status Distribution Pie Chart */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visit Status Share</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cumulative submissions</p>
            </div>
            <Link
              to="/admin/performance?tab=overall"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-1 hover:underline"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-52 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    borderColor: "#4338ca",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            {statusPieData.map((item) => (
              <div key={item.name}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launchpad Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/calendar"
          className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-violet-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Trainer Calendar Viewer
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select any trainer from the dropdown to inspect and manage their monthly visit schedule.
            </p>
          </div>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 mt-4">
            <span>Open Calendar</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/admin/performance?tab=overall"
          className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-violet-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Overall Performance Analytics
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Macro KPIs, completion rates, student targets, and time-series operational flow.
            </p>
          </div>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 mt-4">
            <span>View Macro Analytics</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/admin/performance?tab=statewise"
          className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-violet-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              State-wise Comparison
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Compare UP, UK, and Delhi regions across trainer efficiency, students trained and coverage.
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 mt-4">
            <span>Compare States</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/admin/performance?tab=leaderboard"
          className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-violet-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Individual Trainer Drill-down
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Full scorecards, school logs, variance tracking, and leaderboards for every field trainer.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 mt-4">
            <span>Open Leaderboard</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};
