'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSiteStore } from '@/store/siteStore';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

type TierId = 'Nobel Foundation' | 'Launch Architect' | 'Automation Studio';

const tierConfig: Record<
  TierId,
  {
    price: string;
    description: string;
    includes: string[];
  }
> = {
  'Nobel Foundation': {
    price: '$649',
    description: 'Solo operator access with complete cohort experience and templates.',
    includes: [
      'Live cohort + replays',
      'All weekly templates',
      'Operator floor access',
      'Automation starter stack',
    ],
  },
  'Launch Architect': {
    price: '$1,280',
    description: 'Team bundle with tech concierge and automation studio upgrades.',
    includes: [
      'Everything in Foundation',
      '3 collaborative seats',
      'Done-with-you tech stack',
      'Automation studio upgrades',
    ],
  },
  'Automation Studio': {
    price: '$2,900',
    description: 'Operator residency with priority intensives and dashboard builds.',
    includes: [
      'Everything in Architect',
      '6 operator seats',
      'Private intensives',
      'Custom dashboard build',
    ],
  },
};

export function PurchaseClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addOrder = useSiteStore((state) => state.addOrder);
  const [notes, setNotes] = useState('');

  const defaultTier = useMemo<TierId>(() => {
    const tier = searchParams.get('tier');
    if (tier && (tier === 'Launch Architect' || tier === 'Automation Studio' || tier === 'Nobel Foundation')) {
      return tier;
    }
    return 'Nobel Foundation';
  }, [searchParams]);

  const [selectedTier, setSelectedTier] = useState<TierId>(defaultTier);

  const config = tierConfig[selectedTier];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const id = crypto.randomUUID();
    const customer = (form.get('name') as string) || 'Operator';
    const email = (form.get('email') as string) || '';
    const company = (form.get('company') as string) || 'Independent';

    addOrder({
      id,
      customer,
      email,
      company,
      tier: selectedTier,
      createdAt: new Date().toISOString(),
      status: 'pending',
      notes: notes.trim() ? notes : undefined,
    });

    router.push(`/thank-you?order=${id}`);
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 pb-24 pt-16 lg:grid-cols-[1.2fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-surface shine-border rounded-[2rem] p-10"
      >
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-400/80">Secure access</span>
          <h1 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">Purchase the Secret of E-Commerce Nobel</h1>
          <p className="mt-4 text-base text-slate-300/80">
            Confirm your seat and receive immediate onboarding instructions, asset library access, and the pre-cohort
            warmup missions.
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Full name
              <input
                name="name"
                required
                placeholder="Sofia Laurent"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="you@brand.com"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Company or brand
              <input
                name="company"
                placeholder="Nobel Industries"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Team size
              <input
                name="team"
                placeholder="6"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
            Notes
            <textarea
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Share goals, challenges, or activation requests…"
              rows={4}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
            />
          </label>

          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:opacity-90"
          >
            Complete preorder
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-surface shine-border flex flex-col gap-6 rounded-[2rem] p-8"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">Order Summary</span>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-50">{selectedTier}</h2>
          <p className="text-sm text-slate-400">{config.description}</p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-slate-100">{config.price}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-green-400/80">Preorder</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Charged immediately • lifetime access to assets</p>
          </div>
          <div className="flex flex-col gap-3">
            {config.includes.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Switch tier</span>
          <div className="grid gap-3">
            {(Object.keys(tierConfig) as TierId[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selectedTier === tier
                    ? 'border-sky-400 bg-slate-800/80 text-sky-100'
                    : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
