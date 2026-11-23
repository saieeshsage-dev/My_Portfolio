"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
          <Link prefetch={false}
            href="/"
            className="group flex items-baseline gap-3"
            aria-label={`SK ${site.name} — home`}
          >
            <span className="font-mono text-[13px] tracking-[0.3em] text-paper">
              SK
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint transition-colors group-hover:text-paper-dim lg:block">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-5 md:flex lg:gap-7" aria-label="Primary">
            {nav.filter((item) => item.href !== "/contact").map((item) => (
              <Link prefetch={false}
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  isActive(item.href)
                    ? "text-paper"
                    : "text-paper-faint hover:text-paper"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-brass" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link prefetch={false}
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={`group inline-flex min-h-10 items-center gap-2 whitespace-nowrap border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-brass hover:text-brass ${
                isActive("/contact")
                  ? "border-brass text-brass"
                  : "border-line-strong text-paper"
              }`}
            >
              <span className="xl:hidden">Let&rsquo;s talk</span>
              <span className="hidden xl:inline">Start a conversation</span>
              <span
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center justify-self-end md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-paper transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-6 bg-paper transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-paper transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                    className="border-b border-line py-4"
                  >
                    <Link prefetch={false}
                      href={item.href}
                      className="flex items-baseline justify-between"
                    >
                      <span className="font-serif text-4xl tracking-tight">
                        {item.label}
                      </span>
                      <span className="font-mono text-[11px] text-paper-faint">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-2">
                <p className="u-label">Direct</p>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-sm text-paper-dim"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
