import React from 'react';
import { 
  Package, 
  Cpu, 
  Boxes, 
  Users, 
  Building2, 
  Truck, 
  FileCheck2,
  AlertCircle
} from 'lucide-react';

const ICON_MAP = {
  Capital: Building2,
  Equipment: Cpu,
  'Raw Materials': Boxes,
  Workforce: Users,
  Infrastructure: Building2,
  Distribution: Truck,
  'Licensing & Compliance': FileCheck2,
};

const STATUS_STYLES = {
  Required: 'bg-rose-50 text-rose-700 border-rose-200',
  Recommended: 'bg-amber-50 text-amber-700 border-amber-200',
  'Not critical': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function ResourceRequirementsSection({ resources = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              6. Resource Requirements Checklist
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Structured operational inputs and asset dependencies necessary to launch and sustain operations.
          </p>
        </div>
        <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
          Prototype Resource Model
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((item, idx) => {
            const Icon = ICON_MAP[item.category] || Package;
            const statusStyle = STATUS_STYLES[item.status] || 'bg-stone-50 text-stone-600 border-stone-200';

            return (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-stone-100 hover:border-stone-200 bg-stone-50/40 hover:bg-white transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-stone-800">
                      {item.category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle}`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-stone-700">
                    {item.detail}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Alert */}
        <div className="mt-5 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-950">Statutory & Licensing Advisory:</span>{' '}
            Do not assume official licensing or statutory permits without direct municipal or Panchayat verification. Verify applicable local requirements (e.g., FSSAI, Udyam, Trade License, Pollution clearance) at your district DIC or local administrative office before commercial launch.
          </div>
        </div>
      </div>
    </div>
  );
}
