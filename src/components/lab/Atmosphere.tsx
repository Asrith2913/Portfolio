"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Fog } from "three";
import { getLabState } from "@/hooks/useScrollProgress";

const day = new Color("#8fa8b4");
const dusk = new Color("#1a1e1c");
const mixed = new Color();

export function Atmosphere() {
  const fog = useRef<Fog>(null);
  const bg = useRef<Color>(null);

  useFrame(() => {
    const vanish = Math.max(0, (getLabState().current - 0.8) / 0.2);
    mixed.copy(day).lerp(dusk, vanish);
    fog.current?.color.copy(mixed);
    bg.current?.copy(mixed);
    if (fog.current) {
      fog.current.near = 14 - vanish * 7;
      fog.current.far = 46 - vanish * 20;
    }
  });

  return (
    <>
      <color ref={bg} attach="background" args={["#8fa8b4"]} />
      <fog ref={fog} attach="fog" args={["#8fa8b4", 14, 46]} />
    </>
  );
}
