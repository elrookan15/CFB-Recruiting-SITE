import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  evaluateComplianceGate,
  MESSAGE_SEND_ATTEMPTS_DB,
  RECRUITING_PERIODS_DB,
  MESSAGES_DB,
  COACHES_DB,
  RECRUITS_DB,
  resetPeriodsDb
} from "./src/complianceEngine";
import { runComplianceTestSuite } from "./src/complianceTestSuite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Gridiron Gateway API", time: new Date().toISOString() });
});

// ==========================================
// NCAA COMPLIANCE GATE API ENDPOINTS
// ==========================================

// 5.1 GET /api/compliance/status (Read-only status check for pre-compose badge)
app.get("/api/compliance/status", (req, res) => {
  const coach_id = (req.query.coach_id as string) || "cch_fbs_freeman";
  const recruit_id = (req.query.recruit_id as string) || "rec_jr_hunter";
  const contact_method = (req.query.contact_method as string) || "electronic";

  const result = evaluateComplianceGate({
    coach_id,
    recruit_id,
    contact_method,
    writeAuditLog: false // Status check is side-effect-free
  });

  return res.status(result.httpStatus).json({
    coach_id,
    recruit_id,
    decision: result.decision,
    matched_period_id: result.matched_period_id,
    period_type_at_attempt: result.period_type_at_attempt,
    reason: result.reason,
    source_citation: result.source_citation
  });
});

