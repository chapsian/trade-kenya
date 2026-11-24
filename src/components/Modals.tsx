import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { CheckCircle2, MapPin, Package, ShieldCheck, X } from 'lucide-react';
import {
  BuyingRequest,
  KENYAN_CATEGORIES,
  KENYAN_SUPPLIERS,
  KenyanProduct,
  KenyanSupplier,
} from '../data/kenyaMarketplace';
import { ProductArtwork } from './ProductArtwork';
import { getBadgeIcon, getBadgeTitle } from './LocalSuppliersSection';
import { db, handleFirestoreError, MemberProfile, OperationType } from '../lib/firebase';

interface ProductDetailModalProps {
  product: KenyanProduct | null;
  onClose: () => void;
  onRequestQuote: (product: KenyanProduct) => void;
  onInspectSupplier: (supplier: KenyanSupplier) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  onInspectSupplier,
}) => {
  if (!product) return null;

  const supplier = KENYAN_SUPPLIERS.find((s) => s.id === product.supplierId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="text-xs text-slate-500 font-medium">
            {product.categoryLabel} · <span className="font-mono-tabular">HS {product.hsCode}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3]">
            <ProductArtwork variant={product.artworkVariant} />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 id="product-modal-title" className="text-xl font-bold text-slate-900">
                {product.title}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono-tabular text-2xl font-bold text-teal-800">
                  ${product.fobPriceMin.toFixed(2)} – ${product.fobPriceMax.toFixed(2)}
                </span>
                <span className="text-sm text-slate-600">/ {product.unit} (FOB)</span>
              </div>

              <dl className="mt-5 space-y-2.5 text-sm border-t border-slate-200 pt-4">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Min. Order (MOQ)</dt>
                  <dd className="font-medium text-slate-900 font-mono-tabular text-right">{product.moq}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Origin County</dt>
                  <dd className="font-medium text-slate-900 text-right">{product.county}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Port of Loading</dt>
                  <dd className="font-medium text-slate-900 text-right">{product.portOfLoading}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Export Lead Time</dt>
                  <dd className="font-medium text-slate-900 font-mono-tabular text-right">{product.leadTime}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Specification</dt>
                  <dd className="font-medium text-slate-900 text-right">{product.gradeSpec}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Export Packaging</dt>
                  <dd className="font-medium text-slate-900 text-right">{product.packaging}</dd>
                </div>
              </dl>
            </div>

            {supplier && (
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">{supplier.name}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onInspectSupplier(supplier);
                    }}
                    className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
                  >
                    Verify Certificate
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  {supplier.badges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-1 text-xs text-slate-700">
                      {getBadgeIcon(b)}
                      <span>{getBadgeTitle(b)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onRequestQuote(product)}
                className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                Request FOB Quote
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CertificateModalProps {
  supplier: KenyanSupplier | null;
  onClose: () => void;
  onContactSupplier: (supplier: KenyanSupplier) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  supplier,
  onClose,
  onContactSupplier,
}) => {
  if (!supplier) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-xl overflow-hidden">
        <div className="bg-teal-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-teal-200" aria-hidden="true" />
            <div>
              <h3 id="cert-modal-title" className="text-base font-bold">
                tradeKenya Local Supplier Verification Record
              </h3>
              <p className="text-xs text-teal-100 font-mono-tabular">
                Certificate ID: {supplier.verificationCode}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-teal-100 hover:bg-teal-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-lg font-bold text-slate-900">{supplier.name}</h4>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>{supplier.county} · {supplier.region}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            <div>
              <span className="block text-xs text-slate-500">Membership Grade</span>
              <span className="font-semibold text-slate-900">{supplier.membershipGrade}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-500">Last Physical Audit</span>
              <span className="font-semibold text-slate-900 font-mono-tabular">{supplier.auditDate}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-500">Response Rate</span>
              <span className="font-semibold text-slate-900 font-mono-tabular">
                {supplier.responseRate}% (Avg {supplier.avgResponseHours}h)
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-500">Annual Export Capacity</span>
              <span className="font-semibold text-slate-900 font-mono-tabular">{supplier.annualCapacity}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">
              Awarded Verification Badges
            </p>
            <div className="space-y-2">
              {supplier.badges.map((badgeId) => (
                <div
                  key={badgeId}
                  className="flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    {getBadgeIcon(badgeId)}
                    <span>{getBadgeTitle(badgeId)}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">Verified Active</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">
              Registered Kenyan &amp; International Accreditations
            </p>
            <p className="text-sm text-slate-700">
              {supplier.certifications.join(' · ')}
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onContactSupplier(supplier);
              }}
              className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
            >
              Send Inquiry to {supplier.name}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface InquiryContext {
  mode: 'matchmaking' | 'product-quote' | 'supplier-contact' | 'offer-rfq';
  subjectTitle?: string;
  categoryId?: string;
  buyingRequest?: BuyingRequest;
}

interface InquiryModalProps {
  context: InquiryContext | null;
  user: User | null;
  profile: MemberProfile | null;
  onClose: () => void;
  onOpenMemberAuth: (mode: 'signin' | 'signup') => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  context,
  user,
  profile,
  onClose,
  onOpenMemberAuth,
}) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [categoryId, setCategoryId] = useState(context?.categoryId || KENYAN_CATEGORIES[0].id);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (context) {
      setCategoryId(context.categoryId || KENYAN_CATEGORIES[0].id);
      setSubmittedRef(null);
      setError('');
      if (profile) {
        setCompany(profile.companyName);
        setEmail(profile.email);
        setCountry(profile.countryOrCounty);
      } else if (user?.email) {
        setEmail(user.email);
      }
    }
  }, [context, profile, user]);

  if (!context) return null;

  const headingByMode: Record<InquiryContext['mode'], string> = {
    matchmaking: 'B2B Matchmaking & Buying Inquiry',
    'product-quote': `Request FOB Quote — ${context.subjectTitle ?? 'Kenyan Product'}`,
    'supplier-contact': `Contact Verified Kenyan Supplier — ${context.subjectTitle ?? ''}`,
    'offer-rfq': `Submit Export Offer — ${context.buyingRequest?.id ?? ''}`,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (company.trim().length < 2) {
      setError('Please enter your company name (at least 2 characters).');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid business email address.');
      return;
    }
    if (!quantity.trim()) {
      setError('Please specify your estimated order quantity or volume.');
      return;
    }
    setError('');
    setSubmitting(true);
    const refId = `TK-INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      if (user && profile) {
        const path = `members/${user.uid}/inquiries/${refId}`;
        try {
          await setDoc(doc(db, 'members', user.uid, 'inquiries', refId), {
            uid: user.uid,
            referenceCode: refId,
            mode: context.mode,
            subjectTitle: (
              context.subjectTitle ||
              context.buyingRequest?.title ||
              'Kenyan Export Matchmaking'
            ).slice(0, 180),
            companyName: company.trim().slice(0, 120),
            businessEmail: email.trim().slice(0, 160),
            categoryId: categoryId.slice(0, 64),
            quantity: quantity.trim().slice(0, 100),
            destinationPort: country.trim().slice(0, 120),
            notes: message.trim().slice(0, 1000),
            status: 'Submitted',
            createdAt: serverTimestamp(),
          });
        } catch (fsErr) {
          handleFirestoreError(fsErr, OperationType.CREATE, path);
        }
      }
      setSubmittedRef(refId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h3 id="inquiry-modal-title" className="text-base font-bold text-slate-900">
              {headingByMode[context.mode]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry form"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRef ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-teal-700 mx-auto mb-3" aria-hidden="true" />
            <h4 className="text-xl font-bold text-slate-900">Trade Inquiry Dispatched</h4>
            <p className="mt-2 text-sm text-slate-600">
              Your inquiry has been logged on <strong className="text-slate-900">www.tradekenya.co.ke</strong> and routed to matching verified Kenyan suppliers.
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-slate-100 rounded-lg font-mono-tabular text-sm font-semibold text-slate-900">
              Reference: {submittedRef}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Confirmation sent to {email}. Expected verified supplier response within 4–12 business hours.
            </p>
            {!profile && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                Want to track inquiries across sessions?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenMemberAuth('signup');
                  }}
                  className="font-semibold text-teal-800 hover:underline cursor-pointer"
                >
                  Sign up free as a Standard Member
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer"
            >
              Return to tradeKenya
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {context.buyingRequest && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                Responding to <strong className="text-slate-900">{context.buyingRequest.buyerCountry}</strong> buyer:{' '}
                {context.buyingRequest.title}
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inq-company" className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  id="inq-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. EuroTrade Imports BV"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label htmlFor="inq-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Email *
                </label>
                <input
                  id="inq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@company.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inq-country" className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Country / Port
                </label>
                <input
                  id="inq-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Rotterdam, NL"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label htmlFor="inq-quantity" className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Volume / MOQ *
                </label>
                <input
                  id="inq-quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 1x 20ft FCL / 5 MT"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inq-category" className="block text-xs font-semibold text-slate-700 mb-1">
                Kenyan Export Category
              </label>
              <select
                id="inq-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                {KENYAN_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="inq-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                Product Specifications &amp; Packaging Requirements
              </label>
              <textarea
                id="inq-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Specify grade, Incoterms (FOB Mombasa / CIF), certification needs..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit to tradeKenya'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
