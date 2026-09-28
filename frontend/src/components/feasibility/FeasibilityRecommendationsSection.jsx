import React from 'react';
import { Lightbulb, CheckSquare, Compass, ArrowRight } from 'lucide-react';

export default function FeasibilityRecommendationsSection({ recommendations = [] }) {
  const defaultRecs = [
    {
      step: 1,
      title: 'Validate Local Demand with Potential Customers',
      desc: 'Conduct informal pre-orders or sample tastings/demos with 15–20 local households or shopkeepers in your target locality before signing leases or buying inventory.'
    },
    {
      step: 2,
      title: 'Confirm Input Supplier Terms & Reliable Delivery',
      desc: 'Identify at least 2 primary suppliers for key inputs within a 15–30 km radius. Secure clear price sheets and credit cycle terms.'
    },
    {
      step: 3,
      title: 'Obtain Realistic Equipment Quotations',
      desc: 'Collect 2–3 written quotations for essential machinery and tools from certified regional manufacturers or authorized dealers.'
    },
    {
      step: 4,
      title: 'Calculate Actual Operating Costs & Buffer',
      desc: 'Build a tight monthly budget incorporating electricity tariffs, helper wages, packaging, and a 10% contingency reserve for seasonal slumps.'
    },
    {
      step: 5,
      title: 'Confirm Applicable Government Scheme Eligibility',
      desc: 'Review interest subvention and capital subsidy criteria under PMEGP or MUDRA in the upcoming Financial Planning and Scheme Router modules.'
    },
    {
      step: 6,
      title: 'Start with a Controlled Pilot Batch',
      desc: 'Commence micro-scale operations with existing margin capital before drawing down maximum debt to validate operational unit economics.'
    }
  ];

  const items = (recommendations && recommendations.length > 0)
    ? recommendations.map((r, i) => {
        if (typeof r === 'string') {
          return { step: i + 1, title: r, desc: 'Recommended practical milestone before capital deployment.' };
        }
        return { step: i + 1, title: r.title || r.action, desc: r.desc || r.detail };
      })
    : defaultRecs;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              10. Practical Feasibility Recommendations
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Actionable preparatory roadmap to de-risk operations prior to financial debt commitment.
          </p>
        </div>
        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Preparatory Steps
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-emerald-50/20 hover:border-emerald-200 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.step || idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs text-stone-500">
          <strong>Advisory Note:</strong> These recommendations are guidance principles for rural micro-entrepreneurs to reduce downside risk. They do not constitute official statutory directives or mandatory government prerequisites.
        </div>
      </div>
    </div>
  );
}
