import { selectorFamily, selector } from "recoil";
import { toCorePos } from "../utils";
import {
  gameListGetter,
  gameNameAtom,
  gamesList,
  GameState,
  gameState,
  gameStateOf,
  StateID,
  stateList,
  stateListGetter,
} from "./game.atoms";

type SquareID = number;

export const boardNameListSelector = selector({
  key: "board-name-list-selector",
  get: ({ get }) =>
    (get(gamesList) as gameListGetter).list.map((id) => get(gameNameAtom(id))),
});

export const pieceSelector = selectorFamily<string, SquareID>({
  key: "square-selector",
  get:
    (id) =>
    ({ get }) => {
      const gState = get(gameState) as GameState;
      const board = gState.boardState.board;
      return board[toCorePos(id)];
    },
});

export const scoreSelector = selectorFamily<string, StateID>({
  key: "score-selector",
  get:
    (id) =>
    ({ get }) => {
      const score = get(gameStateOf(id)).sanMove;
      const { selected: selStateID } = get(stateList) as stateListGetter;
      const isSelected = selStateID === id;
      return JSON.stringify({ score, isSelected });
    },
});
