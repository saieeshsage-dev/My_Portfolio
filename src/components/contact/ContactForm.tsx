"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [intent, setIntent] = useState("Collaboration");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] ${intent} — ${name || "Enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${org}\nTopic: ${intent}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="no-print">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="u-label mb-2 block">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-line bg-transparent px-3 py-2.5 text-sm text-paper transition-colors focus:border-brass focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="org" className="u-label mb-2 block">
            Organisation
          </label>
          <input
            id="org"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            className="w-full border border-line bg-transparent px-3 py-2.5 text-sm text-paper transition-colors focus:border-brass focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="intent" className="u-label mb-2 block">
          What is this about
        </label>
        <div className="relative">
          <select
            id="intent"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="w-full appearance-none border border-line bg-ink px-3 py-2.5 pr-9 text-sm text-paper transition-colors focus:border-brass focus:outline-none"
          >
            {[
              "Collaboration",
              "AI systems architecture",
              "Product / contract role",
              "Speaking or writing",
              "Something else",
            ].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-paper-faint"
          >
            ▾
          </span>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="u-label mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y border border-line bg-transparent px-3 py-2.5 text-sm text-paper transition-colors focus:border-brass focus:outline-none"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 border border-brass bg-brass px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90"
        >
          Compose email
          <span
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="max-w-xs font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-paper-faint">
          Opens your mail client. No form service, no tracking, nothing stored.
        </p>
      </div>

      {sent ? (
        <p role="status" className="mt-4 text-sm text-brass">
          Your mail client should have opened with the message prepared.
        </p>
      ) : null}
    </form>
  );
}
