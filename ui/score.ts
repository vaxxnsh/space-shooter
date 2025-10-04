import { CUSTOM_EVENTS, EventBusComponent } from '@/events/event-bus-component';
import * as CONFIG from '@/lib/game-config';
import { FighterEnemy } from '@/objects/enemies/fighter-enemy';
import { ScoutEnemy } from '@/objects/enemies/scout-enemy';
import { GameObjects, Scene } from 'phaser';

type EnemyClassName = 'ScoutEnemy' | 'FighterEnemy';

const ENEMY_SCORES: Record<EnemyClassName, number> = {
  ScoutEnemy: CONFIG.ENEMY_SCOUT_SCORE,
  FighterEnemy: CONFIG.ENEMY_FIGHTER_SCORE,
};

export class Score extends GameObjects.Text {
  #score: number;
  #eventBusComponent: EventBusComponent;

  constructor(scene: Scene, eventBusComponent: EventBusComponent) {
    super(scene, scene.scale.width / 2, 20, '0', {
      fontSize: '24px',
      color: '#ff2f66',
    });

    this.scene.add.existing(this);
    this.#eventBusComponent = eventBusComponent;
    this.#score = 0;
    this.setOrigin(0.5);

    this.#eventBusComponent.on(
      CUSTOM_EVENTS.ENEMY_DESTROYED,
      (enemy: FighterEnemy | ScoutEnemy) => {
        const enemyName = enemy.constructor.name as EnemyClassName;
        this.#score += ENEMY_SCORES[enemyName];
        this.setText(this.#score.toString(10));
      }
    );
  }
}
