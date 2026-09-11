"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/lab/Atmosphere";
import { CameraRig } from "@/components/lab/CameraRig";
import { Park } from "@/components/lab/Park";
import { Walker } from "@/components/lab/Walker";
import { startLabInput } from "@/hooks/useScrollProgress";

function Lights() {
  return (
    <>
      <Atmosphere />
      <hemisphereLight args={["#e4eef2", "#4a5a38", 0.95]} />
      <ambientLight intensity={0.42} color="#f6eedd" />
      <directionalLight position={[8, 14, 6]} intensity={1.65} color="#ffe2b8" />
      <directionalLight position={[-5, 5, -3]} intensity={0.35} color="#9ab0c2" />
    </>
  );
}

export function LabScene() {
  const [frameloop, setFrameloop] = useState<"always" | "demand">("always");
  const [mobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const stop = startLabInput();
    function onVisibility() {
      setFrameloop(document.visibilityState === "visible" ? "always" : "demand");
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="lab-canvas pointer-events-none fixed inset-0 z-0">
      <Canvas
        frameloop={frameloop}
        dpr={mobile ? [1, 1.15] : [1, 1.4]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 44, near: 0.1, far: 90, position: [3.2, 1.7, 12] }}
      >
        <AdaptiveDpr />
        <Lights />
        <CameraRig />
        <Park mobile={mobile} />
        <Walker />
      </Canvas>
    </div>
  );
}
