"use client";

import dynamic from "next/dynamic";

export const Lab = dynamic(
  () => import("@/components/lab/LabScene").then((mod) => mod.LabScene),
  { ssr: false },
);
