import React, { useState } from "react";
import { Users, Plus, MoveRight, Star, MessageSquare, CheckCircle, ChevronRight, Edit3, Trash2 } from "lucide-react";
import { MOCK_COACH_PIPELINE_PROSPECTS } from "../data/mockData";
import { CoachPipelineProspect } from "../types";

export const CoachPipelineBoard: React.FC = () => {
  const [prospects, setProspects] = useState<CoachPipelineProspect[]>(MOCK_COACH_PIPELINE_PROSPECTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProspect, setNewProspect] = useState({
    athleteName: "",
    position: "QB",
    highSchoolOrSchool: "",
    state: "TX",
    gradClass: 2026,
    stage: "Identified" as CoachPipelineProspect["stage"],
    notes: "",
  });

  const stages: CoachPipelineProspect["stage"][] = ["Identified", "Contacted", "Offered", "Committed"];

  const handleStageChange = (id: string, newStage: CoachPipelineProspect["stage"]) => {
    setProspects(
      prospects.map((p) => (p.id === id ? { ...p, stage: newStage, lastActivity: "Just now — Stage Updated" } : p))
    );
  };

  const handleAddProspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProspect.athleteName) return;

    const created: CoachPipelineProspect = {
      id: `pip-${Date.now()}`,
      athleteName: newProspect.athleteName,
      position: newProspect.position as any,
      highSchoolOrSchool: newProspect.highSchoolOrSchool || "High School",
      state: newProspect.state,
      gradClass: newProspect.gradClass,
      stage: newProspect.stage,
      rating: 5,
      notes: newProspect.notes || "Added to recruiting board.",
      lastActivity: "Just now — Added to Pipeline",
      avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    };

    setProspects([...prospects, created]);
    setShowAddModal(false);
    setNewProspect({
      athleteName: "",
      position: "QB",
      highSchoolOrSchool: "",
      state: "TX",
      gradClass: 2026,
      stage: "Identified",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-2">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            Coach Recruiting CRM & Pipeline Board
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Recruit Watchlist Pipeline</h1>
          <p className="text-xs md:text-sm text-slate-300">
            Private coach-facing Kanban board to track target prospects through recruiting stages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Target Prospect
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {stages.map((stage) => {
          const stageProspects = prospects.filter((p) => p.stage === stage);
          const stageColors = {
            Identified: "border-slate-800 bg-slate-950/40 text-slate-400",
            Contacted: "border-blue-500/30 bg-blue-950/20 text-blue-400",
            Offered: "border-amber-500/30 bg-amber-950/20 text-amber-400",
            Committed: "border-emerald-500/30 bg-emerald-950/20 text-emerald-400",
          };

          return (
            <div
              key={stage}
              className={`p-4 rounded-xl border ${stageColors[stage]} flex flex-col min-h-[420px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span>{stage}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-300 font-mono">
                    {stageProspects.length}
                  </span>
                </h3>
              </div>

              {/* Prospect Cards */}
              <div className="space-y-3 flex-1">
                {stageProspects.map((prospect) => (
                  <div
                    key={prospect.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all shadow-md group relative"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={prospect.avatarUrl}
                        alt={prospect.athleteName}
                        className="w-10 h-10 rounded-lg object-cover border border-purple-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 text-[10px] font-bold">
                            {prospect.position}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            '{prospect.gradClass}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-xs leading-tight">
                          {prospect.athleteName}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {prospect.highSchoolOrSchool} ({prospect.state})
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2 mb-3 bg-slate-950/50 p-2 rounded border border-slate-800/80">
                      "{prospect.notes}"
                    </p>

                    <div className="text-[9px] text-slate-400 mb-3">{prospect.lastActivity}</div>

                    {/* Stage Move Controls */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1 text-[10px]">
                      <span className="text-slate-400">Move:</span>
                      <div className="flex items-center gap-1">
                        {stages.map(
                          (s) =>
                            s !== prospect.stage && (
                              <button
                                key={s}
                                onClick={() => handleStageChange(prospect.id, s)}
                                className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 text-[9px] font-medium transition-colors"
                              >
                                {s[0]}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageProspects.length === 0 && (
                  <div className="h-32 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500">
                    No recruits in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add Prospect to Board</h3>
            <form onSubmit={handleAddProspect} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Athlete Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caden Carter"
                  value={newProspect.athleteName}
                  onChange={(e) => setNewProspect({ ...newProspect, athleteName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Position</label>
                  <select
                    value={newProspect.position}
                    onChange={(e) => setNewProspect({ ...newProspect, position: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="QB">QB</option>
                    <option value="WR">WR</option>
                    <option value="RB">RB</option>
                    <option value="EDGE">EDGE</option>
                    <option value="CB">CB</option>
                    <option value="OT">OT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Class Year</label>
                  <input
                    type="number"
                    value={newProspect.gradClass}
                    onChange={(e) => setNewProspect({ ...newProspect, gradClass: parseInt(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">High School & State</label>
                <input
                  type="text"
                  placeholder="e.g. Allen High School (TX)"
                  value={newProspect.highSchoolOrSchool}
                  onChange={(e) => setNewProspect({ ...newProspect, highSchoolOrSchool: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Evaluation & Scouting Notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes on film, athletic testing, coach feedback..."
                  value={newProspect.notes}
                  onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500"
                >
                  Add Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
