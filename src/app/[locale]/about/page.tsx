import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easportsfc27.wiki'
  const path = '/about'

  return {
    title: 'About EA Sports FC 27 Wiki - Your Ultimate FC 27 Resource Hub',
    description: 'Learn about EA Sports FC 27 Wiki, a community-driven hub tracking the EA SPORTS FC 27 release date, ratings, Ultimate Team, Career Mode, Clubs, gameplay, editions, and platforms.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'EA Sports FC 27 Wiki',
      title: 'About EA Sports FC 27 Wiki',
      description: 'Learn about our mission to provide the best EA SPORTS FC 27 release, ratings, and Ultimate Team coverage.',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'EA Sports FC 27 Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About EA Sports FC 27 Wiki',
      description: 'Learn about our mission to provide the best EA SPORTS FC 27 coverage.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EA Sports FC 27 Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven tracking hub for EA Sports FC 27
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to EA Sports FC 27 Wiki</h2>
            <p>
              EA Sports FC 27 Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              follow EA SPORTS FC 27. We are a community-driven platform that tracks the release date, reveal events,
              trailers, player ratings, Ultimate Team, Career Mode, Clubs, gameplay changes, editions, and platform updates
              in one place.
            </p>
            <p>
              Whether you are waiting for the first official FC 27 reveal or already planning your Ultimate Team and Career
              Mode approach, EA Sports FC 27 Wiki is here to keep you informed every step of the way. Content is available in
              English, Spanish, Brazilian Portuguese, and German.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower EA Sports FC 27 players with accurate, clearly-labeled, and
              up-to-date information</strong> as the game is revealed and released. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Track official announcements, reveal events, trailers, and gameplay deep dives, and clearly separate confirmed facts from rumors and predictions</li>
              <li><strong>Build useful coverage:</strong> Compile ratings, editions, platforms, Ultimate Team, Career Mode, and Clubs guides that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where players can learn, share strategies, and discuss every FC 27 update</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players on every platform and skill level</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision EA Sports FC 27 Wiki as the <strong>go-to destination</strong> for every EA Sports FC 27 player who
              wants fast, trustworthy coverage, whether they are checking the release date, comparing player ratings, planning
              an Ultimate Team squad, or exploring Career Mode and Clubs builds.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⚽</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release &amp; Editions</h3>
              <p className="text-slate-300">
                Track the EA SPORTS FC 27 release date, reveal events, trailers, and Early Access windows, and compare
                Standard vs Ultimate editions, bonuses, and FC Points.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎴</div>
              <h3 className="text-xl font-semibold text-white mb-2">Ultimate Team</h3>
              <p className="text-slate-300">
                Build a stronger squad with FUT guides covering SBCs, Evolutions, Rivals, Champions, the transfer market,
                reward carryover, and Web App timing.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📋</div>
              <h3 className="text-xl font-semibold text-white mb-2">Career Mode</h3>
              <p className="text-slate-300">
                Master Manager and Player Career with transfer targets, youth academy, dynamic potential, and the new
                season features as they are confirmed.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-2">Clubs &amp; Pro Builds</h3>
              <p className="text-slate-300">
                Optimize your virtual pro with position-specific builds, archetypes, PlayStyles, height and weight setups,
                and upgrade paths for every role on the pitch.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⭐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Player Ratings</h3>
              <p className="text-slate-300">
                Stay on top of ratings refreshes, top players by position, the pace meta, young talents, high-potential
                prospects, and Icons and Heroes data.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎮</div>
              <h3 className="text-xl font-semibold text-white mb-2">Platforms &amp; Crossplay</h3>
              <p className="text-slate-300">
                Compare PS5, Xbox Series X|S, PC, and Nintendo Switch support, crossplay grouping, PC requirements, frame
                rates, and new-gen differences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              EA Sports FC 27 Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your questions and suggestions help us prioritize the coverage that matters most</li>
              <li><strong>Community discoveries:</strong> New rating predictions, FUT market tips, and meta-defining tactics shared by players</li>
              <li><strong>Official updates:</strong> We monitor EA announcements, deep dives, and trailers and update our content accordingly</li>
              <li><strong>Meta shifts:</strong> We track gameplay trends and Ultimate Team meta changes based on real player experiences</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you have spotted a ratings update, found a new detail in a reveal
              trailer, or have suggestions for new guides, we would love to hear from you! Reach out through our contact
              channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              EA Sports FC 27 Wiki is maintained by a dedicated team of passionate football gaming fans and developers who
              follow EA SPORTS FC as closely as you do. We are players first, constantly tracking announcements, testing
              gameplay changes, and staying updated with every new reveal.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game coverage:</strong> Deep understanding of EA SPORTS FC mechanics, Ultimate Team, Career Mode, and Clubs</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, accurate guides and tracking posts</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>EA Sports FC 27 Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Electronic Arts Inc., the developer and publisher of EA SPORTS FC, or any
              official entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners. We use
              game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              EA Sports FC 27 Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@easportsfc27.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@easportsfc27.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@easportsfc27.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@easportsfc27.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@easportsfc27.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@easportsfc27.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@easportsfc27.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@easportsfc27.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-[hsl(var(--nav-theme)/0.25)] to-[hsl(var(--nav-theme)/0.1)] border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest EA Sports FC 27 release news, ratings, and guides.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
