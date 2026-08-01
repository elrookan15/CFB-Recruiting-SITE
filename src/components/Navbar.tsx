import React from "react";
import { Shield, Award, Calendar, UserCheck, Sparkles, GraduationCap, MessageSquare, Flame, Video, Users } from "lucide-react";

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
            onClick={() => setActiveTab("leaderboard")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "leaderboard" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Top 250
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
            onClick={() => setActiveTab("camps")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "camps" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Camps
          </button>
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "onboarding" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Profile Builder
          </button>
          <button
            onClick={() => setActiveTab("ai-assistant")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "ai-assistant" ? "bg-purple-600 text-white font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            AI Pitcher
          </button>
          <button
            onClick={() => setActiveTab("ncaa-tracker")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "ncaa-tracker" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Core GPA
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === "messages" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Messaging
          </button>
        </div>
      </div>
    </header>
  );
};
