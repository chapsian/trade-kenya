import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, FileCheck2, Leaf, MapPin, Search, ShieldCheck } from 'lucide-react';
import {
  BadgeId,
  KENYAN_SUPPLIERS,
  KenyanSupplier,
  VERIFICATION_BADGES,
} from '../data/kenyaMarketplace';

interface LocalSuppliersSectionProps {
  onInspectCertificate: (supplier: KenyanSupplier) => void;
  onContactSupplier: (supplier: KenyanSupplier) => void;
}

export const getBadgeIcon = (badgeId: BadgeId) => {
  switch (badgeId) {
    case 'kebs-diamond':
      return <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />;
    case 'epb-export-ready':
      return <Award className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />;
    case 'origin-sustainable':
      return <Leaf className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />;
  }
};

export const getBadgeTitle = (badgeId: BadgeId): string => {
  return VERIFICATION_BADGES.find((b) => b.id === badgeId)?.title ?? badgeId;
};

export const LocalSuppliersSection: React.FC<LocalSuppliersSectionProps> = ({
  onInspectCertificate,
  onContactSupplier,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<'all' | BadgeId>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    status: 'idle' | 'found' | 'not-found';
    supplier?: KenyanSupplier;
    queried?: string;
  }>({ status: 'idle' });

  const regions = useMemo(
    () => ['all', 'Central & Mount Kenya', 'Rift Valley', 'Nairobi EPZ', 'Coast & Mombasa'],
    []
  );

  const filteredSuppliers = useMemo(() => {
    return KENYAN_SUPPLIERS.filter((sup) => {
      const badgeMatch = selectedBadge === 'all' || sup.badges.includes(selectedBadge);
      const regionMatch = selectedRegion === 'all' || sup.region === selectedRegion;
      return badgeMatch && regionMatch;
    });
  }, [selectedBadge, selectedRegion]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = lookupCode.trim().toUpperCase();
    if (!cleaned) {
      setLookupResult({ status: 'idle' });
      return;
    }
    const found = KENYAN_SUPPLIERS.find((s) => s.verificationCode.toUpperCase() === cleaned);
    if (found) {
      setLookupResult({ status: 'found', supplier: found, queried: cleaned });
    } else {
      setLookupResult({ status: 'not-found', queried: cleaned });
    }
  };

  const handleQuickLookup = (code: string) => {
    setLookupCode(code);
    const found = KENYAN_SUPPLIERS.find((s) => s.verificationCode === code);
    if (found) {
      setLookupResult({ status: 'found', supplier: found, queried: code });
    }
  };

  return (
    <section
      id="local-suppliers"
      aria-labelledby="local-suppliers-heading"
      className="py-14 bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Registry Lookup */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700 mb-2">
              Local Suppliers Verification System
            </p>
            <h2
              id="local-suppliers-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance"
            >
              Verified Kenyan Suppliers &amp; Export Compliance Badges
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every Kenyan supplier displaying a tradeKenya verification badge has undergone physical
              facility, KRA customs export, or KEBS/KEPHIS quality certification checks before
              connecting with overseas buyers.
            </p>
          </div>

          {/* Instant Registration Code Checker */}
          <div className="w-full lg:w-[420px] bg-slate-50 border border-slate-200 rounded-xl p-5">
            <label
              htmlFor="supplier-code-lookup"
              className="block text-sm font-semibold text-slate-900 mb-2"
            >
              Verify Kenyan Supplier Certificate ID
            </label>
            <form onSubmit={handleLookupSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="supplier-code-lookup"
                  type="text"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  placeholder="e.g. TK-KEBS-2048"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify
              </button>
            </form>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Sample IDs:</span>
              {['TK-KEBS-2048', 'TK-EPB-1192', 'TK-ORG-3305'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleQuickLookup(sample)}
                  className="font-mono-tabular text-teal-700 hover:underline cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>

            {lookupResult.status === 'found' && lookupResult.supplier && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-slate-800 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                    <span>Active Verified Kenyan Supplier</span>
                  </div>
                  <p className="mt-1 font-medium text-slate-900">{lookupResult.supplier.name}</p>
                  <p className="text-slate-600">
                    {lookupResult.supplier.county} · Audited {lookupResult.supplier.auditDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectCertificate(lookupResult.supplier!)}
                  className="text-xs font-semibold text-teal-800 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Sheet
                </button>
              </div>
            )}

            {lookupResult.status === 'not-found' && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                No verified Kenyan supplier record matched <span className="font-mono-tabular font-semibold">{lookupResult.queried}</span>. Try TK-KEBS-2048 or TK-EPB-1192.
              </div>
            )}
          </div>
        </div>

        {/* 3 Verification Badge Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-slate-200">
          {VERIFICATION_BADGES.map((badge) => {
            const isSelected = selectedBadge === badge.id;
            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => setSelectedBadge(isSelected ? 'all' : badge.id)}
                className={`text-left p-5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700 ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {getBadgeIcon(badge.id)}
                    <h3 className="text-base font-bold text-slate-900">{badge.title}</h3>
                  </div>
                  <span className="font-mono-tabular text-xs text-slate-500">{badge.codePrefix}</span>
                </div>
                <p className="text-xs font-medium text-teal-800 mb-2">{badge.authority}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{badge.criteria}</p>
                <p className="mt-3 text-xs text-slate-500">Audit cycle: {badge.auditCycle}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Filter Controls */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by verification badge">
            <button
              type="button"
              onClick={() => setSelectedBadge('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedBadge === 'all'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Verified Badges
            </button>
            {VERIFICATION_BADGES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBadge(b.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedBadge === b.id
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {b.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="region-filter" className="text-xs font-medium text-slate-600 whitespace-nowrap">
              Kenyan Region:
            </label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Kenyan Regions' : region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Verified Kenyan Suppliers Grid */}
        {filteredSuppliers.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-medium text-slate-700">
              No verified Kenyan suppliers matched your current badge and region filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBadge('all');
                setSelectedRegion('all');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-teal-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Reset Supplier Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSuppliers.map((supplier) => (
              <article
                key={supplier.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-teal-600/50 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span>{supplier.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Est. {supplier.established}</span>
                        <span aria-hidden="true">·</span>
                        <span>{supplier.membershipGrade} Grade</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{supplier.name}</h3>
                    </div>
                    <span className="font-mono-tabular text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
                      {supplier.verificationCode}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{supplier.county}</span>
                    <span aria-hidden="true">·</span>
                    <span>{supplier.exportPorts}</span>
                  </div>

                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                    {supplier.primaryProducts}
                  </p>

                  {/* Official Verification Badges (Icon + Explicit Text, zero pill clutter) */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      Active Verification Badges
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {supplier.badges.map((badgeId) => (
                        <div key={badgeId} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800">
                          {getBadgeIcon(badgeId)}
                          <span>{getBadgeTitle(badgeId)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span>
                      Response:{' '}
                      <strong className="font-mono-tabular text-slate-900">
                        {supplier.responseRate}%
                      </strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Avg Reply:{' '}
                      <strong className="font-mono-tabular text-slate-900">
                        {supplier.avgResponseHours}h
                      </strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Capacity:{' '}
                      <strong className="font-mono-tabular text-slate-900">
                        {supplier.annualCapacity}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectCertificate(supplier)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Verify Certificate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onContactSupplier(supplier)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Contact Supplier
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
