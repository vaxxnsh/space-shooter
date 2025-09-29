"use client";

import { Player } from "@/objects/player";
import { Scene, Types} from "phaser";

export default class GameScene extends Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.pack("asset_pack", "/assets/data/assets.json");
  }

  create() {
    const player = new Player(this);
  }

}
