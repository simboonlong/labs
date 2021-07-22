import { RATE, JUMP_DURATION, getTranslate } from "./common.js";

export class Character {
  constructor(el) {
    this.el = el;
    this.actionHandler;
    this.isAttack;
    this.isJumping;
  }

  restart() {
    // https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/
    this.idle();
    this.el.classList.add("restart");
    this.el.offsetWidth; // trigger reflow
    this.el.classList.remove("restart");
  }

  punch() {
    this.isAttack = true;
    this.restart();
    this.el.classList.add("punch");
    clearTimeout(this.actionHandler);
    this.actionHandler = setTimeout(() => {
      this.el.classList.remove("punch");
      this.isAttack = false;
    }, 200);
  }

  kick() {
    this.isAttack = true;
    this.restart();
    this.el.classList.add("kick");
    clearTimeout(this.actionHandler);
    this.actionHandler = setTimeout(() => {
      this.el.classList.remove("kick");
      this.isAttack = false;
    }, 700);
  }

  jump() {
    this.isJumping = true;
    this.restart();
    this.el.classList.add("jump");
    ease({
      startValue: 0,
      endValue: -200,
      duration: JUMP_DURATION / 2,
      easeType: linear,
      onStep: (value) => {
        this.el.style.transform = `translateX(${
          getTranslate(this.el).x
        }px) translateY(${value.toFixed(0)}px)`;
      },
      onComplete: () => {
        ease({
          startValue: -200,
          endValue: 0,
          duration: JUMP_DURATION / 2,
          easeType: linear,
          onStep: (value) => {
            this.el.style.transform = `translateX(${
              getTranslate(this.el).x
            }px) translateY(${value.toFixed(0)}px)`;
          },
          onComplete: () => {
            this.el.classList.remove("jump");
            this.isJumping = false;
          },
        });
      },
    }); // TODO: cheating here
  }

  crouch() {
    this.el.classList.add("crouch");
  }

  forward(x) {
    this.el.classList.add("forward");
    this.el.style.transform = `translateX(${(
      this.el.getBoundingClientRect().left +
      x * RATE
    ).toFixed(0)}px) translateY(${getTranslate(this.el).y}px)`;
  }

  backward(x) {
    this.el.classList.add("backward");
    this.el.style.transform = `translateX(${(
      this.el.getBoundingClientRect().left +
      x * RATE
    ).toFixed(0)}px) translateY(${getTranslate(this.el).y}px)`;
  }

  idle() {
    this.el.classList.remove("punch");
    this.el.classList.remove("crouch");
    this.el.classList.remove("forward");
    this.el.classList.remove("backward");
  }
}

export const RYU = new Character(document.querySelector(".ryu"));
