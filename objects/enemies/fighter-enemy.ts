import { BotScoutInputComponent } from "@/inputs/bot-scout-input-component";
import { VerticalMovementComponent } from "@/movement/vertical-movement-component";
import GameScene from "@/scenes/game";
import { GameObjects, Scenes } from "phaser";
import * as  CONFIG from "@/lib/game-config";
import { HorizontalMovementComponent } from "@/movement/horizontal-movement-component";
import { BotFighterInputComponent } from "@/inputs/bot-fighter-input-component";
import { WeaponComponent } from "@/weapons/weapon-component";
import { HealthComponent } from "@/health/health-component";
import { ColliderComponent } from "@/collider/collider-component";

export class FighterEnemy extends GameObjects.Container {
    #shipSprite;
    #shipEngineSprite;
    #inputComponent;
    #verticalMovementComponent;
    #weaponComponent;
    #healthComponent;
    #colliderComponent;
     
    constructor(scene : GameScene,x : number,y : number) {
        super(scene, x, y, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(24,24);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-12,-12);
        this.setDepth(2);

        this.#shipSprite = scene.add.sprite(0,0,'fighter',0);
        this.#shipEngineSprite = scene.add.sprite(0, 0, 'fighter_engine').setFlipY(true);
        this.#shipEngineSprite.play('fighter_engine');
        this.add([this.#shipEngineSprite, this.#shipSprite]);

        this.#inputComponent = new BotFighterInputComponent()

        this.#verticalMovementComponent = new VerticalMovementComponent(
            this,
            this.#inputComponent,
            CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY
        );

        this.#weaponComponent = new WeaponComponent(
            this,
            this.#inputComponent,
            {
                speed: CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
                interval: CONFIG.ENEMY_FIGHTER_BULLET_INTERVAL,
                lifespan: CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
                maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
                yOffset: 10,
                flipY: true,
            }
        );

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

    get weaponGameObjectGroup() {
        return this.#weaponComponent.bulletGroup;
    }


    get healthComponent() {
        return this.#healthComponent;
    }
    get weaponComponent() {
        return this.#weaponComponent;
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
        this.#verticalMovementComponent.update();
        this.#weaponComponent.update(dt);
    }
}