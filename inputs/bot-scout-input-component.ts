import { GameObjects } from 'phaser';
import { InputComponent } from './input-component';
import * as CONFIG from '@/lib/game-config';

export class BotScoutInputComponent extends InputComponent {
  #gameObject: GameObjects.Container;
  #startX;
  #maxXMovement;
  constructor(gameObject : GameObjects.Container) {
    super();
    this.#gameObject = gameObject;
    this.#startX = this.#gameObject.x;
    this.#maxXMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X;
    this._right = true;
    this._left = false;
    this._down = true;
  }

  set startX(val : number) {
    this.#startX = val;
  }

  update() {
    if (this.#gameObject.x > this.#startX + this.#maxXMovement) {
      this._left = true;
      this._right = false;
    } else if (this.#gameObject.x < this.#startX - this.#maxXMovement) {
      this._left = false;
      this._right = true;
    }
  }
}