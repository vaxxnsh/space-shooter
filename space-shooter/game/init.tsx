"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import GameScene from "@/space-shooter/scenes/game";
import PreloadScene from "@/space-shooter/scenes/preload";
import BootScene from "@/space-shooter/scenes/boot";

export default function Game() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      roundPixels : true,
      pixelArt : true,
      backgroundColor : "#000000",
      scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH, // full responsive scaling
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 450,
        height: 640,
      },
      physics: {
        default: "arcade",
        arcade: { gravity: { x:0, y: 0}, debug: false },
      },
      parent: "phaser-container",
      scene: [BootScene, PreloadScene, GameScene],
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      document.getElementById("phaser-container")!.innerHTML = "";
      gameRef.current = null;
    };
  }, []);

  // Tailwind classes ensure full width/height screen
  return <div id="phaser-container" className="w-screen h-screen overflow-hidden" />;
}

