import React, { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { CheckCircle2, LogOut, ShieldCheck, UserCheck, X } from 'lucide-react';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  MemberInquiryRecord,
  MemberProfile,
  MemberType,
  OperationType,
} from '../lib/firebase';

export type AuthModalInitialMode = 'signin' | 'signup' | 'account';

interface MemberAuthModalProps {
  isOpen: boolean;
  initialMode: AuthModalInitialMode;
  user: User | null;
  profile: MemberProfile | null;
  inquiries: MemberInquiryRecord[];
  onClose: () => void;
  onProfileSaved: (profile: MemberProfile) => void;
}

export const MemberAuthModal: React.FC<MemberAuthModalProps> = ({
  isOpen,
  initialMode,
  user,
  profile,
  inquiries,
  onClose,
  onProfileSaved,
}) => {
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'signin'
  );
  const [displayName, setDisplayName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [memberType, setMemberType] = useState<MemberType>('buyer');
  const [countryOrCounty, setCountryOrCounty] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setNotice('');
      if (initialMode === 'signup' || initialMode === 'signin') {
        setAuthTab(initialMode);
      }
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setCompanyName(profile.companyName);
      setMemberType(profile.memberType);
      setCountryOrCounty(profile.countryOrCounty);
    } else if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [profile, user]);

  if (!isOpen) return null;

  const validateProfileFields = (): string | null => {
    const cleanName = displayName.trim();
    const cleanCompany = companyName.trim();
    const cleanLocation = countryOrCounty.trim();
    if (cleanName.length < 2 || cleanName.length > 100) {
      return 'Full name must be between 2 and 100 characters.';
    }
    if (cleanCompany.length < 2 || cleanCompany.length > 120) {
      return 'Company or cooperative name must be between 2 and 120 characters.';
    }
    if (cleanLocation.length < 2 || cleanLocation.length > 80) {
      return memberType === 'kenyan_supplier'
        ? 'Please enter your Kenyan county (2–80 characters).'
        : 'Please enter your buyer country (2–80 characters).';
    }
    return null;
  };

  const handleGoogleSignInOnly = async () => {
    setError('');
    setNotice('');
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to complete Google sign-in. Please try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSignUpWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateProfileFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setNotice('');
    setBusy(true);
    try {
      let currentUser = auth.currentUser;
      if (!currentUser) {
        const result = await signInWithPopup(auth, googleProvider);
        currentUser = result.user;
      }
      if (!currentUser || !currentUser.email) {
        setError('A verified email account is required to register as a Standard Member.');
        setBusy(false);
        return;
      }

      const path = `members/${currentUser.uid}`;
      const payload = {
        uid: currentUser.uid,
        email: currentUser.email.slice(0, 160),
        displayName: displayName.trim().slice(0, 100),
        companyName: companyName.trim().slice(0, 120),
        memberType,
        countryOrCounty: countryOrCounty.trim().slice(0, 80),
        membershipGrade: 'Standard' as const,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      try {
        await setDoc(doc(db, 'members', currentUser.uid), payload);
      } catch (fsErr) {
        handleFirestoreError(fsErr, OperationType.CREATE, path);
      }

      onProfileSaved({
        ...payload,
        createdAt: profile?.createdAt ?? ({} as MemberProfile['createdAt']),
        updatedAt: profile?.updatedAt ?? ({} as MemberProfile['updatedAt']),
      });
      setNotice('Your free tradeKenya Standard Member account is now active.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to register your Standard Member account.'
      );
    } finally {
      setBusy(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    const validationError = validateProfileFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setNotice('');
    setBusy(true);
    const path = `members/${user.uid}`;
    try {
      await updateDoc(doc(db, 'members', user.uid), {
        displayName: displayName.trim().slice(0, 100),
        companyName: companyName.trim().slice(0, 120),
        memberType,
        countryOrCounty: countryOrCounty.trim().slice(0, 80),
        updatedAt: serverTimestamp(),
      });
      onProfileSaved({
        ...profile,
        displayName: displayName.trim().slice(0, 100),
        companyName: companyName.trim().slice(0, 120),
        memberType,
        countryOrCounty: countryOrCounty.trim().slice(0, 80),
      });
      setNotice('Standard Member profile updated.');
    } catch (fsErr) {
      handleFirestoreError(fsErr, OperationType.UPDATE, path);
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    try {
      await signOut(auth);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-auth-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h3 id="member-auth-title" className="text-base font-bold text-slate-900">
              {user && profile
                ? 'Standard Member Workspace'
                : 'tradeKenya Standard Member Access'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close member portal"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800">
              {error}
            </div>
          )}

          {notice && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>{notice}</span>
            </div>
          )}

          {/* Case 1: Signed in AND has Standard Member Profile */}
          {user && profile ? (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{profile.membershipGrade} Member · Free Plan</span>
                  </div>
                  <p className="mt-1 text-base font-bold text-slate-900">
                    {profile.companyName}
                  </p>
                  <p className="text-xs text-slate-600">
                    {profile.displayName} · {profile.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Edit Standard Member Profile */}
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Member Business Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="acc-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Full Name *
                    </label>
                    <input
                      id="acc-name"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="acc-company" className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      id="acc-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="acc-role" className="block text-xs font-semibold text-slate-700 mb-1">
                      Account Type
                    </label>
                    <select
                      id="acc-role"
                      value={memberType}
                      onChange={(e) => setMemberType(e.target.value as MemberType)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      <option value="buyer">Global Buyer / Importer</option>
                      <option value="kenyan_supplier">Kenyan Supplier / Exporter</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="acc-location" className="block text-xs font-semibold text-slate-700 mb-1">
                      {memberType === 'kenyan_supplier' ? 'Kenyan County *' : 'Buyer Country *'}
                    </label>
                    <input
                      id="acc-location"
                      type="text"
                      value={countryOrCounty}
                      onChange={(e) => setCountryOrCounty(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer disabled:opacity-60"
                  >
                    {busy ? 'Saving...' : 'Update Member Profile'}
                  </button>
                </div>
              </form>

              {/* Saved Member Inquiries */}
              <div className="pt-5 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Saved Trade Inquiries
                  </p>
                  <span className="font-mono-tabular text-xs text-slate-500">
                    {inquiries.length} total
                  </span>
                </div>
                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-4">
                    No trade inquiries submitted yet. Use &ldquo;Post Inquiry&rdquo; or request a
                    product quote to save inquiries to your Standard Member history.
                  </p>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{inq.subjectTitle}</p>
                          <p className="text-slate-600 mt-0.5">
                            {inq.quantity} · {inq.destinationPort || 'Port TBD'}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono-tabular font-semibold text-teal-800">
                            {inq.referenceCode}
                          </span>
                          <p className="text-slate-500 mt-0.5">{inq.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : user && !profile ? (
            /* Case 2: Authenticated via Google, completing Standard Member registration */
            <form onSubmit={handleSignUpWithGoogle} className="space-y-4">
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-slate-700">
                Signed in as <strong className="text-slate-900">{user.email}</strong>. Complete
                your business details below to activate your free{' '}
                <strong className="text-teal-900">Standard Member</strong> account on
                www.tradekenya.co.ke.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Wanjiku Kamau"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
                <div>
                  <label htmlFor="reg-company" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Cooperative Name *
                  </label>
                  <input
                    id="reg-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Rift Valley Exports Ltd"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-role" className="block text-xs font-semibold text-slate-700 mb-1">
                    I am joining as a *
                  </label>
                  <select
                    id="reg-role"
                    value={memberType}
                    onChange={(e) => setMemberType(e.target.value as MemberType)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  >
                    <option value="buyer">Global Buyer / Importer</option>
                    <option value="kenyan_supplier">Kenyan Supplier / Exporter</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reg-loc" className="block text-xs font-semibold text-slate-700 mb-1">
                    {memberType === 'kenyan_supplier' ? 'Kenyan County *' : 'Country *'}
                  </label>
                  <input
                    id="reg-loc"
                    type="text"
                    value={countryOrCounty}
                    onChange={(e) => setCountryOrCounty(e.target.value)}
                    placeholder={
                      memberType === 'kenyan_supplier' ? 'e.g. Nairobi / Nyeri' : 'e.g. United Kingdom'
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Use another account
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer disabled:opacity-60"
                >
                  {busy ? 'Activating...' : 'Activate Standard Membership'}
                </button>
              </div>
            </form>
          ) : (
            /* Case 3: Not Signed In — Interactive Sign In / Sign Up Tabs */
            <div>
              <div
                role="tablist"
                aria-label="Standard Member Sign In or Sign Up"
                className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-6"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={authTab === 'signin'}
                  onClick={() => {
                    setAuthTab('signin');
                    setError('');
                  }}
                  className={`py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    authTab === 'signin'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={authTab === 'signup'}
                  onClick={() => {
                    setAuthTab('signup');
                    setError('');
                  }}
                  className={`py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    authTab === 'signup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up (Free)
                </button>
              </div>

              {authTab === 'signin' ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Sign in to your <strong className="text-slate-900">tradeKenya Standard Member</strong>{' '}
                    account to manage your company profile, track B2B matchmaking inquiries, and
                    connect with Kenyan suppliers or overseas buyers.
                  </p>

                  <button
                    type="button"
                    onClick={handleGoogleSignInOnly}
                    disabled={busy}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <span>{busy ? 'Signing in...' : 'Sign In with Google'}</span>
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    New to www.tradekenya.co.ke?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className="font-semibold text-teal-800 hover:underline cursor-pointer"
                    >
                      Register free as a Standard Member
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSignUpWithGoogle} className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Become a <strong className="text-slate-900">Standard Member</strong> on
                    tradeKenya—all marketplace services are 100% free.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="su-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="su-name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. David Mwangi"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="su-company" className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        id="su-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Kenya Highland Exports"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="su-role" className="block text-xs font-semibold text-slate-700 mb-1">
                        Account Role *
                      </label>
                      <select
                        id="su-role"
                        value={memberType}
                        onChange={(e) => setMemberType(e.target.value as MemberType)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                      >
                        <option value="buyer">Global Buyer / Importer</option>
                        <option value="kenyan_supplier">Kenyan Supplier / Exporter</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="su-loc" className="block text-xs font-semibold text-slate-700 mb-1">
                        {memberType === 'kenyan_supplier' ? 'Kenyan County *' : 'Buyer Country *'}
                      </label>
                      <input
                        id="su-loc"
                        type="text"
                        value={countryOrCounty}
                        onChange={(e) => setCountryOrCounty(e.target.value)}
                        placeholder={
                          memberType === 'kenyan_supplier' ? 'e.g. Kiambu County' : 'e.g. Germany'
                        }
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-3 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {busy
                      ? 'Creating Standard Member Account...'
                      : 'Sign Up with Google (Standard Member)'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
