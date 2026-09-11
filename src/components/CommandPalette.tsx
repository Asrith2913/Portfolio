"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nav, site } from "@/data/site";

const actions = [
  ...nav.map((item) => ({
    id: item.id,
    label: item.label,
    hint: "Jump",
    href: item.href,
  })),
  {
    id: "email",
    label: "Email Asrith",
    hint: site.email,
    href: `mailto:${site.email}`,
  },
  {
    id: "resume",
    label: "Download resume",
    hint: "PDF",
    href: site.resumeHref,
  },
  {
    id: "github",
    label: "Open GitHub",
    hint: "Asrith2913",
    href: site.github,
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    hint: "Profile",
    href: site.linkedin,
  },
  {
    id: "phone",
    label: "Call Asrith",
    hint: site.phone,
    href: site.phoneHref,
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setIndex(0);
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!open) return null;

  function go(href: string) {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      window.open(href, href.startsWith("http") ? "_blank" : "_self");
      return;
    }
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.assign(href);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[#1e2420]/50 px-4 pt-[15vh] backdrop-blur-[2px]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Jump to"
        className="w-full max-w-lg overflow-hidden rounded-md border border-line bg-bg-raised shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIndex((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setIndex((value) => Math.max(value - 1, 0));
            }
            if (event.key === "Enter" && results[index]) {
              event.preventDefault();
              go(results[index].href);
            }
          }}
          placeholder="Jump to a section, or find email / resume…"
          className="w-full border-b border-line bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
        />
        <ul className="max-h-80 overflow-auto py-2">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">Nothing matches.</li>
          ) : (
            results.map((item, itemIndex) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setIndex(itemIndex)}
                  onClick={() => go(item.href)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                    itemIndex === index ? "bg-line/70 text-ink" : "text-muted"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    {item.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
