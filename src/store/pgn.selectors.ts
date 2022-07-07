import { DefaultValue, selector } from "recoil";
import { fenToBoardState } from "../core/boardState";
import { toFEN, validateFEN } from "../core/fen";
import { doMove } from "../core/moveable";
import { fromPGN, newPGNObject, toPGN } from "../core/pgn";
import { promotionOf, toCordsFromSAN } from "../core/san";

import {
  gameIDAtom,
  gameStateAtom,
  selectedGameIDAtom,
  selectedStateIDAtom,
  stateIDAtom,
} from "./game.atoms";

export const pgnOfGame = selector({
  key: "pgn-of-game-selector",
  get: ({ get }) => {
    const gameID = get(selectedGameIDAtom);
    const stateIDs = get(stateIDAtom(gameID));
    const scores = stateIDs
      .slice(1)
      .map((id) => get(gameStateAtom([gameID, id])).sanMove);
    return toPGN(newPGNObject(scores));
  },
  set: ({ set, get }, pgn) => {
    if (pgn instanceof DefaultValue) return;
    const pgnObj = fromPGN(pgn);
    if (!pgnObj[0].score.length) return;

    const newGID = Math.max(...get(gameIDAtom)) + 1;
    set(gameIDAtom, (a) => [...a, newGID]);

    let currentState = get(gameStateAtom([newGID, 0])).boardState;
    let moves = 1;
    for (let score of pgnObj[0].score) {
      const cords = toCordsFromSAN(score, currentState);
      const promotion = promotionOf(score);
      if (cords) {
        const newState = doMove(currentState, cords, promotion);
        if (newState === undefined) break;
        set(gameStateAtom([newGID, moves]), {
          boardState: newState,
          sanMove: score,
        });
        currentState = newState;
        moves += 1;
      }
    }
    set(selectedGameIDAtom, newGID);
    set(
      stateIDAtom(newGID),
      Array(moves)
        .fill(0)
        .map((_, i) => i)
    );
    set(selectedStateIDAtom(newGID), moves - 1);
  },
});

export const fenOfGameState = selector({
  key: "fen-of-game-state-selector",
  get: ({ get }) => {
    const gameID = get(selectedGameIDAtom);
    const stateID = get(selectedStateIDAtom(gameID));
    const boardState = get(gameStateAtom([gameID, stateID])).boardState;
    return toFEN(boardState);
  },
  set: ({ set, get }, fen) => {
    if (fen instanceof DefaultValue) return;
    if (!validateFEN(fen)) {
      console.log("FEN not valid", fen);
      return;
    }
    const state = fenToBoardState(fen);
    const gameID = get(selectedGameIDAtom);
    set(stateIDAtom(gameID), [0]);
    set(gameStateAtom([gameID, 0]), {
      boardState: state,
      sanMove: "",
    });
    set(selectedStateIDAtom(gameID), 0);
  },
});
