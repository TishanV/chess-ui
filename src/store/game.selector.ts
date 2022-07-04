import { selectorFamily, selector } from "recoil";
import {
  GameID,
  gameStateAtom,
  selectedGameIDAtom,
  selectedStateIDAtom,
  stateIDAtom,
} from "./game.atoms";

export const gameScores = selectorFamily<string[], GameID>({
  key: "game-scores-selector",
  get:
    (id) =>
    ({ get }) =>
      get(stateIDAtom(id))
        .slice(1)
        .map((stateID) => get(gameStateAtom([id, stateID])).sanMove),
});

export const selectedGameScores = selector<string[]>({
  key: "selected-game-scores-selector",
  get: ({ get }) => {
    const selGameId = get(selectedGameIDAtom);
    return get(stateIDAtom(selGameId))
      .slice(1)
      .map((stateID) => get(gameStateAtom([selGameId, stateID])).sanMove);
  },
});

export const selectedBoardPieces = selectorFamily<string, GameID>({
  key: "board-pieces-selector",
  get:
    (id) =>
    ({ get }) =>
      get(gameStateAtom([id, get(selectedStateIDAtom(id))])).boardState.board,
});
