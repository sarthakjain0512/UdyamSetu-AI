import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-slate-400 text-sm">The requested UdyamSetu AI module route does not exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">
        <Home className="w-4 h-4" /> Return to Overview
      </Link>
    </div>
  );
}
