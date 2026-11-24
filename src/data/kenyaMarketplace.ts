export type CategoryId =
  | 'coffee-tea'
  | 'horticulture'
  | 'textiles-sisal'
  | 'leather-footwear'
  | 'minerals-materials'
  | 'beauty-oils'
  | 'processed-foods'
  | 'artisan-packaging';

export type BadgeId = 'kebs-diamond' | 'epb-export-ready' | 'origin-sustainable';

export type MembershipGrade = 'Premier' | 'Gold' | 'Silver' | 'Standard';

export interface KenyanCategory {
  id: CategoryId;
  name: string;
  shortName: string;
  hsPrefix: string;
  exportHub: string;
  productCount: number;
  summary: string;
}

export interface VerificationBadgeSpec {
  id: BadgeId;
  title: string;
  authority: string;
  codePrefix: string;
  criteria: string;
  auditCycle: string;
}

export interface KenyanSupplier {
  id: string;
  name: string;
  county: string;
  region: 'Central & Mount Kenya' | 'Rift Valley' | 'Nairobi EPZ' | 'Coast & Mombasa' | 'Western & Nyanza';
  established: number;
  categoryId: CategoryId;
  categoryLabel: string;
  primaryProducts: string;
  badges: BadgeId[];
  verificationCode: string;
  membershipGrade: MembershipGrade;
  responseRate: number;
  avgResponseHours: number;
  exportPorts: string;
  annualCapacity: string;
  certifications: string[];
  auditDate: string;
}

export interface KenyanProduct {
  id: string;
  title: string;
  categoryId: CategoryId;
  categoryLabel: string;
  supplierId: string;
  supplierName: string;
  county: string;
  hsCode: string;
  fobPriceMin: number;
  fobPriceMax: number;
  unit: string;
  moq: string;
  portOfLoading: string;
  leadTime: string;
  gradeSpec: string;
  packaging: string;
  artworkVariant:
    | 'coffee'
    | 'tea'
    | 'avocado'
    | 'roses'
    | 'macadamia'
    | 'sisal'
    | 'kikoy'
    | 'leather'
    | 'soda-ash'
    | 'avocado-oil'
    | 'mango'
    | 'kiondo';
}

export interface BuyingRequest {
  id: string;
  buyerCountry: string;
  buyerRegion: string;
  title: string;
  categoryId: CategoryId;
  categoryLabel: string;
  quantity: string;
  targetPort: string;
  requiredBadge: BadgeId;
  postedAgo: string;
  closingDate: string;
}

