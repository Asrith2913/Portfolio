"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";

export function Header() {
  const [active, setActive] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const lockRef = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    let lastMobile = "";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function headerHeight() {
      return headerRef.current?.offsetHeight ?? 64;
    }

    function syncScrollPadding() {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${headerHeight() + 12}px`,
      );
    }

    function moveBar(id: string, instant: boolean) {
      const bar = barRef.current;
      const link = id
        ? navRef.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`)
        : null;
      if (!bar) return;

      const animate = !instant && !reduceMotion && id;
      bar.style.transition = animate
        ? "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), width 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease"
        : "none";

      if (!link) {
        bar.style.opacity = "0";
        return;
      }

      bar.style.opacity = "1";
      bar.style.width = `${link.offsetWidth}px`;
      bar.style.transform = `translate3d(${link.offsetLeft}px,0,0)`;
    }

    function readingLine() {
      return headerHeight() + 72;
    }

    function currentSection() {
      const line = readingLine();
      let current = "";

      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = item.id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = nav[nav.length - 1].id;
      }

      const locked = lockRef.current;
      if (locked) {
        current = locked;
        const target = document.getElementById(locked);
        if (target && Math.abs(target.getBoundingClientRect().top - (headerHeight() + 12)) < 36) {
          lockRef.current = null;
        }
      }

      return current;
    }

    function update(instant = false) {
      syncScrollPadding();
      const next = currentSection();
      setActive((prev) => (prev === next ? prev : next));
      moveBar(next, instant);

      if (next && next !== lastMobile) {
        lastMobile = next;
        const mobileLink = mobileNavRef.current?.querySelector<HTMLElement>(`[data-nav="${next}"]`);
        const scroller = mobileNavRef.current;
        if (mobileLink && scroller) {
          const target =
            mobileLink.offsetLeft - scroller.clientWidth / 2 + mobileLink.offsetWidth / 2;
          scroller.scrollTo({
            left: Math.max(0, target),
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    }

    syncScrollPadding();
    update(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observed = navRef.current;
    const ro = observed ? new ResizeObserver(() => update(true)) : null;
    if (observed) ro?.observe(observed);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    lockRef.current = id;
    setActive(id);

    const link = navRef.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`);
    const bar = barRef.current;
    if (link && bar) {
      bar.style.opacity = "1";
      bar.style.width = `${link.offsetWidth}px`;
      bar.style.transform = `translate3d(${link.offsetLeft}px,0,0)`;
    }

    const offset = (headerRef.current?.offsetHeight ?? 64) + 12;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    window.setTimeout(() => {
      if (lockRef.current === id) lockRef.current = null;
    }, 1200);
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-line/40 bg-[#1e2420]/82 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        <a
          href="#top"
          className="font-mono text-xs tracking-[0.22em] text-accent"
          onClick={(event) => {
            event.preventDefault();
            lockRef.current = null;
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", "#top");
          }}
        >
          ARV
        </a>
        <nav
          ref={navRef}
          className="relative hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              data-nav={item.id}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                scrollToId(item.id);
              }}
              className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                active === item.id ? "text-[#f7f1e8]" : "text-[#d4c4ae] hover:text-[#f7f1e8]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <span
            ref={barRef}
            aria-hidden
            className="pointer-events-none absolute -bottom-2 left-0 h-px w-0 bg-accent opacity-0 will-change-transform"
          />
        </nav>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
          <a href={site.resumeHref} className="text-accent hover:text-accent-soft">
            Resume
          </a>
          <span className="hidden text-muted/70 lg:inline">⌘K</span>
        </div>
      </div>
      <nav
        ref={mobileNavRef}
        className="flex gap-4 overflow-x-auto border-t border-line/80 px-6 py-3 md:hidden"
        aria-label="On this page"
      >
        {nav.map((item) => (
          <a
            key={item.id}
            data-nav={item.id}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              scrollToId(item.id);
            }}
            className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
              active === item.id ? "text-[#f7f1e8]" : "text-[#d4c4ae]"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
