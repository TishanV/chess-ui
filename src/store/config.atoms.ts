import { atom, atomFamily } from "recoil";

export const boardColorAtom = atom({
  key: "board-color-atom",
  default: "Violet",
});

export enum Features {
  HIGHLIGHT_MOVES,
  HIGHLIGHT_CHECK,
  HIGHLIGHT_THREATS_ADVANTAGES,
  PIECE_SYMBOL,
  PIECE_SOUND,
}

export const enabledFeaturesAtom = atomFamily<boolean, Features>({
  key: "enable-featurs-atom",
  default: true,
});
