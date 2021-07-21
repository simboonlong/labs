import { RATE } from "./common.js";

export class Character {
  constructor(el) {
    this.el = el;
    this.actionHandler;
    this.isAction;
  }

  restart() {
    // https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/
    this.idle();
    this.el.classList.add("restart");
    this.el.offsetWidth; // trigger reflow
    this.el.classList.remove("restart");
  }

  punch() {
    this.isAction = true;
    this.restart();
    this.el.classList.add("punch");
    clearTimeout(this.actionHandler);
    this.actionHandler = setTimeout(() => {
      this.el.classList.remove("punch");
      this.isAction = false;
    }, 200);
  }

  kick() {
    this.isAction = true;
    this.restart();
    this.el.classList.add("kick");
    clearTimeout(this.actionHandler);
    this.actionHandler = setTimeout(() => {
      this.el.classList.remove("kick");
      this.isAction = false;
    }, 700);
  }

  // jump(vy) {
  //   this.el.style.transform = `translateY(${(
  //     this.el.getBoundingClientRect().top + vy
  //   ).toFixed(0)}px)`;
  //   console.log("yeah");
  // }

  crouch() {
    this.el.classList.add("crouch");
  }

  forward(x) {
    this.el.classList.add("forward");
    this.el.style.transform = `translateX(${(
      this.el.getBoundingClientRect().left +
      x * RATE
    ).toFixed(0)}px)`;
  }

  backward(x) {
    this.el.classList.add("backward");
    this.el.style.transform = `translateX(${(
      this.el.getBoundingClientRect().left +
      x * RATE
    ).toFixed(0)}px)`;
  }

  idle() {
    this.el.classList.remove("punch");
    this.el.classList.remove("crouch");
    this.el.classList.remove("forward");
    this.el.classList.remove("backward");
  }
}

export const RYU = new Character(document.querySelector(".ryu"));
