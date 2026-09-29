import React from 'react';
import { CheckCircle2, AlertTriangle, Circle, MinusCircle } from 'lucide-react';

export default function ModuleStatusBadge({ status, isStale, size = 'sm' }) {
  const resolvedStatus = isStale ? 'stale' : status;

  switch (resolvedStatus) {
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-50 text-[#16803C] border border-emerald-200 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <CheckCircle2 className={size === 'xs' ? 'w-3 h-3 text-[#16803C]' : 'w-3.5 h-3.5 text-[#16803C]'} />
          <span>Completed</span>
        </span>
      );

    case 'stale':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-50 text-[#C87512] border border-amber-200 ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <AlertTriangle className={size === 'xs' ? 'w-3 h-3 text-[#C87512]' : 'w-3.5 h-3.5 text-[#C87512]'} />
          <span>Needs Refresh</span>
        </span>
      );

    case 'not_started':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-stone-100 text-[#647067] border border-[#DDE5DD] ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <Circle className={size === 'xs' ? 'w-2.5 h-2.5 text-stone-400' : 'w-3 h-3 text-stone-400'} />
          <span>Pending</span>
        </span>
      );

    case 'unavailable':
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-stone-100 text-[#647067] border border-[#DDE5DD] ${
          size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}>
          <MinusCircle className={size === 'xs' ? 'w-2.5 h-2.5 text-stone-400' : 'w-3 h-3 text-stone-400'} />
          <span>Not Available</span>
        </span>
      );
  }
}
