import { atom, atomFamily } from "recoil";

export const boardColorAtom = atom({
  key: "board-color-atom",
  default: "Violet",
});

export enum Features {
  HIGHLIGHT_MOVES,
  HIGHLIGHT_CHECK,
  HIGHLIGHT_CHECKMATE_MOVE,
  HIGHLIGHT_THREATS_ADVANTAGES,
  PIECE_SYMBOL,
  PIECE_SOUND,
}

export const enabledFeaturesAtom = atomFamily<boolean, Features>({
  key: "enable-featurs-atom",
  default: false,
});

export const popupAtom = atom({
  key: "popup-atom",
  default: "",
});

export const popupPosition = atom({
  key: "popup-position-atom",
  default: "0,0",
});

export const promotionCordAtom = atom<[number, number]>({
  key: "promotion-cords-atom",
  default: [0, 0],
});
