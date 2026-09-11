"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import { parkPose, type ParkPose } from "@/components/lab/parkPath";
import { getLabState, tickLabScroll } from "@/hooks/useScrollProgress";

const pose: ParkPose = { x: 0, y: 0, z: 0, heading: 0 };

export function CameraRig() {
  const { camera } = useThree();
  const desired = useRef(new Vector3());
  const look = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const lab = getLabState();
    const progress = tickLabScroll(delta);
    parkPose(lab.reduce ? 0 : progress, pose);

    const heading = pose.heading;
    const forwardX = Math.sin(heading);
    const forwardZ = Math.cos(heading);
    const rightX = Math.cos(heading);
    const rightZ = -Math.sin(heading);
    const startAlign = Math.max(0, 1 - progress / 0.14);
    const vanish = Math.max(0, (progress - 0.82) / 0.18);
    const side = (lab.mobile ? 1.05 : 1.9) * (1 - startAlign * 0.92) * (1 - vanish * 0.65);
    const back = (lab.mobile ? 4.4 : 5.6) + startAlign * 0.2 + vanish * 0.6;

    desired.current.set(
      pose.x - forwardX * back + rightX * side,
      1.78 + startAlign * 0.28 + vanish * 0.35,
      pose.z - forwardZ * back + rightZ * side,
    );

    const parallax = lab.reduce || lab.mobile ? 0 : 1;
    desired.current.x += lab.mouseX * 0.35 * parallax;
    desired.current.y += -lab.mouseY * 0.16 * parallax;

    look.set(
      pose.x + forwardX * (1.4 + vanish * 4.2),
      1.15 - vanish * 0.2,
      pose.z + forwardZ * (1.4 + vanish * 4.2),
    );
    camera.position.lerp(desired.current, 1 - Math.exp(-delta * 8.2));
    camera.lookAt(look);
  });

  return null;
}
