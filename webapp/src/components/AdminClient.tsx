'use client';

import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSiteStore } from '@/store/siteStore';
import type { CourseModule, Order } from '@/store/siteStore';

export function AdminClient() {
  const heroHeadline = useSiteStore((state) => state.heroHeadline);
  const heroSubheadline = useSiteStore((state) => state.heroSubheadline);
  const heroCTA = useSiteStore((state) => state.heroCTA);
  const nextCohortDate = useSiteStore((state) => state.nextCohortDate);
  const modules = useSiteStore((state) => state.modules) as CourseModule[];
  const orders = useSiteStore((state) => state.orders) as Order[];

  const updateHero = useSiteStore((state) => state.updateHero);
  const updateModule = useSiteStore((state) => state.updateModule);
  const toggleOrderStatus = useSiteStore((state) => state.toggleOrderStatus);
  const resetContent = useSiteStore((state) => state.resetContent);
  const updateCohortDate = useSiteStore((state) => state.updateCohortDate);

  const heroFormRef = useRef<HTMLFormElement>(null);
  const heroKey = useMemo(
    () => [heroHeadline, heroSubheadline, heroCTA, nextCohortDate].join('|'),
    [heroHeadline, heroSubheadline, heroCTA, nextCohortDate],
  );

  const totalOrders = orders.length;
  const fulfilled = orders.filter((order) => order.status === 'fulfilled').length;

  const tierBreakdown = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc[order.tier] = (acc[order.tier] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [orders]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-surface shine-border rounded-[2rem] p-10"
      >
        <header className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Hero controls</span>
          <h2 className="text-2xl font-semibold text-slate-50">Edit hero content</h2>
        </header>
        <form
          key={heroKey}
          ref={heroFormRef}
          className="grid gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            updateHero(
              (formData.get('headline') as string) || heroHeadline,
              (formData.get('subheadline') as string) || heroSubheadline,
              (formData.get('cta') as string) || heroCTA,
            );
            updateCohortDate((formData.get('cohort') as string) || nextCohortDate);
          }}
        >
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
            Headline
            <input
              name="headline"
              defaultValue={heroHeadline}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
            Subheadline
            <textarea
              name="subheadline"
              defaultValue={heroSubheadline}
              rows={3}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
            />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Primary CTA
              <input
                name="cta"
                defaultValue={heroCTA}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
              Cohort note
              <input
                name="cohort"
                defaultValue={nextCohortDate}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-base font-normal text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-sky-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:opacity-90"
            >
              Update hero
            </button>
            <button
              type="button"
              onClick={() => heroFormRef.current?.reset()}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Reset changes
            </button>
          </div>
        </form>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-surface shine-border rounded-[2rem] p-10"
      >
        <header className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Modules</span>
          <h2 className="text-2xl font-semibold text-slate-50">Update the curriculum</h2>
        </header>
        <div className="grid gap-6">
          {modules.map((module) => (
            <div key={module.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex flex-col gap-2 text-sm font-semibold text-slate-200">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{module.duration}</span>
                <input
                  value={module.title}
                  onChange={(event) => updateModule(module.id, { title: event.target.value })}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-base font-semibold text-slate-100 outline-none transition focus:border-sky-400"
                />
                <textarea
                  value={module.outcome}
                  onChange={(event) => updateModule(module.id, { outcome: event.target.value })}
                  rows={3}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-normal text-slate-200 outline-none transition focus:border-sky-400"
                />
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Deliverables
                  <input
                    value={module.deliverables.join(', ')}
                    onChange={(event) =>
                      updateModule(module.id, {
                        deliverables: event.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                      })
                    }
                    className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-normal text-slate-200 outline-none transition focus:border-sky-400"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-surface shine-border rounded-[2rem] p-10"
      >
        <header className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Orders</span>
          <h2 className="text-2xl font-semibold text-slate-50">Manage preorders</h2>
        </header>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Total</span>
            <p className="mt-2 text-3xl font-semibold text-slate-50">{totalOrders}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Fulfilled</span>
            <p className="mt-2 text-3xl font-semibold text-emerald-400">{fulfilled}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Breakdown</span>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              {Object.entries(tierBreakdown).length === 0 ? (
                <li>No orders yet</li>
              ) : (
                Object.entries(tierBreakdown).map(([tier, count]) => (
                  <li key={tier}>
                    <span className="font-semibold text-slate-100">{tier}</span>: {count}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No orders yet. Complete the purchase flow to see entries populate instantly.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="bg-slate-950/50">
                    <td className="px-6 py-4 font-semibold text-slate-200">{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{order.customer}</span>
                        <span className="text-xs text-slate-500">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-200">{order.tier}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
                          order.status === 'fulfilled'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-700/40 text-slate-100'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{order.notes || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleOrderStatus(order.id)}
                        className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:border-slate-500"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300"
      >
        <div>
          <h3 className="text-base font-semibold text-slate-100">Danger zone</h3>
          <p className="mt-1 text-xs text-slate-500">This will reset hero copy, modules, and remove all stored orders.</p>
        </div>
        <button
          type="button"
          onClick={resetContent}
          className="rounded-full border border-red-500/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-400 transition hover:bg-red-500/10"
        >
          Reset site content
        </button>
      </motion.div>
    </div>
  );
}
