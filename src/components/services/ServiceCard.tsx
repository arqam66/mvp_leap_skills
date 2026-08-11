'use client';

import React from 'react';
import { Service, ServiceFormat } from '../../types';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  const format = service.format || (service.type as ServiceFormat) || 'one_on_one';

  const formatBadges: Record<string, { label: string; bg: string; text: string }> = {
    one_on_one: { label: '1:1 Session', bg: 'bg-indigo-50 dark:bg-indigo-950/60', text: 'text-indigo-700 dark:text-indigo-300' },
    webinar: { label: 'Live Webinar', bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-300' },
    cohort: { label: 'Cohort Course', bg: 'bg-purple-50 dark:bg-purple-950/60', text: 'text-purple-700 dark:text-purple-300' },
    package: { label: 'Bundle Package', bg: 'bg-amber-50 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-300' },
    paid_dm: { label: 'Priority Paid DM', bg: 'bg-rose-50 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300' },
  };

  const badge = formatBadges[format] || formatBadges.one_on_one;

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border border-current/20 ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
          <div className="font-mono font-extrabold text-xl text-slate-950 dark:text-white">
            ${service.price}
          </div>
        </div>

        <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>
      </div>

      <div>
        {/* Detail Meta */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          {service.duration && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>{service.duration}</span>
            </div>
          )}
          {service.capacity && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              <span>{service.capacity} seats max</span>
            </div>
          )}
          {format === 'paid_dm' && (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>24h SLA Response</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onBook(service)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer active:scale-[0.98]"
        >
          {format === 'paid_dm' ? 'Send Priority DM' : format === 'webinar' ? 'Reserve Seat' : 'Book Session'}
        </button>
      </div>
    </div>
  );
}
