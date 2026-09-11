import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";

function noiseCanvas(size: number, paint: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  paint(ctx, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

export function grassTexture() {
  const texture = noiseCanvas(256, (ctx, size) => {
    ctx.fillStyle = "#4a6a3c";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 11000; i += 1) {
      const hue = 92 + Math.random() * 30;
      const sat = 32 + Math.random() * 28;
      const lit = 26 + Math.random() * 22;
      ctx.fillStyle = `hsl(${hue} ${sat}% ${lit}%)`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  });
  texture.repeat.set(28, 28);
  return texture;
}

export function pathTexture() {
  const texture = noiseCanvas(256, (ctx, size) => {
    ctx.fillStyle = "#c2aa86";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 7000; i += 1) {
      const lit = 52 + Math.random() * 22;
      ctx.fillStyle = `hsl(${34 + Math.random() * 12} ${22 + Math.random() * 16}% ${lit}%)`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  });
  texture.repeat.set(2.4, 1.8);
  return texture;
}

export function barkTexture() {
  const texture = noiseCanvas(128, (ctx, size) => {
    ctx.fillStyle = "#5c4030";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 400; i += 1) {
      ctx.fillStyle = `hsla(22, 28%, ${18 + Math.random() * 20}%, 0.7)`;
      ctx.fillRect(Math.random() * size, 0, 1 + Math.random() * 2, size);
    }
  });
  texture.repeat.set(1, 2);
  return texture;
}
