import { getSimpleUuid, onPostMessage, onMessageSubmit } from "./utils.js";

let ID;

const ROOM = "roomId";
const message = document.getElementById("message");
const name = document.getElementById("name");
const iframe = document.getElementById("iframe");

const url = new URL(location);
const params = new URLSearchParams(url.search);

const names = [
  "John",
  "Mary",
  "Chris",
  "Sophie",
  "Peter",
  "Anne",
  "Nick",
  "Carrie",
  "Brandon",
  "Jane",
];

const randomName = names[Math.floor(Math.random() * names.length)];
name.setAttribute("value", randomName);

if (params.has(ROOM)) {
  ID = params.get(ROOM);
} else {
  ID = getSimpleUuid();

  const SearchParams = searchParams();
  SearchParams.append({ key: ROOM, value: ID });
}

const bc = new BroadcastChannel(`channel_${ID}`);
iframe.setAttribute("src", `./iframe.html?roomId="${ID}"`);

document.getElementById("button").addEventListener("click", () => {
  onPostMessage(bc);
});
message.addEventListener("keyup", (e) => {
  onMessageSubmit(bc, e.keyCode);
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const btnAnother = document.getElementById("another");
    btnAnother.removeAttribute("disabled");

    btnAnother.addEventListener("click", () => {
      open(location.href);
    });
  }, 500);
});
