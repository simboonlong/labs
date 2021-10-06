export const RATE = 7;
export const THRESHOLD = 0.2;
export const BUTTON_MAP = {
  DOWN: 0,
  RIGHT: 1,
  LEFT: 2,
  UP: 3,
  L1: 4,
  R1: 5,
  ZL: 6,
  PAUSE: 9,
  CAPTURE: 16,
}; // hardcoded mapping to joycon left controller
export const JUMP_DURATION = 500;

export const CONTROLLER = {
  SWITCH: "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)",
  PS3: "PLAYSTATION(R)3 Controller (STANDARD GAMEPAD Vendor: 054c Product: 0268)",
}; // TODO: controller types should be managed

export const getTranslate = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    x: matrix.m41,
    y: matrix.m42,
  };
};
