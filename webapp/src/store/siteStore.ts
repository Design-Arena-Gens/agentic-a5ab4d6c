'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CourseModule = {
  id: string;
  title: string;
  outcome: string;
  deliverables: string[];
  duration: string;
};

export type CourseBonus = {
  id: string;
  title: string;
  value: string;
  description: string;
};

export type Order = {
  id: string;
  customer: string;
  email: string;
  company: string;
  tier: 'Nobel Foundation' | 'Launch Architect' | 'Automation Studio';
  createdAt: string;
  status: 'pending' | 'fulfilled';
  notes?: string;
};

export type SiteState = {
  heroHeadline: string;
  heroSubheadline: string;
  heroCTA: string;
  nextCohortDate: string;
  modules: CourseModule[];
  bonuses: CourseBonus[];
  orders: Order[];
  addOrder: (payload: Order) => void;
  toggleOrderStatus: (id: string) => void;
  updateHero: (headline: string, subheadline: string, cta: string) => void;
  updateCohortDate: (value: string) => void;
  updateModule: (id: string, input: Partial<CourseModule>) => void;
  resetContent: () => void;
};

export const defaultModules: CourseModule[] = [
  {
    id: 'market-code',
    title: 'Decode the Market Signal',
    outcome:
      'Map profitable niches with AI-enhanced research frameworks and Nobel validation sprints.',
    deliverables: ['Market resonance grid', 'Competitor teardown', 'Offer match blueprint'],
    duration: 'Week 01',
  },
  {
    id: 'store-architecture',
    title: 'Store Architecture Lab',
    outcome:
      'Design a cinematic storefront experience, optimized for conversion and deep storytelling.',
    deliverables: ['Hero funnel wireframes', 'Dynamic PDP archetypes', 'Retention automation map'],
    duration: 'Week 02',
  },
  {
    id: 'launch-systems',
    title: 'Launch Systems Engine',
    outcome:
      'Automate marketing, fulfillment, and customer success pipelines with Nobel playbooks.',
    deliverables: ['Omni-channel launch stack', 'Klaviyo & Meta automation scripts', 'Partner syndication kit'],
    duration: 'Week 03',
  },
  {
    id: 'scale-ops',
    title: 'Scale Operations Studio',
    outcome:
      'Deploy dashboards, growth cadences, and profit guardrails for sustainable scaling.',
    deliverables: ['Forecast control center', 'Creative iteration protocol', 'Retention uplift matrix'],
    duration: 'Week 04',
  },
];

export const defaultBonuses: CourseBonus[] = [
  {
    id: 'templates',
    title: 'Weekly Nobel Templates',
    value: '$1,400 value',
    description: 'Swipe files, agency decks, and automation clips for each module.',
  },
  {
    id: 'community',
    title: 'Private Operator Floor',
    value: '$890 value',
    description: 'Bi-weekly roundtables and office hours with Nobel founders.',
  },
  {
    id: 'tech-stack',
    title: 'Done-for-You Stack Setup',
    value: '$2,100 value',
    description: 'Pre-configured CRM, analytics, and ad automations ready to plug in.',
  },
];

export const createDefaultState = () => ({
  heroHeadline: 'The Secret of E-Commerce Nobel',
  heroSubheadline:
    'A cinematic masterclass guiding operators from concept to scalable commerce systems in 30 days.',
  heroCTA: 'Preorder the 2024 cohort',
  nextCohortDate: 'Cohort opens March 18 • 120 seats only',
  modules: defaultModules.map((item) => ({ ...item, deliverables: [...item.deliverables] })),
  bonuses: defaultBonuses.map((item) => ({ ...item })),
  orders: [] as Order[],
});

export const useSiteStore = create<SiteState>()(
  persist(
    (set, get) => ({
      ...createDefaultState(),
      addOrder: (payload) =>
        set({
          orders: [
            {
              ...payload,
            },
            ...get().orders,
          ],
        }),
      toggleOrderStatus: (id) =>
        set({
          orders: get().orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status: order.status === 'fulfilled' ? 'pending' : 'fulfilled',
                }
              : order,
          ),
        }),
      updateHero: (headline, subheadline, cta) =>
        set({
          heroHeadline: headline,
          heroSubheadline: subheadline,
          heroCTA: cta,
        }),
      updateCohortDate: (value) =>
        set({
          nextCohortDate: value,
        }),
      updateModule: (id, input) =>
        set({
          modules: get().modules.map((module) =>
            module.id === id
              ? {
                  ...module,
                  ...input,
                }
              : module,
          ),
        }),
      resetContent: () => set(createDefaultState()),
    }),
    {
      name: 'secret-ecommerce-nobel-state',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      partialize: (state) => ({
        heroHeadline: state.heroHeadline,
        heroSubheadline: state.heroSubheadline,
        heroCTA: state.heroCTA,
        modules: state.modules,
        bonuses: state.bonuses,
        orders: state.orders,
        nextCohortDate: state.nextCohortDate,
      }),
    },
  ),
);
