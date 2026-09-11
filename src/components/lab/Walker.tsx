"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, type Material, MeshBasicMaterial, type Mesh } from "three";
import { parkPose, type ParkPose } from "@/components/lab/parkPath";
import { getLabState } from "@/hooks/useScrollProgress";

const pose: ParkPose = { x: 0, y: 0, z: 0, heading: 0 };
const skin = "#d2a57c";
const shirt = "#efe0cc";
const jacket = "#6b5a48";
const pants = "#3a3d42";
const hair = "#2a2218";
const shoe = "#1f1a16";

export function Walker() {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const leftThigh = useRef<Group>(null);
  const rightThigh = useRef<Group>(null);
  const leftShin = useRef<Group>(null);
  const rightShin = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftFore = useRef<Group>(null);
  const rightFore = useRef<Group>(null);
  const mats = useRef<Material[]>([]);

  useFrame(() => {
    const { current, reduce } = getLabState();
    parkPose(current, pose);
    if (!root.current || !body.current) return;

    if (mats.current.length === 0) {
      root.current.traverse((node) => {
        const mesh = node as Mesh;
        const material = mesh.material;
        if (!mesh.isMesh || !material) return;
        const list = Array.isArray(material) ? material : [material];
        list.forEach((item) => {
          item.transparent = true;
          mats.current.push(item);
        });
      });
    }

    const fade = 1 - Math.min(1, Math.max(0, (current - 0.88) / 0.1));
    root.current.visible = fade > 0.02;
    mats.current.forEach((material) => {
      const base = material instanceof MeshBasicMaterial ? 0.28 : 1;
      material.opacity = fade * base;
      material.depthWrite = fade > 0.2;
    });

    root.current.position.set(pose.x, 0, pose.z);
    root.current.rotation.y = pose.heading;

    const phase = reduce ? 0 : current * 220;
    const left = Math.sin(phase);
    const right = Math.sin(phase + Math.PI);
    const bob = reduce ? 0 : Math.abs(Math.sin(phase)) * 0.03;

    body.current.position.y = bob;
    body.current.rotation.y = left * 0.055;
    body.current.rotation.z = left * 0.03;

    if (leftThigh.current) leftThigh.current.rotation.x = left * 0.55;
    if (rightThigh.current) rightThigh.current.rotation.x = right * 0.55;
    if (leftShin.current) leftShin.current.rotation.x = Math.max(0, -left) * 0.75;
    if (rightShin.current) rightShin.current.rotation.x = Math.max(0, -right) * 0.75;
    if (leftArm.current) leftArm.current.rotation.x = right * 0.44;
    if (rightArm.current) rightArm.current.rotation.x = left * 0.44;
    if (leftFore.current) leftFore.current.rotation.x = Math.max(0.12, right * 0.3);
    if (rightFore.current) rightFore.current.rotation.x = Math.max(0.12, left * 0.3);
  });

  return (
    <group ref={root}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.02]}>
        <circleGeometry args={[0.3, 14]} />
        <meshBasicMaterial color="#1a2218" transparent opacity={0.28} />
      </mesh>

      <group ref={body}>
        <mesh position={[0, 1.16, 0]}>
          <capsuleGeometry args={[0.175, 0.38, 6, 10]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={jacket} />
        </mesh>
        <mesh position={[0, 1.22, 0.09]}>
          <boxGeometry args={[0.2, 0.22, 0.06]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={shirt} />
        </mesh>
        <mesh position={[0, 1.36, 0]}>
          <torusGeometry args={[0.1, 0.018, 6, 10]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={shirt} />
        </mesh>
        <mesh position={[0, 1.34, 0.08]}>
          <boxGeometry args={[0.16, 0.04, 0.05]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={shirt} />
        </mesh>
        <mesh position={[-0.21, 1.3, 0]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={jacket} />
        </mesh>
        <mesh position={[0.21, 1.3, 0]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={jacket} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.048, 0.055, 0.09, 8]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
        </mesh>
        <mesh position={[0, 1.54, 0.02]}>
          <sphereGeometry args={[0.132, 14, 12]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
        </mesh>
        <mesh position={[-0.04, 1.56, 0.112]}>
          <sphereGeometry args={[0.015, 8, 6]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color="#2c241c" />
        </mesh>
        <mesh position={[0.04, 1.56, 0.112]}>
          <sphereGeometry args={[0.015, 8, 6]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color="#2c241c" />
        </mesh>
        <mesh position={[0, 1.5, 0.122]}>
          <boxGeometry args={[0.026, 0.016, 0.018]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color="#b88866" />
        </mesh>
        <mesh position={[-0.128, 1.53, 0.01]}>
          <sphereGeometry args={[0.028, 8, 6]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
        </mesh>
        <mesh position={[0.128, 1.53, 0.01]}>
          <sphereGeometry args={[0.028, 8, 6]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
        </mesh>
        <mesh position={[0, 1.61, 0]} rotation={[0.18, 0, 0]}>
          <sphereGeometry args={[0.136, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={hair} />
        </mesh>

        <group ref={leftArm} position={[-0.25, 1.28, 0]}>
          <mesh position={[0, -0.13, 0]}>
            <capsuleGeometry args={[0.048, 0.2, 5, 8]} />
            <meshStandardMaterial roughness={0.68} metalness={0.03} color={jacket} />
          </mesh>
          <group ref={leftFore} position={[0, -0.25, 0]}>
            <mesh position={[0, -0.1, 0]}>
              <capsuleGeometry args={[0.04, 0.18, 5, 8]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
            </mesh>
          </group>
        </group>
        <group ref={rightArm} position={[0.25, 1.28, 0]}>
          <mesh position={[0, -0.13, 0]}>
            <capsuleGeometry args={[0.048, 0.2, 5, 8]} />
            <meshStandardMaterial roughness={0.68} metalness={0.03} color={jacket} />
          </mesh>
          <group ref={rightFore} position={[0, -0.25, 0]}>
            <mesh position={[0, -0.1, 0]}>
              <capsuleGeometry args={[0.04, 0.18, 5, 8]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={skin} />
            </mesh>
          </group>
        </group>

        <mesh position={[0, 0.86, 0]}>
          <boxGeometry args={[0.34, 0.14, 0.16]} />
          <meshStandardMaterial roughness={0.68} metalness={0.03} color={pants} />
        </mesh>

        <group ref={leftThigh} position={[-0.09, 0.8, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 5, 8]} />
            <meshStandardMaterial roughness={0.68} metalness={0.03} color={pants} />
          </mesh>
          <group ref={leftShin} position={[0, -0.28, 0]}>
            <mesh position={[0, -0.14, 0]}>
              <capsuleGeometry args={[0.05, 0.2, 5, 8]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={pants} />
            </mesh>
            <mesh position={[0, -0.28, 0.045]}>
              <boxGeometry args={[0.09, 0.05, 0.17]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={shoe} />
            </mesh>
          </group>
        </group>
        <group ref={rightThigh} position={[0.09, 0.8, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 5, 8]} />
            <meshStandardMaterial roughness={0.68} metalness={0.03} color={pants} />
          </mesh>
          <group ref={rightShin} position={[0, -0.28, 0]}>
            <mesh position={[0, -0.14, 0]}>
              <capsuleGeometry args={[0.05, 0.2, 5, 8]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={pants} />
            </mesh>
            <mesh position={[0, -0.28, 0.045]}>
              <boxGeometry args={[0.09, 0.05, 0.17]} />
              <meshStandardMaterial roughness={0.68} metalness={0.03} color={shoe} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
