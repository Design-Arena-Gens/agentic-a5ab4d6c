import { Suspense } from 'react';
import Link from 'next/link';
import { PurchaseClient } from '@/components/PurchaseClient';

export default function PurchasePage() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-slate-900/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400 hover:text-slate-100 transition">
            Nobel
          </Link>
          <Link href="/admin" className="text-sm font-semibold text-slate-300 hover:text-slate-50 transition">
            Admin
          </Link>
        </div>
      </header>
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-16 text-slate-400">
            Loading secure checkout…
          </div>
        }
      >
        <PurchaseClient />
      </Suspense>
    </div>
  );
}
