import { atom, atomFamily } from "recoil";
import { fenToBoardState } from "../core/boardState";
import { BoardState } from "../core/types";

const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
export type GameID = number;
export type StateID = number;
export type GameStateID = [GameID, StateID];

export interface GameState {
  boardState: BoardState;
  sanMove: string;
}

export const gameIDAtom = atom<GameID[]>({
  key: "game-id-atom",
  default: [1],
});

export const stateIDAtom = atomFamily<StateID[], GameID>({
  key: "state-id-atom",
  default: [0],
});

export const selectedGameIDAtom = atom<GameID>({
  key: "selected-game-id-atom",
  default: 1,
});

export const selectedStateIDAtom = atomFamily<StateID, GameID>({
  key: "selected-state-id-atom",
  default: 0,
});

export const gameNameAtom = atomFamily<string, GameID>({
  key: "game-name-atom",
  default: (id) => "Board " + id,
});

export const gameStateAtom = atomFamily<GameState, GameStateID>({
  key: "game-state-atom",
  default: {
    boardState: fenToBoardState(defaultFEN),
    sanMove: "",
  },
});
