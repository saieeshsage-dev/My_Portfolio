import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center pt-32">
      <p className="u-label text-brass/70">404</p>
      <h1 className="mt-6 u-display text-[clamp(2.6rem,6vw,5rem)]">
        This route was never <span className="italic text-brass">compiled</span>.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-paper-faint">
        The page you asked for does not exist. The project library is a better place to
        be.
      </p>
      <div className="mt-10">
        <Link prefetch={false}
          href="/projects"
          className="inline-flex items-center gap-3 border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-brass hover:text-brass"
        >
          View projects →
        </Link>
      </div>
    </div>
  );
}
