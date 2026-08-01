import React from "react";
import { Server, Database, Shield, Cpu, Code2, Layers, CheckCircle } from "lucide-react";

export const TechDocsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white space-y-8">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Code2 className="w-3.5 h-3.5" /> Principal Software Architect Specification
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Gridiron Gateway Architectural & Engineering Blueprint
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Full-stack system architecture, database schema, and production scaling roadmap.
        </p>
      </div>

      {/* TECH STACK RECOMMENDATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="font-extrabold text-base text-white">Frontend Architecture</h2>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong>React 19 + TypeScript:</strong> Single-Page Application (SPA) runtime.</li>
            <li>• <strong>Vite:</strong> Ultra-fast modern build engine.</li>
            <li>• <strong>Tailwind CSS v4:</strong> Dark-mode athletic design system.</li>
            <li>• <strong>Motion:</strong> Smooth layout transitions.</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="font-extrabold text-base text-white">Backend & Proxy Layer</h2>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong>Node.js + Express:</strong> High-throughput API gateway.</li>
            <li>• <strong>Server-Side Gemini 3.6 Flash:</strong> AI email drafting & scouting evaluations without client API key leakage.</li>
            <li>• <strong>esbuild + tsx:</strong> Production bundle compilation to single CommonJS artifact.</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="font-extrabold text-base text-white">Database & Persistence</h2>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong>Google Firestore / PostgreSQL:</strong> Structured document storage for Athlete Profiles, Offers, and Camp listings.</li>
            <li>• <strong>Cloud Storage / Hudl Integration:</strong> Direct video embedding and laser combine verification hashes.</li>
          </ul>
        </div>
      </div>

      {/* DATABASE SCHEMAS OVERVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" /> Database Schemas (Recruits & Camps Collections)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase block">Collection: `athletes`</span>
            <pre className="text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed p-2 bg-slate-900 rounded">
{`{
  id: string, // UUID
  fullName: string,
  primaryPosition: "QB" | "WR" | "OT" | ...,
  gradClass: 2025 | 2026 | 2027,
  heightFeet: number,
  heightInches: number,
  weightLbs: number,
  fortyTime: number, // e.g. 4.48s
  fortyTimingType: "Laser Timed" | "Hand Timed",
  coreGpa: number, // NCAA Core GPA
  hudlUrl: string,
  offers: [{ schoolName, division, date, status }],
  ncaaEligibilityId: string,
  verifiedCoachViewsCount: number
}`}
            </pre>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold uppercase block">Collection: `camps`</span>
            <pre className="text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed p-2 bg-slate-900 rounded">
{`{
  id: string,
  name: string, // e.g. "Mercer Mega Camp"
  host: string,
  division: "FBS" | "FCS" | "DII" | ...,
  campType: "Mega Camp" | "Combine",
  city: string,
  state: string,
  zipCode: string,
  date: string, // YYYY-MM-DD
  cost: number,
  rating: number,
  registerUrl: string
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
