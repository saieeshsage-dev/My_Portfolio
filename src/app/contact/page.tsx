import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about AI systems architecture, agentic operations, product roles or collaboration.",
};

export default function ContactPage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Contact</SectionLabel>
        <h1 className="mt-6 max-w-3xl u-display text-[clamp(2.8rem,7vw,6rem)]">
          Start a <span className="italic text-brass">conversation</span>.
        </h1>
        <p className="mt-8 max-w-xl u-body">
          I am most useful to teams that have decided AI matters and are now discovering
          that the hard part is architecture, verification and operating model — not
          access to a model.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-14 border-t border-line pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="u-label mb-4">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] tracking-tight text-paper"
            >
              {site.email}
            </a>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="u-label mb-1">LinkedIn</dt>
                <dd>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-paper-dim transition-colors hover:text-brass"
                  >
                    saieesh-kanakula
                  </a>
                </dd>
              </div>
              <div>
                <dt className="u-label mb-1">Phone</dt>
                <dd className="text-sm text-paper-dim">{site.phone}</dd>
              </div>
              <div>
                <dt className="u-label mb-1">Based in</dt>
                <dd className="text-sm text-paper-dim">
                  {site.location} · {site.timezone}
                </dd>
              </div>
              <div>
                <dt className="u-label mb-1">Availability</dt>
                <dd className="max-w-xs text-sm leading-relaxed text-paper-dim">
                  {site.availability}
                </dd>
              </div>
            </dl>

            <div className="mt-10 border border-line p-5">
              <p className="u-label mb-3">Good reasons to write</p>
              <ul className="space-y-2 text-sm text-paper-faint">
                <li>You are designing an agentic system and the coordination problem is real.</li>
                <li>You need someone who can hold product, architecture and delivery together.</li>
                <li>You want a working session rather than a slide deck.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <Reveal delay={0.06}>
            <p className="u-label mb-6">Collaboration enquiry</p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
