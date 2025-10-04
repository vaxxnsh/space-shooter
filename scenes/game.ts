"use client";

import { FighterEnemy } from "@/objects/enemies/fighter-enemy";
import { ScoutEnemy } from "@/objects/enemies/scout-enemy";
import { Player } from "@/objects/player";
import { EnemySpawnerComponent } from "@/spawner/enemy-spawner-component";
import { GameObjects, Physics, Scene, Types} from "phaser";
import * as CONFIG from "@/lib/game-config"
import { CUSTOM_EVENTS, EventBusComponent } from "@/events/event-bus-component";
import { EnemyDestroyedComponent } from "@/spawner/enemy-destroyed-component";

export default class GameScene extends Scene {

 
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.pack("asset_pack", "/assets/data/assets.json");
  }

  create() {
    const player = new Player(this);
    const eventBus = new EventBusComponent();
    // const scouts = new ScoutEnemy(this, this.scale.width/2,20);
    // const fighter = new FighterEnemy(this,this.scale.width/2,20);

    const scoutSpawner = new EnemySpawnerComponent(this,ScoutEnemy,{
      interval : CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
      spawnAt : CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START,
      disableSpawning : false,
    },eventBus)
    const fighterSpawner = new EnemySpawnerComponent(this,FighterEnemy,{
      interval : CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
      spawnAt : CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START,
      disableSpawning : false,
    },eventBus)

    new EnemyDestroyedComponent(this, eventBus);

        // collisions for player and enemy groups
    this.physics.add.overlap(player, scoutSpawner.phaserGroup, (playerGameObject, enemyGameObject) => {
      const playerGameObj = playerGameObject as Player;
      const enemyGameObj = enemyGameObject as ScoutEnemy;
      if (!playerGameObj.active || !enemyGameObj.active) {
        return;
      }

      playerGameObj.colliderComponent.collideWithEnemyShip();
      enemyGameObj.colliderComponent!.collideWithEnemyShip();
    });
    this.physics.add.overlap(player, fighterSpawner.phaserGroup, (playerGameObject, enemyGameObject) => {
      const playerGameObj = playerGameObject as Player;
      const enemyGameObj = enemyGameObject as ScoutEnemy;

      if (!playerGameObj.active || !enemyGameObj.active) {
        return;
      }

      playerGameObj.colliderComponent.collideWithEnemyShip();
      enemyGameObj.colliderComponent!.collideWithEnemyShip();
    });


    eventBus.on(CUSTOM_EVENTS.EVENY_INIT, (gameObject : Player) => {
      if (gameObject.constructor.name !== 'FighterEnemy') {
        return;
      }

      this.physics.add.overlap(player, gameObject.weaponGameObjectGroup, (playerGameObject, projectileGameObject) => {
        const playerObj = playerGameObject as Player;
        if (!playerObj.active || !playerObj.active) {
          return;
        }
        gameObject.weaponComponent.destroyBullet((projectileGameObject as Physics.Arcade.Sprite));
        playerObj.colliderComponent.collideWithEnemyProjectile();
      });
    });

    this.physics.add.overlap(
      scoutSpawner.phaserGroup,
      player.weaponGameObjectGroup,
      (enemyGameObject, projectileGameObject) => {
        const enemyGameObj = enemyGameObject as ScoutEnemy;
        const projectileGameObj = projectileGameObject as Physics.Arcade.Sprite

        if (!enemyGameObj.active || !projectileGameObj.active) {
          return;
        }


        player.weaponComponent.destroyBullet(projectileGameObj);
        enemyGameObj.colliderComponent?.collideWithEnemyProjectile();
      }
    )

    this.physics.add.overlap(
      fighterSpawner.phaserGroup,
      player.weaponGameObjectGroup,
      (enemyGameObject, projectileGameObject) => {
        const enemyGameObj = enemyGameObject as FighterEnemy;
        const projectileGameObj = projectileGameObject as Physics.Arcade.Sprite

        if (!enemyGameObj.active || !projectileGameObj.active) {
          return;
        }

        player.weaponComponent.destroyBullet(projectileGameObj);
        enemyGameObj.colliderComponent?.collideWithEnemyProjectile();
      }
    )

  }

}
