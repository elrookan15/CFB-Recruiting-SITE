import React, { useState } from "react";
import { AthleteProfile, UserRole } from "./types";
import { INITIAL_ATHLETE_PROFILE } from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { OnboardingWizard } from "./components/OnboardingWizard";
import { AthleteProfileCard } from "./components/AthleteProfileCard";
import { LeaderboardTop250 } from "./components/LeaderboardTop250";
import { CampSearchEngine } from "./components/CampSearchEngine";
import { AIRecruitingAssistant } from "./components/AIRecruitingAssistant";
import { NcaaEligibilityTracker } from "./components/NcaaEligibilityTracker";
import { CoachMessagingFeed } from "./components/CoachMessagingFeed";
import { TechDocsView } from "./components/TechDocsView";
import { TopWeeklyHighlights } from "./components/TopWeeklyHighlights";
import { CoachesDirectory } from "./components/CoachesDirectory";

export function App() {
  const [profile, setProfile] = useState<AthleteProfile>(INITIAL_ATHLETE_PROFILE);
  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "top250"
    | "highlights"
    | "coaches"
    | "camps"
    | "ai_assistant"
    | "ncaa"
    | "coach_views"
    | "tech_docs"
  >("profile");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("Athlete");

  const handleCompleteOnboarding = (updatedProfile: AthleteProfile) => {
    setProfile(updatedProfile);
    setShowOnboarding(false);
    setActiveTab("profile");
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      {/* Main Content Render Area */}
      <main className="pb-16">
        {activeTab === "profile" && (
          <AthleteProfileCard
            profile={profile}
            onEditProfile={() => setShowOnboarding(true)}
            onOpenAiAssistant={() => setActiveTab("ai_assistant")}
            onUpdateProfile={(updated) => setProfile(updated)}
          />
        )}

        {activeTab === "top250" && (
          <div className="space-y-8">
            <LeaderboardTop250 />
            <div className="max-w-6xl mx-auto px-4">
              <TopWeeklyHighlights />
            </div>
          </div>
        )}

        {activeTab === "highlights" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <TopWeeklyHighlights />
          </div>
        )}

        {activeTab === "coaches" && <CoachesDirectory />}

        {activeTab === "camps" && <CampSearchEngine />}

        {activeTab === "ai_assistant" && (
          <AIRecruitingAssistant athleteProfile={profile} />
        )}

        {activeTab === "ncaa" && <NcaaEligibilityTracker />}

        {activeTab === "coach_views" && <CoachMessagingFeed />}

        {activeTab === "tech_docs" && <TechDocsView />}
      </main>

      {/* 25-30 QUESTION ONBOARDING WIZARD MODAL */}
      {showOnboarding && (
        <OnboardingWizard
          initialProfile={profile}
          onComplete={handleCompleteOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gridiron Gateway Recruiting Network. Built for High School Student-Athletes & College Coaches.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("tech_docs")}
              className="hover:text-emerald-400 underline font-semibold"
            >
              System Architecture & Schema
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="hover:text-emerald-400 underline font-semibold"
            >
              25-30 Question Profile Builder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
