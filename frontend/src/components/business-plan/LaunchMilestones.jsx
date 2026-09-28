import React from 'react';
import { Flag, Compass, Play, Activity, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function LaunchMilestones({ milestones }) {
  if (!milestones || !Array.isArray(milestones)) return null;

  const groupIcons = {
    'PRE-LAUNCH': Compass,
    'INITIAL LAUNCH': Play,
    'EARLY OPERATIONS': Activity,
    'REVIEW & IMPROVEMENT': TrendingUp
  };

  const groupColors = {
    'PRE-LAUNCH': 'text-cyan-400 border-cyan-800/80 bg-cyan-950/20',
    'INITIAL LAUNCH': 'text-amber-400 border-amber-800/80 bg-amber-950/20',
    'EARLY OPERATIONS': 'text-emerald-400 border-emerald-800/80 bg-emerald-950/20',
    'REVIEW & IMPROVEMENT': 'text-orange-400 border-orange-800/80 bg-orange-950/20'
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.6
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Operational Milestones
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Milestone Planner
          </h2>
          <p className="text-xs text-emerald-200/70">
            Qualitative milestones spanning pre-launch preparation, initial pilot inception, and ongoing review
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block max-w-xs">
            Milestones focus on validation checkpoints rather than arbitrary numerical targets or artificial deadlines.
          </span>
        </div>
      </div>

      {/* 4 Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {milestones.map((grp, idx) => {
          const Icon = groupIcons[grp.group] || Flag;
          const colorClass = groupColors[grp.group] || 'text-emerald-400 border-emerald-800 bg-emerald-950/20';

          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[#144233] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border shrink-0 ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        {grp.group}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {grp.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-emerald-200/70 italic leading-relaxed">
                  {grp.objective}
                </p>

                <div className="pt-1 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Milestone Checkpoints:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {grp.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
