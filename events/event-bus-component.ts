import { Events } from "phaser";

export const CUSTOM_EVENTS = Object.freeze({
    EVENY_INIT : 'ENEMY_INIT',
    ENEMY_DESTROYED : 'ENEMY_DESTROYED',
    PLAYER_SPAWN: 'PLAYER_SPAWN',
    PLAYER_DESTROYED: 'PLAYER_DESTROYED',
    GAME_OVER: 'GAME_OVER',
    SHIP_HIT: 'SHIP_HIT',
    SHIP_SHOOT: 'SHIP_SHOOT',
});

export class EventBusComponent extends Events.EventEmitter {
    constructor() {
        super()
    }
}