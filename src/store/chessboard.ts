import { selector, atomFamily, DefaultValue } from "recoil";

export const square = atomFamily<string, number>({
  key: "square",
  default: " ",
});

export const placePieces = selector<string[]>({
  key: "place-pieces",
  get: () => [],
  set: ({ set }, boardInst) => {
    if (boardInst instanceof DefaultValue) return;
    for (let i = 0; i < boardInst.length; i++) {
      set(square(+boardInst[i].slice(0, -1)), boardInst[i].slice(-1));
    }
  },
});
