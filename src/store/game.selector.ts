import { selectorFamily, selector } from "recoil";
import { boundNum, toCorePos } from "../utils";
import {
  gameStateAtom,
  selectedGameIDAtom,
  selectedStateIDAtom,
  StateID,
  stateIDAtom,
} from "./game.atoms";

type SquareID = number;

export const pieceSelector = selectorFamily<string, SquareID>({
  key: "square-selector",
  get:
    (id) =>
    ({ get }) => {
      const selGameID = get(selectedGameIDAtom);
      const selStateID = get(selectedStateIDAtom(selGameID));
      const board = get(gameStateAtom([selGameID, selStateID])).boardState
        .board;
      return board[toCorePos(id)];
    },
});

export const scoreSelector = selectorFamily<string, StateID>({
  key: "score-selector",
  get:
    (id) =>
    ({ get }) => {
      const selGameID = get(selectedGameIDAtom);
      const score = get(gameStateAtom([selGameID, id])).sanMove;
      const selStateID = get(selectedStateIDAtom(selGameID));
      const isSelected = selStateID === id;
      return JSON.stringify({ score, isSelected });
    },
});

export const stateSelector = selector<StateID>({
  key: "state-selector",
  get: ({ get }) => get(selectedStateIDAtom(get(selectedGameIDAtom))),
  set: ({ set, get }, stateID) => {
    const selGameID = get(selectedGameIDAtom);
    const maxState = get(stateIDAtom(selGameID)).at(-1) || 0;
    if (stateID === -1) stateID = maxState;
    else stateID = boundNum(+stateID, 0, maxState);
    set(selectedStateIDAtom(selGameID), stateID);
  },
});
