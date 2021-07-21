import { BUTTON_MAP, THRESHOLD } from "./common.js";
import { RYU } from "./Character.js";

let ticker;

const draw = (gamepad, character) => {
  if (!gamepad) {
    return false;
  }

  const x = gamepad.axes[0];
  const y = gamepad.axes[1];
  // const vy = (JUMP - character.el.getBoundingClientRect().top) * EASING;

  if (character.isAction) return;

  if (x === 0 && y === 0) {
    character.idle();
  }

  if (gamepad.buttons[BUTTON_MAP.RIGHT].pressed) {
    character.punch();
  }

  if (gamepad.buttons[BUTTON_MAP.UP].pressed) {
    character.kick();
  }

  // if (gamepad.buttons[BUTTON_MAP.DOWN].pressed) {
  //   character.jump(vy);
  // }

  if (y > THRESHOLD) {
    character.crouch();
  }

  if (x > THRESHOLD) {
    character.backward(x);
  }

  if (x < -THRESHOLD) {
    character.forward(x);
  }
};

const tick = () => {
  draw(navigator.getGamepads()[0], RYU);
  ticker = requestAnimationFrame(tick);
};

const initTicker = (event) => {
  if (event.gamepad) {
    console.info(
      "init with gamepad. only nintendo switch controllers supported.",
    );
    document.getElementById("detect").textContent = `${
      navigator.getGamepads()[0].id
    }`;
  }

  ticker = requestAnimationFrame(tick);
};

window.addEventListener("gamepadconnected", initTicker, {
  once: true,
}); // TODO: allow multiple controllers

document.querySelector("audio").volume = 0.2;
