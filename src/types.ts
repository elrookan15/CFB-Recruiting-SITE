export type Position = 
  | "QB" | "RB" | "WR" | "TE" 
  | "OT" | "OG" | "C" 
  | "DE" | "DT" | "EDGE" | "LB" 
  | "CB" | "S" | "ATH" 
  | "K" | "P" | "LS";

export type GradYear = 2025 | 2026 | 2027 | 2028 | 2029;

export type UserRole = "Athlete" | "Coach" | "Fan";

export type CollegeDivision = "FBS" | "FCS" | "DII" | "DIII" | "NAIA" | "JUCO";

export interface CollegeOffer {
  id: string;
  schoolName: string;
  division: CollegeDivision;
  conference: string;
  offerDate: string;
  status: "Offered" | "Committed" | "Warm Interest" | "Official Visit Scheduled";
  schoolColor?: string;
  logoUrl?: string;
}

export interface AthleteProfile {
  // 1. Basic & Contact Info (1-4)
  fullName: string;
  highSchool: string;
  cityState: string;
  gradClass: GradYear;
  primaryEmail: string;
  primaryPhone: string;
  parentName: string;
  parentEmailPhone: string;

  // 2. Physical & Athletic Metrics (5-9)
  primaryPosition: Position;
  secondaryPosition?: Position;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  handSizeInches: number;
  armLengthInches: number;

  // 3. Verified Performance Stats (10-14)
  fortyTime: number; // e.g. 4.52
  fortyTimingType: "Laser" | "Hand-timed";
  shuttleTime: number; // e.g. 4.18
  verticalJump: number; // e.g. 34.5
  benchPress: number; // e.g. 275
  squatMax: number; // e.g. 405

  // 4. Academic Credentials (15-18)
  gpa: number; // Cumulative Unweighted GPA, e.g. 3.85
  weightedGpa: number; // e.g. 4.20
  coreGpa: number; // Core NCAA GPA, e.g. 3.75
  satScore?: number; // e.g. 1280
  actScore?: number; // e.g. 28
  intendedMajor: string;

  // 5. Game & Film Media (19-21)
  hudlUrl: string;
  youtubeFilmUrl?: string;
  twitterHandle: string;
  instagramHandle?: string;

  // 6. On-Field Performance & Honors (22-25)
  seasonStats: string; // e.g. "3,420 Passing Yds, 38 TDs, 6 INTs, 480 Rushing Yds"
  honors: string; // e.g. "1st Team All-State, District MVP, 2x Team Captain"
  isTeamCaptain: boolean;
  varsityStarterYears: number;

  // 7. Recruiting & Preferences (26-30)
  ncaaEligibilityId: string;
  offers: CollegeOffer[];
  topTargetSchools: string[]; // e.g. ["Georgia", "Alabama", "Texas", "Ohio State", "Oregon"]
  preferredEnvironment: "Urban" | "Suburban" | "College Town" | "Any";
  preferredCampusSize: "Large (15,000+)" | "Medium (5,000-15,000)" | "Small (<5,000)";
  commitmentStatus: "Uncommitted" | "Committed" | "Decommitted";
  committedSchool?: string;
  starRating?: number; // 3, 4, 5
  videoIntroUrl?: string;
  videoIntroBio?: {
    whoIAm?: string;
    whereFrom?: string;
    strengths?: string;
    weaknesses?: string;
    whyRecruitMe?: string;
  };
}

export interface TopRecruit {
  rank: number;
  id: string;
  fullName: string;
  position: Position;
  highSchool: string;
  state: string;
  gradClass: GradYear;
  height: string;
  weight: number;
  fortyTime: number;
  gpa: number;
  starRating: 3 | 4 | 5;
  compositeScore: number; // e.g., 0.9985
  committedTo?: string; // e.g., "Georgia"
  commitmentStatus: "Committed" | "Uncommitted" | "Decommitted";
  crystalBall: { school: string; percentage: number; color: string }[];
  topOffers: string[];
  hudlUrl: string;
  avatarUrl: string;
  verifiedCoachViews: number;
}

export interface CampEntry {
  id: string;
  name: string;
  host: string;
  division: CollegeDivision | "Independent Showcase";
  campType: "Mega Camp" | "Position Skills" | "Combine / Showcase" | "Specialist K/P Camp";
  city: string;
  state: string;
  zipCode: string;
  date: string;
  time: string;
  cost: number;
  registerUrl: string;
  description: string;
  features: string[];
  rating: number;
  totalReviews: number;
  isBookmarked?: boolean;
}

export interface CoachView {
  id: string;
  coachName: string;
  coachTitle: string;
  schoolName: string;
  division: CollegeDivision;
  schoolLogo: string;
  action: "Viewed Profile" | "Watched Hudl Highlight Reel" | "Downloaded Verified Stats" | "Sent Direct Message";
  timestamp: string;
  isVerifiedCoach: boolean;
}

export interface NcaaCourse {
  id: string;
  category: "English" | "Math" | "Natural Science" | "Social Science" | "Extra English/Math/Sci" | "Additional Core";
  courseName: string;
  grade: "A" | "B" | "C" | "D" | "F" | "In Progress";
  credits: number; // 1.0 or 0.5
  isRequired: boolean;
}

