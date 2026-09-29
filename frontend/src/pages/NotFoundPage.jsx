import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-4xl font-bold text-[#17211B]">404 — Page Not Found</h1>
      <p className="text-[#647067] text-sm">The requested UdyamSetu AI module route does not exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0f3e22] text-white font-bold text-xs shadow-sm transition-colors">
        <Home className="w-4 h-4" /> Return to Dashboard
      </Link>
    </div>
  );
}
