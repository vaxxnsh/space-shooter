"use client";

import { FighterEnemy } from "@/objects/enemies/fighter-enemy";
import { ScoutEnemy } from "@/objects/enemies/scout-enemy";
import { Player } from "@/objects/player";
import { Physics, Scene, Types} from "phaser";

export default class GameScene extends Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.pack("asset_pack", "/assets/data/assets.json");
  }

  create() {
    const player = new Player(this);
    // const scouts = new ScoutEnemy(this, this.scale.width/2,20);
    const fighter = new FighterEnemy(this,this.scale.width/2,20);

    this.physics.add.overlap(player,fighter,(playerObj, enemyObj) => {
      const pl = playerObj as Player
      pl.colliderComponent.collideWithEnemyShip();

    })

    this.physics.add.overlap(player,fighter.weaponGameObjectGroup,(playerObj, bulletObj) => {
      const pl = playerObj as Player
      const ft = fighter as FighterEnemy

      pl.colliderComponent.collideWithEnemyProjectile()
      ft.weaponComponent.destroyBullet((bulletObj as Physics.Arcade.Sprite))
    })
    this.physics.add.overlap(fighter,player.weaponGameObjectGroup,(enemyObj, bulletObj) => {
      const pl = player as Player
      const ft = enemyObj as FighterEnemy

      ft.colliderComponent.collideWithEnemyProjectile()
      pl.weaponComponent.destroyBullet((bulletObj as Physics.Arcade.Sprite))
    })

  }

}
