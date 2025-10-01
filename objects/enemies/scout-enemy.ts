import { BotScoutInputComponent } from "@/inputs/bot-scout-input-component";
import { VerticalMovementComponent } from "@/movement/vertical-movement-component";
import GameScene from "@/scenes/game";
import { GameObjects, Scenes } from "phaser";
import * as  CONFIG from "@/lib/game-config";
import { HorizontalMovementComponent } from "@/movement/horizontal-movement-component";
import { ColliderComponent } from "@/collider/collider-component";
import { HealthComponent } from "@/health/health-component";

export class ScoutEnemy extends GameObjects.Container {
    #shipSprite;
    #shipEngineSprite;
    #inputComponent;
    #verticalMovementComponent;
    #horizontalMovementComponent;
    #healthComponent;
    #colliderComponent;
     
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

        this.#healthComponent = new HealthComponent(CONFIG.ENEMY_SCOUT_HEALTH);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);


        this.scene.events.on(Scenes.Events.UPDATE,this.update,this)
        this.once(GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Scenes.Events.UPDATE,this.update,this)
        },this)
    }


    get colliderComponent() {
        return this.#colliderComponent;
    }

    get healthComponent() {
        return this.#healthComponent;
    }

    reset() {
        this.setActive(true);
        this.setVisible(true);
        this.#healthComponent.reset()
        this.#verticalMovementComponent.reset();
        this.#horizontalMovementComponent.reset();
    }
    
    update(ts: number, dt: number): void {
        if (!this.active) {
            return;
        }

        if (this.#healthComponent.isDead) {
        this.setActive(false);
        this.setVisible(false);
        }

        this.#inputComponent.update()
        this.#horizontalMovementComponent.update();
        this.#verticalMovementComponent.update();
    }
}