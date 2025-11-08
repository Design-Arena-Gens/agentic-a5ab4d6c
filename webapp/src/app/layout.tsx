import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secret of E-Commerce Nobel",
  description:
    "Transform your commerce vision into reality with immersive lessons, templates, and tools from the Secret of E-Commerce Nobel masterclass.",
  metadataBase: new URL("https://agentic-a5ab4d6c.vercel.app"),
  openGraph: {
    title: "Secret of E-Commerce Nobel",
    description:
      "Launch, scale, and automate your online store using the signature Nobel blueprint.",
    url: "https://agentic-a5ab4d6c.vercel.app",
    siteName: "Secret of E-Commerce Nobel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret of E-Commerce Nobel",
    description:
      "A cinematic e-commerce masterclass with interactive training, tools, and community access.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} bg-slate-950`}>
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
          <div className="pointer-events-none absolute inset-0 hero-gradient opacity-70" />
          <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
