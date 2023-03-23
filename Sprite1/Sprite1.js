/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 46,
        y: 53
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.isprime = "True";
    yield* this.askAndWait("Enter the number");
    this.stage.vars.no = this.answer;
    this.stage.vars.sqrt = Math.sqrt(this.toNumber(this.stage.vars.no));
    this.stage.vars.i = 2;
    while (!(this.compare(this.stage.vars.i, this.stage.vars.sqrt) > 0)) {
      if (
        this.toNumber(this.stage.vars.no) % this.toNumber(this.stage.vars.i) ===
        0
      ) {
        this.stage.vars.isprime = "False";
        this.stage.vars.i = this.stage.vars.sqrt;
      }
      this.stage.vars.i++;
      yield;
    }
    if (this.toString(this.stage.vars.isprime) === "True") {
      yield* this.sayAndWait(
        this.toString(this.stage.vars.no) + "- Is a Prime number",
        2
      );
    } else {
      yield* this.sayAndWait(
        this.toString(this.stage.vars.no) + "- Is not a Prime number",
        2
      );
    }
    /* TODO: Implement stop all */ null;
  }
}
