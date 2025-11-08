import { Suspense } from 'react';
import Link from 'next/link';
import { ThankYouClient } from '@/components/ThankYouClient';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-slate-900/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400 hover:text-slate-100 transition">
            Nobel
          </Link>
          <Link href="/purchase" className="text-sm font-semibold text-slate-300 hover:text-slate-50 transition">
            Purchase
          </Link>
        </div>
      </header>
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-4xl px-6 pb-24 pt-20 text-slate-400">
            Finalizing your access…
          </div>
        }
      >
        <ThankYouClient />
      </Suspense>
    </div>
  );
}
