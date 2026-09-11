import { CommandPalette } from "@/components/CommandPalette";
import { Header } from "@/components/Header";
import { Lab } from "@/components/lab/Lab";
import { Overlay } from "@/components/lab/Overlay";

export default function Home() {
  return (
    <>
      <Lab />
      <Header />
      <Overlay />
      <CommandPalette />
    </>
  );
}
