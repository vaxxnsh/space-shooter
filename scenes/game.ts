"use client";

import { FighterEnemy } from "@/objects/enemies/fighter-enemy";
import { ScoutEnemy } from "@/objects/enemies/scout-enemy";
import { Player } from "@/objects/player";
import { EnemySpawnerComponent } from "@/spawner/enemy-spawner-component";
import { GameObjects, Physics, Scene, Types} from "phaser";
import * as CONFIG from "@/lib/game-config"
import { CUSTOM_EVENTS, EventBusComponent } from "@/events/event-bus-component";
import { EnemyDestroyedComponent } from "@/spawner/enemy-destroyed-component";
import { Score } from "@/ui/score";
import { Lives } from "@/ui/lives";
import { AudioManager } from "@/objects/audio-manager";
import { MCQComponent } from "@/ui/mcq-component";

export default class GameScene extends Scene {
  #eventBus!: EventBusComponent;
  #scoreComponent!: Score;
  #mcqComponent!: MCQComponent;
  #enemiesDestroyed: number = 0;
  #lastQuestionTime: number = 0;
  #lastScoreThreshold: number = 0;
  #isQuestionActive: boolean = false;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.pack("asset_pack", "/assets/data/assets.json");
  }

  create() {
    this.add.sprite(0, 0, 'bg1', 0).setOrigin(0, 1).setAlpha(0.7).setAngle(90).setScale(1, 1.25).play('bg1');
    this.add.sprite(0, 0, 'bg2', 0).setOrigin(0, 1).setAlpha(0.7).setAngle(90).setScale(1, 1.25).play('bg2');
    this.add.sprite(0, 0, 'bg3', 0).setOrigin(0, 1).setAlpha(0.7).setAngle(90).setScale(1, 1.25).play('bg3');
    this.#eventBus = new EventBusComponent();
    const player = new Player(this, this.#eventBus);
    const scoutSpawner = new EnemySpawnerComponent(this,ScoutEnemy,{
      interval : CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
      spawnAt : CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START,
      disableSpawning : false,
    }, this.#eventBus)
    const fighterSpawner = new EnemySpawnerComponent(this,FighterEnemy,{
      interval : CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
      spawnAt : CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START,
      disableSpawning : false,
    }, this.#eventBus)

    new EnemyDestroyedComponent(this, this.#eventBus);

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


    this.#eventBus.on(CUSTOM_EVENTS.EVENY_INIT, (gameObject : Player) => {
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
    
    this.#scoreComponent = new Score(this, this.#eventBus);
    new Lives(this, this.#eventBus);
    new AudioManager(this, this.#eventBus);
    
    // Initialize MCQ component
    this.#mcqComponent = new MCQComponent(this, this.#eventBus);
    this.#mcqComponent.setScoreComponent(this.#scoreComponent);
    
    // Set up triggers for MCQ questions
    this.setupMCQTriggers();
  }

  private setupMCQTriggers(): void {
    // Trigger question after every 3 enemies destroyed
    this.#eventBus.on(CUSTOM_EVENTS.ENEMY_DESTROYED, () => {
      if (this.#isQuestionActive) return; // Don't trigger if question is already active
      
      this.#enemiesDestroyed++;
      if (this.#enemiesDestroyed % 3 === 0) {
        this.#isQuestionActive = true;
        this.#eventBus.emit(CUSTOM_EVENTS.ASK_QUESTION, { type: 'enemy', value: this.#enemiesDestroyed });
      }
    });

    // Trigger question every 30 seconds
    this.time.addEvent({
      delay: 30000, // 30 seconds
      callback: () => {
        if (this.#isQuestionActive) return; // Don't trigger if question is already active
        
        const currentTime = this.time.now;
        if (currentTime - this.#lastQuestionTime > 30000) {
          this.#isQuestionActive = true;
          this.#eventBus.emit(CUSTOM_EVENTS.ASK_QUESTION, { type: 'time' });
          this.#lastQuestionTime = currentTime;
        }
      },
      loop: true
    });

    // Trigger question at score thresholds (every 500 points)
    this.#eventBus.on(CUSTOM_EVENTS.ENEMY_DESTROYED, () => {
      if (this.#isQuestionActive) return; // Don't trigger if question is already active
      
      // Use a small delay to ensure score is updated
      this.time.delayedCall(50, () => {
        if (this.#isQuestionActive) return; // Check again after delay
        
        const currentScore = parseInt(this.#scoreComponent.text);
        const currentThreshold = Math.floor(currentScore / 500) * 500;
        
        console.log('Checking score trigger:', { currentScore, currentThreshold, lastThreshold: this.#lastScoreThreshold });
        
        // Only trigger if we've crossed a new 500-point threshold
        if (currentScore > 0 && currentThreshold > this.#lastScoreThreshold && currentThreshold % 500 === 0) {
          this.#lastScoreThreshold = currentThreshold;
          this.#isQuestionActive = true;
          console.log('Triggering score-based question at:', currentThreshold);
          this.#eventBus.emit(CUSTOM_EVENTS.ASK_QUESTION, { type: 'score', value: currentThreshold });
        }
      });
    });

    // Add keyboard shortcut for testing (press 'Q' to trigger question)
    this.input.keyboard?.on('keydown-Q', () => {
      if (this.#isQuestionActive) return; // Don't trigger if question is already active
      
      this.#isQuestionActive = true;
      this.#eventBus.emit(CUSTOM_EVENTS.ASK_QUESTION, { type: 'manual' });
    });
  }

  update(time: number, delta: number): void {
    // Game update logic can go here if needed
  }

  // Method to reset question active flag when question is answered
  resetQuestionActiveFlag(): void {
    this.#isQuestionActive = false;
  }

}
