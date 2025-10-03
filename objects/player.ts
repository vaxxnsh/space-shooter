import { KeyboardInputComponent } from "@/inputs/keyboard-input-component";
import { HorizontalMovementComponent } from "@/movement/horizontal-movement-component";
import GameScene from "@/scenes/game";
import { GameObjects, Scenes } from "phaser";
import * as CONFIG from "@/lib/game-config"
import { WeaponComponent } from "@/weapons/weapon-component";
import { HealthComponent } from "@/health/health-component";
import { ColliderComponent } from "@/collider/collider-component";

export class Player extends GameObjects.Container {
    #shipSprite;
    #shipEngineSprite;
    #shipEngineThrusterSprite;
    #keyInputComponent;
    #horizontalMovementComponent;
    #weaponComponent;
    #healthComponent;
    #colliderComponent;

    constructor(scene : GameScene) {
        super(scene, scene.scale.width / 2, scene.scale.height - 32, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(24,24);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-12,-12);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
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

        this.#horizontalMovementComponent = new HorizontalMovementComponent(this,
            this.#keyInputComponent,
            CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY
        )
        this.#weaponComponent = new WeaponComponent(
            this,
            this.#keyInputComponent,
            {
                maxCount : CONFIG.PLAYER_BULLET_MAX_COUNT,
                yOffset : -20,
                interval : CONFIG.PLAYER_BULLET_INTERVAL,
                speed : CONFIG.PLAYER_BULLET_SPEED,
                lifespan : CONFIG.PLAYER_BULLET_LIFESPAN,
                flipY : false
            }
        );
        this.#healthComponent = new HealthComponent(CONFIG.PLAYER_HEALTH);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);
    }

    get colliderComponent() {
        return this.#colliderComponent;
    }

    get healthComponent() {
        return this.#healthComponent;
    }

    get weaponComponent() {
        return this.#weaponComponent;
    }

    get weaponGameObjectGroup() {
        return this.#weaponComponent.bulletGroup;
    }

    #hide() {
        this.setActive(false);
        this.setVisible(false);
        this.#shipEngineSprite.setVisible(false);
        this.#shipEngineThrusterSprite.setVisible(false);
        this.#keyInputComponent.lockInput = true;
    }


    update(ts: number, dt: number): void {
        if (!this.active) {
            return;
        }

        if (this.#healthComponent.isDead) {
            this.#hide();
            this.setVisible(true);
            this.#shipSprite.play({
                key : 'explosion',
            });
            return;
        }
        this.#shipSprite.setFrame((CONFIG.PLAYER_HEALTH - this.#healthComponent.Life).toString(10));



        this.#keyInputComponent.update()
        this.#horizontalMovementComponent.update()
        this.#weaponComponent.update(dt)
    }
}