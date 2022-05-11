export const getSimpleUuid = () => {
  return Math.random().toString(36).slice(2, 7);
};

export const onPostMessage = (bc) => {
  const message = document.getElementById("message");
  const name = document.getElementById("name");

  bc.postMessage({
    type: "MESSAGE",
    payload: {
      name: name.value,
      message: message.value,
    },
  });
  message.value = "";
};

export const onMessageSubmit = (bc, keyCode) => {
  if (keyCode === 13) {
    onPostMessage(bc);
  }
};
