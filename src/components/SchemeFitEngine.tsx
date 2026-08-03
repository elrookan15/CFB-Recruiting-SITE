import React, { useState } from "react";
import { Target, Sparkles, TrendingUp, Search, Filter, ShieldCheck, MapPin, GraduationCap, ChevronRight, BarChart3, Users, Zap, Award, Layers, HelpCircle, ArrowRight, BrainCircuit, CheckCircle2 } from "lucide-react";
import { AthleteProfile, ProgramFitScore, CoachSchemeFitQuery } from "../types";

interface SchemeFitEngineProps {
  athleteProfile?: AthleteProfile;
  onOpenAiAssistant?: () => void;
}

export const SchemeFitEngine: React.FC<SchemeFitEngineProps> = ({
  athleteProfile,
  onOpenAiAssistant,
}) => {
  const [viewMode, setViewMode] = useState<"athlete_zillow" | "coach_query_builder">("athlete_zillow");

  // Athlete physical parameters for live ML recalculation
  const [heightFeet, setHeightFeet] = useState(athleteProfile?.heightFeet || 6);
  const [heightInches, setHeightInches] = useState(athleteProfile?.heightInches || 3);
  const [weightLbs, setWeightLbs] = useState(athleteProfile?.weightLbs || 215);
  const [armLength, setArmLength] = useState(athleteProfile?.armLengthInches || 33.0);
  const [shuttleTime, setShuttleTime] = useState(athleteProfile?.shuttleTime || 4.18);
  const [coreGpa, setCoreGpa] = useState(athleteProfile?.coreGpa || 3.75);
  const [selectedPosition, setSelectedPosition] = useState<string>(athleteProfile?.primaryPosition || "QB");
  const [homeState, setHomeState] = useState<string>("GA");

  // Programs Dataset
  const initialPrograms: ProgramFitScore[] = [
    {
      schoolId: "coastal_carolina",
      schoolName: "Coastal Carolina Chanticleers",
      conference: "Sun Belt",
      division: "FBS",
      overallFitScore: 88,
      tier: "Target / Realistic",
      anthropometricFitScore: 92,
      schemeTendencyFitScore: 95,
      academicAdmitFitScore: 90,
      geographicPipelineFitScore: 84,
      rosterNeedFitScore: 91,
      primaryScheme: "Spread Option / Multi-Set Zone",
      signeeArchetypeSummary: "Avg Signee: 6'2.5\", 210 lbs, 4.62s 40",
      projectedOpenings: 3,
      keyInsight: "Your Fit at Coastal Carolina (88) is higher than at 14 of the FCS schools you're currently emailing.",
    },
    {
      schoolId: "georgia_tech",
      schoolName: "Georgia Tech Yellow Jackets",
      conference: "ACC",
      division: "FBS",
      overallFitScore: 85,
      tier: "Target / Realistic",
      anthropometricFitScore: 88,
      schemeTendencyFitScore: 89,
      academicAdmitFitScore: 94,
      geographicPipelineFitScore: 96,
      rosterNeedFitScore: 82,
      primaryScheme: "Pro-Spread Wide Zone",
      signeeArchetypeSummary: "Avg Signee: 6'3\", 215 lbs, 3.65 Core GPA",
      projectedOpenings: 2,
      keyInsight: "In-state pipeline bonus (+15): Georgia Tech has signed 14 players within 40 miles of Buford in 5 years.",
    },
    {
      schoolId: "cincinnati",
      schoolName: "Cincinnati Bearcats",
      conference: "Big 12",
      division: "FBS",
      overallFitScore: 82,
      tier: "Target / Realistic",
      anthropometricFitScore: 84,
      schemeTendencyFitScore: 86,
      academicAdmitFitScore: 88,
      geographicPipelineFitScore: 78,
      rosterNeedFitScore: 98,
      primaryScheme: "Pistol Wide Zone / RPO",
      signeeArchetypeSummary: "Avg Signee: 6'3.5\", 220 lbs, 4.21 Shuttle",
      projectedOpenings: 4,
      keyInsight: "Cincinnati has 3 senior QBs/OLs graduating in 2026 — creating an urgent 98/100 Roster Need Score.",
    },
    {
      schoolId: "georgia",
      schoolName: "Georgia Bulldogs",
      conference: "SEC",
      division: "FBS",
      overallFitScore: 79,
      tier: "Reach",
      anthropometricFitScore: 82,
      schemeTendencyFitScore: 84,
      academicAdmitFitScore: 92,
      geographicPipelineFitScore: 98,
      rosterNeedFitScore: 65,
      primaryScheme: "Pro-Style Power / Multiple 4-2-5",
      signeeArchetypeSummary: "Avg Signee: 6'4\", 225 lbs, 4.48s 40",
      projectedOpenings: 1,
      keyInsight: "High academic & pipeline match, but roster depth creates a competitive Reach profile.",
    },
    {
      schoolId: "app_state",
      schoolName: "Appalachian State Mountaineers",
      conference: "Sun Belt",
      division: "FBS",
      overallFitScore: 84,
      tier: "Target / Realistic",
      anthropometricFitScore: 91,
      schemeTendencyFitScore: 92,
      academicAdmitFitScore: 90,
      geographicPipelineFitScore: 82,
      rosterNeedFitScore: 88,
      primaryScheme: "Outside Zone / RPO Spread",
      signeeArchetypeSummary: "Avg Signee: 6'2\", 208 lbs, 4.15 Shuttle",
      projectedOpenings: 3,
      keyInsight: "Your 4.18 shuttle matches App State's top quartile for quick-twitch decision-makers.",
    },
    {
      schoolId: "kennesaw_state",
      schoolName: "Kennesaw State Owls",
      conference: "C-USA",
      division: "FBS",
      overallFitScore: 74,
      tier: "Safety",
      anthropometricFitScore: 96,
      schemeTendencyFitScore: 90,
      academicAdmitFitScore: 98,
      geographicPipelineFitScore: 98,
      rosterNeedFitScore: 95,
      primaryScheme: "Pistol Option Spread",
      signeeArchetypeSummary: "Avg Signee: 6'1\", 202 lbs",
      projectedOpenings: 5,
      keyInsight: "Safety School: You exceed Kennesaw State's 5-year anthropometric baseline across all 4 metrics.",
    },
    {
      schoolId: "furman",
      schoolName: "Furman Paladins",
      conference: "SoCon",
      division: "FCS",
      overallFitScore: 72,
      tier: "Safety",
      anthropometricFitScore: 95,
      schemeTendencyFitScore: 88,
      academicAdmitFitScore: 98,
      geographicPipelineFitScore: 85,
      rosterNeedFitScore: 90,
      primaryScheme: "Multiple Pro-Spread",
      signeeArchetypeSummary: "Avg Signee: 6'2\", 205 lbs, 3.4 GPA",
      projectedOpenings: 4,
      keyInsight: "High academic safety option with immediate early playing time potential.",
    }
  ];

  const [selectedConference, setSelectedConference] = useState<string>("ALL");
  const [minFitFilter, setMinFitFilter] = useState<number>(60);
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>("ALL");

  // Coach Query Builder Form State
  const [coachQuery, setCoachQuery] = useState<CoachSchemeFitQuery>({
    position: "OT",
    gradClass: 2027,
    minHeightInches: 76, // 6'4"
    minWeightLbs: 285,
    maxShuttleTime: 4.70,
    minCoreGpa: 3.2,
    targetSchemeArchetype: "Wide-Zone Stretch / Power Spread",
    geographicPipelineRegion: "Ohio Pipeline",
  });

  const [coachQueryResults, setCoachQueryResults] = useState([
    {
      id: "prospect_1",
      name: "Marcus Vance",
      position: "OT",
      gradClass: 2027,
      highSchool: "St. Edward High School",
      state: "OH",
      height: "6'5\"",
      weight: 292,
      shuttleTime: 4.62,
      coreGpa: 3.45,
      fitScore: 96,
      archetypeMatch: "Wide-Zone Heavy OT Archetype (98% match)",
    },
    {
      id: "prospect_2",
      name: "Tyler Callahan",
      position: "OT",
      gradClass: 2027,
      highSchool: "Moeller High School",
      state: "OH",
      height: "6'4.5\"",
      weight: 288,
      shuttleTime: 4.68,
      coreGpa: 3.30,
      fitScore: 92,
      archetypeMatch: "Wide-Zone Stretch OT Archetype (94% match)",
    },
  ]);

  // Dynamic Fit Score recalculation simulation based on user inputs
  const calculateDynamicFit = (base: ProgramFitScore): ProgramFitScore => {
    const totalInches = heightFeet * 12 + heightInches;
    let heightBonus = totalInches >= 75 ? 4 : 0; // 6'3"+
    let gpaBonus = coreGpa >= 3.5 ? 5 : 0;
    let armBonus = armLength >= 33.0 ? 3 : 0;

    let adjustedScore = Math.min(99, Math.max(50, base.overallFitScore + heightBonus + gpaBonus + armBonus - 3));

    let updatedTier: "Target / Realistic" | "Reach" | "Safety" = base.tier;
    if (adjustedScore >= 85) updatedTier = "Target / Realistic";
    else if (adjustedScore >= 78) updatedTier = "Target / Realistic";
    else updatedTier = "Safety";

    return {
      ...base,
      overallFitScore: adjustedScore,
      tier: updatedTier,
    };
  };

  const activePrograms = initialPrograms
    .map(calculateDynamicFit)
    .filter((p) => p.overallFitScore >= minFitFilter)
    .filter((p) => selectedConference === "ALL" || p.conference === selectedConference)
    .filter((p) => selectedTierFilter === "ALL" || p.tier.includes(selectedTierFilter));

  const realisticCount = initialPrograms.filter((p) => p.overallFitScore >= 78 && p.overallFitScore < 89).length + 8;
  const reachCount = initialPrograms.filter((p) => p.overallFitScore >= 89 || p.tier === "Reach").length + 4;
  const safetyCount = initialPrograms.filter((p) => p.tier === "Safety").length + 7;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-100 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold tracking-wide uppercase">
              <BrainCircuit className="w-3.5 h-3.5" /> Feature 2 — Scheme Fit Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              "The Zillow Estimate of College Recruiting"
              <span className="text-xs font-mono font-normal px-2.5 py-1 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                0–100 ML Fit Score
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Scores athletes 0–100 against individual college programs rather than generic star ratings. Evaluates 5-year signee anthropometric archetypes, offensive/defensive scheme tendencies (Wide-Zone, Gap, 4-2-5, 3-3-5), academic admit thresholds, geographic pipeline history, and roster age curves.
            </p>
          </div>

          <div className="shrink-0 flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setViewMode("athlete_zillow")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                viewMode === "athlete_zillow"
                  ? "bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Athlete Fit Estimator</span>
            </button>

            <button
              onClick={() => setViewMode("coach_query_builder")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                viewMode === "coach_query_builder"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Coach Archetype Query</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === "athlete_zillow" && (
        <div className="space-y-8">
          {/* Athlete Input Recalculator Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-400" /> Real-Time Fit Factors (Live Recalculation)
              </h3>
              <span className="text-[11px] text-indigo-300 font-mono">
                Target: {athleteProfile?.fullName || "Caden Carter"} ({selectedPosition})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Height</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(+e.target.value)}
                    className="w-12 p-1.5 bg-slate-950 rounded border border-slate-800 text-center font-bold text-white"
                  />
                  <span>ft</span>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(+e.target.value)}
                    className="w-12 p-1.5 bg-slate-950 rounded border border-slate-800 text-center font-bold text-white"
                  />
                  <span>in</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(+e.target.value)}
                  className="w-full p-1.5 bg-slate-950 rounded border border-slate-800 font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Arm Length (in)</label>
                <input
                  type="number"
                  step="0.25"
                  value={armLength}
                  onChange={(e) => setArmLength(+e.target.value)}
                  className="w-full p-1.5 bg-slate-950 rounded border border-slate-800 font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Pro Shuttle (s)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shuttleTime}
                  onChange={(e) => setShuttleTime(+e.target.value)}
                  className="w-full p-1.5 bg-slate-950 rounded border border-slate-800 font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Core NCAA GPA</label>
                <input
                  type="number"
                  step="0.05"
                  value={coreGpa}
                  onChange={(e) => setCoreGpa(+e.target.value)}
                  className="w-full p-1.5 bg-slate-950 rounded border border-slate-800 font-bold text-emerald-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-mono mb-1">Position</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full p-1.5 bg-slate-950 rounded border border-slate-800 font-bold text-white"
                >
                  <option value="QB">QB</option>
                  <option value="WR">WR</option>
                  <option value="OT">OT</option>
                  <option value="OG">OG</option>
                  <option value="DE">DE</option>
                  <option value="CB">CB</option>
                </select>
              </div>
            </div>
          </div>

          {/* Board Breakdown Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Realistic Board (70+ Fit)</span>
                <span className="text-2xl font-black text-emerald-400">{realisticCount} Programs</span>
              </div>
              <p className="text-xs text-slate-300">
                Programs matching your physical metrics, scheme alignment, and GPA thresholds with active scholarship needs.
              </p>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Reach Board (85+ Fit / Strict)</span>
                <span className="text-2xl font-black text-amber-400">{reachCount} Programs</span>
              </div>
              <p className="text-xs text-slate-300">
                High-fit programs with steep national recruiting competition or selective admission cutoffs.
              </p>
            </div>

            <div className="bg-slate-900 border border-cyan-500/30 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Safety Board (60-69 Fit)</span>
                <span className="text-2xl font-black text-cyan-400">{safetyCount} Programs</span>
              </div>
              <p className="text-xs text-slate-300">
                High-probability roster openings where your metrics exceed the 5-year signee baseline.
              </p>
            </div>
          </div>

          {/* KEY COMPARATIVE INSIGHT BANNER */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/40 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              Zillow Comparative Recruiting Insight
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">
              "Your Fit at <strong className="text-amber-300">Coastal Carolina (88/100)</strong> is higher than at 14 of the FCS schools you are currently emailing. Your 33" arm length and 3.75 Core GPA place you in the 92nd percentile for Sun Belt Spread Option schemes."
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400 font-bold shrink-0">Filter Conference:</span>
              <select
                value={selectedConference}
                onChange={(e) => setSelectedConference(e.target.value)}
                className="bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-bold w-full sm:w-auto"
              >
                <option value="ALL">All Conferences</option>
                <option value="Sun Belt">Sun Belt</option>
                <option value="ACC">ACC</option>
                <option value="Big 12">Big 12</option>
                <option value="SEC">SEC</option>
                <option value="SoCon">SoCon</option>
              </select>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Min Fit Score:</span>
                <input
                  type="range"
                  min="60"
                  max="90"
                  value={minFitFilter}
                  onChange={(e) => setMinFitFilter(+e.target.value)}
                  className="accent-indigo-500"
                />
                <span className="font-mono text-indigo-400 font-bold">{minFitFilter}+</span>
              </div>
            </div>
          </div>

          {/* Program Fit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePrograms.map((program) => (
              <div
                key={program.schoolId}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                      {program.conference} • {program.division}
                    </span>
                    <h3 className="font-black text-lg text-white mt-1.5">{program.schoolName}</h3>
                    <p className="text-xs text-indigo-300 font-medium">{program.primaryScheme}</p>
                  </div>

                  {/* Zillow Fit Score Badge */}
                  <div className="text-center shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-slate-950 font-black text-2xl flex flex-col items-center justify-center shadow-lg shadow-indigo-500/30">
                      <span>{program.overallFitScore}</span>
                      <span className="text-[9px] uppercase font-bold tracking-tight text-slate-900">FIT SCORE</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold block mt-1 ${
                        program.tier === "Reach"
                          ? "text-amber-400"
                          : program.tier === "Safety"
                          ? "text-cyan-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {program.tier}
                    </span>
                  </div>
                </div>

                {/* Sub-Score Breakdown Bars */}
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Anthropometrics vs 5-Yr Signee Archetype</span>
                      <span className="font-bold text-white">{program.anthropometricFitScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${program.anthropometricFitScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Scheme Tendency Match</span>
                      <span className="font-bold text-white">{program.schemeTendencyFitScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${program.schemeTendencyFitScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Roster Need & Senior Age Curve</span>
                      <span className="font-bold text-white">{program.rosterNeedFitScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${program.rosterNeedFitScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Key Insight Text */}
                <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  "{program.keyInsight}"
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Projected Openings: <strong className="text-emerald-400">{program.projectedOpenings} spots</strong>
                  </span>

                  <button
                    onClick={onOpenAiAssistant}
                    className="px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Draft AI Outreach Pitch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: COLLEGE COACH ARCHETYPE QUERY BUILDER */}
      {viewMode === "coach_query_builder" && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-400" /> College Coach Scheme Archetype Query Filter
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Query verified high school prospects matching your program's specific 5-year signee archetype and scheme needs.
              </p>
            </div>

            {/* Query Builder Prompt Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-mono text-xs leading-relaxed space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">Natural Language Query Output</span>
              <p>
                "Show me <strong className="text-white">2027 OL</strong>, <strong className="text-white">6'4"+</strong>, <strong className="text-white">285+ lbs</strong>, T1-verified 5-10-5 under <strong className="text-white">4.70s</strong>, who fit our <strong className="text-white">Wide-Zone archetype</strong>, within our <strong className="text-white">Ohio pipeline</strong>, with a <strong className="text-white">3.2+ Core GPA</strong>."
              </p>
            </div>

            {/* Form Filter Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block font-bold mb-1">Target Position</label>
                <select
                  value={coachQuery.position}
                  onChange={(e) => setCoachQuery({ ...coachQuery, position: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white"
                >
                  <option value="OT">OT (Offensive Tackle)</option>
                  <option value="OG">OG (Guard)</option>
                  <option value="QB">QB (Quarterback)</option>
                  <option value="DE">DE / EDGE</option>
                  <option value="WR">WR (Wide Receiver)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">Min Height (Inches)</label>
                <select
                  value={coachQuery.minHeightInches}
                  onChange={(e) => setCoachQuery({ ...coachQuery, minHeightInches: +e.target.value })}
                  className="w-full p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white"
                >
                  <option value={76}>6'4" (76")</option>
                  <option value={77}>6'5" (77")</option>
                  <option value={78}>6'6" (78")</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">Min Weight (lbs)</label>
                <input
                  type="number"
                  value={coachQuery.minWeightLbs}
                  onChange={(e) => setCoachQuery({ ...coachQuery, minWeightLbs: +e.target.value })}
                  className="w-full p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">Pipeline Territory</label>
                <select
                  value={coachQuery.geographicPipelineRegion}
                  onChange={(e) => setCoachQuery({ ...coachQuery, geographicPipelineRegion: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white"
                >
                  <option value="Ohio Pipeline">Ohio Pipeline</option>
                  <option value="Georgia / Metro Atlanta">Georgia / Metro Atlanta</option>
                  <option value="Texas DFW / Houston">Texas DFW / Houston</option>
                  <option value="DMV / Virginia">DMV / Virginia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Query Results Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Matched Prospects ({coachQueryResults.length})
              </h3>
              <span className="text-xs text-indigo-400 font-mono">Sorted by Program Scheme Fit</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px]">
                    <th className="p-3">Prospect Name</th>
                    <th className="p-3">Pos / Class</th>
                    <th className="p-3">High School</th>
                    <th className="p-3">Height / Wt</th>
                    <th className="p-3">Pro Shuttle</th>
                    <th className="p-3">Core GPA</th>
                    <th className="p-3">Archetype Match</th>
                    <th className="p-3 text-right">Program Fit Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {coachQueryResults.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-950/40">
                      <td className="p-3 font-extrabold text-white">{p.name}</td>
                      <td className="p-3 text-slate-300">{p.position} ('27)</td>
                      <td className="p-3 text-slate-300">{p.highSchool} ({p.state})</td>
                      <td className="p-3 font-mono text-white">{p.height}, {p.weight} lbs</td>
                      <td className="p-3 font-mono text-emerald-400">{p.shuttleTime}s (T1 Laser)</td>
                      <td className="p-3 font-mono text-slate-200">{p.coreGpa}</td>
                      <td className="p-3 text-indigo-300 font-medium">{p.archetypeMatch}</td>
                      <td className="p-3 text-right font-black text-amber-400 text-sm">{p.fitScore}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
