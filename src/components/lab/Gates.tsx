"use client";

import { parkPose } from "@/components/lab/parkPath";

function StonePillar({ x, dark }: { x: number; dark: boolean }) {
  const block = dark ? "#4c463e" : "#8a8070";
  const cap = dark ? "#3a362f" : "#6f675a";
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.72, 0.24, 0.72]} />
        <meshStandardMaterial color={cap} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.52, 0.95, 0.52]} />
        <meshStandardMaterial color={block} roughness={0.88} />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.56, 0.38, 0.56]} />
        <meshStandardMaterial color={cap} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[0.48, 0.85, 0.48]} />
        <meshStandardMaterial color={block} roughness={0.86} />
      </mesh>
      <mesh position={[0, 2.45, 0]}>
        <boxGeometry args={[0.62, 0.18, 0.62]} />
        <meshStandardMaterial color="#c49258" metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[0, 2.66, 0]}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshStandardMaterial
          color="#f3d7a0"
          emissive="#f3d7a0"
          emissiveIntensity={dark ? 0.15 : 0.4}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Arch({ variant }: { variant: "start" | "end" }) {
  const dark = variant === "end";
  const beam = dark ? "#2a2825" : "#3a3732";
  return (
    <group>
      <StonePillar x={-1.62} dark={dark} />
      <StonePillar x={1.62} dark={dark} />
      <mesh position={[0, 2.36, 0]}>
        <boxGeometry args={[3.4, 0.22, 0.4]} />
        <meshStandardMaterial color={beam} metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.56, 0]}>
        <boxGeometry args={[1.05, 0.16, 0.18]} />
        <meshStandardMaterial color="#c49258" metalness={0.4} roughness={0.42} />
      </mesh>
      {[-3.2, 3.2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[1.2, 0.07, 0.07]} />
            <meshStandardMaterial color="#2c2a27" metalness={0.5} roughness={0.4} />
          </mesh>
          {[-0.4, 0, 0.4].map((sx) => (
            <mesh key={sx} position={[sx, 0.28, 0]}>
              <boxGeometry args={[0.05, 0.55, 0.05]} />
              <meshStandardMaterial color="#2c2a27" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function Gates() {
  const start = parkPose(0);
  const end = parkPose(0.86);
  const startBack = 1.55;
  const startX = start.x - Math.sin(start.heading) * startBack;
  const startZ = start.z - Math.cos(start.heading) * startBack;

  return (
    <group>
      <group position={[startX, 0, startZ]} rotation={[0, start.heading, 0]}>
        <Arch variant="start" />
      </group>
      <group position={[end.x, 0, end.z]} rotation={[0, end.heading, 0]}>
        <Arch variant="end" />
      </group>
    </group>
  );
}
