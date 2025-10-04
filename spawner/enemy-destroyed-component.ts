import { GameObjects, Physics, Scene } from 'phaser';
import { CUSTOM_EVENTS, EventBusComponent } from '@/events/event-bus-component';
import { FighterEnemy } from '@/objects/enemies/fighter-enemy.js';

export class EnemyDestroyedComponent {
  #scene;
  #group;
  #eventBusComponent;

  constructor(scene : Scene, eventBusComponent : EventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    this.#group = this.#scene.add.group({
      name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
    });

    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy : FighterEnemy) => {
      const gameObject = this.#group.get(enemy.x, enemy.y, enemy.shipAssetKey, 0);
      gameObject.play({
        key: enemy.shipDestroyedAnimationKey,
      });
    });
  }
}