"use client";

import GameRoom from "@/components/game-room";

export default function GamePage() {
  return (
    <main
      className="
        h-screen w-screen overflow-hidden
      "
    >
      <div>
        <GameRoom />
      </div>
    </main>
  );
}