export const KENYAN_CATEGORIES: KenyanCategory[] = [
  {
    id: 'coffee-tea',
    name: 'Specialty Coffee & Black Tea',
    shortName: 'Coffee & Tea',
    hsPrefix: 'HS 0901 / 0902',
    exportHub: 'Nyeri, Kirinyaga & Kericho',
    productCount: 4820,
    summary: 'Single-origin AA/AB Arabica coffee, orthodox & CTC Kericho black tea, and Kenyan purple tea.',
  },
  {
    id: 'horticulture',
    name: 'Fresh Horticulture & Avocados',
    shortName: 'Horticulture',
    hsPrefix: 'HS 0804 / 0603',
    exportHub: 'Murang’a, Naivasha & Eldoret',
    productCount: 5310,
    summary: 'GlobalG.A.P. Hass & Fuerte avocados, export macadamia kernels, French beans, and highland roses.',
  },
  {
    id: 'textiles-sisal',
    name: 'Textiles, EPZ Apparel & Sisal',
    shortName: 'Textiles & Sisal',
    hsPrefix: 'HS 5305 / 6203',
    exportHub: 'Athi River EPZ, Mombasa & Taita',
    productCount: 3640,
    summary: 'AGOA-compliant EPZ woven garments, coastal Kikoy cottons, and marine-grade sisal fiber & twine.',
  },
  {
    id: 'leather-footwear',
    name: 'Leather, Hides & Footwear',
    shortName: 'Leather & Footwear',
    hsPrefix: 'HS 4104 / 6403',
    exportHub: 'Thika, Nairobi & Machakos',
    productCount: 2490,
    summary: 'Vegetable-tanned cow and goat leather, industrial safety boots, and handcrafted leather goods.',
  },
  {
    id: 'minerals-materials',
    name: 'Minerals, Soda Ash & Stone',
    shortName: 'Minerals & Stone',
    hsPrefix: 'HS 2836 / 2523',
    exportHub: 'Magadi, Kwale & Kisii',
    productCount: 2180,
    summary: 'Natural dense soda ash, titanium mineral sands, Kisii soapstone, and bulk East African clinker.',
  },
  {
    id: 'beauty-oils',
    name: 'Natural Oils & Cosmetics',
    shortName: 'Botanical Oils',
    hsPrefix: 'HS 1515 / 3304',
    exportHub: 'Thika, Nanyuki & Kilifi',
    productCount: 3120,
    summary: 'Cold-pressed extra virgin avocado oil, cosmetic macadamia oil, baobab oil, and moringa extracts.',
  },
  {
    id: 'processed-foods',
    name: 'Processed Foods, Honey & Spices',
    shortName: 'Foods & Spices',
    hsPrefix: 'HS 0804 / 2008',
    exportHub: 'Thika, Kitui & Mombasa',
    productCount: 4290,
    summary: 'Sun-dried mango slices, canned Kenyan pineapple, raw acacia honey, and Mombasa whole spices.',
  },
  {
    id: 'artisan-packaging',
    name: 'Artisan Crafts & Eco-Packaging',
    shortName: 'Crafts & Packaging',
    hsPrefix: 'HS 4602 / 4819',
    exportHub: 'Kitui, Nairobi & Nakuru',
    productCount: 3050,
    summary: 'Handwoven sisal Kiondo baskets, sustainable olive woodware, and FSC-certified kraft export cartons.',
  },
];

export const VERIFICATION_BADGES: VerificationBadgeSpec[] = [
  {
    id: 'kebs-diamond',
    title: 'KEBS Diamond Verified',
    authority: 'Kenya Bureau of Standards (KEBS) & Facility Inspection',
    codePrefix: 'TK-KEBS',
    criteria: 'Valid KEBS Diamond Mark of Quality, laboratory batch testing, and verified Kenyan manufacturing site.',
    auditCycle: 'Annual physical facility audit',
  },
  {
    id: 'epb-export-ready',
    title: 'EPB Export Ready',
    authority: 'Export Promotion & KRA Customs Compliance',
    codePrefix: 'TK-EPB',
    criteria: 'Active Kenya Revenue Authority PIN, export license, bill of lading history, and bank-verified corporate registry.',
    auditCycle: 'Semi-annual customs check',
  },
  {
    id: 'origin-sustainable',
    title: 'Origin & Sustainability Certified',
    authority: 'KEPHIS Phytosanitary / Fairtrade / GlobalG.A.P.',
    codePrefix: 'TK-ORG',
    criteria: 'Traceable Kenyan county origin, phytosanitary export clearance, and international sustainability compliance.',
    auditCycle: 'Seasonal harvest verification',
  },
];

