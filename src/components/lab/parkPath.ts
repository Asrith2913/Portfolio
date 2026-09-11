export type ParkPose = {
  x: number;
  y: number;
  z: number;
  heading: number;
};

export function parkPose(progress: number, out: ParkPose = { x: 0, y: 0, z: 0, heading: 0 }) {
  const p = Math.min(1, Math.max(0, progress));
  const z = 7.4 - p * 72;
  const x = Math.sin(p * Math.PI * 1.55) * 2.15;
  const tx = Math.cos(p * Math.PI * 1.55) * (2.15 * Math.PI * 1.55);
  const tz = -72;
  out.x = x;
  out.y = 0;
  out.z = z;
  out.heading = Math.atan2(tx, tz);
  return out;
}

export function pathAhead(progress: number, steps = 0.02) {
  return parkPose(Math.min(1, progress + steps));
}
