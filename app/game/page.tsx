"use client";
import dynamic from "next/dynamic";
const Game = dynamic(() => import("@/game/init"), { ssr: false });


export default function GamePage() {
  return (
    <main style={{ display: "flex", justifyContent: "center"}}>
      <Game />
    </main>
  );
}
