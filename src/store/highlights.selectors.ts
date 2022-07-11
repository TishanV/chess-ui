import { atom, selector, selectorFamily } from "recoil";
import { listCaptures, listVulnerables } from "../core/attackable";
import { toCorePos } from "../utils";
import { GameState, gameState } from "./game.atoms";
import { boardOrientation } from "./index";

export const selectedSquare = atom<number>({
  key: "selected-square-atom",
  default: -1,
});

export const playerOnBase = selector({
  key: "player-on-base-selector",
  get: ({ get }) => (get(boardOrientation) ? "b" : "w"),
});

export const selectedPiece = selectorFamily<boolean, number>({
  key: "selected-piece-selector",
  get:
    (id) =>
    ({ get }) =>
      get(selectedSquare) === id,
  set:
    (id) =>
    ({ set, reset }, select) =>
      select ? set(selectedSquare, id) : reset(selectedSquare),
});

export const movableSquares = selectorFamily<boolean, number>({
  key: "movable-squares-selector",
  get:
    (id) =>
    ({ get }) => {
      const squareID = get(selectedSquare);
      if (squareID === -1) return false;
      const movesMap = (get(gameState) as GameState).boardState.moves;
      return movesMap[toCorePos(squareID)]?.includes(toCorePos(id)) ?? false;
    },
});

export const checkSquare = selectorFamily<boolean, number>({
  key: "check-square-selector",
  get:
    (id) =>
    ({ get }) => {
      const boardState = (get(gameState) as GameState).boardState;
      const kingPos = boardState.board.indexOf(
        boardState.player === "w" ? "K" : "k"
      );
      return Boolean(boardState.checkline.length) && kingPos === toCorePos(id);
    },
});

export const vulnerableSquares = selectorFamily<boolean, number>({
  key: "vulnerable-squares-selector",
  get:
    (id) =>
    ({ get }) => {
      const boardState = (get(gameState) as GameState).boardState;
      const player = get(playerOnBase);
      return listVulnerables({ ...boardState, player }, true).includes(
        toCorePos(id)
      );
    },
});

export const captureSquares = selectorFamily<boolean, number>({
  key: "capture-squares-selector",
  get:
    (id) =>
    ({ get }) => {
      const boardState = (get(gameState) as GameState).boardState;
      const player = get(playerOnBase);
      return listCaptures({ ...boardState, player }, true).includes(
        toCorePos(id)
      );
    },
});
