import { HealthComponent } from "@/health/health-component";


export class ColliderComponent {
    #lifeComponent;

    constructor(lifeComponent : HealthComponent) {
        this.#lifeComponent = lifeComponent
    }

    collideWithEnemyShip() {
        if(this.#lifeComponent.isDead) {
            return;
        }

        this.#lifeComponent.die();
    }

    collideWithEnemyProjectile() {
        if(this.#lifeComponent.isDead) {
            return;
        }

        this.#lifeComponent.hit();
    }
}