import React from 'react';
import { Calendar, Clock, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export default function AdvisoryActionPlanSection({ actionPlan }) {
  if (!actionPlan) return null;

  const { now = [], beforeFinancing = [], beforeLaunch = [] } = actionPlan;

  const phases = [
    {
      key: 'now',
      title: 'Phase 1: Immediate Field Validation (Now)',
      badge: 'Immediate Action',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Zero-capital market discovery and quotation validation before filing applications',
      items: now
    },
    {
      key: 'beforeFinancing',
      title: 'Phase 2: Formal Sanction & Scheme Filing (Before Financing)',
      badge: 'Credit & Registration',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      description: 'Formal bank branch engagement, portal filing, and statutory MSME certification',
      items: beforeFinancing
    },
    {
      key: 'beforeLaunch',
      title: 'Phase 3: Operational Setup & Pilot Sales (Before Launch)',
      badge: 'Commercial Launch',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Machinery commissioning, municipal clearances, and trial supply to first buyers',
      items: beforeLaunch
    }
  ];

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.5
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Phased Execution Action Plan
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Suggested prototype action plan — sequential milestones from validation to commercial supply
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Suggested Prototype Roadmap
        </span>
      </div>

      {/* Advisory Notice */}
      <div className="p-3.5 rounded-xl bg-[#071913] border border-[#154636] text-xs text-emerald-200/80 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Prototype Action Plan Note:</strong> These steps represent general recommended practices for rural micro-enterprises. Actions are illustrative guidelines and should be adapted to local village administrative procedures.
        </p>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-5">
        {phases.map((phase, pIdx) => (
          <div
            key={phase.key}
            className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#144233] pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {phase.title}
                </h4>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">
                  {phase.description}
                </p>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider w-fit ${phase.badgeColor}`}>
                {phase.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {phase.items.map((action, aIdx) => (
                <div
                  key={action.id || aIdx}
                  className="p-3.5 rounded-xl bg-[#0a2018] border border-[#164434] space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-300 flex items-center justify-center shrink-0">
                        {aIdx + 1}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-emerald-400/60 font-mono">
                        {action.source}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white">
                      {action.title}
                    </h5>

                    <p className="text-[11px] text-emerald-200/70 leading-relaxed font-sans">
                      {action.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
