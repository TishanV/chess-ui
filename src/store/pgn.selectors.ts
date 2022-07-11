import { DefaultValue, selector } from "recoil";
import { fenToBoardState } from "../core/boardState";
import { toFEN, validateFEN } from "../core/fen";
import { doMove } from "../core/moveable";
import { fromPGN, newPGNObject, toPGN } from "../core/pgn";
import { promotionOf, toCordsFromSAN } from "../core/san";

import {
  gameListGetter,
  gameListOperations,
  gamesList,
  GameState,
  gameState,
  gameStateOf,
  gameStateOperations,
  stateList,
  stateListGetter,
  stateListOperations,
} from "./game.atoms";

export const pgnOfGame = selector({
  key: "pgn-of-game-selector",
  get: ({ get }) => {
    const stateIDs = (get(stateList) as stateListGetter).list;
    const scores = stateIDs.slice(1).map((id) => get(gameStateOf(id)).sanMove);
    return toPGN(newPGNObject(scores));
  },
  set: ({ set, get }, pgn) => {
    if (pgn instanceof DefaultValue) return;
    const pgnObj = fromPGN(pgn);
    if (!pgnObj[0].score.length) return;

    set(gamesList, { operation: gameListOperations.ADD });
    const newGID = Math.max(...(get(gamesList) as gameListGetter).list) + 1;
    let currentState = get(gameStateOf(0)).boardState;
    let moves = 1;
    for (let score of pgnObj[0].score) {
      const cords = toCordsFromSAN(score, currentState);
      const promotion = promotionOf(score);
      if (cords) {
        const newState = doMove(currentState, cords, promotion);
        if (newState === undefined) break;
        const newGameState = {
          boardState: newState,
          sanMove: score,
        };
        set(gameState, {
          operation: gameStateOperations.MODIFY,
          payload: newGameState,
          config: { gameID: newGID, stateID: moves },
        });
        currentState = newState;
        moves += 1;
      }
    }
    const newIDs = Array(moves)
      .fill(0)
      .map((_, i) => i);
    set(stateList, {
      operation: stateListOperations.REPLACE,
      payload: newIDs,
      config: { gameID: newGID },
    });
  },
});

export const fenOfGameState = selector({
  key: "fen-of-game-state-selector",
  get: ({ get }) => {
    const boardState = (get(gameState) as GameState).boardState;
    return toFEN(boardState);
  },
  set: ({ set, get }, fen) => {
    if (fen instanceof DefaultValue) return;
    if (!validateFEN(fen)) {
      return;
    }
    const state = fenToBoardState(fen);
    set(gameState, {
      operation: gameStateOperations.MODIFY,
      payload: { boardState: state, sanMove: "" },
      config: { stateID: 0 },
    });
    set(stateList, {
      operation: stateListOperations.REPLACE,
      payload: [0],
    });
  },
});