export const KENYAN_SUPPLIERS: KenyanSupplier[] = [
  {
    id: 'sup-nyeri-highlands',
    name: 'Mount Kenya Highland Coffee Co-op',
    county: 'Nyeri County',
    region: 'Central & Mount Kenya',
    established: 2008,
    categoryId: 'coffee-tea',
    categoryLabel: 'Specialty Coffee & Black Tea',
    primaryProducts: 'Washed AA & AB Arabica Green Coffee Beans, Peaberry Lots',
    badges: ['kebs-diamond', 'epb-export-ready', 'origin-sustainable'],
    verificationCode: 'TK-KEBS-2048',
    membershipGrade: 'Premier',
    responseRate: 98,
    avgResponseHours: 4,
    exportPorts: 'Port of Mombasa · JKIA Nairobi',
    annualCapacity: '3,200 MT / Year',
    certifications: ['Coffee Directorate Licensed', 'Rainforest Alliance', 'Fairtrade', 'KEBS Verified'],
    auditDate: 'Oct 2026',
  },
  {
    id: 'sup-kericho-estates',
    name: 'Kericho Emerald Tea Estates Ltd',
    county: 'Kericho County',
    region: 'Rift Valley',
    established: 2004,
    categoryId: 'coffee-tea',
    categoryLabel: 'Specialty Coffee & Black Tea',
    primaryProducts: 'BP1, PF1 CTC Black Tea, Orthodox Leaf & Kenyan Purple Tea',
    badges: ['kebs-diamond', 'epb-export-ready', 'origin-sustainable'],
    verificationCode: 'TK-ORG-3305',
    membershipGrade: 'Premier',
    responseRate: 97,
    avgResponseHours: 6,
    exportPorts: 'Port of Mombasa',
    annualCapacity: '5,800 MT / Year',
    certifications: ['Tea Board of Kenya', 'ISO 22000', 'Rainforest Alliance'],
    auditDate: 'Sep 2026',
  },
  {
    id: 'sup-muranga-fresh',
    name: 'Kandara Agro-Fresh Exports Ltd',
    county: 'Murang’a County',
    region: 'Central & Mount Kenya',
    established: 2015,
    categoryId: 'horticulture',
    categoryLabel: 'Fresh Horticulture & Avocados',
    primaryProducts: 'Cold-Chain Hass & Fuerte Avocados, French Beans, Macadamia',
    badges: ['epb-export-ready', 'origin-sustainable'],
    verificationCode: 'TK-EPB-1192',
    membershipGrade: 'Gold',
    responseRate: 95,
    avgResponseHours: 5,
    exportPorts: 'Port of Mombasa (Reefer) · JKIA Nairobi',
    annualCapacity: '4,100 MT / Year',
    certifications: ['GlobalG.A.P.', 'KEPHIS Phytosanitary', 'HCDA Licensed'],
    auditDate: 'Nov 2026',
  },
  {
    id: 'sup-athiriver-textiles',
    name: 'Athi River Apparel & Textile EPZ',
    county: 'Machakos County',
    region: 'Nairobi EPZ',
    established: 2011,
    categoryId: 'textiles-sisal',
    categoryLabel: 'Textiles, EPZ Apparel & Sisal',
    primaryProducts: 'AGOA Woven Chinos, Cotton Workwear, Coastal Kikoy Fabrics',
    badges: ['kebs-diamond', 'epb-export-ready'],
    verificationCode: 'TK-KEBS-4410',
    membershipGrade: 'Premier',
    responseRate: 96,
    avgResponseHours: 8,
    exportPorts: 'Port of Mombasa · JKIA Nairobi',
    annualCapacity: '1.8M Units / Year',
    certifications: ['EPZA Licensed', 'WRAP Certified', 'OEKO-TEX Standard 100'],
    auditDate: 'Aug 2026',
  },
  {
    id: 'sup-taita-sisal',
    name: 'Voi Sisal & Natural Fiber Mills',
    county: 'Taita-Taveta County',
    region: 'Coast & Mombasa',
    established: 1999,
    categoryId: 'textiles-sisal',
    categoryLabel: 'Textiles, EPZ Apparel & Sisal',
    primaryProducts: 'UG & SSUG Grade Sisal Fiber, Agricultural Baler Twine, Yarn',
    badges: ['kebs-diamond', 'epb-export-ready', 'origin-sustainable'],
    verificationCode: 'TK-EPB-5120',
    membershipGrade: 'Gold',
    responseRate: 93,
    avgResponseHours: 10,
    exportPorts: 'Port of Mombasa',
    annualCapacity: '6,500 MT / Year',
    certifications: ['AFA Fibre Crops', 'KEBS Diamond Mark', 'ISO 9001:2015'],
    auditDate: 'Oct 2026',
  },
  {
    id: 'sup-thika-tannery',
    name: 'Thika Rift Tannery & Leatherworks',
    county: 'Kiambu County',
    region: 'Central & Mount Kenya',
    established: 2013,
    categoryId: 'leather-footwear',
    categoryLabel: 'Leather, Hides & Footwear',
    primaryProducts: 'Vegetable-Tanned Goat & Bovine Crust, Safety Footwear',
    badges: ['kebs-diamond', 'epb-export-ready'],
    verificationCode: 'TK-KEBS-6704',
    membershipGrade: 'Gold',
    responseRate: 92,
    avgResponseHours: 12,
    exportPorts: 'Port of Mombasa',
    annualCapacity: '2.4M Sq. Ft / Year',
    certifications: ['NEMA Effluent Compliant', 'KEBS Diamond Mark', 'Leather Working Group Audited'],
    auditDate: 'Jul 2026',
  },
  {
    id: 'sup-magadi-minerals',
    name: 'Rift Valley Mineral & Soda Works',
    county: 'Kajiado County',
    region: 'Rift Valley',
    established: 2006,
    categoryId: 'minerals-materials',
    categoryLabel: 'Minerals, Soda Ash & Stone',
    primaryProducts: 'Natural Dense Soda Ash (Na2CO3), Industrial Salt, Kisii Soapstone',
    badges: ['kebs-diamond', 'epb-export-ready'],
    verificationCode: 'TK-EPB-7891',
    membershipGrade: 'Silver',
    responseRate: 91,
    avgResponseHours: 14,
    exportPorts: 'Port of Mombasa (Bulk Rail)',
    annualCapacity: '120,000 MT / Year',
    certifications: ['ISO 9001:2015', 'Ministry of Mining Permit', 'KEBS Certified'],
    auditDate: 'Sep 2026',
  },
  {
    id: 'sup-nanyuki-botanicals',
    name: 'Laikipia Pure Botanical Oils Ltd',
    county: 'Laikipia County',
    region: 'Central & Mount Kenya',
    established: 2018,
    categoryId: 'beauty-oils',
    categoryLabel: 'Natural Oils & Cosmetics',
    primaryProducts: 'Extra Virgin Cold-Pressed Avocado Oil, Macadamia Carrier Oil',
    badges: ['kebs-diamond', 'origin-sustainable'],
    verificationCode: 'TK-ORG-8432',
    membershipGrade: 'Gold',
    responseRate: 96,
    avgResponseHours: 5,
    exportPorts: 'JKIA Nairobi · Port of Mombasa',
    annualCapacity: '950 MT / Year',
    certifications: ['ECOCERT Organic', 'KEBS Diamond Mark', 'ISO 22716 GMP'],
    auditDate: 'Oct 2026',
  },
];

