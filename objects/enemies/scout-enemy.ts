import { BotScoutInputComponent } from "@/inputs/bot-scout-input-component";
import { VerticalMovementComponent } from "@/movement/vertical-movement-component";
import GameScene from "@/scenes/game";
import { GameObjects, Scenes } from "phaser";
import * as  CONFIG from "@/lib/game-config";
import { HorizontalMovementComponent } from "@/movement/horizontal-movement-component";

export class ScoutEnemy extends GameObjects.Container {
    #shipSprite;
    #shipEngineSprite;
    #inputComponent;
    #verticalMovementComponent;
    #horizontalMovementComponent;
     
        constructor(scene : GameScene,x : number,y : number) {
            super(scene, x, y, []);

            this.scene.add.existing(this);
            this.scene.physics.add.existing(this);
            (this.body as Phaser.Physics.Arcade.Body).setSize(24,24);
            (this.body as Phaser.Physics.Arcade.Body).setOffset(-12,-12);
            this.setDepth(2);
    
            this.#shipSprite = scene.add.sprite(0,0,'scout',0);
            this.#shipEngineSprite = scene.add.sprite(0, 0, 'scout_engine').setFlipY(true);
            this.#shipEngineSprite.play('scout_engine');
            this.add([this.#shipEngineSprite, this.#shipSprite]);

            this.#inputComponent = new BotScoutInputComponent(this)
            this.#verticalMovementComponent = new VerticalMovementComponent(
                this,
                this.#inputComponent,
                CONFIG.ENEMY_SCOUT_MOVEMENT_VERTICAL_VELOCITY
            );

            this.#horizontalMovementComponent = new HorizontalMovementComponent(this,
                this.#inputComponent,
                CONFIG.ENEMY_SCOUT_MOVEMENT_HORIZONTAL_VELOCITY
            )


            this.scene.events.on(Scenes.Events.UPDATE,this.update,this)
            this.once(GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Scenes.Events.UPDATE,this.update,this)
            },this)
        }
    
        update(ts: number, dt: number): void {
            this.#inputComponent.update()
            this.#horizontalMovementComponent.update();
            this.#verticalMovementComponent.update();
        }
}