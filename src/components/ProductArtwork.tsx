import React from 'react';
import { KenyanProduct } from '../data/kenyaMarketplace';

interface ProductArtworkProps {
  variant: KenyanProduct['artworkVariant'];
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ variant, className = '' }) => {
  switch (variant) {
    case 'coffee':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Nyeri AA Arabica Coffee illustration">
          <rect width="320" height="220" fill="#F4F1EA" />
          <rect x="28" y="34" width="142" height="156" rx="6" fill="#D8C3A5" stroke="#8C6D46" strokeWidth="2" />
          <path d="M28 58 H170" stroke="#0F766E" strokeWidth="10" />
          <text x="99" y="102" textAnchor="middle" fill="#3E2723" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">KENYA AA</text>
          <text x="99" y="122" textAnchor="middle" fill="#5D4037" fontSize="10" fontFamily="IBM Plex Mono, monospace">NYERI HIGHLAND</text>
          <text x="99" y="140" textAnchor="middle" fill="#5D4037" fontSize="9" fontFamily="IBM Plex Mono, monospace">60 KG NET</text>
          <ellipse cx="228" cy="118" rx="46" ry="30" fill="#E8DFD1" />
          <g transform="translate(205, 92)">
            <ellipse cx="14" cy="16" rx="11" ry="15" transform="rotate(-20 14 16)" fill="#4E342E" />
            <path d="M10 4 C14 14, 14 18, 18 28" stroke="#D7CCC8" strokeWidth="1.8" fill="none" />
            <ellipse cx="38" cy="24" rx="11" ry="15" transform="rotate(15 38 24)" fill="#3E2723" />
            <path d="M40 11 C36 21, 38 25, 36 37" stroke="#D7CCC8" strokeWidth="1.8" fill="none" />
            <ellipse cx="22" cy="42" rx="10" ry="14" transform="rotate(35 22 42)" fill="#5D4037" />
            <path d="M15 33 C21 40, 23 44, 29 51" stroke="#D7CCC8" strokeWidth="1.6" fill="none" />
          </g>
        </svg>
      );

    case 'tea':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kericho Kenyan Black Tea illustration">
          <rect width="320" height="220" fill="#EFF5F2" />
          <circle cx="195" cy="112" r="66" fill="#DCEAE3" />
          <rect x="38" y="42" width="112" height="140" rx="6" fill="#FAF8F3" stroke="#0F766E" strokeWidth="2" />
          <rect x="38" y="42" width="112" height="32" rx="4" fill="#0F766E" />
          <text x="94" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">KERICHO CTC</text>
          <text x="94" y="112" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">BP1 · PF1</text>
          <text x="94" y="132" textAnchor="middle" fill="#475569" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">1,950M ESTATE</text>
          <path d="M180 120 C190 80, 232 72, 248 92 C236 126, 200 136, 180 120 Z" fill="#15803D" />
          <path d="M180 120 C205 106, 224 98, 245 93" stroke="#DCFCE7" strokeWidth="1.5" fill="none" />
          <path d="M198 148 C210 122, 248 118, 266 134 C252 158, 218 162, 198 148 Z" fill="#166534" />
          <circle cx="215" cy="170" r="3.5" fill="#78350F" />
          <circle cx="226" cy="166" r="3" fill="#451A03" />
          <circle cx="236" cy="173" r="3.5" fill="#78350F" />
        </svg>
      );

    case 'avocado':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Hass Avocados illustration">
          <rect width="320" height="220" fill="#F1F6F1" />
          <rect x="34" y="142" width="252" height="46" rx="4" fill="#D4B483" stroke="#9A7B4F" strokeWidth="2" />
          <text x="160" y="170" textAnchor="middle" fill="#422006" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace">KENYA EXPORT · CLASS 1 HASS</text>
          <ellipse cx="110" cy="102" rx="34" ry="44" fill="#1B4332" />
          <ellipse cx="110" cy="102" rx="28" ry="38" fill="#2D6A4F" />
          <ellipse cx="204" cy="102" rx="34" ry="44" fill="#1B4332" />
          <ellipse cx="204" cy="104" rx="26" ry="36" fill="#D9ED92" />
          <circle cx="204" cy="112" r="14" fill="#7F4F24" />
        </svg>
      );

    case 'roses':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Naivasha Cut Roses illustration">
          <rect width="320" height="220" fill="#FAF4F4" />
          <path d="M125 185 L145 92 M162 185 L162 72 M198 185 L180 96" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="145" cy="82" r="24" fill="#BE123C" />
          <circle cx="145" cy="80" r="14" fill="#E11D48" />
          <circle cx="162" cy="62" r="26" fill="#9F1239" />
          <circle cx="162" cy="60" r="15" fill="#F43F5E" />
          <circle cx="182" cy="86" r="22" fill="#BE123C" />
          <circle cx="182" cy="84" r="12" fill="#FB7185" />
          <rect x="85" y="152" width="150" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="160" y="172" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono, monospace">NAIVASHA COLD-CHAIN 70CM</text>
        </svg>
      );

    case 'macadamia':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Macadamia Kernels illustration">
          <rect width="320" height="220" fill="#F8F5EE" />
          <circle cx="118" cy="108" r="36" fill="#6F4E37" />
          <circle cx="118" cy="108" r="22" fill="#FFF8E7" />
          <circle cx="188" cy="96" r="24" fill="#FAF0CA" stroke="#E6CCB2" strokeWidth="2" />
          <circle cx="222" cy="126" r="22" fill="#FFF8E7" stroke="#E6CCB2" strokeWidth="2" />
          <circle cx="166" cy="142" r="20" fill="#FAF0CA" stroke="#E6CCB2" strokeWidth="2" />
          <text x="160" y="192" textAnchor="middle" fill="#475569" fontSize="10.5" fontFamily="IBM Plex Mono, monospace">STYLE 0 WHOLE KERNELS · MURANG'A</text>
        </svg>
      );

    case 'sisal':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Sisal Fiber Bales illustration">
          <rect width="320" height="220" fill="#F6F4EE" />
          <rect x="46" y="54" width="228" height="114" rx="8" fill="#E6D5B8" stroke="#A48A62" strokeWidth="2" />
          <path d="M46 82 H274 M46 112 H274 M46 142 H274" stroke="#C8B18A" strokeWidth="1.5" strokeDasharray="6 4" />
          <rect x="96" y="54" width="12" height="114" fill="#0F766E" />
          <rect x="212" y="54" width="12" height="114" fill="#0F766E" />
          <rect x="118" y="88" width="84" height="44" rx="4" fill="#FFFFFF" />
          <text x="160" y="108" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">VOI SISAL</text>
          <text x="160" y="123" textAnchor="middle" fill="#475569" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">UG · 250 KG</text>
        </svg>
      );

    case 'kikoy':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Cotton Kikoy Textile illustration">
          <rect width="320" height="220" fill="#F3F6F6" />
          <rect x="52" y="40" width="216" height="140" rx="6" fill="#0F766E" />
          <rect x="52" y="64" width="216" height="14" fill="#F59E0B" />
          <rect x="52" y="84" width="216" height="8" fill="#FFFFFF" />
          <rect x="52" y="132" width="216" height="14" fill="#DC2626" />
          <rect x="52" y="152" width="216" height="8" fill="#FFFFFF" />
          <path d="M52 40 V180 M268 40 V180" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="3 5" />
        </svg>
      );

    case 'leather':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Vegetable-Tanned Leather illustration">
          <rect width="320" height="220" fill="#F7F3EE" />
          <path d="M84 44 C112 52, 208 52, 236 44 L256 76 C236 96, 236 128, 256 150 L232 180 C196 168, 124 168, 88 180 L64 150 C84 128, 84 96, 64 76 Z" fill="#8B4513" stroke="#5C2D0C" strokeWidth="2" />
          <path d="M160 56 V164" stroke="#6E350E" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="160" y="114" textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono, monospace">VEGETABLE TANNED · THIKA</text>
        </svg>
      );

    case 'soda-ash':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Magadi Soda Ash Minerals illustration">
          <rect width="320" height="220" fill="#EEF2F6" />
          <polygon points="80,164 140,76 200,164" fill="#CBD5E1" />
          <polygon points="140,164 196,90 252,164" fill="#E2E8F0" />
          <polygon points="115,164 168,108 220,164" fill="#FFFFFF" />
          <rect x="64" y="164" width="192" height="24" rx="4" fill="#0F172A" />
          <text x="160" y="180" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono, monospace">MAGADI Na2CO3 · 97.5% DENSE</text>
        </svg>
      );

    case 'avocado-oil':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Cold-Pressed Avocado Oil illustration">
          <rect width="320" height="220" fill="#F2F7F4" />
          <rect x="122" y="42" width="76" height="142" rx="10" fill="#065F46" />
          <rect x="142" y="26" width="36" height="18" rx="3" fill="#B45309" />
          <rect x="126" y="76" width="68" height="68" fill="#FAF8F3" />
          <text x="160" y="102" textAnchor="middle" fill="#0F172A" fontSize="10.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">LAIKIPIA</text>
          <text x="160" y="118" textAnchor="middle" fill="#065F46" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">AVOCADO OIL</text>
          <text x="160" y="133" textAnchor="middle" fill="#64748B" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">COLD PRESSED</text>
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Sun-Dried Mango Slices illustration">
          <rect width="320" height="220" fill="#FFF9EE" />
          <path d="M90 130 C95 76, 156 64, 178 96 C192 118, 152 158, 90 130 Z" fill="#F59E0B" />
          <path d="M142 146 C148 92, 210 80, 232 112 C246 134, 204 172, 142 146 Z" fill="#D97706" />
          <text x="160" y="186" textAnchor="middle" fill="#78350F" fontSize="10.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">KENYAN APPLE MANGO · NO SULFITES</text>
        </svg>
      );

    case 'kiondo':
    default:
      return (
        <svg viewBox="0 0 320 220" className={`w-full h-full ${className}`} role="img" aria-label="Kenyan Handwoven Sisal Kiondo Basket illustration">
          <rect width="320" height="220" fill="#F5F3EE" />
          <path d="M118 84 C118 44, 202 44, 202 84" stroke="#78350F" strokeWidth="6" fill="none" />
          <polygon points="88,84 232,84 214,176 106,176" fill="#D6BA8A" stroke="#855E42" strokeWidth="2" />
          <path d="M94 110 H226 M98 136 H222 M103 160 H217" stroke="#0F766E" strokeWidth="6" />
        </svg>
      );
  }
};
