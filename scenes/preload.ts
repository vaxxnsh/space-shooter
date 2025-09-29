"use client";

import { Scene } from "phaser";

export type AnimationConfig = {
  key: string;
  assetKey: string;
  frameRate: number;
  repeat: number;
  frames?: number[]; 
};


export default class PreloadScene extends Scene {

  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.pack("asset_pack", "/assets/data/assets.json");
  }

  create() {
    this.#createAnimations();
    this.scene.start('GameScene')
  }


  #createAnimations() {
    const data : AnimationConfig[] = this.cache.json.get('animations_json');
    data.forEach((anim) => {
        const frames = anim.frames ? 
        this.anims.generateFrameNumbers(anim.assetKey,{frames : anim.frames}) :
        this.anims.generateFrameNumbers(anim.assetKey);

        this.anims.create({
            key : anim.key,
            frameRate : anim.frameRate,
            frames : frames,
            repeat: anim.repeat
        })
    })
  }
}
