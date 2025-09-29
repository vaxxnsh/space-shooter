import { InputComponent } from "@/inputs/input-component";
import { GameObjects, Math, Physics } from "phaser";

type BulletConfig = {
    maxCount : number
    yOffset : number
    interval : number
    speed : number
    lifespan : number
    flipY : boolean
}

export class WeaponComponent {
  #gameObject : GameObjects.Container;
  #inputComponent : InputComponent;
  #bulletGroup : Physics.Arcade.Group;
  #bulletConfig : BulletConfig;
  #fireBulletInterval = 0;
  

  constructor(gameObject : GameObjects.Container, inputComponent : InputComponent, bulletConfig : BulletConfig) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent
    this.#bulletConfig = bulletConfig
    this.#bulletGroup = this.#gameObject.scene.
    physics.
    add.group({
        name: `bullets-${Math.RND.uuid()}`,
        enable : false
    });

    this.#bulletGroup.createMultiple({
        key: 'bullet',
        quantity : this.#bulletConfig.maxCount,
        active : false,
        visible : false,
    });

    this.#gameObject.scene.physics.world.on(Physics.Arcade.Events.WORLD_STEP,this.worldStep,this)
    this.#gameObject.once(GameObjects.Events.DESTROY, () => {
        this.#gameObject.scene.physics.world.off(GameObjects.Events.DESTROY,this.worldStep,this)
    },this)
  }

  update(dt : number) {
    this.#fireBulletInterval -= dt;
    if(this.#fireBulletInterval > 0) {
        return;
    }


    if (this.#inputComponent.shootIsDown) {
        const bullet = this.#bulletGroup.getFirstDead();
        if (bullet === undefined || bullet === null) {
            return;
        }

        const x = this.#gameObject.x;
        const y = this.#gameObject.y + this.#bulletConfig.yOffset;
        bullet.enableBody(true, x, y, true, true);
        bullet.body.velocity.y -= this.#bulletConfig.speed;
        bullet.setState(this.#bulletConfig.lifespan);
        bullet.setScale(0.8);
        bullet.play('bullet')
        bullet.body.setSize(14,18);
        bullet.setFlipY(this.#bulletConfig.flipY)
        this.#fireBulletInterval = this.#bulletConfig.interval;
    }
  }

  get bulletGroup() {
    return this.#bulletGroup;
  }

  worldStep(delta : number) {
    this.#bulletGroup.getChildren().forEach((bullet) => {
       const b = bullet as Phaser.Physics.Arcade.Image;
        if(!b.active) {
            return;
        }
    
        b.setState((b.state as number) - delta);

        if ((b.state as number) <= 0) {
            b.disableBody(true, true);
        }
    })
  }
}