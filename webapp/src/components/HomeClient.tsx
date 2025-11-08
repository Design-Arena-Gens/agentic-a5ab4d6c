'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { useSiteStore, createDefaultState } from '@/store/siteStore';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const stats = [
  { label: 'Commerce launches engineered', value: '320+' },
  { label: 'Automation templates', value: '78' },
  { label: 'Operator success score', value: '97%' },
  { label: 'Avg. payback period', value: '23 days' },
];

const testimonials = [
  {
    name: 'Nina Alvarez',
    role: 'Founder, Trailblaze Lab',
    quote:
      'The Nobel blueprint handed us a cinematic storefront and a retention engine. We hit our 12-month revenue goal in 8 weeks.',
  },
  {
    name: 'Khalid Omari',
    role: 'COO, Mono Commerce',
    quote:
      'From offer architecture to automation scripts, the program compresses years of agency intel into one actionable system.',
  },
  {
    name: 'Evelyn Brooks',
    role: 'Director of Growth, Northbound',
    quote:
      'We plugged in the Nobel dashboards and finally saw where traction leaked. The scale ops studio alone paid for the course.',
  },
];

type PricingTier = {
  id: string;
  title: string;
  price: string;
  subtitle: string;
  url: string;
  perks: string[];
  highlight?: boolean;
};

const pricing: PricingTier[] = [
  {
    id: 'nobel-foundation',
    title: 'Nobel Foundation',
    price: '$649',
    subtitle: 'Pre-order pricing • single seat',
    url: '/purchase?tier=Nobel%20Foundation',
    perks: ['Full cohort access', 'Live workshops + replays', 'Launch templates bundle', 'Community floor entry'],
  },
  {
    id: 'launch-architect',
    title: 'Launch Architect',
    price: '$1,280',
    subtitle: 'Team access • up to 3 seats',
    url: '/purchase?tier=Launch%20Architect',
    highlight: true,
    perks: [
      'Everything in Foundation',
      'Tech stack concierge',
      'Automation studio upgrades',
      'Partner syndication briefs',
    ],
  },
  {
    id: 'automation-studio',
    title: 'Automation Studio',
    price: '$2,900',
    subtitle: 'Operator residency • up to 6 seats',
    url: '/purchase?tier=Automation%20Studio',
    perks: [
      'Private strategy intensives',
      'Priority office hours',
      'Done-for-you dashboard build',
      'Creative experimentation lab',
    ],
  },
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-12 flex max-w-3xl flex-col gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400/80">{eyebrow}</span>
      <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl">{title}</h2>
      <p className="text-lg text-slate-300/80">{description}</p>
    </div>
  );
}

