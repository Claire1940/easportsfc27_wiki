"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardList,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// 导航卡片 → 模块锚点的一一对应
const SECTION_IDS = [
  "release-date",
  "pre-order-editions",
  "platforms-crossplay",
  "ultimate-team",
  "player-ratings",
  "career-mode",
  "formations-controls",
  "clubs-rush",
] as const;

// 模块头部：eyebrow + 标题 + 副标题，统一风格
function ModuleHeader({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                   bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
      >
        <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs md:text-sm font-medium uppercase tracking-wide">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto max-w-3xl text-base md:text-lg text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.easportsfc27.wiki";

  // 模块数据别名
  const releaseDate = t.modules?.fcReleaseDate;
  const preOrder = t.modules?.fcPreOrderEditions;
  const platforms = t.modules?.fcPlatformsCrossplay;
  const ultimateTeam = t.modules?.fcUltimateTeam;
  const playerRatings = t.modules?.fcPlayerRatings;
  const careerMode = t.modules?.fcCareerMode;
  const formations = t.modules?.fcFormationsControls;
  const clubsRush = t.modules?.fcClubsRush;

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "EA Sports FC 27 Wiki",
        description:
          "EA Sports FC 27 Wiki tracks the release date, ratings, Ultimate Team, Career Mode, Clubs, gameplay, editions, and platforms for EA SPORTS FC 27.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "EA Sports FC 27 - Upcoming Football Simulation",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "EA Sports FC 27 Wiki",
        alternateName: "EA Sports FC 27",
        url: siteUrl,
        description:
          "EA Sports FC 27 Wiki is an unofficial fan hub tracking EA SPORTS FC 27 release news, ratings, Ultimate Team, Career Mode, and Clubs.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "EA Sports FC 27 Wiki - Upcoming Football Simulation",
        },
        sameAs: [
          "https://www.ea.com/games/ea-sports-fc",
          "https://discord.com/invite/easportsfc",
          "https://www.reddit.com/r/EASportsFC/",
          "https://www.youtube.com/@easportsfc",
          "https://x.com/EASPORTSFC",
        ],
      },
      {
        "@type": "VideoGame",
        name: "EA Sports FC 27",
        gamePlatform: [
          "PlayStation 5",
          "Xbox Series X|S",
          "PC",
          "Nintendo Switch",
        ],
        applicationCategory: "Game",
        genre: ["Sports", "Football", "Simulation"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 22,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          url: "https://www.ea.com/games/ea-sports-fc",
        },
      },
      {
        "@type": "VideoObject",
        name: "EA SPORTS FC 26 | Official Reveal Trailer",
        description:
          "Official EA SPORTS FC 26 reveal trailer, featured as a placeholder while the official EA SPORTS FC 27 trailer is pending release.",
        uploadDate: "2025-09-18",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/TSi0iJYSQ24",
        url: "https://www.youtube.com/watch?v=TSi0iJYSQ24",
      },
    ],
  };

  // 交互态
  const [formationsExpanded, setFormationsExpanded] = useState<number | null>(
    0,
  );
  const [ratingFilter, setRatingFilter] = useState<string>("All");
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const filteredPlayers =
    ratingFilter === "All"
      ? (playerRatings?.players ?? [])
      : (playerRatings?.players ?? []).filter(
          (p: any) =>
            Array.isArray(p.categories) && p.categories.includes(ratingFilter),
        );

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                         bg-[hsl(var(--nav-theme)/0.1)]
                         border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection(SECTION_IDS[0])}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.ea.com/games/ea-sports-fc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="TSi0iJYSQ24"
              title="EA SPORTS FC 26 | Official Reveal Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（前半屏：Hero → 视频 → 模块导航） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = SECTION_IDS[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                               bg-[hsl(var(--nav-theme)/0.1)]
                               flex items-center justify-center
                               group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                               transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Latest Updates Section（content 为空时自动隐藏） */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* Module 1: Release Date & News */}
      {releaseDate ? (
        <section id="release-date" className="scroll-mt-24 px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={releaseDate.eyebrow}
              title={releaseDate.title}
              subtitle={releaseDate.subtitle}
              icon={CalendarClock}
            />
            {releaseDate.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {releaseDate.intro}
              </p>
            ) : null}

            {/* Timeline */}
            <div className="relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 md:space-y-8 scroll-reveal">
              {releaseDate.items?.map((item: any, i: number) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                  <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                        {item.date}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base md:text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Pre-Order & Editions */}
      {preOrder ? (
        <section
          id="pre-order-editions"
          className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={preOrder.eyebrow}
              title={preOrder.title}
              subtitle={preOrder.subtitle}
              icon={ShoppingBag}
            />
            {preOrder.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {preOrder.intro}
              </p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-reveal">
              {preOrder.items?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-3 text-[hsl(var(--nav-theme-light))]">
                    {item.option}
                  </h3>
                  <dl className="space-y-1.5">
                    <div className="flex justify-between gap-3 text-sm">
                      <dt className="text-muted-foreground">Availability</dt>
                      <dd className="text-right">{item.availability}</dd>
                    </div>
                    <div className="flex justify-between gap-3 text-sm">
                      <dt className="text-muted-foreground">Price</dt>
                      <dd className="text-right">{item.price}</dd>
                    </div>
                    <div className="flex justify-between gap-3 text-sm">
                      <dt className="text-muted-foreground">Access</dt>
                      <dd className="text-right">{item.launchAccess}</dd>
                    </div>
                  </dl>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                    {item.keyBenefits}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Module 3: Platforms & Crossplay */}
      {platforms ? (
        <section
          id="platforms-crossplay"
          className="scroll-mt-24 px-4 py-14 md:py-20"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={platforms.eyebrow}
              title={platforms.title}
              subtitle={platforms.subtitle}
              icon={MonitorSmartphone}
            />
            {platforms.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {platforms.intro}
              </p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-reveal">
              {platforms.items?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold mb-2">{item.category}</h3>
                  <p className="text-sm mb-1">
                    <span className="text-muted-foreground">Platforms: </span>
                    {item.platforms}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="text-muted-foreground">Crossplay: </span>
                    {item.crossplay}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Module 4: Ultimate Team Beginner Guide */}
      {ultimateTeam ? (
        <section
          id="ultimate-team"
          className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={ultimateTeam.eyebrow}
              title={ultimateTeam.title}
              subtitle={ultimateTeam.subtitle}
              icon={Trophy}
            />
            {ultimateTeam.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {ultimateTeam.intro}
              </p>
            ) : null}

            <div className="space-y-3 md:space-y-4 scroll-reveal">
              {ultimateTeam.steps?.map((s: any, i: number) => (
                <div
                  key={i}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {s.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      {s.description}
                    </p>
                    {s.result ? (
                      <p className="flex items-start gap-1.5 text-sm">
                        <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                        <span>{s.result}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Module 5: Player Ratings */}
      {playerRatings ? (
        <section
          id="player-ratings"
          className="scroll-mt-24 px-4 py-14 md:py-20"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={playerRatings.eyebrow}
              title={playerRatings.title}
              subtitle={playerRatings.subtitle}
              icon={Award}
            />
            {playerRatings.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {playerRatings.intro}
              </p>
            ) : null}

            {/* 分类筛选 */}
            {playerRatings.categories?.length ? (
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8 scroll-reveal">
                {playerRatings.categories.map((cat: string) => {
                  const active = ratingFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setRatingFilter(cat)}
                      className={
                        active
                          ? "px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-white border transition-colors bg-[hsl(var(--nav-theme))] border-[hsl(var(--nav-theme))]"
                          : "px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors bg-[hsl(var(--nav-theme)/0.05)] border-border text-muted-foreground hover:border-[hsl(var(--nav-theme)/0.5)]"
                      }
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-reveal">
              {filteredPlayers.map((p: any, i: number) => {
                const stats = [
                  { label: "PAC", val: p.pace },
                  { label: "SHO", val: p.shooting },
                  { label: "PAS", val: p.passing },
                  { label: "DRI", val: p.dribbling },
                  { label: "DEF", val: p.defending },
                  { label: "PHY", val: p.physical },
                ];
                return (
                  <div
                    key={i}
                    className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{p.player}</h3>
                        <p className="text-xs text-muted-foreground">
                          {p.team} · {p.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[hsl(var(--nav-theme-light))]">
                          {p.overall}
                        </div>
                        <div className="text-[10px] uppercase text-muted-foreground">
                          OVR
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {stats.map((s) => (
                        <div
                          key={s.label}
                          className="p-1.5 rounded bg-white/5 border border-border"
                        >
                          <div className="font-bold text-sm">{s.val}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    {Array.isArray(p.categories) && p.categories.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.categories.map((c: string) => (
                          <span
                            key={c}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Module 6: Career Mode & Wonderkids */}
      {careerMode ? (
        <section
          id="career-mode"
          className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={careerMode.eyebrow}
              title={careerMode.title}
              subtitle={careerMode.subtitle}
              icon={Briefcase}
            />
            {careerMode.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {careerMode.intro}
              </p>
            ) : null}

            {/* Career Systems */}
            {careerMode.features?.length ? (
              <div className="mb-10 md:mb-12 scroll-reveal">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-xl font-bold">Career Systems</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {careerMode.features.map((f: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold">{f.title}</h4>
                        {f.mode ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                            {f.mode}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {f.summary}
                      </p>
                      {Array.isArray(f.details) && f.details.length > 0 ? (
                        <ul className="space-y-1.5">
                          {f.details.map((d: string, di: number) => (
                            <li
                              key={di}
                              className="flex gap-2 text-xs text-muted-foreground"
                            >
                              <Check className="w-3.5 h-3.5 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Wonderkids */}
            {careerMode.wonderkids?.length ? (
              <div className="scroll-reveal">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-xl font-bold">Top Wonderkids</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {careerMode.wonderkids.map((w: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-bold">{w.player}</h4>
                          <p className="text-xs text-muted-foreground">
                            {w.team} · {w.position}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                            {w.overall}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            Age {w.age}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{w.profile}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Module 7: Formations, Tactics & Controls */}
      {formations ? (
        <section
          id="formations-controls"
          className="scroll-mt-24 px-4 py-14 md:py-20"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={formations.eyebrow}
              title={formations.title}
              subtitle={formations.subtitle}
              icon={ClipboardList}
            />
            {formations.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {formations.intro}
              </p>
            ) : null}

            <div className="space-y-2 scroll-reveal">
              {formations.items?.map((item: any, i: number) => {
                const open = formationsExpanded === i;
                return (
                  <div
                    key={item.id || i}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setFormationsExpanded(open ? null : i)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-semibold text-sm md:text-base pr-4">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open ? (
                      <div className="px-4 md:px-5 pb-5">
                        {item.summary ? (
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.summary}
                          </p>
                        ) : null}
                        {Array.isArray(item.bestFor) &&
                        item.bestFor.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {item.bestFor.map((b: string) => (
                              <span
                                key={b}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {Array.isArray(item.roles) &&
                        item.roles.length > 0 ? (
                          <ul className="space-y-1.5 mb-3">
                            {item.roles.map((r: string, ri: number) => (
                              <li
                                key={ri}
                                className="flex gap-2 text-sm text-muted-foreground"
                              >
                                <ArrowRight className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {item.matchPlan ? (
                          <p className="text-sm p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                            <span className="font-medium">Match plan: </span>
                            <span className="text-muted-foreground">
                              {item.matchPlan}
                            </span>
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* 广告位 5: 移动端横幅 320×50 */}
      {mobileBannerAd ? (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      ) : null}

      {/* Module 8: Clubs & Rush */}
      {clubsRush ? (
        <section
          id="clubs-rush"
          className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
        >
          <div className="container mx-auto max-w-5xl">
            <ModuleHeader
              eyebrow={clubsRush.eyebrow}
              title={clubsRush.title}
              subtitle={clubsRush.subtitle}
              icon={Users}
            />
            {clubsRush.intro ? (
              <p className="mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 max-w-3xl text-center text-sm md:text-base text-muted-foreground scroll-reveal">
                {clubsRush.intro}
              </p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-reveal">
              {clubsRush.items?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.summary}
                  </p>
                  {Array.isArray(item.archetypes) &&
                  item.archetypes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.archetypes.map((a: string) => (
                        <span
                          key={a}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {Array.isArray(item.facts) && item.facts.length > 0 ? (
                    <ul className="space-y-1.5">
                      {item.facts.map((f: string, fi: number) => (
                        <li
                          key={fi}
                          className="flex gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="w-3.5 h-3.5 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/easportsfc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/EASPORTSFC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/EASportsFC/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@easportsfc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
