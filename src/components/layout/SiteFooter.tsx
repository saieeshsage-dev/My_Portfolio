import Link from "next/link";
import { nav, site } from "@/content/site";
import { ArrowLink } from "@/components/ui/atoms";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="u-label mb-6">Next</p>
            <h2 className="u-display text-[clamp(2.4rem,5vw,4.6rem)] text-paper">
              Let&rsquo;s build something
              <br />
              <span className="italic text-brass">that survives</span> a Tuesday.
            </h2>
            <div className="mt-10">
              <ArrowLink href="/contact">Start a conversation</ArrowLink>
            </div>
          </div>

          <div className="md:col-span-5 md:justify-self-end">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="u-label mb-4">Index</p>
                <ul className="space-y-2.5">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link prefetch={false}
                        href={item.href}
                        className="text-sm text-paper-dim transition-colors hover:text-paper"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="u-label mb-4">Elsewhere</p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-paper-dim transition-colors hover:text-paper"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-paper-dim transition-colors hover:text-paper"
                    >
                      Email
                    </a>
                  </li>
                  {site.github ? (
                    <li>
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-paper-dim transition-colors hover:text-paper"
                      >
                        GitHub
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">
            © {new Date().getFullYear()} {site.name} — {site.location}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">
            Built as an engineered system, not a template
          </p>
        </div>
      </div>
    </footer>
  );
}
