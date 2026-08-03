import React from "react";
import { Shield, Award, Calendar, UserCheck, Sparkles, GraduationCap, MessageSquare, Flame, Video, Users, RefreshCw, ListFilter, Code, ShieldCheck, Share2, Smartphone, Target } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  userRole: any;
  setUserRole: (role: any) => void;
  athleteName?: string;
  gradClass?: number;
  position?: string;
  onOpenOnboarding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  athleteName = "Caden Carter",
  gradClass = 2026,
  position = "QB",
  onOpenOnboarding,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner - Live Ticker / Role Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-slate-300">
            <span className="flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-emerald-500/30">
              <Flame className="w-3 h-3 text-amber-400 animate-pulse" /> Live Recruiting Feed
            </span>
            <span className="truncate text-slate-300">
              <strong className="text-white">5★ QB Julian Lewis</strong> committed to <span className="text-amber-300 font-medium">Colorado Bulldogs</span> • <strong className="text-white">4★ WR Dakorien Moore</strong> pledged to <span className="text-emerald-300 font-medium">Oregon Ducks</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 text-[11px]">Mode:</span>
            <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setUserRole("athlete")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  userRole === "athlete"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Athlete / Parent
              </button>
              <button
                onClick={() => setUserRole("coach")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  userRole === "coach"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                College Coach
              </button>
              <button
                onClick={() => setUserRole("fan")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  userRole === "fan"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Fan / Scout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            onClick={() => setActiveTab("top250")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform border border-emerald-400/40">
              <Shield className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  GRIDIRON
                </span>
                <span className="text-emerald-400 font-extrabold text-xl">GATEWAY</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                NCAA Recruiting Platform & Leaderboard
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("top250")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "top250"
                  ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              Top 250
            </button>

            <button
              onClick={() => setActiveTab("scheme_fit")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "scheme_fit"
                  ? "bg-gradient-to-r from-indigo-900/80 to-slate-800 text-indigo-300 border border-indigo-500/40 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Target className="w-4 h-4 text-indigo-400 animate-pulse" />
              Scheme Fit Zillow
            </button>

            <button
              onClick={() => setActiveTab("highlights")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "highlights"
                  ? "bg-slate-800 text-rose-400 border border-rose-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Video className="w-4 h-4 text-rose-400" />
              Top 10 Plays
            </button>

            <button
              onClick={() => setActiveTab("coaches")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "coaches"
                  ? "bg-slate-800 text-blue-400 border border-blue-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              Coaches
            </button>

            <button
              onClick={() => setActiveTab("camps")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "camps"
                  ? "bg-slate-800 text-amber-400 border border-amber-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Camps
            </button>

            <button
              onClick={() => (onOpenOnboarding ? onOpenOnboarding() : setActiveTab("profile"))}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "onboarding"
                  ? "bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              Profile Builder
            </button>

            <button
              onClick={() => setActiveTab("ai_assistant")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "ai_assistant"
                  ? "bg-gradient-to-r from-purple-900/60 to-slate-800 text-purple-300 border border-purple-500/40 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              AI Pitcher
            </button>

            <button
              onClick={() => setActiveTab("ncaa")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "ncaa"
                  ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Core GPA
            </button>

            <button
              onClick={() => setActiveTab("transfer_portal")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "transfer_portal"
                  ? "bg-slate-800 text-blue-300 border border-blue-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <RefreshCw className="w-4 h-4 text-blue-400" />
              Transfer Portal
            </button>

            <button
              onClick={() => setActiveTab("coach_pipeline")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "coach_pipeline"
                  ? "bg-slate-800 text-purple-300 border border-purple-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <ListFilter className="w-4 h-4 text-purple-400" />
              Coach Board
            </button>

            <button
              onClick={() => setActiveTab("coach_views")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all relative ${
                activeTab === "coach_views"
                  ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-rose-400" />
              Messaging
            </button>

            <button
              onClick={() => setActiveTab("compliance")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "compliance"
                  ? "bg-slate-800 text-amber-300 border border-amber-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              NIL & Gate
            </button>

            <button
              onClick={() => setActiveTab("crm_sync")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "crm_sync"
                  ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              CRM Pipe
            </button>

            <button
              onClick={() => setActiveTab("combine_mode")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "combine_mode"
                  ? "bg-slate-800 text-amber-300 border border-amber-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-400 animate-pulse" />
              Live Combine
            </button>

            <button
              onClick={() => setActiveTab("tech_docs")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "tech_docs"
                  ? "bg-slate-800 text-sky-300 border border-sky-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Code className="w-4 h-4 text-sky-400" />
              Arch Specs
            </button>
          </nav>

          {/* Active Profile Badge / View Profile Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                {position}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white leading-none truncate max-w-[110px]">
                  {athleteName}
                </p>
                <p className="text-[10px] text-emerald-400 font-medium leading-tight">
                  Class of {gradClass} • Active
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto pb-2 gap-1.5 no-scrollbar text-xs border-t border-slate-800/80 pt-2">
          <button
            onClick={() => setActiveTab("top250")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "top250" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Top 250
          </button>
          <button
            onClick={() => setActiveTab("scheme_fit")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "scheme_fit" ? "bg-indigo-600 text-white font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Scheme Fit Zillow
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "highlights" ? "bg-rose-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Top 10 Plays
          </button>
          <button
            onClick={() => setActiveTab("coaches")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "coaches" ? "bg-blue-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Coaches
          </button>
          <button
            onClick={() => setActiveTab("transfer_portal")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "transfer_portal" ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Transfer Portal
          </button>
          <button
            onClick={() => setActiveTab("coach_pipeline")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "coach_pipeline" ? "bg-purple-600 text-white font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Coach Board
          </button>
          <button
            onClick={() => setActiveTab("camps")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "camps" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Camps
          </button>
          <button
            onClick={() => (onOpenOnboarding ? onOpenOnboarding() : setActiveTab("profile"))}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "onboarding" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Profile Builder
          </button>
          <button
            onClick={() => setActiveTab("ai_assistant")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "ai_assistant" ? "bg-purple-600 text-white font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            AI Pitcher
          </button>
          <button
            onClick={() => setActiveTab("ncaa")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "ncaa" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Core GPA
          </button>
          <button
            onClick={() => setActiveTab("coach_views")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "coach_views" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Messaging
          </button>
          <button
            onClick={() => setActiveTab("compliance")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "compliance" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            NIL & Gate
          </button>
          <button
            onClick={() => setActiveTab("crm_sync")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "crm_sync" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            CRM Pipe
          </button>
          <button
            onClick={() => setActiveTab("combine_mode")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "combine_mode" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Live Combine
          </button>
          <button
            onClick={() => setActiveTab("tech_docs")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "tech_docs" ? "bg-sky-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Arch Specs
          </button>
        </div>
      </div>
    </header>
  );
};
