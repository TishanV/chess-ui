import { selector, atom, DefaultValue } from "recoil";

export const boardNames = atom<string[]>({
  key: "board-names",
  default: ["Board 1"],
});

export const selectedBoardID = atom<number>({
  key: "selected-board-id",
  default: 0,
});

export const addBoard = selector<string>({
  key: "add-board",
  get: () => "",
  set: ({ set, get }, boardName) => {
    if (boardName instanceof DefaultValue) return;
    set(selectedBoardID, get(boardNames).length);
    set(boardNames, (v) => [...v, boardName]);
  },
});

export const removeBoard = selector<number>({
  key: "remove-board",
  get: () => 0,
  set: ({ set, get }, index) => {
    if (get(boardNames).length <= 1) return;
    set(boardNames, (v) => [...v.slice(0, +index), ...v.slice(+index + 1)]);
    let prev_index = +index - 1;
    if (prev_index < 0) prev_index = 0;
    set(selectedBoardID, prev_index);
  },
});
