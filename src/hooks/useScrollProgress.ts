"use client";

type LabState = {
  target: number;
  current: number;
  mouseX: number;
  mouseY: number;
  reduce: boolean;
  mobile: boolean;
};

const state: LabState = {
  target: 0,
  current: 0,
  mouseX: 0,
  mouseY: 0,
  reduce: false,
  mobile: false,
};

let started = false;

function readScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  state.target = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
}

export function getLabState() {
  return state;
}

export function startLabInput() {
  if (started || typeof window === "undefined") return () => undefined;
  started = true;

  state.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  state.mobile = window.innerWidth < 768;
  readScroll();
  if (state.reduce) state.current = state.target;

  function onScroll() {
    readScroll();
  }

  function onResize() {
    state.mobile = window.innerWidth < 768;
    readScroll();
  }

  function onPointer(event: PointerEvent) {
    state.mouseX = event.clientX / window.innerWidth - 0.5;
    state.mouseY = event.clientY / window.innerHeight - 0.5;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointer, { passive: true });

  return () => {
    started = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
  };
}

export function tickLabScroll(delta: number) {
  if (state.reduce) {
    state.current = state.target;
    return state.current;
  }
  const k = 1 - Math.exp(-delta * 9.2);
  state.current += (state.target - state.current) * k;
  return state.current;
}

export function span(progress: number, start: number, end: number) {
  if (end <= start) return 0;
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}
