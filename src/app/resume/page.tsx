import type { Metadata } from "next";
import { resumeMeta } from "@/content/resume";
import { site } from "@/content/site";
import { ResumeView } from "@/components/resume/ResumeView";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Saieesh Kanakula — 11+ years in product and marketing operations, MarTech, AI and automation. Product Manager for Online Application Portals at Global University Systems.",
};

export default function ResumePage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Professional profile</SectionLabel>

        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="u-display text-[clamp(2.6rem,5.6vw,4.8rem)]">
              {site.name}
            </h1>
            <p className="mt-4 max-w-xl font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-brass/80">
              {resumeMeta.title}
            </p>
            <p className="mt-8 max-w-2xl u-body">{resumeMeta.summary}</p>
          </div>

          <div className="md:col-span-4 md:border-l md:border-line md:pl-8">
            <dl className="space-y-4">
              <div>
                <dt className="u-label mb-1">Location</dt>
                <dd className="text-sm text-paper-dim">
                  {site.location} · {site.timezone}
                </dd>
              </div>
              <div>
                <dt className="u-label mb-1">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-paper-dim transition-colors hover:text-brass"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="u-label mb-1">Phone</dt>
                <dd className="text-sm text-paper-dim">{site.phone}</dd>
              </div>
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
            </dl>
          </div>
        </div>
      </Reveal>

      <div className="mt-16">
        <ResumeView />
      </div>

      <Reveal className="mt-16 border-t border-line pt-6">
        <p className="max-w-2xl font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-paper-faint">
          Everything on this page is taken directly from the source resume. No role,
          date, certification or achievement has been added or embellished.
        </p>
      </Reveal>
    </div>
  );
}
