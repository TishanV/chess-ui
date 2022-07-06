import { selector } from "recoil";
import { toFEN } from "../core/fen";
import { newPGNObject, toPGN } from "../core/pgn";
import {
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
});

export const fenOfGameState = selector({
  key: "fen-of-game-state-selector",
  get: ({ get }) => {
    const gameID = get(selectedGameIDAtom);
    const stateID = get(selectedStateIDAtom(gameID));
    const boardState = get(gameStateAtom([gameID, stateID])).boardState;
    return toFEN(boardState);
  },
});
