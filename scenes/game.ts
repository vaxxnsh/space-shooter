"use client";

import { FighterEnemy } from "@/objects/enemies/fighter-enemy";
import { ScoutEnemy } from "@/objects/enemies/scout-enemy";
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
    const scouts = new ScoutEnemy(this, this.scale.width/2,20);
    const fighter = new FighterEnemy(this,this.scale.width * 0.2,20);
  }

}
