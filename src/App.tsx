import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Header, ActiveTab } from './components/Header';
import { LocalSuppliersSection, getBadgeIcon, getBadgeTitle } from './components/LocalSuppliersSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ProductArtwork } from './components/ProductArtwork';
import {
  CertificateModal,
  InquiryContext,
  InquiryModal,
  ProductDetailModal,
} from './components/Modals';
import {
  BUYING_REQUESTS,
  CategoryId,
  KENYAN_CATEGORIES,
  KENYAN_PRODUCTS,
  KENYAN_SUPPLIERS,
  KenyanProduct,
  KenyanSupplier,
} from './data/kenyaMarketplace';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'products' | 'suppliers'>('products');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryId>('all');

  const [selectedProduct, setSelectedProduct] = useState<KenyanProduct | null>(null);
  const [selectedCertificateSupplier, setSelectedCertificateSupplier] =
    useState<KenyanSupplier | null>(null);
  const [inquiryContext, setInquiryContext] = useState<InquiryContext | null>(null);

  const scrollToSection = (sectionId: string, tab: ActiveTab) => {
    setActiveTab(tab);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeaderTabSelect = (tab: ActiveTab) => {
    const idMap: Record<ActiveTab, string> = {
      marketplace: 'products',
      'local-suppliers': 'local-suppliers',
      matching: 'matching',
      'about-us': 'about-us',
    };
    scrollToSection(idMap[tab], tab);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchScope === 'suppliers') {
      scrollToSection('local-suppliers', 'local-suppliers');
    } else {
      scrollToSection('products', 'marketplace');
    }
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return KENYAN_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        product.title.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.supplierName.toLowerCase().includes(query) ||
        product.county.toLowerCase().includes(query) ||
        product.hsCode.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const supplierById = useMemo(() => {
    const map = new Map<string, KenyanSupplier>();
    for (const s of KENYAN_SUPPLIERS) {
      map.set(s.id, s);
    }
    return map;
  }, []);

  const quickSearchTerms = [
    'AA Arabica Coffee',
    'Kericho Black Tea',
    'Hass Avocados',
    'Sisal Fiber',
    'Avocado Oil',
    'Soda Ash',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        activeTab={activeTab}
        onSelectTab={handleHeaderTabSelect}
        onOpenInquiry={() => setInquiryContext({ mode: 'matchmaking' })}
      />

      <main className="flex-1">
        {/* Hero & B2B Trade Search Workspace */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Primary Search & Proposition */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700 mb-2">
                    www.tradekenya.co.ke · Official Kenyan B2B Export Portal
                  </p>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
                    Discover and Source Verified Kenyan Export Products
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Connect directly with KEBS-certified Kenyan manufacturers, agricultural
                    cooperatives, and EPZ exporters shipping from the Port of Mombasa and JKIA
                    Nairobi.
                  </p>
                </div>

                {/* Integrated B2B Search Bar */}
                <div className="mt-8">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex flex-col sm:flex-row items-stretch bg-white border-2 border-teal-700 rounded-xl overflow-hidden shadow-xs"
                  >
                    <select
                      aria-label="Search scope"
                      value={searchScope}
                      onChange={(e) =>
                        setSearchScope(e.target.value as 'products' | 'suppliers')
                      }
                      className="px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="products">Kenyan Products</option>
                      <option value="suppliers">Kenyan Suppliers</option>
                    </select>
                    <div className="relative flex-1 flex items-center">
                      <Search
                        className="w-4 h-4 text-slate-400 ml-4 shrink-0"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Kenyan coffee, tea, Hass avocados, sisal, leather, HS codes..."
                        aria-label="Search Kenyan export products or Kenyan suppliers"
                        className="w-full px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Search Marketplace
                    </button>
                  </form>

                  {/* Popular Kenyan Export Queries */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Popular Kenyan Exports:</span>
                    {quickSearchTerms.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          setSelectedCategory('all');
                          scrollToSection('products', 'marketplace');
                        }}
                        className="hover:text-teal-800 hover:underline transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Trade Corridor & Verification Overview Panel */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Why Source on tradeKenya
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Free B2B services for registered Kenyan suppliers and international buyers.
                  </p>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        className="w-5 h-5 text-teal-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Local Suppliers Verification
                        </p>
                        <p className="text-xs text-slate-600">
                          KEBS Diamond, EPB Export Ready, and KEPHIS origin-verified Kenyan
                          exporters.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe2
                        className="w-5 h-5 text-teal-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          B2B Matchmaking Desk
                        </p>
                        <p className="text-xs text-slate-600">
                          Dedicated matching connecting overseas buyers with qualified Kenyan
                          partners.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="w-5 h-5 text-teal-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Direct Export Logistics
                        </p>
                        <p className="text-xs text-slate-600">
                          FOB Port of Mombasa sea freight &amp; JKIA Nairobi cold-chain air cargo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection('local-suppliers', 'local-suppliers')}
                    className="text-xs font-semibold text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Verification Badges</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryContext({ mode: 'matchmaking' })}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Post Buying Lead
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Column Full-Width Export Metrics Strip below Hero Split */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="font-mono-tabular text-2xl font-bold text-slate-900">42,500+</p>
                <p className="text-xs text-slate-600 mt-0.5">Global buyers on tradeKenya</p>
              </div>
              <div>
                <p className="font-mono-tabular text-2xl font-bold text-slate-900">3,840+</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kenyan suppliers &amp; manufacturers
                </p>
              </div>
              <div>
                <p className="font-mono-tabular text-2xl font-bold text-slate-900">28,900+</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kenyan export products listed
                </p>
              </div>
              <div>
                <p className="font-mono-tabular text-2xl font-bold text-slate-900">100% Free</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Membership &amp; B2B matchmaking services
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kenyan Export Categories & Product Directory */}
        <section id="products" aria-labelledby="products-heading" className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-teal-700 mb-1">
                  Kenyan Export Catalog
                </p>
                <h2
                  id="products-heading"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                >
                  Source Kenyan Products by Export Sector
                </h2>
              </div>

              {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-teal-800 hover:underline self-start sm:self-auto cursor-pointer"
                >
                  Clear Filters ({filteredProducts.length} shown)
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Category Directory Sidebar */}
              <aside
                aria-label="Kenyan Export Categories"
                className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-3"
              >
                <p className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Export Categories
                </p>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-teal-700 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">All Kenyan Categories</span>
                    <span
                      className={`font-mono-tabular text-xs ${
                        selectedCategory === 'all' ? 'text-teal-100' : 'text-slate-400'
                      }`}
                    >
                      {KENYAN_PRODUCTS.length}
                    </span>
                  </button>

                  {KENYAN_CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-teal-700 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{category.shortName}</span>
                        <span
                          className={`font-mono-tabular text-xs shrink-0 ${
                            isActive ? 'text-teal-100' : 'text-slate-400'
                          }`}
                        >
                          {category.productCount.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Product Showcase Grid */}
              <div className="lg:col-span-9">
                {selectedCategory !== 'all' && (
                  <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {
                          KENYAN_CATEGORIES.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {
                          KENYAN_CATEGORIES.find((c) => c.id === selectedCategory)
                            ?.summary
                        }
                      </p>
                    </div>
                    <span className="font-mono-tabular text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
                      {
                        KENYAN_CATEGORIES.find((c) => c.id === selectedCategory)
                          ?.hsPrefix
                      }
                    </span>
                  </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                    <p className="text-base font-semibold text-slate-900">
                      No Kenyan export products matched "{searchQuery}"
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Try another product keyword or reset your category filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer"
                    >
                      Show All Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                      const supplier = supplierById.get(product.supplierId);
                      const primaryBadge = supplier?.badges[0];

                      return (
                        <article
                          key={product.id}
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-teal-600/60 hover:-translate-y-0.5 transition-all duration-150"
                        >
                          <div>
                            <button
                              type="button"
                              onClick={() => setSelectedProduct(product)}
                              className="block w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700"
                              aria-label={`View details for ${product.title}`}
                            >
                              <ProductArtwork variant={product.artworkVariant} />
                            </button>

                            <div className="p-5">
                              {/* Clean unboxed metadata */}
                              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                                <span className="truncate">{product.county}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono-tabular shrink-0">
                                  HS {product.hsCode}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedProduct(product)}
                                className="text-left text-base font-bold text-slate-900 hover:text-teal-800 transition-colors line-clamp-2 cursor-pointer"
                              >
                                {product.title}
                              </button>

                              <div className="mt-3 flex items-baseline gap-1.5">
                                <span className="font-mono-tabular text-base font-bold text-teal-800">
                                  ${product.fobPriceMin.toFixed(2)}–${product.fobPriceMax.toFixed(2)}
                                </span>
                                <span className="text-xs text-slate-500">
                                  / {product.unit} FOB
                                </span>
                              </div>

                              <p className="mt-1 text-xs text-slate-600 font-mono-tabular">
                                MOQ: {product.moq}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-3">
                            {supplier && primaryBadge && (
                              <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="text-slate-700 font-medium truncate">
                                  {supplier.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setSelectedCertificateSupplier(supplier)}
                                  title={getBadgeTitle(primaryBadge)}
                                  className="inline-flex items-center gap-1 text-teal-800 font-semibold hover:underline shrink-0 cursor-pointer"
                                >
                                  {getBadgeIcon(primaryBadge)}
                                  <span>Verified</span>
                                </button>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setInquiryContext({
                                    mode: 'product-quote',
                                    subjectTitle: product.title,
                                    categoryId: product.categoryId,
                                  })
                                }
                                className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                              >
                                Request Quote
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedProduct(product)}
                                className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                              >
                                Specs
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Local Suppliers Verification Badge System */}
        <LocalSuppliersSection
          onInspectCertificate={(supplier) => setSelectedCertificateSupplier(supplier)}
          onContactSupplier={(supplier) =>
            setInquiryContext({
              mode: 'supplier-contact',
              subjectTitle: supplier.name,
              categoryId: supplier.categoryId,
            })
          }
        />

        {/* B2B Matchmaking & Global Buying Leads */}
        <section id="matching" aria-labelledby="matching-heading" className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-sm font-semibold text-teal-700 mb-1">
                  B2B Matchmaking &amp; Global Buying Leads
                </p>
                <h2
                  id="matching-heading"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                >
                  Active International Buying Requests for Kenyan Suppliers
                </h2>
                <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                  Global buyers actively sourcing Kenyan export goods. Verified Kenyan suppliers
                  can submit direct export quotations, or buyers can post custom sourcing briefs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInquiryContext({ mode: 'matchmaking' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
              >
                <span>Submit B2B Matchmaking Brief</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUYING_REQUESTS.map((rfq) => (
                <article
                  key={rfq.id}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                      <span>
                        {rfq.buyerCountry} ({rfq.buyerRegion}) · {rfq.categoryLabel}
                      </span>
                      <span className="font-mono-tabular font-medium text-slate-700">
                        {rfq.id}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{rfq.title}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div>
                        <span className="block text-slate-500">Order Volume</span>
                        <span className="font-semibold text-slate-900 font-mono-tabular">
                          {rfq.quantity}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-500">Delivery Terms</span>
                        <span className="font-semibold text-slate-900">{rfq.targetPort}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                      {getBadgeIcon(rfq.requiredBadge)}
                      <span>Requires: {getBadgeTitle(rfq.requiredBadge)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setInquiryContext({
                          mode: 'offer-rfq',
                          categoryId: rfq.categoryId,
                          buyingRequest: rfq,
                        })
                      }
                      className="px-3.5 py-2 text-xs font-semibold text-teal-800 bg-white border border-teal-700/40 hover:bg-teal-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Submit Export Offer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section (Exact user writeup + Google Search SEO microdata) */}
        <AboutUsSection
          onRequestMatchmaking={() => setInquiryContext({ mode: 'matchmaking' })}
          onExploreSuppliers={() =>
            scrollToSection('local-suppliers', 'local-suppliers')
          }
        />
      </main>

      {/* Clean B2B Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-2">
              <p className="text-xl font-bold text-white tracking-tight">tradeKenya</p>
              <p className="mt-2 text-sm text-slate-400 max-w-md leading-relaxed">
                www.tradekenya.co.ke — Kenya’s global B2B marketplace connecting verified Kenyan
                suppliers, manufacturers, and agricultural cooperatives with overseas buyers.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Nairobi Trade Desk · Port of Mombasa Export Facilitation
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Marketplace</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('products', 'marketplace')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Kenyan Export Products
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('local-suppliers', 'local-suppliers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Local Suppliers Verification
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('matching', 'matching')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    B2B Matchmaking
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about-us', 'about-us')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About tradeKenya
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Kenyan Export Sectors</h3>
              <ul className="space-y-2 text-sm">
                {KENYAN_CATEGORIES.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        scrollToSection('products', 'marketplace');
                      }}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {cat.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} www.tradekenya.co.ke. All rights reserved.</p>
            <p>Kenya’s Global B2B Marketplace for Kenyan Suppliers &amp; Overseas Buyers</p>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={(product) => {
          setSelectedProduct(null);
          setInquiryContext({
            mode: 'product-quote',
            subjectTitle: product.title,
            categoryId: product.categoryId,
          });
        }}
        onInspectSupplier={(supplier) => setSelectedCertificateSupplier(supplier)}
      />

      <CertificateModal
        supplier={selectedCertificateSupplier}
        onClose={() => setSelectedCertificateSupplier(null)}
        onContactSupplier={(supplier) =>
          setInquiryContext({
            mode: 'supplier-contact',
            subjectTitle: supplier.name,
            categoryId: supplier.categoryId,
          })
        }
      />

      <InquiryModal
        context={inquiryContext}
        onClose={() => setInquiryContext(null)}
      />
    </div>
  );
}
