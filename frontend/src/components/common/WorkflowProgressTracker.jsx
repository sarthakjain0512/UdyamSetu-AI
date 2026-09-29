import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusCircle, TrendingUp, ShieldCheck, Calculator, 
  Landmark, Sparkles, FileText, CheckCircle2, AlertTriangle, Circle 
} from 'lucide-react';
import ModuleStatusBadge from './ModuleStatusBadge';

export default function WorkflowProgressTracker({ moduleStatuses, currentStage }) {
  const location = useLocation();

  const stages = [
    { key: 'intake', label: '1. Intake', route: '/new-analysis', icon: PlusCircle },
    { key: 'market', label: '2. Market', route: '/market-analysis', icon: TrendingUp },
    { key: 'feasibility', label: '3. Feasibility', route: '/feasibility', icon: ShieldCheck },
    { key: 'financial', label: '4. Financials', route: '/financial-plan', icon: Calculator },
    { key: 'scheme', label: '5. Schemes', route: '/scheme-router', icon: Landmark },
    { key: 'advisory', label: '6. Advisory', route: '/advisory', icon: Sparkles },
    { key: 'businessPlan', label: '7. Launch Plan', route: '/business-plan', icon: FileText }
  ];

  return (
    <div className="bg-[#0c241b] rounded-2xl p-3 sm:p-4 border border-[#18533e] shadow-lg print:hidden">
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>Analysis Workflow Progress</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-mono">
          Canonical Session Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stg) => {
          const Icon = stg.icon;
          const statusInfo = moduleStatuses?.[stg.key] || { status: 'not_started' };
          const isCurrent = location.pathname === stg.route || currentStage === stg.key;

          return (
            <Link
              key={stg.key}
              to={stg.route}
              className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between space-y-1.5 ${
                isCurrent 
                  ? 'bg-emerald-900/60 border-amber-500 shadow-md ring-1 ring-amber-500/50' 
                  : 'bg-[#071913] border-[#18533e] hover:border-emerald-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`text-[11px] font-bold truncate ${isCurrent ? 'text-amber-300' : 'text-slate-200'}`}>
                  {stg.label}
                </span>
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-emerald-400'}`} />
              </div>

              <div className="pt-0.5">
                <ModuleStatusBadge 
                  status={statusInfo.status} 
                  isStale={statusInfo.isStale} 
                  size="xs" 
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
