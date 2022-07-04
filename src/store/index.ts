import { atom } from "recoil";

const appSize = atom({
  key: "app-size",
  default: 500,
});

const popup = atom({
  key: "popup",
  default: "",
});

const boardOrientation = atom({
  key: "board-orientation",
  default: false,
});

export { boardOrientation, appSize, popup };
