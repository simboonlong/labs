const url = new URL(location);
const params = new URLSearchParams(url.search);
const getId = () => params.get("roomId").replace(/"|'/g, "");
const bc = new BroadcastChannel(`channel_${getId()}`);
const chat = document.getElementById("chat");

bc.onmessage = (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case "MESSAGE":
      const p = document.createElement("p");
      p.innerHTML = `${payload.name}: ${payload.message}`;
      chat.append(p);
      break;
    default:
      console.log("No type matched on data recieved.");
  }
};