export interface SocialPost {
  id: string;
  platform: "Twitter" | "Instagram";
  authorName: string;
  handle: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  likes: number;
  retweets: number;
  verified: boolean;
  mediaUrl?: string;
}

export interface CoachEndorsement {
  id: string;
  coachName: string;
  coachTitle: string;
  schoolName: string;
  division: CollegeDivision;
  avatarUrl: string;
  badge: "Head Coach" | "Position Coach" | "Recruiting Coordinator" | "Scout Evaluator" | "High School Head Coach";
  relationship: string;
  text: string;
  date: string;
  scoreBonus: number; // e.g., +15 Composite Points on Top 250
  verified: boolean;
}

export interface WeeklyHighlight {
  id: string;
  rank: number;
  athleteName: string;
  position: Position;
  highSchool: string;
  state: string;
  gradClass: GradYear;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  votes: number;
  userHasVoted?: boolean;
  category: "Touchdown / Big Play" | "Defensive Hit / Pick 6" | "Ankle Breaker Juke" | "O-Line Pancake" | "Special Teams Clutch";
  submittedDate: string;
}

export interface CollegeCoachProfile {
  id: string;
  fullName: string;
  title: string;
  school: string;
  division: CollegeDivision;
  conference: string;
  avatarUrl: string;
  bio: string;
  recruitingTerritory: string[];
  targetPositions: Position[];
  email: string;
  phone: string;
  twitterHandle: string;
  verifiedBadge: boolean;
  officeAddress: string;
  yearsExperience: number;
  activeEndorsementsCount: number;
}

export interface TransferPortalAthlete {
  id: string;
  fullName: string;
  position: Position;
  formerSchool: string;
  formerDivision: CollegeDivision;
  conference: string;
  yearsEligibilityRemaining: number;
  portalEntryDate: string;
  status: "Active in Portal" | "Committed / Transferred" | "Withdrawn";
  destinationSchool?: string;
  height: string;
  weight: number;
  fortyTime: number;
  gpa: number;
  avatarUrl: string;
  statsHighlights: string;
  hudlUrl: string;
  verifiedStats: boolean;
}

export interface CoachPipelineProspect {
  id: string;
  athleteName: string;
  position: Position;
  highSchoolOrSchool: string;
  state: string;
  gradClass: number;
  stage: "Identified" | "Contacted" | "Offered" | "Committed";
  rating: number; // 1-5
  notes: string;
  lastActivity: string;
  avatarUrl: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: "Offer" | "Camp" | "Ranking" | "CoachView" | "Endorsement" | "Media";
  title: string;
  description: string;
  badgeText: string;
  schoolLogo?: string;
}

// ==========================================
// FEATURE 11: COLLEGE CRM SYNC TYPES
// ==========================================
export interface CrmConnector {
  id: "arms" | "teamworks" | "front_rush" | "custom_webhook";
  name: string;
  logoUrl?: string;
  status: "connected" | "disconnected" | "syncing" | "failed";
  lastSyncTimestamp?: string;
  totalRecordsSynced: number;
  apiKeyConfigured: boolean;
  webhookUrl: string;
  pipePlan: "Power 4 Enterprise Pipe" | "D1 / Group of 5 Pipe" | "Camp Operator Pipeline";
  endpointFormat: "JSON/REST" | "XML/SOAP" | "GraphQL";
}

export interface CrmSyncLog {
  id: string;
  targetCrm: "ARMS" | "Teamworks" | "Front Rush" | "Custom Webhook";
  status: "SUCCESS" | "FAILED" | "PENDING";
  crmRecordId: string;
  auditHash: string;
  timestamp: string;
  responseMs: number;
  athleteName: string;
}

// ==========================================
// FEATURE 12: LIVE COMBINE MODE TYPES
// ==========================================
export interface CombineAthleteBib {
  bibNumber: number;
  athleteId: string;
  athleteName: string;
  position: Position;
  gradClass: number;
  highSchool: string;
  checkInStatus: "Registered" | "Checked-In" | "Testing" | "Completed";
  heightInches: number;
  weightLbs: number;
  handSizeInches: number;
  armLengthInches: number;
  parentPhone: string;
  badgeIssued: boolean;
  verifiedBadgeId?: string;
  fortyTime?: number;
  shuttleTime?: number;
  verticalJump?: number;
  broadJumpInches?: number;
  benchReps?: number;
}

export interface BleStation {
  id: string;
  stationName: string;
  metricType: "40-Yard Laser" | "5-10-5 Shuttle" | "Vertical Jump" | "Broad Jump";
  deviceHardware: "Dashr BLE Laser v3" | "Brower Timing System" | "Zybek Laser Gate" | "SmartSpeed Wireless";
  status: "CONNECTED" | "MEASURING" | "STANDBY" | "OFFLINE";
  batteryLevel: number;
  signalDbm: number;
  lastReading?: { bibNumber: number; value: number; timestamp: string };
}

export interface ParentSmsLog {
  id: string;
  bibNumber: number;
  athleteName: string;
  parentPhone: string;
  messageText: string;
  status: "DELIVERED" | "QUEUED" | "FAILED";
  timestamp: string;
}


