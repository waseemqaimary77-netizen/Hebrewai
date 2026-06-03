export function getFallbackIllustration(id: number): string {
  // Returns highly polished, modern flat vector SVG codes in 400x300 viewBox format.
  switch (id) {
    case 1: // מונית - تكسي
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FEF08A" rx="16"/>
        <circle cx="200" cy="130" r="70" fill="#EAB308" opacity="0.2"/>
        <!-- Road shadow -->
        <ellipse cx="200" cy="230" rx="120" ry="12" fill="#000000" opacity="0.15"/>
        <!-- Taxi Body -->
        <path d="M110,195 L290,195 L280,140 C278,130 270,120 260,120 L140,120 C130,120 122,130 120,140 Z" fill="#FACC15" stroke="#1E293B" stroke-width="6" stroke-linejoin="round"/>
        <!-- Windows -->
        <rect x="140" y="132" width="50" height="30" fill="#93C5FD" stroke="#1E293B" stroke-width="4" rx="4"/>
        <rect x="210" y="132" width="50" height="30" fill="#93C5FD" stroke="#1E293B" stroke-width="4" rx="4"/>
        <!-- Wheels -->
        <circle cx="150" cy="215" r="22" fill="#1E293B" stroke="#FACC15" stroke-width="4"/>
        <circle cx="150" cy="215" r="8" fill="#FFFFFF"/>
        <circle cx="250" cy="215" r="22" fill="#1E293B" stroke="#FACC15" stroke-width="4"/>
        <circle cx="250" cy="215" r="8" fill="#FFFFFF"/>
        <!-- Lights -->
        <circle cx="120" cy="180" r="8" fill="#FEF08A" stroke="#1E293B" stroke-width="3"/>
        <circle cx="280" cy="180" r="8" fill="#FEF08A" stroke="#1E293B" stroke-width="3"/>
        <!-- Taxi Top Sign -->
        <rect x="180" y="100" width="40" height="20" fill="#FFFFFF" stroke="#1E293B" stroke-width="4" rx="4"/>
        <text x="200" y="114" font-family="'Inter', sans-serif" font-weight="900" font-size="10" fill="#1E293B" text-anchor="middle">TAXI</text>
        <text x="200" y="70" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#854D0E" text-anchor="middle">מוֹנִית (Monit)</text>
      </svg>`;
    case 2: // כביش - شارع
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#E2E8F0" rx="16"/>
        <!-- Grass sides -->
        <rect x="0" y="0" width="50" height="300" fill="#86EFAC"/>
        <rect x="350" y="0" width="50" height="300" fill="#86EFAC"/>
        <!-- Road -->
        <rect x="50" y="0" width="300" height="300" fill="#475569"/>
        <!-- White Side lines -->
        <line x1="60" y1="0" x2="60" y2="300" stroke="#FFFFFF" stroke-dasharray="10 10" stroke-width="4"/>
        <line x1="340" y1="0" x2="340" y2="300" stroke="#FFFFFF" stroke-dasharray="10 10" stroke-width="4"/>
        <!-- Yellow Center line -->
        <line x1="200" y1="0" x2="200" y2="300" stroke="#FACC15" stroke-dasharray="25 15" stroke-width="6"/>
        <text x="200" y="55" font-family="'Inter', sans-serif" font-weight="bold" font-size="20" fill="#1E293B" text-anchor="middle" stroke="#FFFFFF" stroke-width="1" paint-order="stroke fill">כְּבִישׁ (Kvish)</text>
      </svg>`;
    case 3: // משאيت - شاحنة
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FEE2E2" rx="16"/>
        <circle cx="200" cy="140" r="75" fill="#EF4444" opacity="0.1"/>
        <ellipse cx="200" cy="240" rx="130" ry="10" fill="#000000" opacity="0.15"/>
        <!-- Truck Container -->
        <rect x="90" y="100" width="160" height="100" fill="#EF4444" stroke="#1E293B" stroke-width="5" rx="4"/>
        <!-- Truck Cab -->
        <path d="M250,130 L290,130 L300,160 L300,200 L250,200 Z" fill="#3B82F6" stroke="#1E293B" stroke-width="5" stroke-linejoin="round"/>
        <!-- Cab Window -->
        <path d="M258,140 L282,140 L290,165 L258,165 Z" fill="#93C5FD" stroke="#1E293B" stroke-width="3"/>
        <!-- Wheels -->
        <circle cx="130" cy="215" r="24" fill="#1E293B" stroke="#FFFFFF" stroke-width="4"/>
        <circle cx="210" cy="215" r="24" fill="#1E293B" stroke="#FFFFFF" stroke-width="4"/>
        <circle cx="275" cy="215" r="24" fill="#1E293B" stroke="#FFFFFF" stroke-width="4"/>
        <!-- Candies / Lollipops popping out -->
        <circle cx="110" cy="80" r="14" fill="#EC4899"/>
        <line x1="110" y1="94" x2="110" y2="105" stroke="#F59E0B" stroke-width="4"/>
        <circle cx="220" cy="75" r="16" fill="#10B981"/>
        <line x1="220" y1="91" x2="220" y2="105" stroke="#F59E0B" stroke-width="4"/>
        <text x="200" y="50" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#991B1B" text-anchor="middle">מַשָּׂאִית (Masa'it)</text>
      </svg>`;
    case 4: // נהג - سائق
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#ECFDF5" rx="16"/>
        <circle cx="200" cy="130" r="80" fill="#10B981" opacity="0.1"/>
        <!-- Steering Wheel -->
        <circle cx="200" cy="170" r="50" fill="none" stroke="#4B5563" stroke-width="12"/>
        <line x1="200" y1="120" x2="200" y2="220" stroke="#4B5563" stroke-width="10"/>
        <line x1="150" y1="170" x2="250" y2="170" stroke="#4B5563" stroke-width="10"/>
        <!-- Funny Driver Face in Center -->
        <circle cx="200" cy="120" r="40" fill="#FDBA74" stroke="#1E293B" stroke-width="4"/>
        <!-- Driver Cap -->
        <path d="M165,100 Q200,80 235,100 L245,105 L155,105 Z" fill="#1E3A8A" stroke="#1E293B" stroke-width="4"/>
        <!-- Face Features -->
        <circle cx="185" cy="120" r="5" fill="#1E293B"/>
        <circle cx="215" cy="120" r="5" fill="#1E293B"/>
        <path d="M185,135 Q200,150 215,135" fill="none" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
        <text x="200" y="50" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#065F46" text-anchor="middle">נֶהָג (Nehag)</text>
      </svg>`;
    case 5: // דוח - مخالفة
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FFF7ED" rx="16"/>
        <circle cx="200" cy="140" r="75" fill="#F97316" opacity="0.1"/>
        <g transform="translate(130, 80)">
          <!-- Clipboard / Sheet -->
          <rect x="10" y="20" width="120" height="150" fill="#FFFFFF" stroke="#1E293B" stroke-width="5" rx="8"/>
          <rect x="40" y="10" width="60" height="20" fill="#94A3B8" stroke="#1E293B" stroke-width="4" rx="4"/>
          <!-- Scribble on fine -->
          <line x1="30" y1="60" x2="110" y2="60" stroke="#14B8A6" stroke-width="5" stroke-linecap="round"/>
          <line x1="30" y1="85" x2="110" y2="85" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
          <line x1="30" y1="110" x2="90" y2="110" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
          <!-- Huge red exclamation on ticket -->
          <circle cx="100" cy="135" r="10" fill="#EF4444"/>
          <path d="M100,105 L100,123" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/>
        </g>
        <text x="200" y="55" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#C2410C" text-anchor="middle">דּוּחַ (Du'ach)</text>
      </svg>`;
    case 6: // שוטر - شرطي
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EFF6FF" rx="16"/>
        <circle cx="200" cy="140" r="80" fill="#3B82F6" opacity="0.1"/>
        <!-- Police Badge -->
        <path d="M200,80 L250,110 L240,170 C240,195 200,220 200,220 C200,220 160,195 160,170 L150,110 Z" fill="#FACC15" stroke="#1E293B" stroke-width="6" stroke-linejoin="round"/>
        <!-- Star inside badge -->
        <polygon points="200,105 208,125 229,125 212,137 218,158 200,145 182,158 188,137 171,125 192,125" fill="#EAB308" stroke="#1E293B" stroke-width="2"/>
        <text x="200" y="185" font-family="'Inter', sans-serif" font-weight="bold" font-size="12" fill="#1E293B" text-anchor="middle" letter-spacing="2">POLICE</text>
        <text x="200" y="55" font-family="'Inter', sans-serif" font-weight="bold" font-size="20" fill="#1E3A8A" text-anchor="middle">שׁוֹטֵר (Shoter)</text>
      </svg>`;
    case 7: // חדשות - أخبار
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FAF5FF" rx="16"/>
        <circle cx="200" cy="150" r="75" fill="#A855F7" opacity="0.1"/>
        <!-- TV Console -->
        <rect x="90" y="80" width="220" height="150" fill="#1E293B" stroke="#4A0E4E" stroke-width="4" rx="12"/>
        <!-- Screen -->
        <rect x="105" y="92" width="190" height="110" fill="#312E81" rx="4"/>
        <!-- Antennas -->
        <line x1="160" y1="80" x2="130" y2="40" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
        <line x1="240" y1="80" x2="270" y2="40" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
        <!-- News Logo symbol on TV -->
        <rect x="120" y="105" width="40" height="30" fill="#EF4444" rx="3"/>
        <text x="140" y="125" font-family="'Inter', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">LIVE</text>
        <!-- Static waves symbol -->
        <path d="M180,120 Q200,105 220,120 T260,120" fill="none" stroke="#F87171" stroke-width="4"/>
        <path d="M180,140 Q200,125 220,140 T260,140" fill="none" stroke="#60A5FA" stroke-width="4"/>
        <text x="200" y="270" font-family="'Inter', sans-serif" font-weight="bold" font-size="20" fill="#6B21A8" text-anchor="middle">חֲדָשׁוֹת (Chadashot)</text>
      </svg>`;
    case 8: // מעבר חציה - معبر مشاة
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F1F5F9" rx="16"/>
        <!-- Asphalt segment -->
        <rect x="40" y="50" width="320" height="200" fill="#334155" rx="8"/>
        <!-- White Stripes (Pedestrian Crossing) -->
        <rect x="70" y="70" width="35" height="160" fill="#FFFFFF"/>
        <rect x="135" y="70" width="35" height="160" fill="#FFFFFF"/>
        <rect x="200" y="70" width="35" height="160" fill="#FFFFFF"/>
        <rect x="265" y="70" width="35" height="160" fill="#FFFFFF"/>
        <rect x="330" y="70" width="35" height="160" fill="#FFFFFF"/>
        <!-- Text label inside -->
        <text x="200" y="35" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#1E293B" text-anchor="middle">מַעֲבַר חֲצִיָּה</text>
      </svg>`;
    case 9: // אדוני - سيدي
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FFFBEB" rx="16"/>
        <circle cx="200" cy="140" r="70" fill="#D97706" opacity="0.1"/>
        <!-- Royal Crown -->
        <path d="M120,180 L135,100 L175,140 L200,90 L225,140 L265,100 L280,180 Z" fill="#FBBF24" stroke="#1E293B" stroke-width="6" stroke-linejoin="round"/>
        <!-- Crown Jewel dots -->
        <circle cx="200" cy="90" r="8" fill="#EF4444" stroke="#1E293B" stroke-width="2"/>
        <circle cx="135" cy="100" r="7" fill="#3B82F6" stroke="#1E293B" stroke-width="2"/>
        <circle cx="265" cy="100" r="7" fill="#10B981" stroke="#1E293B" stroke-width="2"/>
        <!-- Velvet headband of crown -->
        <rect x="120" y="170" width="160" height="20" fill="#DC2626" stroke="#1E293B" stroke-width="4" rx="3"/>
        <text x="200" y="240" font-family="'Inter', sans-serif" font-weight="bold" font-size="20" fill="#B45309" text-anchor="middle">אָדוֹנִי (Adoni)</text>
      </svg>`;
    default:
      // Generic beautiful card representation for words 10-29
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>
        <!-- Concentric rings -->
        <circle cx="200" cy="140" r="70" fill="none" stroke="#6366F1" stroke-width="2" stroke-dasharray="5 5" opacity="0.4"/>
        <circle cx="200" cy="140" r="50" fill="none" stroke="#6366F1" stroke-width="2" stroke-dasharray="2 2" opacity="0.6"/>
        <!-- Soft book/study illustration -->
        <path d="M150,150 Q180,130 200,150 Q220,130 250,150 L250,100 Q220,80 200,100 Q180,80 150,100 Z" fill="#EEF2F6" stroke="#4F46E5" stroke-width="4" stroke-linejoin="round"/>
        <line x1="200" y1="100" x2="200" y2="150" stroke="#4F46E5" stroke-width="4"/>
        <!-- Magic Sparkles -->
        <path d="M130,80 L135,65 L140,80 L155,85 L140,90 L135,105 L130,90 L115,85 Z" fill="#F59E0B"/>
        <path d="M270,70 L273,60 L276,70 L286,73 L276,76 L273,86 L270,76 L260,73 Z" fill="#3B82F6"/>
        <text x="200" y="220" font-family="'Inter', sans-serif" font-weight="bold" font-size="18" fill="#1E293B" text-anchor="middle">انقر لتوليد رسم كرتوني وفكاهي بـ AI 🪄✨</text>
      </svg>`;
  }
}
