import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectStatus } from "@/lib/types";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: ProjectStatus }) {
  const tone =
    status === "Deployed"
      ? "text-[#9ec7a8] border-[#9ec7a8]/30"
      : status === "Functional prototype"
        ? "text-[#c8a97c] border-[#c8a97c]/30"
        : "text-[#9fb0c4] border-[#9fb0c4]/25";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${tone}`}
    >
      <span aria-hidden className="size-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:text-brass ${className}`;
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link prefetch={false} href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4">
      {index ? <span className="u-label text-brass/70">{index}</span> : null}
      <span className="u-label">{children}</span>
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-line ${className}`} />;
}