export const KENYAN_PRODUCTS: KenyanProduct[] = [
  {
    id: 'prod-nyeri-aa',
    title: 'Single-Origin Nyeri AA Washed Arabica Coffee',
    categoryId: 'coffee-tea',
    categoryLabel: 'Specialty Coffee & Black Tea',
    supplierId: 'sup-nyeri-highlands',
    supplierName: 'Mount Kenya Highland Coffee Co-op',
    county: 'Nyeri County',
    hsCode: '0901.11.00',
    fobPriceMin: 5.4,
    fobPriceMax: 6.2,
    unit: 'kg',
    moq: '1,200 kg (20 Bags)',
    portOfLoading: 'Port of Mombasa',
    leadTime: '14–21 Days',
    gradeSpec: 'Screen 18+, Moisture <11.5%, SCA Score 86.5+',
    packaging: '60kg Jute Bags with GrainPro Hermetic Liner',
    artworkVariant: 'coffee',
  },
  {
    id: 'prod-kericho-tea',
    title: 'Kericho Highland BP1 & PF1 CTC Black Tea',
    categoryId: 'coffee-tea',
    categoryLabel: 'Specialty Coffee & Black Tea',
    supplierId: 'sup-kericho-estates',
    supplierName: 'Kericho Emerald Tea Estates Ltd',
    county: 'Kericho County',
    hsCode: '0902.40.00',
    fobPriceMin: 2.65,
    fobPriceMax: 3.15,
    unit: 'kg',
    moq: '2,000 kg',
    portOfLoading: 'Port of Mombasa',
    leadTime: '10–15 Days',
    gradeSpec: 'Bright brisk liquor, 1,950m altitude harvest',
    packaging: '55kg Multi-Wall Foil-Lined Paper Sacks',
    artworkVariant: 'tea',
  },
  {
    id: 'prod-hass-avocado',
    title: 'Export Grade Class-1 Kenyan Hass Avocados',
    categoryId: 'horticulture',
    categoryLabel: 'Fresh Horticulture & Avocados',
    supplierId: 'sup-muranga-fresh',
    supplierName: 'Kandara Agro-Fresh Exports Ltd',
    county: 'Murang’a County',
    hsCode: '0804.40.00',
    fobPriceMin: 1.85,
    fobPriceMax: 2.35,
    unit: 'kg',
    moq: '4,000 kg (Air) / 21 MT (Reefer)',
    portOfLoading: 'Mombasa Reefer / JKIA Air',
    leadTime: '5–10 Days',
    gradeSpec: 'Dry Matter >23%, Sizes 14–24, GlobalG.A.P. Certified',
    packaging: '4kg & 10kg Ventilated Export Cartons',
    artworkVariant: 'avocado',
  },
  {
    id: 'prod-macadamia-style0',
    title: 'Raw Kenyan Macadamia Nut Kernels (Style 0 & 1)',
    categoryId: 'horticulture',
    categoryLabel: 'Fresh Horticulture & Avocados',
    supplierId: 'sup-muranga-fresh',
    supplierName: 'Kandara Agro-Fresh Exports Ltd',
    county: 'Murang’a County',
    hsCode: '0802.62.00',
    fobPriceMin: 11.8,
    fobPriceMax: 13.4,
    unit: 'kg',
    moq: '1,000 kg',
    portOfLoading: 'Port of Mombasa',
    leadTime: '14 Days',
    gradeSpec: 'Whole >95%, Moisture <1.5%, Non-GMO',
    packaging: '11.34kg Vacuum-Sealed Foil Pouches in Master Cartons',
    artworkVariant: 'macadamia',
  },
  {
    id: 'prod-naivasha-roses',
    title: 'Naivasha Highland Long-Stem Cut Roses (60cm–80cm)',
    categoryId: 'horticulture',
    categoryLabel: 'Fresh Horticulture & Avocados',
    supplierId: 'sup-muranga-fresh',
    supplierName: 'Kandara Agro-Fresh Exports Ltd',
    county: 'Nakuru / Naivasha',
    hsCode: '0603.11.00',
    fobPriceMin: 0.24,
    fobPriceMax: 0.42,
    unit: 'stem',
    moq: '10,000 stems',
    portOfLoading: 'JKIA Nairobi Cold-Chain',
    leadTime: '3–5 Days Air Freight',
    gradeSpec: 'Vase life 12–14 days, head size 5.5cm+, MPS-ABC',
    packaging: 'Cold-chain perforated floral export boxes',
    artworkVariant: 'roses',
  },
  {
    id: 'prod-sisal-fiber',
    title: 'UG & SSUG Grade Kenyan Raw Sisal Fiber Bales',
    categoryId: 'textiles-sisal',
    categoryLabel: 'Textiles, EPZ Apparel & Sisal',
    supplierId: 'sup-taita-sisal',
    supplierName: 'Voi Sisal & Natural Fiber Mills',
    county: 'Taita-Taveta County',
    hsCode: '5305.00.10',
    fobPriceMin: 1.55,
    fobPriceMax: 1.88,
    unit: 'kg',
    moq: '12,000 kg (1x 20ft FCL)',
    portOfLoading: 'Port of Mombasa',
    leadTime: '14–21 Days',
    gradeSpec: 'Length 90–120cm, creamy white luster, moisture <12%',
    packaging: '250kg Hydraulically Pressed Bales',
    artworkVariant: 'sisal',
  },
  {
    id: 'prod-kikoy-cotton',
    title: 'Coastal Handloom Combed Cotton Kikoy Textiles',
    categoryId: 'textiles-sisal',
    categoryLabel: 'Textiles, EPZ Apparel & Sisal',
    supplierId: 'sup-athiriver-textiles',
    supplierName: 'Athi River Apparel & Textile EPZ',
    county: 'Machakos County',
    hsCode: '6302.60.00',
    fobPriceMin: 5.8,
    fobPriceMax: 7.4,
    unit: 'piece',
    moq: '500 pieces',
    portOfLoading: 'Port of Mombasa / JKIA',
    leadTime: '21 Days',
    gradeSpec: '100% Ring-spun Kenyan cotton, 100cm x 165cm, OEKO-TEX',
    packaging: 'Individual recycled kraft belly-band, 40 pcs/carton',
    artworkVariant: 'kikoy',
  },
  {
    id: 'prod-vegetable-leather',
    title: 'Vegetable-Tanned Full-Grain Kenyan Bovine Leather',
    categoryId: 'leather-footwear',
    categoryLabel: 'Leather, Hides & Footwear',
    supplierId: 'sup-thika-tannery',
    supplierName: 'Thika Rift Tannery & Leatherworks',
    county: 'Kiambu County',
    hsCode: '4104.41.00',
    fobPriceMin: 2.3,
    fobPriceMax: 3.1,
    unit: 'sq. ft',
    moq: '3,000 sq. ft',
    portOfLoading: 'Port of Mombasa',
    leadTime: '20–25 Days',
    gradeSpec: 'Thickness 1.4–2.0mm, Chrome-free mimosa bark tanned',
    packaging: 'Rolled poly-wrapped pallets',
    artworkVariant: 'leather',
  },
  {
    id: 'prod-soda-ash',
    title: 'Natural Dense Soda Ash (Sodium Carbonate 97.5%)',
    categoryId: 'minerals-materials',
    categoryLabel: 'Minerals, Soda Ash & Stone',
    supplierId: 'sup-magadi-minerals',
    supplierName: 'Rift Valley Mineral & Soda Works',
    county: 'Kajiado County',
    hsCode: '2836.20.00',
    fobPriceMin: 245,
    fobPriceMax: 280,
    unit: 'MT',
    moq: '25 MT (1x 20ft FCL)',
    portOfLoading: 'Port of Mombasa',
    leadTime: '10–14 Days',
    gradeSpec: 'Na2CO3 min 97.5%, Low iron (<0.03%), Glass & Detergent grade',
    packaging: '50kg PP Woven Bags or 1,000kg Jumbo FIBC Bags',
    artworkVariant: 'soda-ash',
  },
  {
    id: 'prod-avocado-oil',
    title: 'Cold-Pressed Extra Virgin Kenyan Avocado Oil (Bulk)',
    categoryId: 'beauty-oils',
    categoryLabel: 'Natural Oils & Cosmetics',
    supplierId: 'sup-nanyuki-botanicals',
    supplierName: 'Laikipia Pure Botanical Oils Ltd',
    county: 'Laikipia County',
    hsCode: '1515.90.00',
    fobPriceMin: 6.9,
    fobPriceMax: 8.4,
    unit: 'liter',
    moq: '500 liters',
    portOfLoading: 'Port of Mombasa / JKIA',
    leadTime: '12–18 Days',
    gradeSpec: 'Acidity <0.5%, Unrefined emerald grade, ECOCERT Organic',
    packaging: '200L Food-Grade Steel Drums or 1,000L IBC Totes',
    artworkVariant: 'avocado-oil',
  },
  {
    id: 'prod-dried-mango',
    title: 'Sun-Dried Sulfite-Free Kenyan Apple Mango Slices',
    categoryId: 'processed-foods',
    categoryLabel: 'Processed Foods, Honey & Spices',
    supplierId: 'sup-muranga-fresh',
    supplierName: 'Kandara Agro-Fresh Exports Ltd',
    county: 'Makueni / Murang’a',
    hsCode: '0804.50.00',
    fobPriceMin: 7.2,
    fobPriceMax: 8.9,
    unit: 'kg',
    moq: '500 kg',
    portOfLoading: 'JKIA Nairobi / Mombasa',
    leadTime: '14 Days',
    gradeSpec: '100% Natural, no added sugar, moisture 12–14%',
    packaging: '5kg Vacuum-Sealed Bulk Pouches',
    artworkVariant: 'mango',
  },
  {
    id: 'prod-kiondo-baskets',
    title: 'Handwoven Sisal & Leather Trim Kiondo Export Baskets',
    categoryId: 'artisan-packaging',
    categoryLabel: 'Artisan Crafts & Eco-Packaging',
    supplierId: 'sup-taita-sisal',
    supplierName: 'Voi Sisal & Natural Fiber Mills',
    county: 'Kitui & Taita-Taveta',
    hsCode: '4602.19.00',
    fobPriceMin: 11.5,
    fobPriceMax: 16.0,
    unit: 'piece',
    moq: '200 pieces',
    portOfLoading: 'JKIA Nairobi / Mombasa',
    leadTime: '21–28 Days',
    gradeSpec: 'Natural sisal weave with vegetable-tanned leather straps',
    packaging: 'Nested export cartons with moisture silica packs',
    artworkVariant: 'kiondo',
  },
];

