import { atom, selector } from "recoil";
import { placePieces } from "./chessboard";
import { scoreIDs, selectScore } from "./scoreboard";

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

const boardState = selector({
  key: "board-state",
  get: ({ get }) => get(selectScore),
  set: ({ set, get }, i) => {
    const n = get(scoreIDs).length;
    if (i > n) i = get(selectScore);
    else if (i == -1) i = n;
    else if (i < 0) i = 0;
    set(selectScore, i);
    set(placePieces, ["32R", "63k", "2Q"]);
  },
});

export { boardOrientation, appSize, boardState, popup };
