import { AppUser, Visit } from "../types";

export interface OverallAnalytics {
  totalVisits: number;
  submittedVisits: number;
  missedVisits: number;
  plannedVisits: number;
  completionRate: number; // percentage (submitted / (submitted + missed)) or (submitted / total)
  targetAchievementRate: number; // percentage (trainedStudents / targetStudents)
  totalTargetStudents: number;
  totalTrainedStudents: number;
  totalSchoolsVisited: number;
  totalPhotos: number;
  avgPhotosPerSchool: number;
  avgSchoolsPerDay: number;
  adobeGalleryRate: number;
  statusShare: { name: string; value: number; color: string }[];
  dailyTrend: {
    date: string;
    dateLabel: string;
    submitted: number;
    missed: number;
    planned: number;
    trainedStudents: number;
    targetStudents: number;
    completionRate: number;
  }[];
  stateComparison: StateAnalytics[];
}

export interface StateAnalytics {
  state: string;
  activeTrainers: number;
  totalVisits: number;
  submittedVisits: number;
  missedVisits: number;
  plannedVisits: number;
  completionRate: number;
  targetStudents: number;
  trainedStudents: number;
  achievementRate: number;
  totalSchools: number;
  totalPhotos: number;
  avgPhotosPerVisit: number;
}

export interface TrainerSchoolLog {
  date: string;
  schoolId: string;
  schoolName: string;
  targetStudents: number;
  trainedStudents: number;
  variance: number; // trainedStudents - targetStudents
  photosCount: number;
  status: "SUBMITTED" | "PLANNED" | "MISSED";
  adobeGalleryDone: boolean;
  visitId: string;
}

export interface TrainerAnalytics {
  trainerId: string;
  trainerName: string;
  state: string;
  email: string;
  phone: string;
  status: string;
  totalVisits: number;
  submittedVisits: number;
  missedVisits: number;
  plannedVisits: number;
  completionRate: number;
  totalSchoolsVisited: number;
  targetStudents: number;
  trainedStudents: number;
  achievementRate: number;
  totalPhotos: number;
  avgPhotosPerVisit: number;
  adobeGalleryRate: number;
  grade: "A+" | "A" | "B" | "C";
  score: number; // composite score out of 100
  schoolLogs: TrainerSchoolLog[];
  dailyTrend: {
    date: string;
    dateLabel: string;
    status: string;
    targetStudents: number;
    trainedStudents: number;
    schoolsCount: number;
    photosCount: number;
  }[];
}

/**
 * Computes performance analytics for a single trainer.
 */
