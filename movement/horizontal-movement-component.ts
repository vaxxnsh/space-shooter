import { InputComponent } from "@/inputs/input-component";
import { GameObjects } from "phaser";

export class HorizontalMovementComponent {
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
        body.setMaxVelocity(200)
        body.setDamping(true)
        body.setDrag(0.01);

        if(!body) {
            throw new Error("Body is not on GameObject")
        }

        if(this.#inputComponent.leftIsDown) {
            body.velocity.x -= this.#velocity;
        }
        else if(this.#inputComponent.rightIsDown) {
            body.velocity.x += this.#velocity;
        }
        else{
            body.setAngularAcceleration(0);
        }
    }
}