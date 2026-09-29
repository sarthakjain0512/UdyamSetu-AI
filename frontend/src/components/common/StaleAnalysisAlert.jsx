import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function StaleAnalysisAlert({ onRefresh, isRefreshing = false, moduleName = 'analysis' }) {
  return (
    <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-start sm:items-center gap-2.5 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <span className="font-bold text-amber-300 text-sm block">Inputs Changed — Stale Analysis Detected</span>
          <span className="text-emerald-100/80 leading-relaxed">
            This {moduleName} was generated from an earlier version of your business inputs. Review the current parameters and refresh when ready.
          </span>
        </div>
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Analysis</span>
        </button>
      )}
    </div>
  );
}
