"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { InstancedMesh, Object3D, type Texture } from "three";
import { Gates } from "@/components/lab/Gates";
import { parkPose } from "@/components/lab/parkPath";
import { barkTexture, grassTexture, pathTexture } from "@/components/lab/textures";

const dummy = new Object3D();

function useScattered(count: number, place: (i: number, dummy: Object3D) => void) {
  const mesh = useRef<InstancedMesh>(null);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  useLayoutEffect(() => {
    const obj = mesh.current;
    if (!obj) return;
    seeds.forEach((i) => {
      place(i, dummy);
      dummy.updateMatrix();
      obj.setMatrixAt(i, dummy.matrix);
    });
    obj.instanceMatrix.needsUpdate = true;
  }, [place, seeds]);

  return mesh;
}

export function Park({ mobile }: { mobile: boolean }) {
  const treeCount = mobile ? 26 : 42;

  const placeTrunk = useMemo(
    () => (i: number, node: Object3D) => {
      const a = i * 2.23;
      const side = i % 2 === 0 ? 1 : -1;
      const z = 12 - (i / treeCount) * 78;
      const x = side * (5.4 + (i % 5) * 0.75) + Math.sin(a) * 0.85;
      node.position.set(x, 1.15, z);
      node.rotation.set(0.03 * ((i % 3) - 1), a, 0);
      const s = 0.88 + (i % 4) * 0.1;
      node.scale.set(s, 1.15 + (i % 3) * 0.18, s);
    },
    [treeCount],
  );

  const placeCanopy = useMemo(
    () => (i: number, node: Object3D) => {
      const tree = i % treeCount;
      const layer = Math.floor(i / treeCount);
      const a = tree * 2.23;
      const side = tree % 2 === 0 ? 1 : -1;
      const z = 12 - (tree / treeCount) * 78;
      const x = side * (5.4 + (tree % 5) * 0.75) + Math.sin(a) * 0.85;
      const s = 1.05 + (tree % 4) * 0.18 - layer * 0.12;
      const ox = [0, 0.48, -0.38][layer] ?? 0;
      const oz = [0, 0.28, 0.42][layer] ?? 0;
      node.position.set(x + ox, 2.7 + layer * 0.32, z + oz);
      node.scale.set(s * (1.15 - layer * 0.12), s * 0.68, s * (1.15 - layer * 0.12));
    },
    [treeCount],
  );

  const placeBush = useMemo(
    () => (i: number, node: Object3D) => {
      const t = (i + 0.5) / 18;
      const pose = parkPose(Math.min(0.88, t));
      const side = i % 2 === 0 ? -1 : 1;
      node.position.set(pose.x + side * (2.6 + (i % 3) * 0.25), 0.28, pose.z + (i % 4) * 0.15);
      node.scale.setScalar(0.7 + (i % 3) * 0.18);
    },
    [],
  );

  const trunks = useScattered(treeCount, placeTrunk);
  const canopies = useScattered(treeCount * 3, placeCanopy);
  const bushes = useScattered(mobile ? 10 : 16, placeBush);
  const maps = useMemo(() => {
    const grass = grassTexture();
    const path = pathTexture();
    const bark = barkTexture();
    return { grass, path, bark };
  }, []);

  useLayoutEffect(() => {
    return () => {
      (Object.values(maps) as Texture[]).forEach((texture) => texture.dispose());
    };
  }, [maps]);

  const path = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      const t = (i / 35) * 0.86;
      const pose = parkPose(t);
      const next = parkPose(Math.min(0.88, t + 0.024));
      return {
        x: pose.x,
        z: pose.z,
        rot: Math.atan2(next.x - pose.x, next.z - pose.z),
      };
    });
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -26]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#8aa86c" map={maps.grass} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, -78]}>
        <planeGeometry args={[48, 36]} />
        <meshLambertMaterial color="#1b211c" />
      </mesh>
      <mesh position={[0, 2.4, -82]}>
        <planeGeometry args={[70, 18]} />
        <meshLambertMaterial color="#141816" transparent opacity={0.55} />
      </mesh>

      {path.map((seg) => (
        <mesh key={`${seg.x}-${seg.z}`} position={[seg.x, 0.025, seg.z]} rotation={[-Math.PI / 2, 0, seg.rot]}>
          <planeGeometry args={[2.7, 2.05]} />
          <meshStandardMaterial color="#d8c19a" map={maps.path} roughness={0.92} />
        </mesh>
      ))}

      <instancedMesh ref={trunks} args={[undefined, undefined, treeCount]}>
        <cylinderGeometry args={[0.12, 0.2, 2.3, 7]} />
        <meshStandardMaterial color="#8a6244" map={maps.bark} roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={canopies} args={[undefined, undefined, treeCount * 3]}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial color="#3f6b42" roughness={0.92} />
      </instancedMesh>
      <instancedMesh ref={bushes} args={[undefined, undefined, mobile ? 10 : 16]}>
        <sphereGeometry args={[0.42, 7, 5]} />
        <meshLambertMaterial color="#355a38" />
      </instancedMesh>

      {[0.14, 0.34, 0.56, 0.74].map((t) => {
        const pose = parkPose(t);
        const side = t > 0.4 ? -1 : 1;
        return (
          <group key={t} position={[pose.x + side * 2.35, 0, pose.z]} rotation={[0, pose.heading + (side > 0 ? -0.6 : 0.6), 0]}>
            <mesh position={[0, 0.26, 0]}>
              <boxGeometry args={[0.95, 0.07, 0.3]} />
              <meshLambertMaterial color="#7a5840" />
            </mesh>
            <mesh position={[0, 0.48, -0.12]}>
              <boxGeometry args={[0.95, 0.28, 0.07]} />
              <meshLambertMaterial color="#6e4f38" />
            </mesh>
            <mesh position={[-0.38, 0.13, 0]}>
              <boxGeometry args={[0.07, 0.26, 0.28]} />
              <meshLambertMaterial color="#624832" />
            </mesh>
            <mesh position={[0.38, 0.13, 0]}>
              <boxGeometry args={[0.07, 0.26, 0.28]} />
              <meshLambertMaterial color="#624832" />
            </mesh>
          </group>
        );
      })}

      {[0.06, 0.26, 0.48, 0.68, 0.84].map((t) => {
        const pose = parkPose(t);
        const side = t > 0.45 ? 1 : -1;
        return (
          <group key={`lamp-${t}`} position={[pose.x + side * 2.05, 0, pose.z]}>
            <mesh position={[0, 1.15, 0]}>
              <cylinderGeometry args={[0.04, 0.055, 2.3, 7]} />
              <meshLambertMaterial color="#3f3b36" />
            </mesh>
            <mesh position={[0, 2.32, 0]}>
              <sphereGeometry args={[0.11, 8, 6]} />
              <meshLambertMaterial color="#f2d7a0" emissive="#f2d7a0" emissiveIntensity={0.45} />
            </mesh>
          </group>
        );
      })}

      <Gates />
    </group>
  );
}
