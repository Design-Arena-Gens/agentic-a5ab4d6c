'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSiteStore } from '@/store/siteStore';
import type { Order } from '@/store/siteStore';

export function ThankYouClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const orders = (useSiteStore((state) => state.orders) as Order[]) ?? [];

  const order = orders.find((item) => item.id === orderId);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pb-24 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="glass-surface shine-border rounded-[2.5rem] px-10 py-16"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-orange-500 text-3xl">
          ✨
        </div>
        <h1 className="mt-8 text-4xl font-semibold text-slate-50">You are officially inside.</h1>
        <p className="mt-4 text-lg text-slate-300/80">
          Welcome to the Secret of E-Commerce Nobel. Watch for an email with onboarding instructions, asset access, and the
          Operator Floor invitation within the next few minutes.
        </p>
        {order ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-left">
            <h2 className="text-lg font-semibold text-slate-100">Your preorder</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Name</dt>
                <dd className="mt-1 font-medium text-slate-200">{order.customer}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Email</dt>
                <dd className="mt-1 font-medium text-slate-200">{order.email}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Tier</dt>
                <dd className="mt-1 font-medium text-slate-200">{order.tier}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Status</dt>
                <dd className="mt-1 font-medium text-emerald-400">{order.status.toUpperCase()}</dd>
              </div>
            </dl>
            {order.notes ? (
              <div className="mt-6">
                <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Notes</dt>
                <dd className="mt-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">{order.notes}</dd>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-400">
            We could not locate the order details. If you completed checkout, contact support@nobel.com with your receipt and
            we will confirm shortly.
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-200">
          <Link
            href="/"
            className="rounded-full border border-slate-800 px-6 py-3 transition hover:border-slate-500 hover:bg-slate-900"
          >
            Back to site
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-slate-800 px-6 py-3 transition hover:border-slate-500 hover:bg-slate-900"
          >
            View admin panel
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
