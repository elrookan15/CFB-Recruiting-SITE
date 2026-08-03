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
import { TransferPortalModule } from "./components/TransferPortalModule";
import { CoachPipelineBoard } from "./components/CoachPipelineBoard";
import { ComplianceDashboard } from "./components/ComplianceDashboard";
import { CrmSyncModule } from "./components/CrmSyncModule";
import { LiveCombineModule } from "./components/LiveCombineModule";
import { SchemeFitEngine } from "./components/SchemeFitEngine";

export function App() {
  const [profile, setProfile] = useState<AthleteProfile>(INITIAL_ATHLETE_PROFILE);
  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "top250"
    | "scheme_fit"
    | "highlights"
    | "coaches"
    | "transfer_portal"
    | "coach_pipeline"
    | "camps"
    | "ai_assistant"
    | "ncaa"
    | "coach_views"
    | "compliance"
    | "crm_sync"
    | "combine_mode"
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

        {activeTab === "scheme_fit" && (
          <SchemeFitEngine
            athleteProfile={profile}
            onOpenAiAssistant={() => setActiveTab("ai_assistant")}
          />
        )}

        {activeTab === "highlights" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <TopWeeklyHighlights />
          </div>
        )}

        {activeTab === "coaches" && <CoachesDirectory />}

        {activeTab === "transfer_portal" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <TransferPortalModule />
          </div>
        )}

        {activeTab === "coach_pipeline" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <CoachPipelineBoard />
          </div>
        )}

        {activeTab === "camps" && <CampSearchEngine />}

        {activeTab === "ai_assistant" && (
          <AIRecruitingAssistant athleteProfile={profile} />
        )}

        {activeTab === "ncaa" && <NcaaEligibilityTracker />}

        {activeTab === "coach_views" && <CoachMessagingFeed />}

        {activeTab === "compliance" && <ComplianceDashboard />}

        {activeTab === "crm_sync" && <CrmSyncModule profile={profile} />}

        {activeTab === "combine_mode" && <LiveCombineModule />}

        {activeTab === "tech_docs" && <TechDocsView />}
      </main>

      {/* 25-30 QUESTION ONBOARDING WIZARD MODAL OVERLAY */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
          <div className="w-full max-w-5xl my-auto">
            <OnboardingWizard
              initialProfile={profile}
              onComplete={handleCompleteOnboarding}
              onClose={() => setShowOnboarding(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gridiron Gateway Recruiting Network. Built for High School Student-Athletes & College Coaches.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab("compliance")}
              className="hover:text-amber-400 underline font-semibold flex items-center gap-1"
            >
              NIL & Compliance Gate
            </button>
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