export function computeTrainerAnalytics(visits: Visit[], trainer: AppUser): TrainerAnalytics {
  const trainerVisits = visits
    .filter((v) => v.trainerId === trainer.uid)
    .sort((a, b) => b.dateKey - a.dateKey);

  const totalVisits = trainerVisits.length;
  const submittedVisits = trainerVisits.filter((v) => v.status === "SUBMITTED").length;
  const missedVisits = trainerVisits.filter((v) => v.status === "MISSED").length;
  const plannedVisits = trainerVisits.filter((v) => v.status === "PLANNED").length;

  // Completion rate: evaluated on closed/actioned visits (submitted + missed), fallback to total if 0
  const evaluatedVisits = submittedVisits + missedVisits;
  const completionRate = evaluatedVisits > 0
    ? Math.round((submittedVisits / evaluatedVisits) * 100)
    : totalVisits > 0 ? Math.round((submittedVisits / totalVisits) * 100) : 0;

  let targetStudents = 0;
  let trainedStudents = 0;
  let totalSchoolsVisited = 0;
  let totalPhotos = 0;
  let adobeDoneCount = 0;
  const schoolLogs: TrainerSchoolLog[] = [];

  trainerVisits.forEach((v) => {
    totalPhotos += v.photoCount || 0;
    if (v.adobeGalleryDone) adobeDoneCount += 1;

    (v.schools || []).forEach((s) => {
      totalSchoolsVisited += 1;
      const target = s.targetStudents || 0;
      const trained = s.trainedStudents || 0;
      targetStudents += target;
      trainedStudents += trained;

      const photosCount = (v.photos && v.photos[s.id]?.length) || 0;
      schoolLogs.push({
        date: v.date,
        schoolId: s.id,
        schoolName: s.name,
        targetStudents: target,
        trainedStudents: trained,
        variance: trained - target,
        photosCount,
        status: v.status,
        adobeGalleryDone: !!v.adobeGalleryDone,
        visitId: v.id,
      });
    });
  });

  const achievementRate = targetStudents > 0
    ? Math.round((trainedStudents / targetStudents) * 100)
    : 0;

  const avgPhotosPerVisit = totalVisits > 0
    ? Number((totalPhotos / totalVisits).toFixed(1))
    : 0;

  const adobeGalleryRate = totalVisits > 0
    ? Math.round((adobeDoneCount / totalVisits) * 100)
    : 0;

  // Composite performance score (out of 100):
  // 50% Completion Rate + 35% Student Target Achievement + 15% Photo Compliance (scaled to 100)
  const photoScore = Math.min(100, (avgPhotosPerVisit / 3) * 100);
  const score = Math.round(
    completionRate * 0.5 + achievementRate * 0.35 + photoScore * 0.15
  );

  let grade: "A+" | "A" | "B" | "C" = "C";
  if (score >= 90) grade = "A+";
  else if (score >= 80) grade = "A";
  else if (score >= 65) grade = "B";

  // Daily trend (chronological)
  const chronological = [...trainerVisits].sort((a, b) => a.dateKey - b.dateKey);
  const dailyTrend = chronological.map((v) => {
    let t = 0;
    let tr = 0;
    (v.schools || []).forEach((s) => {
      t += s.targetStudents || 0;
      tr += s.trainedStudents || 0;
    });
    return {
      date: v.date,
      dateLabel: v.date.slice(5), // "MM-DD"
      status: v.status,
      targetStudents: t,
      trainedStudents: tr,
      schoolsCount: v.schools?.length || 0,
      photosCount: v.photoCount || 0,
    };
  });

  return {
    trainerId: trainer.uid,
    trainerName: trainer.name || "Unknown Trainer",
    state: trainer.state || "UP",
    email: trainer.email,
    phone: trainer.phone,
    status: trainer.status,
    totalVisits,
    submittedVisits,
    missedVisits,
    plannedVisits,
    completionRate,
    totalSchoolsVisited,
    targetStudents,
    trainedStudents,
    achievementRate,
    totalPhotos,
    avgPhotosPerVisit,
    adobeGalleryRate,
    grade,
    score,
    schoolLogs,
    dailyTrend,
  };
}

/**
 * Computes state-wise comparative performance analytics.
 */
export function computeStateAnalytics(visits: Visit[], trainers: AppUser[]): StateAnalytics[] {
  const states = ["UP", "UK", "Delhi"];
  // Include any extra states present in visits or trainers
  const extraStates = new Set<string>();
  trainers.forEach((t) => t.state && extraStates.add(t.state));
  visits.forEach((v) => v.state && extraStates.add(v.state));
  const allStates = Array.from(new Set([...states, ...extraStates]));

  return allStates.map((st) => {
    const stateTrainers = trainers.filter((t) => t.state === st);
    const stateVisits = visits.filter((v) => v.state === st);

    const totalVisits = stateVisits.length;
    const submittedVisits = stateVisits.filter((v) => v.status === "SUBMITTED").length;
    const missedVisits = stateVisits.filter((v) => v.status === "MISSED").length;
    const plannedVisits = stateVisits.filter((v) => v.status === "PLANNED").length;

    const evaluated = submittedVisits + missedVisits;
    const completionRate = evaluated > 0
      ? Math.round((submittedVisits / evaluated) * 100)
      : totalVisits > 0 ? Math.round((submittedVisits / totalVisits) * 100) : 0;

    let targetStudents = 0;
    let trainedStudents = 0;
    let totalSchools = 0;
    let totalPhotos = 0;

    stateVisits.forEach((v) => {
      totalPhotos += v.photoCount || 0;
      (v.schools || []).forEach((s) => {
        totalSchools += 1;
        targetStudents += s.targetStudents || 0;
        trainedStudents += s.trainedStudents || 0;
      });
    });

    const achievementRate = targetStudents > 0
      ? Math.round((trainedStudents / targetStudents) * 100)
      : 0;

    const avgPhotosPerVisit = totalVisits > 0
      ? Number((totalPhotos / totalVisits).toFixed(1))
      : 0;

    return {
      state: st,
      activeTrainers: stateTrainers.filter((t) => t.status === "Approved").length,
      totalVisits,
      submittedVisits,
      missedVisits,
      plannedVisits,
      completionRate,
      targetStudents,
      trainedStudents,
      achievementRate,
      totalSchools,
      totalPhotos,
      avgPhotosPerVisit,
    };
  });
}

/**
 * Computes overarching aggregate analytics across all trainers and states.
 */
