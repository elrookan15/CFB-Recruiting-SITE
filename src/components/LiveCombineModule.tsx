import React, { useState } from "react";
import { Smartphone, Radio, QrCode, CheckCircle2, Search, Send, Award, Clock, Activity, Zap, RefreshCw, ChevronRight, ShieldCheck, UserCheck, AlertCircle, Share2 } from "lucide-react";
import { Position, CombineAthleteBib, BleStation, ParentSmsLog } from "../types";

export const LiveCombineModule: React.FC = () => {
  const [selectedCombine, setSelectedCombine] = useState("Rivals All-American Combine - Atlanta, GA");
  const [activeTab, setActiveTab] = useState<"checkin" | "ble_timer" | "leaderboard" | "sms_logs">("checkin");

  // Mock list of registered athletes for event
  const [athletes, setAthletes] = useState<CombineAthleteBib[]>([
    {
      bibNumber: 101,
      athleteId: "rec_101",
      athleteName: "Caden Carter",
      position: "QB",
      gradClass: 2026,
      highSchool: "Buford High School",
      checkInStatus: "Testing",
      heightInches: 75, // 6'3"
      weightLbs: 210,
      handSizeInches: 9.75,
      armLengthInches: 32.5,
      parentPhone: "+1 (404) 555-0192",
      badgeIssued: true,
      verifiedBadgeId: "BADGE-GA-2026-101",
      fortyTime: 4.52,
      shuttleTime: 4.18,
      verticalJump: 34.5,
      broadJumpInches: 122,
      benchReps: 18,
    },
    {
      bibNumber: 102,
      athleteId: "rec_102",
      athleteName: "Dakorien Moore",
      position: "WR",
      gradClass: 2025,
      highSchool: "Duncanville HS",
      checkInStatus: "Completed",
      heightInches: 71, // 5'11"
      weightLbs: 185,
      handSizeInches: 9.25,
      armLengthInches: 31.0,
      parentPhone: "+1 (214) 555-8810",
      badgeIssued: true,
      verifiedBadgeId: "BADGE-TX-2025-102",
      fortyTime: 4.38,
      shuttleTime: 4.02,
      verticalJump: 38.0,
      broadJumpInches: 128,
      benchReps: 15,
    },
    {
      bibNumber: 103,
      athleteId: "rec_103",
      athleteName: "Julian Lewis",
      position: "QB",
      gradClass: 2025,
      highSchool: "Carrollton HS",
      checkInStatus: "Completed",
      heightInches: 73, // 6'1"
      weightLbs: 195,
      handSizeInches: 9.5,
      armLengthInches: 31.5,
      parentPhone: "+1 (404) 555-3390",
      badgeIssued: true,
      verifiedBadgeId: "BADGE-GA-2025-103",
      fortyTime: 4.62,
      shuttleTime: 4.25,
      verticalJump: 33.0,
      broadJumpInches: 118,
      benchReps: 14,
    },
    {
      bibNumber: 104,
      athleteId: "rec_104",
      athleteName: "David Sanders Jr.",
      position: "OT",
      gradClass: 2025,
      highSchool: "Providence Day",
      checkInStatus: "Testing",
      heightInches: 78, // 6'6"
      weightLbs: 290,
      handSizeInches: 10.25,
      armLengthInches: 35.5,
      parentPhone: "+1 (704) 555-9921",
      badgeIssued: false,
      fortyTime: 4.95,
      shuttleTime: 4.55,
      verticalJump: 29.5,
      broadJumpInches: 108,
      benchReps: 26,
    },
    {
      bibNumber: 105,
      athleteId: "rec_105",
      athleteName: "Elijah Griffin",
      position: "DT",
      gradClass: 2025,
      highSchool: "Savannah Country Day",
      checkInStatus: "Checked-In",
      heightInches: 76, // 6'4"
      weightLbs: 285,
      handSizeInches: 10.0,
      armLengthInches: 34.0,
      parentPhone: "+1 (912) 555-4431",
      badgeIssued: false,
    },
  ]);

  // Bluetooth Low Energy Timer Gates
  const [bleStations, setBleStations] = useState<BleStation[]>([
    {
      id: "ble_40",
      stationName: "Station 1: 40-Yard Dash Laser",
      metricType: "40-Yard Laser",
      deviceHardware: "Dashr BLE Laser v3",
      status: "CONNECTED",
      batteryLevel: 94,
      signalDbm: -58,
      lastReading: { bibNumber: 101, value: 4.52, timestamp: "10:14:22 AM" },
    },
    {
      id: "ble_shuttle",
      stationName: "Station 2: 5-10-5 Pro Shuttle",
      metricType: "5-10-5 Shuttle",
      deviceHardware: "Brower Timing System",
      status: "CONNECTED",
      batteryLevel: 88,
      signalDbm: -62,
      lastReading: { bibNumber: 102, value: 4.02, timestamp: "10:12:05 AM" },
    },
    {
      id: "ble_vertical",
      stationName: "Station 3: Vertical Jump Mat",
      metricType: "Vertical Jump",
      deviceHardware: "SmartSpeed Wireless",
      status: "CONNECTED",
      batteryLevel: 91,
      signalDbm: -52,
      lastReading: { bibNumber: 102, value: 38.0, timestamp: "10:08:44 AM" },
    },
    {
      id: "ble_broad",
      stationName: "Station 4: Broad Jump Laser Line",
      metricType: "Broad Jump",
      deviceHardware: "Zybek Laser Gate",
      status: "STANDBY",
      batteryLevel: 82,
      signalDbm: -70,
    },
  ]);

  // SMS Logs
  const [smsLogs, setSmsLogs] = useState<ParentSmsLog[]>([
    {
      id: "sms_1",
      bibNumber: 101,
      athleteName: "Caden Carter",
      parentPhone: "+1 (404) 555-0192",
      messageText: "GRIDIRON COMBINE: Caden Carter verified stats updated! 40-Yard: 4.52s (Laser), Vertical: 34.5\". Scorecard & Badge: https://gridiron.app/v/GA-101",
      status: "DELIVERED",
      timestamp: "10:15:02 AM",
    },
    {
      id: "sms_2",
      bibNumber: 102,
      athleteName: "Dakorien Moore",
      parentPhone: "+1 (214) 555-8810",
      messageText: "GRIDIRON COMBINE: Dakorien Moore verified stats updated! 40-Yard: 4.38s (Laser), Vertical: 38.0\". Scorecard & Badge: https://gridiron.app/v/TX-102",
      status: "DELIVERED",
      timestamp: "10:13:00 AM",
    },
  ]);

  const [searchTerm, setSearchText] = useState("");
  const [selectedBib, setSelectedBib] = useState<number | null>(101);
  const [isSimulatingBle, setIsSimulatingBle] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState<"40" | "shuttle" | "vertical">("40");
  const [positionFilter, setPositionFilter] = useState<string>("ALL");

  const activeAthlete = athletes.find((a) => a.bibNumber === selectedBib) || athletes[0];

  const handleBibCheckIn = (bibNumber: number) => {
    setAthletes((prev) =>
      prev.map((a) =>
        a.bibNumber === bibNumber
          ? {
              ...a,
              checkInStatus: a.checkInStatus === "Registered" ? "Checked-In" : a.checkInStatus,
            }
          : a
      )
    );
  };

  const handleTriggerBleLaser = async (stationId: string) => {
    setIsSimulatingBle(true);
    const randomTime = stationId === "ble_40" ? +(4.35 + Math.random() * 0.35).toFixed(2) : +(4.05 + Math.random() * 0.3).toFixed(2);
    const targetBib = selectedBib || 101;

    try {
      await fetch("/api/combine/ble-timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationId,
          bibNumber: targetBib,
          metricValue: randomTime,
        }),
      });
    } catch (e) {
      // Fallback
    }

    setTimeout(() => {
      const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      // Update station reading
      setBleStations((prev) =>
        prev.map((s) =>
          s.id === stationId
            ? {
                ...s,
                status: "CONNECTED",
                lastReading: { bibNumber: targetBib, value: randomTime, timestamp: nowTime },
              }
            : s
        )
      );

      // Update athlete time
      setAthletes((prev) =>
        prev.map((a) => {
          if (a.bibNumber === targetBib) {
            return {
              ...a,
              checkInStatus: "Completed",
              fortyTime: stationId === "ble_40" ? randomTime : a.fortyTime,
              shuttleTime: stationId === "ble_shuttle" ? randomTime : a.shuttleTime,
            };
          }
          return a;
        })
      );

      setIsSimulatingBle(false);
    }, 500);
  };

  const handleIssueVerifiedBadge = (bibNumber: number) => {
    const newBadgeId = `BADGE-COMBINE-${Date.now().toString().slice(-6)}`;
    setAthletes((prev) =>
      prev.map((a) =>
        a.bibNumber === bibNumber
          ? {
              ...a,
              badgeIssued: true,
              verifiedBadgeId: newBadgeId,
            }
          : a
      )
    );

    // Add SMS log
    const target = athletes.find((a) => a.bibNumber === bibNumber);
    if (target) {
      const newSms: ParentSmsLog = {
        id: `sms_${Date.now()}`,
        bibNumber: target.bibNumber,
        athleteName: target.athleteName,
        parentPhone: target.parentPhone,
        messageText: `GRIDIRON COMBINE: Official Verified Badge Issued (#${newBadgeId}) for ${target.athleteName}! 40-Yard: ${target.fortyTime || 4.52}s. Direct pushed to ARMS & Teamworks CRM pipe.`,
        status: "DELIVERED",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      setSmsLogs((prev) => [newSms, ...prev]);
    }
  };

  const handleSendParentSms = (athlete: CombineAthleteBib) => {
    const newSms: ParentSmsLog = {
      id: `sms_${Date.now()}`,
      bibNumber: athlete.bibNumber,
      athleteName: athlete.athleteName,
      parentPhone: athlete.parentPhone,
      messageText: `GRIDIRON COMBINE: Instant Scorecard for ${athlete.athleteName} (Bib #${athlete.bibNumber}). 40: ${athlete.fortyTime || "--"}s | Shuttle: ${athlete.shuttleTime || "--"}s | Vert: ${athlete.verticalJump || "--"}\". View Live Badge: https://gridiron.app/combine/${athlete.bibNumber}`,
      status: "DELIVERED",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    setSmsLogs((prev) => [newSms, ...prev]);
  };

  const filteredAthletes = athletes
    .filter((a) => {
      const matchesSearch = a.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) || a.bibNumber.toString().includes(searchTerm);
      const matchesPosition = positionFilter === "ALL" || a.position === positionFilter;
      return matchesSearch && matchesPosition;
    })
    .sort((a, b) => {
      if (leaderboardFilter === "40") return (a.fortyTime || 99) - (b.fortyTime || 99);
      if (leaderboardFilter === "shuttle") return (a.shuttleTime || 99) - (b.shuttleTime || 99);
      if (leaderboardFilter === "vertical") return (b.verticalJump || 0) - (a.verticalJump || 0);
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-100 space-y-8 animate-fadeIn">
      {/* Event Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-wide uppercase">
              <Smartphone className="w-3.5 h-3.5" /> Feature 12 — Event-Day Live Combine Mode
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Live iPad & Mobile Combine Controller
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Turns every camp operator into a distribution channel. iPad/mobile app view for bib check-in, laser-timer BLE Bluetooth sync, live public leaderboards, instant parent SMS results, and same-day verified-badge issuance.
            </p>
          </div>

          <div className="shrink-0 space-y-2 text-right">
            <select
              value={selectedCombine}
              onChange={(e) => setSelectedCombine(e.target.value)}
              className="bg-slate-950 text-amber-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-amber-500/40 shadow-inner focus:outline-none"
            >
              <option>Rivals All-American Combine - Atlanta, GA</option>

              <option>The Opening Regional - Dallas, TX</option>
              <option>Gridiron Gateway D1 Mega Camp - Columbus, OH</option>
            </select>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
              <Radio className="w-3 h-3 animate-pulse" /> 4 BLE Laser Gates Live • 120 Athletes
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab("checkin")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "checkin"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Bib Check-In & Physicals</span>
        </button>

        <button
          onClick={() => setActiveTab("ble_timer")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "ble_timer"
              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Laser-Timer BLE Sync (4 Gates)</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "leaderboard"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Live Public Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveTab("sms_logs")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "sms_logs"
              ? "bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20 font-extrabold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Parent SMS Dispatch ({smsLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: BIB CHECK-IN & PHYSICAL MEASUREMENTS */}
      {activeTab === "checkin" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Athlete Search & List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" /> Event Roster & Bibs
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Bib #101-120</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search bib # or athlete name..."
                value={searchTerm}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 rounded-xl text-xs border border-slate-800 focus:outline-none focus:border-amber-500/50 text-white"
              />
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {athletes
                .filter(
                  (a) =>
                    a.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    a.bibNumber.toString().includes(searchTerm)
                )
                .map((athlete) => (
                  <div
                    key={athlete.bibNumber}
                    onClick={() => setSelectedBib(athlete.bibNumber)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBib === athlete.bibNumber
                        ? "bg-amber-950/40 border-amber-500/50 shadow-md"
                        : "bg-slate-950 border-slate-800 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-extrabold text-xs flex items-center justify-center border border-amber-500/40">
                        #{athlete.bibNumber}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-white leading-tight">{athlete.athleteName}</p>
                        <p className="text-[10px] text-slate-400">
                          {athlete.position} • {athlete.highSchool} ('{athlete.gradClass.toString().slice(-2)})
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        athlete.checkInStatus === "Completed"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : athlete.checkInStatus === "Testing"
                          ? "bg-amber-500/20 text-amber-400 animate-pulse"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {athlete.checkInStatus}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Active Bib Detail & Measurement Station */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  #{activeAthlete.bibNumber}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">{activeAthlete.athleteName}</h2>
                  <p className="text-xs text-slate-300">
                    {activeAthlete.position} • {activeAthlete.highSchool} • Class of {activeAthlete.gradClass}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBibCheckIn(activeAthlete.bibNumber)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>One-Tap Check-In</span>
                </button>
              </div>
            </div>

            {/* Physical Measurements Grid */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Event Physical Measurements (Verified Station)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Height</span>
                  <p className="text-lg font-black text-white">
                    {Math.floor(activeAthlete.heightInches / 12)}'{activeAthlete.heightInches % 12}"
                  </p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Laser Measured</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Weight</span>
                  <p className="text-lg font-black text-white">{activeAthlete.weightLbs} lbs</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Calibrated Scale</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Hand Size</span>
                  <p className="text-lg font-black text-white">{activeAthlete.handSizeInches}"</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Caliper Checked</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Arm Length</span>
                  <p className="text-lg font-black text-white">{activeAthlete.armLengthInches}"</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Caliper Checked</span>
                </div>
              </div>
            </div>

            {/* Same-Day Verified Badge Issuer */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-xs text-white">Same-Day Cryptographic Verified Badge</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {activeAthlete.badgeIssued
                    ? `Badge Active: #${activeAthlete.verifiedBadgeId} • Pushed to ARMS/Teamworks CRM`
                    : "Issue tamper-proof verified badge for today's combine metrics."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleIssueVerifiedBadge(activeAthlete.bibNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                    activeAthlete.badgeIssued
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{activeAthlete.badgeIssued ? "Badge Issued ✓" : "Issue Verified Badge"}</span>
                </button>
                <button
                  onClick={() => handleSendParentSms(activeAthlete)}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SMS Parent</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LASER-TIMER BLE SYNC */}
      {activeTab === "ble_timer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bleStations.map((station) => (
              <div
                key={station.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                      <Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">{station.stationName}</h3>
                      <p className="text-[10px] text-slate-400 font-mono">{station.deviceHardware}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase">
                    {station.status}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Last Laser Triggered Reading:</span>
                    <span className="text-slate-300 font-mono">{station.lastReading?.timestamp || "Standby"}</span>
                  </div>

                  {station.lastReading ? (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-300">
                        Bib <strong className="text-amber-400">#{station.lastReading.bibNumber}</strong>
                      </span>
                      <p className="text-2xl font-black text-emerald-400 font-mono">
                        {station.lastReading.value}
                        <span className="text-xs text-slate-400 font-normal ml-1">
                          {station.metricType.includes("Jump") ? '"' : "s"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Waiting for laser gate break...</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3">
                    <span>BLE Battery: {station.batteryLevel}%</span>
                    <span>Signal: {station.signalDbm} dBm</span>
                  </div>

                  <button
                    onClick={() => handleTriggerBleLaser(station.id)}
                    disabled={isSimulatingBle}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Simulate Laser Gate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE PUBLIC LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Live Event Public Leaderboard
              </h3>
              <p className="text-xs text-slate-400">Instant real-time standings updated via laser gates.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setLeaderboardFilter("40")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    leaderboardFilter === "40" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  40-Yard Dash
                </button>
                <button
                  onClick={() => setLeaderboardFilter("shuttle")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    leaderboardFilter === "shuttle" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Pro Shuttle
                </button>
                <button
                  onClick={() => setLeaderboardFilter("vertical")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    leaderboardFilter === "vertical" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Vertical Jump
                </button>
              </div>

              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="bg-slate-950 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-bold"
              >
                <option value="ALL">All Positions</option>
                <option value="QB">QB</option>
                <option value="WR">WR</option>
                <option value="OT">OT</option>
                <option value="DT">DT</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Bib #</th>
                  <th className="p-3">Athlete</th>
                  <th className="p-3">Pos / Class</th>
                  <th className="p-3">40-Yard Laser</th>
                  <th className="p-3">5-10-5 Shuttle</th>
                  <th className="p-3">Vertical Jump</th>
                  <th className="p-3 text-right">Verified Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredAthletes.map((athlete, idx) => (
                  <tr key={athlete.bibNumber} className="hover:bg-slate-950/40">
                    <td className="p-3 font-black text-amber-400">#{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-white">#{athlete.bibNumber}</td>
                    <td className="p-3 font-extrabold text-white">{athlete.athleteName}</td>
                    <td className="p-3 text-slate-300">
                      {athlete.position} ('{athlete.gradClass.toString().slice(-2)})
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-400">
                      {athlete.fortyTime ? `${athlete.fortyTime}s` : "--"}
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      {athlete.shuttleTime ? `${athlete.shuttleTime}s` : "--"}
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      {athlete.verticalJump ? `${athlete.verticalJump}"` : "--"}
                    </td>
                    <td className="p-3 text-right">
                      {athlete.badgeIssued ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          ✓ Verified Gold
                        </span>
                      ) : (
                        <button
                          onClick={() => handleIssueVerifiedBadge(athlete.bibNumber)}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300"
                        >
                          Issue Badge
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PARENT SMS DISPATCH LOGS */}
      {activeTab === "sms_logs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" /> Instant Parent SMS Scorecard Dispatch
            </h3>
            <span className="text-xs text-slate-400 font-mono">Delivered: {smsLogs.length}</span>
          </div>

          <div className="space-y-3">
            {smsLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">{log.athleteName}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 font-mono">Bib #{log.bibNumber}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono">{log.parentPhone}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2 rounded border border-slate-800/80">
                    "{log.messageText}"
                  </p>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">
                    {log.status}
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
