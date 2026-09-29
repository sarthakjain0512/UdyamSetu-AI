import React from 'react';
import { CheckCircle2, AlertTriangle, Circle, MinusCircle } from 'lucide-react';

export default function ModuleStatusBadge({ status, isStale, size = 'sm' }) {
  const resolvedStatus = isStale ? 'stale' : status;

  switch (resolvedStatus) {
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1 font-bold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <CheckCircle2 className={size === 'xs' ? 'w-3 h-3 text-emerald-400' : 'w-3.5 h-3.5 text-emerald-400'} />
          <span>Completed</span>
        </span>
      );

    case 'stale':
      return (
        <span className={`inline-flex items-center gap-1 font-bold rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/80 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <AlertTriangle className={size === 'xs' ? 'w-3 h-3 text-amber-400' : 'w-3.5 h-3.5 text-amber-400'} />
          <span>Needs Refresh</span>
        </span>
      );

    case 'not_started':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-900/80 text-slate-400 border border-slate-700/80 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <Circle className={size === 'xs' ? 'w-3 h-3 text-slate-500' : 'w-3.5 h-3.5 text-slate-500'} />
          <span>Not Started</span>
        </span>
      );

    case 'unavailable':
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-900/40 text-slate-500 border border-slate-800 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <MinusCircle className={size === 'xs' ? 'w-3 h-3 text-slate-600' : 'w-3.5 h-3.5 text-slate-600'} />
          <span>Unavailable</span>
        </span>
      );
  }
}
