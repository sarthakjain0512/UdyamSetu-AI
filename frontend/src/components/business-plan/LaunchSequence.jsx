import React from 'react';
import { 
  CheckCircle2, Clock, ArrowRight, Play, Eye, 
  RefreshCw, TrendingUp, Layers, Compass 
} from 'lucide-react';

export default function LaunchSequence({ sequence }) {
  if (!sequence || !Array.isArray(sequence)) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.5
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Phased Execution Model
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Sequential Launch Roadmap
          </h2>
          <p className="text-xs text-emerald-200/70">
            A disciplined 9-stage operational progression from concept validation to pilot launch and sustainable scale
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block max-w-xs">
            Stages are planning sequences without fixed duration guarantees or arbitrary financial quotas.
          </span>
        </div>
      </div>

      {/* 9-Step Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sequence.map((stage) => {
          const isDone = stage.status.includes('Completed') || stage.status.includes('Analyzed') || stage.status.includes('Sized') || stage.status.includes('Identified') || stage.status.includes('Assessed') || stage.status.includes('Defined');
          const isNotAvailable = stage.status.includes('Not available');

          return (
            <div 
              key={stage.step}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isDone 
                  ? 'bg-[#071913] border-emerald-800/80 shadow-md' 
                  : (isNotAvailable 
                      ? 'bg-slate-900/40 border-dashed border-slate-800' 
                      : 'bg-[#071913]/70 border-[#18533e]')
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="w-7 h-7 rounded-xl bg-black/50 border border-[#18533e] text-xs font-black text-amber-400 flex items-center justify-center">
                    {stage.step}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isDone 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                      : (isNotAvailable ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-amber-950 text-amber-300 border-amber-800')
                  }`}>
                    {stage.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {stage.title}
                </h3>

                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#144233] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Focus Actions:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {stage.actions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
