"use client";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/space-shooter/game/init"), { ssr: false });

export default function GamePage() {
  return (
    <main
      className="
        h-screen w-screen overflow-hidden 
        bg-[url('/assets/images/piiixl/bg.gif')] 
        bg-repeat bg-[length:auto] 
        bg-black/50 bg-blend-darken
        flex justify-center items-center
      "
    >
      <div>
        <Game />
      </div>
    </main>
  );
}
