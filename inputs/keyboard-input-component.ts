import { Types } from "phaser";
import { InputComponent } from "./input-component";
import GameScene from "@/scenes/game";

export class KeyboardInputComponent extends InputComponent {
    #cursorKeys : Types.Input.Keyboard.CursorKeys | undefined;
    #inputLocked : boolean = false;

    constructor(scene : GameScene) {
        super();
        if (scene.input.keyboard) {
            this.#cursorKeys = scene.input.keyboard.createCursorKeys();
        }
        else {
            throw new Error("Inputs is Not Defined")
        }
        
    }

    
  set lockInput(val : boolean) {
    this.#inputLocked = val;
  }

    update() {
        if(!this.#cursorKeys){
            throw new Error("cursor keys are not defined")
        }

        if (this.#inputLocked) {
            this.reset();
            return;
        }

        this._up = this.#cursorKeys.up.isDown;
        this._down = this.#cursorKeys.down.isDown;
        this._left = this.#cursorKeys.left.isDown;
        this._right = this.#cursorKeys.right.isDown;
        this._shoot = this.#cursorKeys.space.isDown;
    }

    
}