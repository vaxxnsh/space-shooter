import { FighterEnemy } from '@/objects/enemies/fighter-enemy';
import { ScoutEnemy } from '@/objects/enemies/scout-enemy';
import { GameObjects, Math, Scene } from 'phaser';


type SpawnConfigType = {
    interval : number
    spawnAt : number
    disableSpawning : boolean
}

type EnemyClass = typeof ScoutEnemy | typeof FighterEnemy;


export class EnemySpawnerComponent {
  #scene;
  #spawnInterval;
  #spawnAt;
  #group;
  #disableSpawning;

  constructor(scene : Scene, enemyClass : EnemyClass, spawnConfig : SpawnConfigType) {
    this.#scene = scene;

    this.#group = this.#scene.add.group({
        name: `${this.constructor.name}-${Math.RND.uuid()}`,
        classType: enemyClass,
        runChildUpdate: true,
        createCallback : (enemy) => {
          enemy.disableInteractive()
        }
    })

    this.#spawnInterval = spawnConfig.interval;
    this.#spawnAt = spawnConfig.spawnAt;
    this.#disableSpawning = false;

    this.#scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.#scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
    this.#scene.events.once(
      Phaser.Scenes.Events.DESTROY,
      () => {
        this.#scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.#scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
      },
      this
    );
  }

  get phaserGroup() {
    return this.#group;
  }

  update(ts : number, dt : number) {
    if (this.#disableSpawning) {
      return;
    }

    this.#spawnAt -= dt;
    if (this.#spawnAt > 0) {
      return;
    }

    const x = Phaser.Math.RND.between(30, this.#scene.scale.width - 30);
    const enemy = this.#group.get(x, -20);
    enemy.reset();
    this.#spawnAt = this.#spawnInterval;
  }

  worldStep(delta : number) {
    this.#group.getChildren().forEach((emy) => {
      const enemy = emy as ScoutEnemy;
      if (!enemy.active) {
        return;
      }

      if (enemy.y > this.#scene.scale.height + 50) {
        enemy.setActive(false);
        enemy.setVisible(false);
      }
    });
  }
}