/**
 * Shared design tokens for page title sections and section headers.
 * Per-page accent colors match provider navigation or banner for each category.
 */

const baseTitle = "text-4xl font-bold tracking-tight";
const baseSectionIconBox =
  "w-10 h-10 rounded-lg flex items-center justify-center";
const baseSectionIcon = "w-5 h-5";
const sectionTitleLine =
  "text-2xl font-black text-white italic uppercase tracking-tighter";

/** Per-page accent: Simple Title + Section Header use provider nav / banner color */
export const PAGE_ACCENT = {
  /** Slots: provider nav pink #e60076 */
  slots: {
    pageTitleClass: `${baseTitle} text-pink-500`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-pink-500/10 border border-pink-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-pink-500`,
    sectionHeaderAccentClass: "text-pink-500",
  },
  /** Fishing: provider nav cyan #06b6d4 */
  fishing: {
    pageTitleClass: `${baseTitle} text-cyan-500`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-cyan-500/10 border border-cyan-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-cyan-500`,
    sectionHeaderAccentClass: "text-cyan-500",
  },
  /** Crash: provider nav amber */
  crash: {
    pageTitleClass: `${baseTitle} text-amber-400`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-amber-500/10 border border-amber-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-amber-400`,
    sectionHeaderAccentClass: "text-amber-400",
  },
  /** Exchange: logo green */
  exchange: {
    pageTitleClass: `${baseTitle} text-[#00bc7d]`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-[#00bc7d]/10 border border-[#00bc7d]/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-[#00bc7d]`,
    sectionHeaderAccentClass: "text-[#00bc7d]",
  },
  /** Sports: orange (search/focus) */
  sports: {
    pageTitleClass: `${baseTitle} text-orange-500`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-orange-500/10 border border-orange-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-orange-500`,
    sectionHeaderAccentClass: "text-orange-500",
  },
  /** Live Casino: blue */
  liveCasino: {
    pageTitleClass: `${baseTitle} text-blue-500`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-blue-500/10 border border-blue-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-blue-500`,
    sectionHeaderAccentClass: "text-blue-500",
  },
  /** Poker: logo green */
  poker: {
    pageTitleClass: `${baseTitle} text-[#00bc7d]`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-[#00bc7d]/10 border border-[#00bc7d]/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-[#00bc7d]`,
    sectionHeaderAccentClass: "text-[#00bc7d]",
  },
  /** Recent Game: logo green */
  recentGame: {
    pageTitleClass: `${baseTitle} text-[#00bc7d]`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-[#00bc7d]/10 border border-[#00bc7d]/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-[#00bc7d]`,
    sectionHeaderAccentClass: "text-[#00bc7d]",
  },
  /** Lottery: purple (search/focus) */
  lottery: {
    pageTitleClass: `${baseTitle} text-purple-500`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-purple-500/10 border border-purple-500/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-purple-500`,
    sectionHeaderAccentClass: "text-purple-500",
  },
  /** All Game: banner gold #FFAA00 */
  allGame: {
    pageTitleClass: `${baseTitle} text-[#FFAA00]`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-[#FFAA00]/10 border border-[#FFAA00]/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-[#FFAA00]`,
    sectionHeaderAccentClass: "text-[#FFAA00]",
  },
  /** Hot Game: banner coral #FF6B6B */
  hotGame: {
    pageTitleClass: `${baseTitle} text-[#FF6B6B]`,
    sectionHeaderIconBoxClass: `${baseSectionIconBox} bg-[#FF6B6B]/10 border border-[#FF6B6B]/20`,
    sectionHeaderIconClass: `${baseSectionIcon} text-[#FF6B6B]`,
    sectionHeaderAccentClass: "text-[#FF6B6B]",
  },
} as const;

/** Section Header: full h2 title line (white + accent span) – shared */
export const SECTION_HEADER_TITLE_CLASS = sectionTitleLine;

/** Default title (e.g. InsidePageHeader) – logo green */
export const PAGE_TITLE_CLASS =
  "text-4xl font-bold tracking-tight text-[#00bc7d]";

/** Section header tokens – default logo green (use PAGE_ACCENT[page].* for per-page) */
export const SECTION_HEADER_ICON_BOX_CLASS =
  "w-10 h-10 rounded-lg bg-[#00bc7d]/10 border border-[#00bc7d]/20 flex items-center justify-center";
export const SECTION_HEADER_ICON_CLASS = "w-5 h-5 text-[#00bc7d]";
export const SECTION_HEADER_ACCENT_CLASS = "text-[#00bc7d]";

/** Primary CTA (deposit/withdraw buttons): emerald gradient, black text, enhanced hover */
export const PRIMARY_CTA_CLASS =
  "bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black transition-all border-none";

/** Nav pill / tab active state – matches primary CTA gradient, enhanced hover */
export const NAV_ACTIVE_CLASS =
  "bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black";

/** History Record / Bonus record-style page: icon box + icon + title (same as /history) */
export const RECORD_PAGE_ICON_BOX_CLASS =
  "h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center";
export const RECORD_PAGE_ICON_CLASS = "w-5 h-5 text-white/90";
export const RECORD_PAGE_TITLE_CLASS = "text-white font-bold text-base";

/** Mobile-first spacing & typography (consistent across inner pages) */
export const MOBILE = {
  /** Page container: horizontal padding, vertical padding */
  container: "px-4 py-4 md:py-6",
  /** Settings & inner pages: main container padding (more vertical breathing room) */
  settingsPageContainer: "px-4 py-6 md:py-8",
  /** Card/section padding */
  cardPadding: "p-4 md:p-6",
  /** Section margin bottom */
  sectionMb: "mb-4 md:mb-6",
  /** Header / nav area margin bottom */
  headerMb: "mb-4 md:mb-6",
  /** Flex/grid gap (medium) */
  gap: "gap-4 md:gap-6",
  /** Flex/grid gap (small) */
  gapSm: "gap-2 md:gap-3",
  /** Flex/grid gap (extra small) */
  gapXs: "gap-1.5 md:gap-2",
  /** Space between form label and input / between stacked items */
  spaceY: "space-y-2",
  /** Space between sections inside a card */
  spaceYSection: "space-y-3 md:space-y-4",
  /** Label text */
  label: "text-xs md:text-sm font-bold",
  /** Body text */
  body: "text-sm md:text-base",
  /** Card/section title (e.g. Live Jackpot pool, All Games, Live Casino, Hot Providers, etc.) */
  title: "text-lg md:text-2xl font-bold",
  /** Page/screen title (e.g. Settings, My Profile) */
  pageTitle: "text-base md:text-lg font-bold",
  /** Caption / secondary text */
  caption: "text-xs text-gray-400",
} as const;

/** Homepage: section spacing and container (consistent with Settings/Promotions) */
export const HOME_PAGE = {
  /** Vertical + horizontal padding for top block (Hero area) */
  topBlockPadding: "px-4 pt-6 md:pt-8 pb-6 md:pb-8",
  /** Gap between homepage sections (e.g. Hero, Jackpot, Game sections); desktop: gap-12 */
  sectionGap: "gap-6 md:gap-12",
  /** Max width container (match Promotions/Referral) */
  maxWidth: "max-w-[1200px] 2xl:max-w-[1480px]",
  /** Card style: bg, border, radius (match wallet/settings cards) */
  card: "bg-[#1a2230] border border-white/5 rounded-2xl overflow-hidden",
  /** Bottom padding for mobile nav clearance */
  bottomPadding: "pb-20 md:pb-8",
} as const;
