import React, { useState } from "react";
import { AthleteProfile } from "../types";
import {
  ShieldCheck,
  Video,
  ExternalLink,
  Award,
  GraduationCap,
  MapPin,
  Share2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Play,
  Zap,
  Mic,
  RotateCcw,
  Sliders,
  FileText,
  Download
} from "lucide-react";
import { SocialMediaShowcase } from "./SocialMediaShowcase";
import { VideoPitchRecorder } from "./VideoPitchRecorder";
import { EndorsementSection } from "./EndorsementSection";
import { UnifiedRecruitingTimeline } from "./UnifiedRecruitingTimeline";
import { RecruitComparisonModal } from "./RecruitComparisonModal";

interface AthleteProfileCardProps {
  profile: AthleteProfile;
  onEditProfile: () => void;
  onOpenAiAssistant: () => void;
  onUpdateProfile?: (updated: AthleteProfile) => void;
}

export const AthleteProfileCard: React.FC<AthleteProfileCardProps> = ({
  profile,
  onEditProfile,
  onOpenAiAssistant,
  onUpdateProfile,
}) => {
  const [copied, setCopied] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPitchRecorderStudio, setShowPitchRecorderStudio] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    // Simulate generation delay
    setTimeout(() => {
      window.print();
      setIsExportingPdf(false);
    }, 800);
  };


  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveVideoPitch = (
    videoBlobUrl: string,
    bioDetails: AthleteProfile["videoIntroBio"]
  ) => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        videoIntroUrl: videoBlobUrl,
        videoIntroBio: bioDetails,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white space-y-8">
      {/* 1. AT-A-GLANCE HEADER CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* Avatar & Key Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-xl">
                <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center font-black text-3xl sm:text-4xl text-emerald-400 border border-emerald-500/30">
                  {profile.primaryPosition}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 border border-slate-950">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {profile.fullName}
                </h1>
                {profile.starRating && (
                  <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-amber-300 text-xs font-bold">
                    <span>{"★".repeat(profile.starRating)}</span>
                    <span>{profile.starRating}-Star Recruit</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-300 font-medium flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <MapPin className="w-4 h-4" /> {profile.highSchool} ({profile.cityState})
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-bold">Class of {profile.gradClass}</span>
                <span className="text-slate-500">•</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-xs">
                  {profile.commitmentStatus === "Committed" ? `Committed to ${profile.committedSchool}` : "Uncommitted / Open"}
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
                <span>NCAA ID: <strong className="text-white font-mono">{profile.ncaaEligibilityId}</strong></span>
                <span>•</span>
                <span>Twitter: <a href={`https://x.com/${profile.twitterHandle.replace("@", "")}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{profile.twitterHandle}</a></span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setShowPitchRecorderStudio(!showPitchRecorderStudio)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <Zap className="w-4 h-4 fill-slate-950" /> 30s Coach Pitch Studio
            </button>

            <button
              onClick={() => setShowVideoModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-slate-200" /> Watch Hudl Film
            </button>

            <button
              onClick={onOpenAiAssistant}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-bold text-xs transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-purple-400" /> AI Coach Pitcher
            </button>

            <button
              onClick={() => setShowComparisonModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 font-bold text-xs transition-all shadow-md"
            >
              <Sliders className="w-4 h-4 text-blue-400" /> Compare Matrix
            </button>

            <button
              onClick={onEditProfile}
              className="flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              Edit Profile
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-50"
              title="Export as PDF Resume"
            >
              {isExportingPdf ? <RotateCcw className="w-4 h-4 animate-spin text-slate-400" /> : <Download className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopyShareLink}
              className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              title="Share Profile Link"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* AT-A-GLANCE METRICS STRIP */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Height / Weight</p>
            <p className="text-base font-black text-white mt-0.5">
              {profile.heightFeet}'{profile.heightInches}" / {profile.weightLbs} <span className="text-xs font-normal text-slate-400">lbs</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">40-Yard Dash</p>
            <p className="text-base font-black text-amber-400 mt-0.5">
              {profile.fortyTime}s <span className="text-[10px] text-slate-400 font-medium">({profile.fortyTimingType})</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Core NCAA GPA</p>
            <p className="text-base font-black text-emerald-400 mt-0.5">
              {profile.coreGpa} <span className="text-[10px] text-slate-400">/ 4.0</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vertical Jump</p>
            <p className="text-base font-black text-cyan-400 mt-0.5">
              {profile.verticalJump}"
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Division I Offers</p>
            <p className="text-base font-black text-white mt-0.5">
              {profile.offers.length} <span className="text-xs font-semibold text-emerald-400">Offers</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center flex flex-col justify-center">
            <a
              href={profile.hudlUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1"
            >
              <Video className="w-3.5 h-3.5" /> Hudl Reel <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* EXPANDABLE 30-SECOND PITCH STUDIO RECORDER */}
      {showPitchRecorderStudio && (
        <div className="animate-fade-in">
          <VideoPitchRecorder profile={profile} onSavePitch={handleSaveVideoPitch} />
        </div>
      )}

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): 30-Sec Video Intro Card, Offers, Physical Stats & Season Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* 30-SECOND ATHLETE INTRODUCTION PITCH CARD */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Mic className="w-3 h-3" /> Verified Athlete Pitch
                  </span>
                  <span className="text-xs text-amber-400 font-bold">30-Second Limit</span>
                </div>
                <h2 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
                  <Video className="w-5 h-5 text-emerald-400" /> College Coach Introduction Pitch
                </h2>
                <p className="text-xs text-slate-400">
                  Direct personal pitch evaluating character, hometown roots, strengths, weaknesses & fit.
                </p>
              </div>

              <button
                onClick={() => setShowPitchRecorderStudio(!showPitchRecorderStudio)}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 transition-all flex items-center gap-1.5 self-start sm:self-center"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                {showPitchRecorderStudio ? "Close Studio" : "Record / Edit Pitch"}
              </button>
            </div>

            {/* Video Pitch Showcase Player + Structured Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Aspect Video Player (5 Cols) */}
              <div className="md:col-span-5 relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col items-center justify-center group">
                <video
                  src={
                    profile.videoIntroUrl ||
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  }
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-slate-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 30-Sec Coach Pitch
                </div>
              </div>

              {/* Right Structured Speech Points (7 Cols) */}
              <div className="md:col-span-7 space-y-2.5 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    1. Identity & Roots
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    "{profile.videoIntroBio?.whoIAm || `${profile.fullName}, ${profile.primaryPosition} from ${profile.highSchool}`}. {profile.videoIntroBio?.whereFrom || `Based in ${profile.cityState}.`}"
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    2. Strengths & Growth Areas
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    "{profile.videoIntroBio?.strengths || `Elite pre-snap read execution and ${profile.fortyTime}s 40-speed`}. {profile.videoIntroBio?.weaknesses || `Actively building off-hand pass protection accuracy.`}"
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                    3. Why Recruit Me
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    "{profile.videoIntroBio?.whyRecruitMe || `First in the film room, 3.8+ GPA leader, 100% committed to elevating program standards.`}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* OFFERS SHOWCASE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Division I Offers & Interest ({profile.offers.length})
              </h2>
              <span className="text-xs text-slate-400">Official NCAA Recruiting Offers</span>
            </div>

            {profile.offers.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No offers logged yet. Add your scholarship offers in the Profile Builder.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.offers.map((offer) => (
                  <div key={offer.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <h3 className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition-colors">
                          {offer.schoolName}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {offer.division} • {offer.conference}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Offered: {offer.offerDate}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {offer.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VERIFIED PHYSICAL & ATHLETIC TEST NUMBERS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Verified Performance Benchmarks
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">5-10-5 Shuttle</p>
                <p className="text-lg font-black text-white mt-1">{profile.shuttleTime}s</p>
                <span className="text-[10px] text-emerald-400 font-medium">Top 5% National</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Vertical Jump</p>
                <p className="text-lg font-black text-white mt-1">{profile.verticalJump}"</p>
                <span className="text-[10px] text-cyan-400 font-medium">Explosive Power</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Bench Press Max</p>
                <p className="text-lg font-black text-white mt-1">{profile.benchPress} lbs</p>
                <span className="text-[10px] text-amber-400 font-medium">Upper Strength</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Squat Max</p>
                <p className="text-lg font-black text-white mt-1">{profile.squatMax} lbs</p>
                <span className="text-[10px] text-purple-400 font-medium">Lower Drive</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Hand Size: <strong className="text-white">{profile.handSizeInches}"</strong></span>
              <span>Arm Length: <strong className="text-white">{profile.armLengthInches}"</strong></span>
              <span>Timing: <strong className="text-emerald-400">{profile.fortyTimingType}</strong></span>
            </div>
          </div>

          {/* SEASON PRODUCTION & ACCOLADES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">
                Varsity Season Production
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                {profile.seasonStats}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Honors, Awards & Team Captaincy
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {profile.honors} {profile.isTeamCaptain && "• Voted Team Captain"} • {profile.varsityStarterYears}-Year Varsity Starter
              </p>
            </div>
          </div>

          {/* UNIFIED RECRUITING TIMELINE */}
          <UnifiedRecruitingTimeline />
        </div>

        {/* Right Column (1/3): Academics, Targets & Social Media Feed Widget */}
        <div className="space-y-8">
          {/* ACADEMIC CREDENTIALS CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-md font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" /> NCAA Academic Standing
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">Cumulative GPA</span>
                <span className="font-extrabold text-white text-sm">{profile.gpa}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">Weighted GPA</span>
                <span className="font-extrabold text-white text-sm">{profile.weightedGpa}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">NCAA Core GPA</span>
                <span className="font-extrabold text-emerald-400 text-sm">{profile.coreGpa}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">SAT / ACT Score</span>
                <span className="font-extrabold text-white text-sm">
                  {profile.satScore ? `SAT: ${profile.satScore}` : ""} {profile.actScore ? `| ACT: ${profile.actScore}` : "N/A"}
                </span>
              </div>
              <div className="pt-1">
                <p className="text-[11px] text-slate-400">Intended Major:</p>
                <p className="text-xs font-bold text-white mt-0.5">{profile.intendedMajor}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              NCAA Qualifier Status: Core GPA & Test Score Approved for DI & DII
            </div>
          </div>

          {/* TOP TARGET PROGRAMS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-md font-bold text-white mb-3">Top Target Programs</h2>
            <div className="flex flex-wrap gap-2">
              {profile.topTargetSchools.map((school, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-200">
                  {i + 1}. {school}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Environment Preference: <strong className="text-white">{profile.preferredEnvironment}</strong> ({profile.preferredCampusSize})
            </p>
          </div>

          {/* VERIFIED COACH ENDORSEMENT SECTION */}
          <EndorsementSection athleteName={profile.fullName} />

          {/* SOCIAL MEDIA SHOWCASE WIDGET */}
          <SocialMediaShowcase athleteName={profile.fullName} handle={profile.twitterHandle} />
        </div>
      </div>

      {/* HUDL FILM MODAL PREVIEW */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" /> {profile.fullName} — Junior Season Highlights
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-3 animate-pulse">
                <Play className="w-8 h-8 fill-emerald-400 ml-1" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Hudl Game Highlight Reel</p>
              <p className="text-xs text-slate-400 mb-4 max-w-md">
                Official game film verified by High School coaching staff. Click below to launch full screen player.
              </p>
              <a
                href={profile.hudlUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2"
              >
                Open Official Hudl Player <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
      {/* RECRUIT COMPARISON MATRIX MODAL */}
      <RecruitComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />
    </div>
  );
};