export function computeOverallAnalytics(visits: Visit[], trainers: AppUser[]): OverallAnalytics {
  const totalVisits = visits.length;
  const submittedVisits = visits.filter((v) => v.status === "SUBMITTED").length;
  const missedVisits = visits.filter((v) => v.status === "MISSED").length;
  const plannedVisits = visits.filter((v) => v.status === "PLANNED").length;

  const evaluated = submittedVisits + missedVisits;
  const completionRate = evaluated > 0
    ? Math.round((submittedVisits / evaluated) * 100)
    : totalVisits > 0 ? Math.round((submittedVisits / totalVisits) * 100) : 0;

  let totalTargetStudents = 0;
  let totalTrainedStudents = 0;
  let totalSchoolsVisited = 0;
  let totalPhotos = 0;
  let adobeDoneCount = 0;

  // Date aggregation for daily trend
  const dateMap: Record<
    string,
    {
      date: string;
      dateKey: number;
      submitted: number;
      missed: number;
      planned: number;
      targetStudents: number;
      trainedStudents: number;
    }
  > = {};

  visits.forEach((v) => {
    totalPhotos += v.photoCount || 0;
    if (v.adobeGalleryDone) adobeDoneCount += 1;

    let vTarget = 0;
    let vTrained = 0;
    (v.schools || []).forEach((s) => {
      totalSchoolsVisited += 1;
      const t = s.targetStudents || 0;
      const tr = s.trainedStudents || 0;
      totalTargetStudents += t;
      totalTrainedStudents += tr;
      vTarget += t;
      vTrained += tr;
    });

    if (!dateMap[v.date]) {
      dateMap[v.date] = {
        date: v.date,
        dateKey: v.dateKey || Number(v.date.replace(/-/g, "")),
        submitted: 0,
        missed: 0,
        planned: 0,
        targetStudents: 0,
        trainedStudents: 0,
      };
    }

    if (v.status === "SUBMITTED") dateMap[v.date].submitted += 1;
    else if (v.status === "MISSED") dateMap[v.date].missed += 1;
    else if (v.status === "PLANNED") dateMap[v.date].planned += 1;

    dateMap[v.date].targetStudents += vTarget;
    dateMap[v.date].trainedStudents += vTrained;
  });

  const targetAchievementRate = totalTargetStudents > 0
    ? Math.round((totalTrainedStudents / totalTargetStudents) * 100)
    : 0;

  const avgPhotosPerSchool = totalSchoolsVisited > 0
    ? Number((totalPhotos / totalSchoolsVisited).toFixed(1))
    : 0;

  const uniqueDatesCount = Object.keys(dateMap).length || 1;
  const avgSchoolsPerDay = Number((totalSchoolsVisited / uniqueDatesCount).toFixed(1));

  const adobeGalleryRate = totalVisits > 0
    ? Math.round((adobeDoneCount / totalVisits) * 100)
    : 0;

  // Sort daily trend chronologically
  const dailyTrend = Object.values(dateMap)
    .sort((a, b) => a.dateKey - b.dateKey)
    .map((item) => {
      const dayEval = item.submitted + item.missed;
      const dayRate = dayEval > 0 ? Math.round((item.submitted / dayEval) * 100) : 0;
      return {
        date: item.date,
        dateLabel: item.date.slice(5),
        submitted: item.submitted,
        missed: item.missed,
        planned: item.planned,
        targetStudents: item.targetStudents,
        trainedStudents: item.trainedStudents,
        completionRate: dayRate,
      };
    });

  const statusShare = [
    { name: "Submitted", value: submittedVisits, color: "#10B981" },
    { name: "Planned", value: plannedVisits, color: "#8B5CF6" },
    { name: "Missed", value: missedVisits, color: "#F43F5E" },
  ];

  const stateComparison = computeStateAnalytics(visits, trainers);

  return {
    totalVisits,
    submittedVisits,
    missedVisits,
    plannedVisits,
    completionRate,
    targetAchievementRate,
    totalTargetStudents,
    totalTrainedStudents,
    totalSchoolsVisited,
    totalPhotos,
    avgPhotosPerSchool,
    avgSchoolsPerDay,
    adobeGalleryRate,
    statusShare,
    dailyTrend,
    stateComparison,
  };
}

/**
 * Computes leaderboards and scorecards for all trainers.
 */
export function computeAllTrainerScorecards(visits: Visit[], trainers: AppUser[]): TrainerAnalytics[] {
  const onlyTrainers = trainers.filter((t) => t.role === "trainer");
  const scorecards = onlyTrainers.map((t) => computeTrainerAnalytics(visits, t));
  // Sort descending by score, then completion rate, then trained students
  return scorecards.sort((a, b) => b.score - a.score || b.completionRate - a.completionRate || b.trainedStudents - a.trainedStudents);
}
