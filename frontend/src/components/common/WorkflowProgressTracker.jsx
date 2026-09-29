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
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#DDE5DD] shadow-sm print:hidden">
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <span className="text-[11px] font-bold text-[#14532D] uppercase tracking-wider flex items-center gap-1.5">
          <span>Analysis Workflow Progress</span>
        </span>
        <span className="text-[10px] text-[#0F766E] font-medium bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
          Canonical Session Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stg) => {
          const Icon = stg.icon;
          const statusInfo = moduleStatuses?.[stg.key] || { status: 'not_started' };
          const isCurrent = location.pathname === stg.route || currentStage === stg.key;
          const isCompleted = statusInfo.status === 'completed';
          const isStale = Boolean(statusInfo.isStale);

          let borderStyle = 'border-[#DDE5DD] bg-stone-50/60 hover:bg-stone-50';
          let textColor = 'text-[#647067]';
          let iconColor = 'text-[#647067]';

          if (isCurrent) {
            borderStyle = 'border-[#E58A24] bg-amber-50/70 shadow-sm ring-1 ring-[#E58A24]/60';
            textColor = 'text-[#17211B] font-bold';
            iconColor = 'text-[#E58A24]';
          } else if (isCompleted) {
            borderStyle = 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60';
            textColor = 'text-[#14532D] font-semibold';
            iconColor = 'text-[#16803C]';
          } else if (isStale) {
            borderStyle = 'border-amber-300 bg-amber-50/40';
            textColor = 'text-[#C87512] font-semibold';
            iconColor = 'text-[#C87512]';
          }

          return (
            <Link
              key={stg.key}
              to={stg.route}
              className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between space-y-1 ${borderStyle}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`text-[11px] truncate ${textColor}`}>
                  {stg.label}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} />
                )}
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
