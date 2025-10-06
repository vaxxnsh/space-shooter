import { CUSTOM_EVENTS, EventBusComponent } from "@/space-shooter/events/event-bus-component";
import { HealthComponent } from "@/space-shooter/health/health-component";


export class ColliderComponent {
    #lifeComponent;
    #eventBusComponent;

    constructor(lifeComponent : HealthComponent,eventBusComponent : EventBusComponent) {
        this.#lifeComponent = lifeComponent;
        this.#eventBusComponent = eventBusComponent;
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
        this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_HIT);

    }
}