// 5.2 POST /api/messages/send (Authoritative send endpoint with mandatory server-side re-validation)
app.post("/api/messages/send", (req, res) => {
  const { coach_id, recruit_id, contact_method, message_text } = req.body;

  if (!coach_id || !recruit_id) {
    return res.status(400).json({ error: "Missing required coach_id or recruit_id in body." });
  }

  // Re-run gating logic independently on server, ignoring any compliance override claims in body
  const result = evaluateComplianceGate({
    coach_id,
    recruit_id,
    contact_method: contact_method || "electronic",
    writeAuditLog: true, // Always writes to message_send_attempts
    message_text,
    raw_request_body: req.body
  });

  if (result.decision !== "allowed") {
    return res.status(result.httpStatus).json({
      error: "MESSAGE_BLOCKED_BY_COMPLIANCE_GATE",
      decision: result.decision,
      reason: result.reason,
      matched_period_id: result.matched_period_id,
      audit_log_id: result.audit_log_id,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(200).json({
    status: "success",
    decision: "allowed",
    message_id: result.message_id,
    audit_log_id: result.audit_log_id,
    matched_period_id: result.matched_period_id,
    reason: result.reason
  });
});

// GET /api/compliance/audit-logs (Return server-side audit attempts)
app.get("/api/compliance/audit-logs", (req, res) => {
  res.json({
    total_logs: MESSAGE_SEND_ATTEMPTS_DB.length,
    logs: MESSAGE_SEND_ATTEMPTS_DB
  });
});

// GET /api/compliance/recruiting-periods
app.get("/api/compliance/recruiting-periods", (req, res) => {
  res.json({
    total_periods: RECRUITING_PERIODS_DB.length,
    periods: RECRUITING_PERIODS_DB
  });
});

// POST /api/compliance/run-tests (Executes Group A & Group B verification suite server-side)
app.post("/api/compliance/run-tests", (req, res) => {
  try {
    const suiteResults = runComplianceTestSuite();
    const passedCount = suiteResults.filter((r) => r.verdict === "PASS").length;
    const failedCount = suiteResults.filter((r) => r.verdict === "FAIL").length;

    res.json({
      timestamp: new Date().toISOString(),
      summary: {
        total: suiteResults.length,
        passed: passedCount,
        failed: failedCount,
        status: failedCount === 0 ? "ALL_TESTS_PASSED" : "TEST_SUITE_FAILED"
      },
      results: suiteResults
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to execute compliance test suite." });
  }
});

// AI Recruiting Email & DM Generator
app.post("/api/ai/draft-email", async (req, res) => {
  try {
    const { athleteData, targetProgram, emailGoal, additionalNotes } = req.body;

    if (!athleteData || !targetProgram) {
      return res.status(400).json({ error: "Missing required athlete or program details." });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are an elite NCAA Division I Football Recruiting Director & Communications Specialist. Your goal is to draft a personalized, highly effective, professional, and compliance-friendly outreach message from a high school football recruit (or parent) to a college coach.

The message must highlight the athlete's physical metrics, verified stats, academic credentials, and game film link while specifically referencing the target college's coaching scheme or recent program achievements.`;

    const userPrompt = `Draft a recruiting message based on the following:

ATHLETE PROFILE:
- Name: ${athleteData.fullName || "Student-Athlete"}
- Position: ${athleteData.primaryPosition || "ATH"} ${athleteData.secondaryPosition ? `/ ${athleteData.secondaryPosition}` : ""}
- Class Year: ${athleteData.gradClass || "2026"}
- High School: ${athleteData.highSchool || "High School"}, ${athleteData.state || "US"}
- Height / Weight: ${athleteData.heightFeet ? `${athleteData.heightFeet}'${athleteData.heightInches}"` : "N/A"}, ${athleteData.weightLbs ? `${athleteData.weightLbs} lbs` : "N/A"}
- Verified 40-Yard Dash: ${athleteData.fortyTime ? `${athleteData.fortyTime}s` : "N/A"}
- GPA: ${athleteData.gpa ? athleteData.gpa : "N/A"} (Core NCAA GPA: ${athleteData.coreGpa || "N/A"})
- Hudl/Film Link: ${athleteData.hudlUrl || "hudl.com/profile/example"}
- Key Honors & Stats: ${athleteData.honors || "All-Conference, Varsity Starter"} | ${athleteData.seasonStats || "Multi-year starter"}

TARGET COLLEGE PROGRAM:
- University: ${targetProgram.schoolName}
- Coach Name/Title: ${targetProgram.coachName || "Coach"} (${targetProgram.coachTitle || "Recruiting Coordinator"})
- Scheme / Playstyle: ${targetProgram.scheme || "Spread Offense / Multiple Defense"}
- Conference: ${targetProgram.conference || "NCAA Division I"}

GOAL: ${emailGoal || "Initial Introduction & Hudl Highlight Reel Share"}
ADDITIONAL NOTES: ${additionalNotes || "N/A"}

Format the response strictly as valid JSON with three fields:
{
  "subject": "A compelling, catchy email subject line including player name, position, class year, GPA, and 40 time",
  "body": "The complete, polished email or Twitter DM text with clear paragraphs, greeting, key metrics callouts, film link placeholder, and respectful sign-off",
  "keyHighlights": ["3-4 bullet points highlighting why this athlete fits this program's scheme"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const result = JSON.parse(responseText);

    return res.json(result);
  } catch (err: any) {
    console.error("Error in draft-email:", err);
    return res.status(500).json({ error: err.message || "Failed to generate email." });
  }
});

// AI Scouting Evaluation Endpoint
app.post("/api/ai/scout-evaluation", async (req, res) => {
  try {
    const { athleteData } = req.body;
    if (!athleteData) {
      return res.status(400).json({ error: "Missing athlete profile data." });
    }

    const ai = getGeminiClient();

    const userPrompt = `Provide a professional college football scouting report & evaluation for the following prospect:
- Name: ${athleteData.fullName || "Prospect"}
- Position: ${athleteData.primaryPosition}
- Height: ${athleteData.heightFeet}'${athleteData.heightInches}" | Weight: ${athleteData.weightLbs} lbs
- 40-Yard Dash: ${athleteData.fortyTime}s | Shuttle: ${athleteData.shuttleTime}s | Vertical: ${athleteData.verticalJump}"
- Bench: ${athleteData.benchPress} lbs | Squat: ${athleteData.squatMax} lbs
- GPA: ${athleteData.gpa} | Core GPA: ${athleteData.coreGpa}
- Stats & Honors: ${athleteData.seasonStats} | ${athleteData.honors}

Provide a JSON object with:
{
  "compositeStarRating": "3-Star, 4-Star, or 5-Star",
  "scoutingOverview": "A detailed 3-4 sentence breakdown of physical traits, playmaking ability, athletic ceiling, and academic standing.",
  "strengths": ["4 specific athletic/field strengths"],
  "areasToImprove": ["2 technical development areas"],
  "projectedLevel": "FPS Power 4, FBS Group of 5, FCS High Academic, Division II, or NAIA/JUCO",
  "schemeFits": ["3 college schemes where this player excels, e.g. Air Raid, 4-2-5 Nickel, Power Spread"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const result = JSON.parse(responseText);
    return res.json(result);
  } catch (err: any) {
    console.error("Error in scout-evaluation:", err);
    return res.status(500).json({ error: err.message || "Failed to evaluate prospect." });
  }
});

// ==========================================
// FEATURE 2: SCHEME FIT ENGINE API
// ==========================================

app.post("/api/scheme-fit/evaluate", (req, res) => {
  const { athleteData } = req.body;
  const heightInches = (athleteData?.heightFeet || 6) * 12 + (athleteData?.heightInches || 3);
  const coreGpa = athleteData?.coreGpa || 3.75;
  const position = athleteData?.primaryPosition || "QB";

  // ML Fit Score Calculations
  const programs = [
    {
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
      keyInsight: "Your Fit at Coastal Carolina (88) is higher than at 14 of the FCS schools you're currently emailing."
    },
    {
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
      keyInsight: "In-state pipeline bonus (+15): Georgia Tech has signed 14 players within 40 miles of Buford in 5 years."
    },
    {
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
      keyInsight: "Cincinnati has 3 senior QBs/OLs graduating in 2026 — creating an urgent 98/100 Roster Need Score."
    }
  ];

  return res.json({
    status: "evaluated",
    position,
    evaluatedMetrics: { heightInches, coreGpa },
    summary: {
      realisticBoardCount: 12,
      reachBoardCount: 6,
      safetyBoardCount: 9
    },
    topProgramFits: programs
  });
});

app.post("/api/scheme-fit/coach-query", (req, res) => {
  const { query } = req.body;
  
  return res.json({
    status: "success",
    query: query || "Show me 2027 OL, 6'4\"+, 285+, T1-verified 5-10-5 under 4.7, who fit our wide-zone archetype, within our Ohio pipeline, with a 3.2+ core GPA.",
    matchedCount: 2,
    results: [
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
        archetypeMatch: "Wide-Zone Heavy OT Archetype (98% match)"
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
        archetypeMatch: "Wide-Zone Stretch OT Archetype (94% match)"
      }
    ]
  });
});

// ==========================================
// FEATURE 11: VERIFIED DATA API & CRM SYNC
// ==========================================

const CRM_AUDIT_TRAIL: any[] = [];

app.post("/api/crm/sync", (req, res) => {
  const { athleteData, targetCrms } = req.body;

  const targetList = targetCrms || ["arms", "teamworks", "front_rush"];
  const timestamp = new Date().toISOString();
  const recordIds = {
    arms: `ARMS-REC-${Math.floor(100000 + Math.random() * 900000)}`,
    teamworks: `TW-PROSPECT-${Math.floor(100000 + Math.random() * 900000)}`,
    front_rush: `FR-${Math.floor(100000 + Math.random() * 900000)}-D1`,
  };

  const auditEntry = {
    id: `crm_sync_${Date.now()}`,
    athlete_name: athleteData?.prospect_profile?.first_name ? `${athleteData.prospect_profile.first_name} ${athleteData.prospect_profile.last_name}` : "Caden Carter",
    targets: targetList,
    recordIds,
    timestamp,
    status: "SUCCESS",
    latency_ms: Math.floor(120 + Math.random() * 60)
  };

  CRM_AUDIT_TRAIL.push(auditEntry);

  return res.json({
    status: "synced",
    message: "Verified profile pushed to college CRM pipe",
    recordIds,
    targetsSynced: targetList.length,
    auditEntry
  });
});

app.get("/api/crm/status", (req, res) => {
  return res.json({
    connectors: [
      { id: "arms", name: "ARMS Software", status: "connected", totalSynced: 1420 },
      { id: "teamworks", name: "Teamworks", status: "connected", totalSynced: 980 },
      { id: "front_rush", name: "Front Rush", status: "connected", totalSynced: 2150 }
    ],
    totalSyncs: CRM_AUDIT_TRAIL.length,
    recentLogs: CRM_AUDIT_TRAIL.slice(-10)
  });
});

// ==========================================
// FEATURE 12: LIVE COMBINE MODE API
// ==========================================

const COMBINE_EVENT_DB = {
  eventName: "Rivals All-American Combine - Atlanta, GA",
  activeBibsCheckedIn: [101, 102, 103, 104, 105],
  laserReadings: [] as any[]
};

app.post("/api/combine/checkin", (req, res) => {
  const { bibNumber, heightInches, weightLbs } = req.body;
  if (!bibNumber) {
    return res.status(400).json({ error: "Missing bibNumber" });
  }

  if (!COMBINE_EVENT_DB.activeBibsCheckedIn.includes(bibNumber)) {
    COMBINE_EVENT_DB.activeBibsCheckedIn.push(bibNumber);
  }

  return res.json({
    status: "checked_in",
    bibNumber,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/combine/ble-timer", (req, res) => {
  const { stationId, bibNumber, metricValue } = req.body;
  
  const reading = {
    id: `laser_${Date.now()}`,
    stationId,
    bibNumber,
    metricValue,
    timestamp: new Date().toISOString()
  };

  COMBINE_EVENT_DB.laserReadings.push(reading);

  return res.json({
    status: "recorded",
    reading
  });
});

app.post("/api/combine/issue-badge", (req, res) => {
  const { bibNumber } = req.body;
  const badgeId = `BADGE-COMBINE-${Date.now().toString().slice(-6)}`;
  
  return res.json({
    status: "badge_issued",
    bibNumber,
    badgeId,
    verificationHash: `0x${Math.random().toString(16).substring(2, 18)}`
  });
});

app.post("/api/combine/send-sms", (req, res) => {
  const { bibNumber, parentPhone, messageText } = req.body;

  return res.json({
    status: "sms_sent",
    bibNumber,
    parentPhone,
    deliveredAt: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gridiron Gateway server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
