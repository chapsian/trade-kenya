import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutUsSectionProps {
  isSignedIn: boolean;
  onRequestMatchmaking: () => void;
  onExploreSuppliers: () => void;
  onOpenMemberAuth: (mode: 'signin' | 'signup' | 'account') => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  isSignedIn,
  onRequestMatchmaking,
  onExploreSuppliers,
  onOpenMemberAuth,
}) => {
  const membershipGrades = [
    {
      grade: 'Premier Member',
      criteria: 'Highest export volume, 95%+ inquiry response rate, and active KEBS/EPB verification',
      benefits: 'Priority B2B matchmaking, featured storefront placement, dedicated export desk',
    },
    {
      grade: 'Gold Member',
      criteria: 'Consistent trading amount, verified activity grade, and 90%+ response rate',
      benefits: 'Full B2B matchmaking access, multi-product showroom, buyer RFQ priority',
    },
    {
      grade: 'Silver Member',
      criteria: 'Active Kenyan exporter profile with verified registration and timely inquiry replies',
      benefits: 'Direct overseas buyer inquiries, company catalog indexing, free trade tools',
    },
    {
      grade: 'Standard Member',
      criteria: 'Registered Kenyan supplier or global buyer account on www.tradekenya.co.ke',
      benefits: '100% free access to marketplace listings, search, and buyer-seller messaging',
    },
  ];

  return (
    <section
      id="about-us"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
      className="py-16 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Editorial Intro matching user-supplied About Us writeup */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="text-base font-bold text-[#2FB5A3] mb-2">
              Kenya’s global B2B marketplace, trade Kenya
            </p>
            <h2
              id="about-heading"
              itemProp="name"
              className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance"
            >
              A leading B2B Marketplace to Discover and Source Kenyan Products
            </h2>
            <p itemProp="description" className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Tradekenya.co.ke is an online B2B marketplace that enables global buyers to
              efficiently discover the best partner in Kenya, while empowering Kenyan suppliers to
              bring their innovative and quality products to the world.
            </p>
          </div>

          {/* 3 Quantitative Proof Columns matching screenshot labels */}
          <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-mono-tabular text-3xl sm:text-4xl font-bold text-slate-900">
                42,500+
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-600">
                Global buyers on the platform
              </p>
            </div>
            <div>
              <p className="font-mono-tabular text-3xl sm:text-4xl font-bold text-slate-900">
                3,840+
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-600">
                Kenyan suppliers and manufacturers using the site
              </p>
            </div>
            <div>
              <p className="font-mono-tabular text-3xl sm:text-4xl font-bold text-slate-900">
                28,900+
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-600">
                Products across all categories
              </p>
            </div>
          </div>

          <p className="mt-8 pt-6 border-t border-slate-100 text-base sm:text-lg text-slate-800">
            Our prime goal is to be{' '}
            <strong className="font-bold text-slate-900">
              the most reliable online B2B marketplace
            </strong>{' '}
            for both Kenyan suppliers and overseas buyers.
          </p>

          {/* 3 Structured Platform Blocks matching reference document */}
          <div className="mt-10 space-y-6">
            {/* Block 1: Kenya's global B2B marketplace, tradeKenya! */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-[#3EB4A2] px-6 py-3">
                <h3 className="text-lg font-bold text-white">
                  Kenya's global B2B marketplace, tradeKenya!
                </h3>
              </div>
              <div className="p-6 bg-white">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  <strong className="font-semibold text-slate-900">tradeKenya</strong> is a global
                  B2B marketplace where global buyers and suppliers meet to start trade. tradeKenya
                  aims to be the most reliable online platform for both Kenya’s trading companies
                  and overseas buyers.
                </p>
              </div>
            </div>

            {/* Block 2: Membership */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-[#3EB4A2] px-6 py-3">
                <h3 className="text-lg font-bold text-white">Membership</h3>
              </div>
              <div className="p-6 bg-white space-y-5">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  If you become a member of tradeKenya all services are free. TradeKenya membership
                  grade differs depending on trading amount, activity grade, and response rate to
                  the inquiries.
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <th className="py-3 px-4 font-semibold">Membership Grade</th>
                        <th className="py-3 px-4 font-semibold">Qualification Criteria</th>
                        <th className="py-3 px-4 font-semibold">Included Free Services</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {membershipGrades.map((row) => (
                        <tr key={row.grade} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                            {row.grade}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{row.criteria}</td>
                          <td className="py-3 px-4 text-slate-700">{row.benefits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-slate-600">
                    Start with a free <strong className="text-slate-900">Standard Member</strong> account on www.tradekenya.co.ke.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {isSignedIn ? (
                      <button
                        type="button"
                        onClick={() => onOpenMemberAuth('account')}
                        className="px-4 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View Standard Member Account
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onOpenMemberAuth('signin')}
                          className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Standard Member Sign In
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenMemberAuth('signup')}
                          className="px-4 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Sign Up as Standard Member
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Matching Services */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-[#3EB4A2] px-6 py-3">
                <h3 className="text-lg font-bold text-white">Matching Services</h3>
              </div>
              <div className="p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#2FB5A3]">B2B Matchmaking</h4>
                  <p className="mt-1 text-base font-medium text-slate-900">
                    Identifies and connects with Kenyan suppliers that meet your unique needs
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Looking for high-quality Kenyan products? Submit your product specifications
                    and let our tradeKenya specialists match you with verified Kenyan manufacturers.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={onExploreSuppliers}
                    className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Browse Verified Suppliers
                  </button>
                  <button
                    type="button"
                    onClick={onRequestMatchmaking}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Start B2B Matchmaking</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