export const BUYING_REQUESTS: BuyingRequest[] = [
  {
    id: 'RFQ-KE-8914',
    buyerCountry: 'Netherlands',
    buyerRegion: 'European Union',
    title: 'Importing 42 MT GlobalG.A.P. Hass Avocados (Sizes 16–20)',
    categoryId: 'horticulture',
    categoryLabel: 'Fresh Horticulture & Avocados',
    quantity: '2x 40ft Reefer Containers / Month',
    targetPort: 'Port of Rotterdam (CIF)',
    requiredBadge: 'origin-sustainable',
    postedAgo: '3 hours ago',
    closingDate: 'Dec 12, 2026',
  },
  {
    id: 'RFQ-KE-8909',
    buyerCountry: 'United Arab Emirates',
    buyerRegion: 'Middle East',
    title: 'Seeking Kenyan AA Washed Arabica & Kericho Orthodox Tea',
    categoryId: 'coffee-tea',
    categoryLabel: 'Specialty Coffee & Black Tea',
    quantity: '15 MT Trial Order',
    targetPort: 'Jebel Ali Port, Dubai (FOB Mombasa)',
    requiredBadge: 'kebs-diamond',
    postedAgo: '6 hours ago',
    closingDate: 'Dec 18, 2026',
  },
  {
    id: 'RFQ-KE-8897',
    buyerCountry: 'United Kingdom',
    buyerRegion: 'Europe',
    title: 'OEM Organic Cold-Pressed Avocado Oil & Kikoy Home Textiles',
    categoryId: 'beauty-oils',
    categoryLabel: 'Natural Oils & Cosmetics',
    quantity: '4,000 Liters + 2,500 Textile Units',
    targetPort: 'London Gateway / Heathrow',
    requiredBadge: 'epb-export-ready',
    postedAgo: '1 day ago',
    closingDate: 'Dec 22, 2026',
  },
  {
    id: 'RFQ-KE-8882',
    buyerCountry: 'United States',
    buyerRegion: 'North America',
    title: 'AGOA Duty-Free Cotton Workwear & Twill Trousers Manufacturing',
    categoryId: 'textiles-sisal',
    categoryLabel: 'Textiles, EPZ Apparel & Sisal',
    quantity: '25,000 Units Quarterly',
    targetPort: 'Port of Savannah (FOB Mombasa)',
    requiredBadge: 'epb-export-ready',
    postedAgo: '2 days ago',
    closingDate: 'Jan 05, 2027',
  },
];
