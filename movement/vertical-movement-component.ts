import { InputComponent } from "@/inputs/input-component";
import { GameObjects } from "phaser";
import * as CONFIG from "@/lib/game-config"

export class VerticalMovementComponent {
    #gameObject : GameObjects.GameObject;
    #inputComponent : InputComponent;
    #velocity : number;

    constructor(gameObject : GameObjects.GameObject,inputComponent : InputComponent,velocity : number) {
        this.#inputComponent = inputComponent;
        this.#gameObject = gameObject;
        this.#velocity = velocity
    }

    update() {
        const body = (this.#gameObject).body as Phaser.Physics.Arcade.Body;
        body.setDamping(true)
        body.setMaxVelocity(CONFIG.COMPONENT_MOVEMENT_VERTICAL_MAX_VELOCITY)
        body.setDrag(CONFIG.COMPONENT_MOVEMENT_VERTICAL_DRAG);

        if(!body) {
            throw new Error("Body is not on GameObject")
        }

        if (this.#inputComponent.downIsDown) {
            body.velocity.y += this.#velocity;
        } else if (this.#inputComponent.upIsDown) {
            body.velocity.y -= this.#velocity;
        } else {
            body.setAngularAcceleration(0);
        }
    }

    reset() {
        (this.#gameObject.body!).velocity.y = 0;
        (this.#gameObject.body as Phaser.Physics.Arcade.Body).setAngularAcceleration(0);
  }

}