export function HomeClient() {
  const defaults = useMemo(() => createDefaultState(), []);
  const heroHeadline = useSiteStore((state) => state.heroHeadline) ?? defaults.heroHeadline;
  const heroSubheadline = useSiteStore((state) => state.heroSubheadline) ?? defaults.heroSubheadline;
  const heroCTA = useSiteStore((state) => state.heroCTA) ?? defaults.heroCTA;
  const nextCohortDate = useSiteStore((state) => state.nextCohortDate) ?? defaults.nextCohortDate;
  const modules = useSiteStore((state) => state.modules) ?? defaults.modules;
  const bonuses = useSiteStore((state) => state.bonuses) ?? defaults.bonuses;

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-900/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 to-orange-500" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Nobel</span>
              <span className="text-base font-semibold text-slate-100">Secret of E-Commerce</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 sm:flex">
            <a href="#modules" className="transition hover:text-slate-50">
              Modules
            </a>
            <a href="#bonuses" className="transition hover:text-slate-50">
              Bonuses
            </a>
            <a href="#pricing" className="transition hover:text-slate-50">
              Pricing
            </a>
            <Link href="/admin" className="transition hover:text-slate-50">
              Admin
            </Link>
          </nav>
          <Link
            href="/purchase"
            className="shine-border hidden rounded-full bg-gradient-to-r from-sky-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:opacity-90 sm:block"
          >
            {heroCTA}
          </Link>
          <Link
            href="/purchase"
            className="sm:hidden rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100"
          >
            Join
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16">
        <section className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-400/80"
            >
              e-commerce blueprint
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-slate-50 sm:text-5xl lg:text-6xl"
            >
              {heroHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-300/80 sm:text-xl"
            >
              {heroSubheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/purchase"
                className="shine-border flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:opacity-95"
              >
                {heroCTA}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <span className="text-sm font-medium text-slate-400">{nextCohortDate}</span>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-surface rounded-3xl border border-slate-800/60 p-6">
                  <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">{stat.label}</span>
                  <p className="mt-3 text-3xl font-semibold text-slate-50">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hero-gradient rounded-[2.5rem] border border-slate-800/70 p-4 shadow-2xl shadow-cyan-500/20"
          >
            <HeroCanvas />
          </motion.div>
        </section>

        <section id="modules">
          <SectionTitle
            eyebrow="The Nobel Sequence"
            title="Four cinematic chapters, engineered to build and scale your commerce engine."
            description="Each module is assessed, critiqued, and actioned inside the Operator Floor. No fluff, only implementation cadences and creative intelligence frameworks."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map((module) => (
              <div key={module.id} className="glass-surface shine-border rounded-[2rem] p-8">
                <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  <span>{module.duration}</span>
                  <span>Module</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-50">{module.title}</h3>
                <p className="mt-3 text-base text-slate-300/80">{module.outcome}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {module.deliverables.map((deliverable) => (
                    <span key={deliverable} className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="bonuses">
          <SectionTitle
            eyebrow="Operator Bonuses"
            title="Designed for momentum — kitted with playbooks, private access, and tech concierge."
            description="Angel-tier bonuses engineered to multiply implementation speed and protect your sprint focus."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {bonuses.map((bonus) => (
              <div key={bonus.id} className="glass-surface shine-border flex flex-col rounded-3xl p-6">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400/80">{bonus.value}</span>
                <h3 className="mt-4 text-xl font-semibold text-slate-50">{bonus.title}</h3>
                <p className="mt-3 text-sm text-slate-300/80">{bonus.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing">
          <SectionTitle
            eyebrow="Enrollment"
            title="Preorder the cohort now — scale with Nobel."
            description="Seats unlock the full system blueprint, live critiques, and automation studio access. Choose the cadence aligned to your team."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {pricing.map((tier) => (
              <div
                key={tier.id}
                className={`glass-surface shine-border flex flex-col rounded-[2rem] p-8 ${
                  tier.highlight ? 'border-2 border-orange-400/60 bg-slate-900/70 shadow-xl shadow-orange-500/20' : ''
                }`}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{tier.title}</span>
                <p className="mt-4 text-4xl font-bold text-slate-50">{tier.price}</p>
                <p className="mt-2 text-sm text-slate-400">{tier.subtitle}</p>
                <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-300/80">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.url}
                  className="mt-8 flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  Secure seat
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            eyebrow="Operator Proof"
            title="Built with Nobel alumni"
            description="Operators from DTC brands, SaaS marketplaces, and experiential retail leverage Nobel blueprints to launch faster with cinematic precision."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="glass-surface rounded-3xl p-6">
                <p className="text-base text-slate-200/90">{`“${item.quote}”`}</p>
                <div className="mt-6 flex flex-col">
                  <span className="text-sm font-semibold text-slate-50">{item.name}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-slate-800 bg-slate-900/60 p-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
            Step inside the Nobel Operator Floor
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300/80">
            Secure your seat and unlock the frameworks powering modern commerce icons. Deploy a cinematic
            brand narrative, scale with data, and automate fulfillment without losing soul.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/purchase"
              className="shine-border flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:opacity-95"
            >
              Reserve your cohort seat
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/purchase?tier=Launch%20Architect"
              className="rounded-full border border-slate-700 px-8 py-4 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
            >
              View team pricing
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900/60 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Nobel</span>
            <p className="mt-2 text-sm text-slate-500">Cinematic commerce for operators in motion.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/purchase" className="hover:text-slate-100">
              Purchase
            </Link>
            <Link href="/thank-you" className="hover:text-slate-100">
              Thank you
            </Link>
            <Link href="/admin" className="hover:text-slate-100">
              Admin panel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
