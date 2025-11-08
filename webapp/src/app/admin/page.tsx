import Link from 'next/link';
import { AdminClient } from '@/components/AdminClient';

export default function AdminPage() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-slate-900/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400 transition hover:text-slate-100">
            Nobel
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-300">
            <Link href="/purchase" className="transition hover:text-slate-50">
              Purchase flow
            </Link>
            <Link href="/" className="transition hover:text-slate-50">
              View site
            </Link>
          </div>
        </div>
      </header>
      <AdminClient />
    </div>
  );
}
