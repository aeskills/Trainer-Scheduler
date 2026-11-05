import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  TrendingUp,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Award,
  Trophy,
  Target,
  Camera,
  Calendar,
  Search,
  Star,
  Download,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { fetchAllTrainers, fetchVisitsWithFilter } from "../../services/adminApi";
import { AppUser, Visit } from "../../types";
import { Skeleton } from "../../components/ui/Skeleton";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  computeOverallAnalytics,
  computeStateAnalytics,
  computeTrainerAnalytics,
  computeAllTrainerScorecards,
  TrainerAnalytics,
  OverallAnalytics,
  StateAnalytics,
} from "../../lib/analytics";
import { DEFAULT_SETTINGS } from "../../lib/trainersData";
import * as XLSX from "xlsx";

type TabMode = "overall" | "statewise" | "trainer" | "leaderboard";
type DateFilter = "7d" | "14d" | "30d" | "all";


export const AdminPerformance: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Tab & Filters
  const initialTab = (searchParams.get("tab") as TabMode) || "overall";
  const [activeTab, setActiveTab] = useState<TabMode>(initialTab);
  const [dateFilter, setDateFilter] = useState<DateFilter>("14d");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [trainerSearchQuery, setTrainerSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [trainerList, visitList] = await Promise.all([
          fetchAllTrainers(),
          fetchVisitsWithFilter({ maxLimit: 500 }),
        ]);
        setTrainers(trainerList);
        setVisits(visitList);

        // Set default selected trainer
        const urlTrainer = searchParams.get("trainerId");
        if (urlTrainer && trainerList.some((t) => t.uid === urlTrainer)) {
          setSelectedTrainerId(urlTrainer);
          setActiveTab("trainer");
        } else if (trainerList.length > 0) {
          setSelectedTrainerId(trainerList[0].uid);
        }
      } catch (err) {
        console.error("Failed to load performance data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  // Filter visits by date range
  const filteredVisits = useMemo(() => {
    if (dateFilter === "all") return visits;
    const now = Date.now();
    const daysMap = { "7d": 7, "14d": 14, "30d": 30 };
    const cutoffMs = now - daysMap[dateFilter] * 86400000;

    return visits.filter((v) => {
      // Parse v.date "yyyy-MM-dd"
      const visitMs = new Date(v.date).getTime();
      return isNaN(visitMs) || visitMs >= cutoffMs;
    });
  }, [visits, dateFilter]);

  // Computed Analytics
  const overall = useMemo(
    () => computeOverallAnalytics(filteredVisits, trainers),
    [filteredVisits, trainers]
  );

  const stateAnalytics = useMemo(
    () => computeStateAnalytics(filteredVisits, trainers),
    [filteredVisits, trainers]
  );

  const scorecards = useMemo(
    () => computeAllTrainerScorecards(filteredVisits, trainers),
    [filteredVisits, trainers]
  );

  const selectedTrainerObj = useMemo(
    () => trainers.find((t) => t.uid === selectedTrainerId) || trainers[0] || null,
    [trainers, selectedTrainerId]
  );

  const selectedTrainerAnalytics = useMemo(
    () =>
      selectedTrainerObj
        ? computeTrainerAnalytics(filteredVisits, selectedTrainerObj)
        : null,
    [filteredVisits, selectedTrainerObj]
  );

  // Filtered leaderboard
  const filteredScorecards = useMemo(() => {
    return scorecards.filter((sc) => {
      const matchState = selectedState === "ALL" || sc.state === selectedState;
      const matchSearch =
        !trainerSearchQuery ||
        sc.trainerName.toLowerCase().includes(trainerSearchQuery.toLowerCase()) ||
        sc.email.toLowerCase().includes(trainerSearchQuery.toLowerCase());
      return matchState && matchSearch;
    });
  }, [scorecards, selectedState, trainerSearchQuery]);

  // Export full report to spreadsheet
  const handleExportPerformance = () => {
    const summaryRows = scorecards.map((sc, idx) => ({
      Rank: idx + 1,
      "Trainer Name": sc.trainerName,
      State: sc.state,
      Email: sc.email,
      "Performance Grade": sc.grade,
      "Overall Score (/100)": sc.score,
      "Total Visits": sc.totalVisits,
      "Submitted Visits": sc.submittedVisits,
      "Missed Visits": sc.missedVisits,
      "Completion Rate %": `${sc.completionRate}%`,
      "Target Students": sc.targetStudents,
      "Trained Students": sc.trainedStudents,
      "Target Achievement %": `${sc.achievementRate}%`,
      "Total Schools Visited": sc.totalSchoolsVisited,
      "Photos Uploaded": sc.totalPhotos,
      "Avg Photos / Visit": sc.avgPhotosPerVisit,
    }));

    const stateRows = stateAnalytics.map((st) => ({
      State: st.state,
      "Active Trainers": st.activeTrainers,
      "Total Visits": st.totalVisits,
      "Submitted Visits": st.submittedVisits,
      "Missed Visits": st.missedVisits,
      "Completion Rate %": `${st.completionRate}%`,
      "Target Students": st.targetStudents,
      "Trained Students": st.trainedStudents,
      "Achievement Rate %": `${st.achievementRate}%`,
      "Total Schools": st.totalSchools,
      "Total Photos": st.totalPhotos,
    }));

    const wb = XLSX.utils.book_new();
    const wsTrainers = XLSX.utils.json_to_sheet(summaryRows);
    const wsStates = XLSX.utils.json_to_sheet(stateRows);

    XLSX.utils.book_append_sheet(wb, wsTrainers, "Trainer Leaderboard");
    XLSX.utils.book_append_sheet(wb, wsStates, "State Performance");

    const fileName = `TrainerPlan_Performance_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleTabChange = (tab: TabMode) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tab);
      return next;
    });
  };

  const handleSelectTrainer = (uid: string) => {
    setSelectedTrainerId(uid);
    setActiveTab("trainer");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", "trainer");
      next.set("trainerId", uid);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <Skeleton className="h-32 w-full rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Hero Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-violet-800/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Field Operations & Impact
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
            Trainer Performance & Analytics
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Tracking {trainers.length} field trainers across UP, UK & Delhi • Aggregated across{" "}
            <strong>{filteredVisits.length} recorded visits</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
            {(
              [
                { id: "7d", label: "7 Days" },
                { id: "14d", label: "14 Days" },
                { id: "30d", label: "30 Days" },
                { id: "all", label: "All Time" },
              ] as const
            ).map((df) => (
              <button
                key={df.id}
                onClick={() => setDateFilter(df.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  dateFilter === df.id
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {df.label}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPerformance}
            icon={<Download className="w-4 h-4 text-violet-400" />}
            className="border-violet-700/50 hover:bg-violet-950 text-white"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <TabButton
          active={activeTab === "overall"}
          onClick={() => handleTabChange("overall")}
          icon={<BarChart3 className="w-4 h-4" />}
          label="Overall Analytics"
          badge={`${overall.completionRate}%`}
        />
        <TabButton
          active={activeTab === "statewise"}
          onClick={() => handleTabChange("statewise")}
          icon={<MapPin className="w-4 h-4" />}
          label="State-wise Breakdown"
          badge="UP • UK • Delhi"
        />
        <TabButton
          active={activeTab === "trainer"}
          onClick={() => handleTabChange("trainer")}
          icon={<Users className="w-4 h-4" />}
          label="Individual Trainer"
          badge={selectedTrainerObj?.name || "Drill-down"}
        />
        <TabButton
          active={activeTab === "leaderboard"}
          onClick={() => handleTabChange("leaderboard")}
          icon={<Trophy className="w-4 h-4 text-amber-500" />}
          label="Leaderboard & Rankings"
          badge="Top 10"
        />
      </div>

      {/* VIEW 1: OVERALL ANALYTICS */}
      {activeTab === "overall" && (
        <OverallView
          overall={overall}
          scorecards={scorecards}
          onSelectTrainer={handleSelectTrainer}
          onSwitchToState={() => handleTabChange("statewise")}
        />
      )}

      {/* VIEW 2: STATE-WISE BREAKDOWN */}
      {activeTab === "statewise" && (
        <StatewiseView
          stateAnalytics={stateAnalytics}
          scorecards={scorecards}
          onSelectTrainer={handleSelectTrainer}
        />
      )}

      {/* VIEW 3: INDIVIDUAL TRAINER DRILL-DOWN */}
      {activeTab === "trainer" && selectedTrainerAnalytics && (
        <TrainerDrilldownView
          trainers={trainers}
          selectedTrainer={selectedTrainerAnalytics}
          onSelectTrainer={(uid) => handleSelectTrainer(uid)}
        />
      )}

      {/* VIEW 4: LEADERBOARD & RANKINGS */}
      {activeTab === "leaderboard" && (
        <LeaderboardView
          scorecards={filteredScorecards}
          selectedState={selectedState}
          onSelectState={setSelectedState}
          searchQuery={trainerSearchQuery}
          onSearchChange={setTrainerSearchQuery}
          onSelectTrainer={handleSelectTrainer}
        />
      )}
    </div>
  );
};

// ==========================================
// SUB-VIEWS
// ==========================================

/**
 * TAB 1: OVERALL VIEW
 */
const OverallView: React.FC<{
  overall: OverallAnalytics;
  scorecards: TrainerAnalytics[];
  onSelectTrainer: (uid: string) => void;
  onSwitchToState: () => void;
}> = ({ overall, scorecards, onSelectTrainer, onSwitchToState }) => {
  const [chartMetric, setChartMetric] = useState<"visits" | "students">("visits");

  return (
    <div className="flex flex-col gap-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completion Rate */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Visit Completion Rate
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {overall.completionRate}%
            </span>
            <span className="text-xs text-slate-400">
              ({overall.submittedVisits} / {overall.submittedVisits + overall.missedVisits})
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overall.completionRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {overall.missedVisits} missed • {overall.plannedVisits} upcoming planned
          </p>
        </div>

        {/* Total Students Trained */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Students Impacted
            </span>
            <span className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">
              {overall.totalTrainedStudents.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">
              of {overall.totalTargetStudents.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-violet-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overall.targetAchievementRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {overall.targetAchievementRate}% target achievement rate
          </p>
        </div>

        {/* Schools Reached */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Schools Visited
            </span>
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {overall.totalSchoolsVisited}
            </span>
            <span className="text-xs text-slate-400">sessions</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: "85%" }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            ~{overall.avgSchoolsPerDay} schools covered per active day
          </p>
        </div>

        {/* Photo Compliance */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Photo Documentation
            </span>
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Camera className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {overall.totalPhotos}
            </span>
            <span className="text-xs text-slate-400">photos</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (overall.avgPhotosPerSchool / 3) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Avg {overall.avgPhotosPerSchool} photos / school • {overall.adobeGalleryRate}% Adobe verified
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical Timeline Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Daily Operations Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {chartMetric === "visits" ? "Visits submitted vs missed over time" : "Students trained vs target goals"}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setChartMetric("visits")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  chartMetric === "visits"
                    ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Visits Flow
              </button>
              <button
                onClick={() => setChartMetric("students")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  chartMetric === "students"
                    ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Student Reach
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartMetric === "visits" ? (
                <BarChart data={overall.dailyTrend}>
                  <XAxis dataKey="dateLabel" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
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
                  <Bar dataKey="submitted" name="Submitted" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="planned" name="Planned" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="missed" name="Missed" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={overall.dailyTrend}>
                  <defs>
                    <linearGradient id="colorTrained" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="trainedStudents"
                    name="Trained Students"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTrained)"
                  />
                  <Area
                    type="monotone"
                    dataKey="targetStudents"
                    name="Target Goal"
                    stroke="#38BDF8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#colorTarget)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit Status Share Donut */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Visit Status Distribution
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cumulative compliance breakdown
            </p>
          </div>

          <div className="h-52 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overall.statusShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {overall.statusShare.map((entry, index) => (
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

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            {overall.statusShare.map((item) => (
              <div key={item.name}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  {item.name}
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State Quick Matrix Banner */}
      <div className="rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-r from-violet-50/50 via-indigo-50/30 to-purple-50/50 dark:from-violet-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Regional Performance Summary
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              UP: {overall.stateComparison.find((s) => s.state === "UP")?.completionRate || 0}% •{" "}
              Delhi: {overall.stateComparison.find((s) => s.state === "Delhi")?.completionRate || 0}% •{" "}
              UK: {overall.stateComparison.find((s) => s.state === "UK")?.completionRate || 0}% completion
            </p>
          </div>
        </div>

        <button
          onClick={onSwitchToState}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-sm transition-all self-start md:self-auto"
        >
          <span>Explore State-wise Breakdown</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top 3 Performing Trainers Preview */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Top Performing Field Trainers</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ranked by composite performance score (visits, completion %, target students & photos)
            </p>
          </div>

          <button
            onClick={() => onSelectTrainer(scorecards[0]?.trainerId || "")}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 inline-flex items-center gap-1"
          >
            <span>View Full Leaderboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scorecards.slice(0, 3).map((sc, idx) => (
            <div
              key={sc.trainerId}
              onClick={() => onSelectTrainer(sc.trainerId)}
              className="group cursor-pointer rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 p-4 hover:border-violet-400 hover:bg-violet-50/20 dark:hover:border-violet-600 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                      idx === 0
                        ? "bg-amber-400 text-amber-950 shadow-sm shadow-amber-400/40"
                        : idx === 1
                        ? "bg-slate-300 text-slate-800"
                        : "bg-amber-700/80 text-amber-100"
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {sc.trainerName}
                    </h4>
                    <span className="text-[10px] text-slate-500">{sc.state} Region</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  Grade {sc.grade}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Completion</span>
                  <span className="text-xs font-bold text-emerald-600">{sc.completionRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Students</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {sc.trainedStudents}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Score</span>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                    {sc.score}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * TAB 2: STATE-WISE COMPARISON
 */
const StatewiseView: React.FC<{
  stateAnalytics: StateAnalytics[];
  scorecards: TrainerAnalytics[];
  onSelectTrainer: (uid: string) => void;
}> = ({ stateAnalytics, scorecards, onSelectTrainer }) => {
  const [activeStateTab, setActiveStateTab] = useState<string>("UP");

  const stateComparisonChartData = stateAnalytics.map((st) => ({
    state: st.state,
    Trained: st.trainedStudents,
    Target: st.targetStudents,
    Completion: st.completionRate,
  }));

  const currentState = stateAnalytics.find((s) => s.state === activeStateTab) || stateAnalytics[0];
  const trainersInState = scorecards.filter((sc) => sc.state === activeStateTab);

  return (
    <div className="flex flex-col gap-6">
      {/* State Cards Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stateAnalytics.map((st) => {
          const isSelected = activeStateTab === st.state;
          return (
            <div
              key={st.state}
              onClick={() => setActiveStateTab(st.state)}
              className={`cursor-pointer rounded-2xl border p-5 shadow-sm transition-all ${
                isSelected
                  ? "border-violet-500 bg-violet-50/30 dark:bg-violet-950/20 ring-2 ring-violet-500/20"
                  : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-violet-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center font-extrabold text-xs">
                    {st.state}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {st.state === "UP" ? "Uttar Pradesh" : st.state === "UK" ? "Uttarakhand" : "Delhi NCR"}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {st.activeTrainers} Active Trainers
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block">
                    {st.completionRate}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Completion</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Visits</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {st.submittedVisits}/{st.totalVisits}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Students</span>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                    {st.trainedStudents}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Missed</span>
                  <span className="text-xs font-bold text-rose-500">
                    {st.missedVisits}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold">
                {DEFAULT_SETTINGS.driveLinks?.[st.state] && (
                  <a
                    href={DEFAULT_SETTINGS.driveLinks[st.state]}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>📁 Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {DEFAULT_SETTINGS.stateLinks[st.state] && (

                  <a
                    href={DEFAULT_SETTINGS.stateLinks[st.state]}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-violet-600 hover:text-violet-700 flex items-center gap-1"
                  >
                    <span>🎨 Gallery</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>


      {/* Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Goals by State Bar Chart */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Target vs. Trained Students by State
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Comparison of target students reached per regional cluster
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateComparisonChartData}>
                <XAxis dataKey="state" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
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
                <Bar dataKey="Trained" name="Trained Students" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Target" name="Target Goal" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State Completion % Comparison */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            State Visit Completion Rates (%)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Proportion of successfully submitted visits per territory
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateComparisonChartData}>
                <XAxis dataKey="state" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, "Completion Rate"]}
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    borderColor: "#4338ca",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="Completion" name="Completion Rate (%)" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Selected State Trainer Roster & Performance Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentState.state} Field Trainers Roster & Performance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Breakdown of individual trainer metrics assigned to {currentState.state}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {trainersInState.length} Trainers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">Trainer</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Visits Submitted</th>
                <th className="p-3">Completion %</th>
                <th className="p-3">Students Reached</th>
                <th className="p-3">Target %</th>
                <th className="p-3">Photos</th>
                <th className="p-3 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {trainersInState.map((t) => (
                <tr key={t.trainerId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center text-xs">
                        {t.trainerName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {t.trainerName}
                        </span>
                        <span className="text-[10px] text-slate-400">{t.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {t.grade}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {t.submittedVisits} / {t.totalVisits}
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    {t.completionRate}%
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {t.trainedStudents}
                  </td>
                  <td className="p-3 font-semibold text-violet-600 dark:text-violet-400">
                    {t.achievementRate}%
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {t.totalPhotos} ({t.avgPhotosPerVisit} / visit)
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectTrainer(t.trainerId)}
                      className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900/60 text-violet-600 dark:text-violet-300 font-bold text-xs transition-colors"
                    >
                      View Deep-Dive
                    </button>
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

/**
 * TAB 3: INDIVIDUAL TRAINER DRILL-DOWN
 */
const TrainerDrilldownView: React.FC<{
  trainers: AppUser[];
  selectedTrainer: TrainerAnalytics;
  onSelectTrainer: (uid: string) => void;
}> = ({ trainers, selectedTrainer, onSelectTrainer }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Trainer Quick Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Select Trainer:
        </span>
        {trainers.map((t) => {
          const isSelected = t.uid === selectedTrainer.trainerId;
          return (
            <button
              key={t.uid}
              onClick={() => onSelectTrainer(t.uid)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-violet-300"
              }`}
            >
              <span>{t.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {t.state}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Trainer Profile Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
            {selectedTrainer.trainerName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {selectedTrainer.trainerName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {selectedTrainer.state} Region
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Active Trainer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedTrainer.email} • {selectedTrainer.phone}
            </p>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {DEFAULT_SETTINGS.driveLinks?.[selectedTrainer.state] && (
                <a
                  href={DEFAULT_SETTINGS.driveLinks[selectedTrainer.state]}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <span>📁 Drive Folder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {DEFAULT_SETTINGS.stateLinks[selectedTrainer.state] && (
                <a
                  href={DEFAULT_SETTINGS.stateLinks[selectedTrainer.state]}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold hover:bg-violet-100 transition-colors"
                >
                  <span>🎨 Gallery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <Link
                to={`/admin/calendar?trainerId=${selectedTrainer.trainerId}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
              >
                <span>📅 Trainer Calendar</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
              {trainers.find((t) => t.uid === selectedTrainer.trainerId)?.assignedSchools && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                  <span>🏫 {trainers.find((t) => t.uid === selectedTrainer.trainerId)?.assignedSchools?.length || 0} Assigned Schools</span>
                </span>
              )}
            </div>
          </div>
        </div>


        {/* Composite Score & Grade Badge */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Performance Score
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">
                {selectedTrainer.score}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/100</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex flex-col items-center justify-center font-extrabold shadow-md shadow-violet-500/30">
            <span className="text-[10px] uppercase font-bold text-violet-200">Grade</span>
            <span className="text-base leading-none">{selectedTrainer.grade}</span>
          </div>
        </div>
      </div>

      {/* Trainer Specific 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completion % */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Visit Completion
          </span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {selectedTrainer.completionRate}%
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${selectedTrainer.completionRate}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {selectedTrainer.submittedVisits} submitted • {selectedTrainer.missedVisits} missed
          </p>
        </div>

        {/* Students Trained vs Target */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Target Students Met
          </span>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-1">
            {selectedTrainer.trainedStudents}{" "}
            <span className="text-xs text-slate-400 font-normal">/ {selectedTrainer.targetStudents}</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-violet-500 h-full rounded-full"
              style={{ width: `${Math.min(100, selectedTrainer.achievementRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {selectedTrainer.achievementRate}% achievement rate
          </p>
        </div>

        {/* Total Schools */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Schools Covered
          </span>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {selectedTrainer.totalSchoolsVisited}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: "90%" }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            across {selectedTrainer.totalVisits} scheduled visit days
          </p>
        </div>

        {/* Photos Uploaded */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Photo Documentation
          </span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {selectedTrainer.totalPhotos}{" "}
            <span className="text-xs text-slate-400 font-normal">photos</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (selectedTrainer.avgPhotosPerVisit / 3) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Avg {selectedTrainer.avgPhotosPerVisit} photos / visit • {selectedTrainer.adobeGalleryRate}% Adobe done
          </p>
        </div>
      </div>

      {/* Trainer Daily Timeline Chart */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          {selectedTrainer.trainerName} - Daily Students Trained vs. Target
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Tracking daily attendance counts against expected school targets
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={selectedTrainer.dailyTrend}>
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
              <Bar dataKey="targetStudents" name="Target Target" fill="#94A3B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* School-by-School Visit Log Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              School Visit Log & Target Achievement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Itemized history of all schools visited with variance and verification status
            </p>
          </div>

          <Link
            to={`/admin/visits?trainerId=${selectedTrainer.trainerId}`}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 inline-flex items-center gap-1"
          >
            <span>Inspect In Visits Manager</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
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
                <th className="p-3">Variance</th>
                <th className="p-3">Photos</th>
                <th className="p-3 rounded-r-xl">Adobe Done</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {selectedTrainer.schoolLogs.map((log, idx) => (
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
                  <td className="p-3">
                    {log.status === "SUBMITTED" ? (
                      log.variance >= 0 ? (
                        <span className="text-emerald-600 font-bold">+{log.variance}</span>
                      ) : (
                        <span className="text-rose-500 font-bold">{log.variance}</span>
                      )
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {log.photosCount} photos
                  </td>
                  <td className="p-3">
                    {log.adobeGalleryDone ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">-</span>
                    )}
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

/**
 * TAB 4: LEADERBOARD & RANKINGS
 */
const LeaderboardView: React.FC<{
  scorecards: TrainerAnalytics[];
  selectedState: string;
  onSelectState: (st: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTrainer: (uid: string) => void;
}> = ({
  scorecards,
  selectedState,
  onSelectState,
  searchQuery,
  onSearchChange,
  onSelectTrainer,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trainer name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* State Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {["ALL", "UP", "UK", "Delhi"].map((st) => (
            <button
              key={st}
              onClick={() => onSelectState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedState === st
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {st === "ALL" ? "All States" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      {selectedState === "ALL" && !searchQuery && scorecards.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* #2 Silver */}
          <div
            onClick={() => onSelectTrainer(scorecards[1].trainerId)}
            className="cursor-pointer rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col items-center text-center hover:border-violet-400 transition-all md:order-1"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center font-extrabold text-lg shadow-inner">
              #2
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
              {scorecards[1].trainerName}
            </h4>
            <span className="text-xs text-slate-400">{scorecards[1].state} Region</span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-bold text-emerald-600">{scorecards[1].completionRate}% completion</span>
              <span>•</span>
              <span className="text-xs font-bold text-violet-600">{scorecards[1].trainedStudents} students</span>
            </div>
          </div>

          {/* #1 Gold */}
          <div
            onClick={() => onSelectTrainer(scorecards[0].trainerId)}
            className="cursor-pointer rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-slate-900 p-6 shadow-md flex flex-col items-center text-center hover:scale-[1.02] transition-all md:order-2"
          >
            <div className="w-14 h-14 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-amber-400/30">
              <Trophy className="w-7 h-7" />
            </div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400 mt-2">
              Rank #1 Overall Champion
            </span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              {scorecards[0].trainerName}
            </h4>
            <span className="text-xs text-slate-400">{scorecards[0].state} Region</span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-bold text-emerald-600">{scorecards[0].completionRate}% completion</span>
              <span>•</span>
              <span className="text-xs font-bold text-violet-600">{scorecards[0].trainedStudents} students</span>
            </div>
          </div>

          {/* #3 Bronze */}
          <div
            onClick={() => onSelectTrainer(scorecards[2].trainerId)}
            className="cursor-pointer rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col items-center text-center hover:border-violet-400 transition-all md:order-3"
          >
            <div className="w-12 h-12 rounded-full bg-amber-800/80 text-amber-100 flex items-center justify-center font-extrabold text-lg shadow-inner">
              #3
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
              {scorecards[2].trainerName}
            </h4>
            <span className="text-xs text-slate-400">{scorecards[2].state} Region</span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-bold text-emerald-600">{scorecards[2].completionRate}% completion</span>
              <span>•</span>
              <span className="text-xs font-bold text-violet-600">{scorecards[2].trainedStudents} students</span>
            </div>
          </div>
        </div>
      )}

      {/* Complete Leaderboard Ranking Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          All Field Trainers Leaderboard Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">Rank</th>
                <th className="p-3">Trainer Name</th>
                <th className="p-3">State</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Score</th>
                <th className="p-3">Visits (Sub / Miss)</th>
                <th className="p-3">Completion %</th>
                <th className="p-3">Trained / Target</th>
                <th className="p-3">Photos</th>
                <th className="p-3 rounded-r-xl text-right">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {scorecards.map((sc, idx) => (
                <tr
                  key={sc.trainerId}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3 font-extrabold text-slate-700 dark:text-slate-300">
                    <span
                      className={`inline-block w-6 h-6 rounded-md text-center leading-6 text-xs ${
                        idx === 0
                          ? "bg-amber-400 text-amber-950 font-black"
                          : idx === 1
                          ? "bg-slate-300 text-slate-900 font-black"
                          : idx === 2
                          ? "bg-amber-700 text-amber-100 font-black"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {sc.trainerName}
                    </span>
                    <span className="text-[10px] text-slate-400">{sc.email}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {sc.state}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {sc.grade}
                    </span>
                  </td>
                  <td className="p-3 font-extrabold text-violet-600 dark:text-violet-400">
                    {sc.score}/100
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-emerald-600">{sc.submittedVisits}</span> /{" "}
                    <span className="text-rose-500">{sc.missedVisits}</span>
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    {sc.completionRate}%
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">
                    <span className="font-bold">{sc.trainedStudents}</span> / {sc.targetStudents}{" "}
                    <span className="text-[10px] text-slate-400 font-normal">({sc.achievementRate}%)</span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {sc.totalPhotos} ({sc.avgPhotosPerVisit}/v)
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectTrainer(sc.trainerId)}
                      className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900/60 text-violet-600 dark:text-violet-300 font-bold text-xs transition-colors"
                    >
                      Inspect
                    </button>
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

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}> = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
      active
        ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge && (
      <span
        className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
          active
            ? "bg-white/20 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        }`}
      >
        {badge}
      </span>
    )}
  </button>
);
