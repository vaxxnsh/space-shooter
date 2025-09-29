import { KeyboardInputComponent } from "@/inputs/keyboard-input-component";
import { HorizontalMovementComponent } from "@/movement/horizontal-movement-component";
import GameScene from "@/scenes/game";
import { GameObjects, Scenes } from "phaser";
import * as CONFIG from "@/lib/game-config"

export class Player extends GameObjects.Container {
    #shipSprite;
    #shipEngineSprite;
    #shipEngineThrusterSprite;
    #keyInputComponent;
    #horizontalMovementComponent;

    constructor(scene : GameScene) {
        super(scene, scene.scale.width / 2, scene.scale.height - 32, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(24,24);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-12,-12);
        this.setDepth(2);

        this.#shipSprite = scene.add.sprite(0,0,'ship');
        this.#shipEngineSprite = scene.add.sprite(0, 0, 'ship_engine');
        this.#shipEngineThrusterSprite = scene.add.sprite(0, 0, 'ship_engine_thruster');
        this.add([this.#shipEngineThrusterSprite, this.#shipEngineSprite, this.#shipSprite]);
        this.#keyInputComponent = new KeyboardInputComponent(scene)
        this.scene.events.on(Scenes.Events.UPDATE,this.update,this)
        this.once(GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Scenes.Events.UPDATE,this.update,this)
        },this)

        this.#horizontalMovementComponent = new HorizontalMovementComponent(this,this.#keyInputComponent,CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY)
    }

    update(ts: number, dt: number): void {
        this.#keyInputComponent.update()
        this.#horizontalMovementComponent.update()
    }
}