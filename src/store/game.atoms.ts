import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";
import { fenToBoardState } from "../core/boardState";
import { BoardState } from "../core/types";
import { defaultFEN } from "../globals";
import { boundNum } from "../utils";

export type GameID = number;
export type StateID = number;
export type GameStateID = [GameID, StateID];

export interface GameState {
  boardState: BoardState;
  sanMove: string;
}

const gameIDAtom = atom<GameID[]>({
  key: "game-id-atom",
  default: [1],
});

const stateIDAtom = atomFamily<StateID[], GameID>({
  key: "state-id-atom",
  default: [0],
});

const selectedGameIDAtom = atom<GameID>({
  key: "selected-game-id-atom",
  default: 1,
});

const selectedStateIDAtom = atomFamily<StateID, GameID>({
  key: "selected-state-id-atom",
  default: 0,
});

export const gameNameAtom = atomFamily<string, GameID>({
  key: "game-name-atom",
  default: (id) => "Board " + id,
});

const gameStateAtom = atomFamily<GameState, GameStateID>({
  key: "game-state-atom",
  default: {
    boardState: fenToBoardState(defaultFEN),
    sanMove: "",
  },
});

/// GAME PUBLIC SETTERS-GETTERS

export enum gameListOperations {
  // Add, Remove the selected game, change the selected game
  ADD,
  REMOVE,
  SELECT,
}

export type gameListSetter = {
  operation: gameListOperations;
  payload?: number;
};

export type gameListGetter = {
  list: GameID[];
  selected: GameID;
};

export const gamesList = selector<gameListGetter | gameListSetter>({
  key: "game-list-operations",
  get: ({ get }) => ({
    list: get(gameIDAtom),
    selected: get(selectedGameIDAtom),
  }),
  set: ({ set, get }, setter) => {
    if (setter instanceof DefaultValue) return;
    setter = setter as gameListSetter;
    const games = get(gameIDAtom);
    switch (setter.operation) {
      case gameListOperations.ADD: {
        const newID = Math.max(...games) + 1;
        set(gameIDAtom, (a) => [...a, newID]);
        set(selectedGameIDAtom, newID);
        break;
      }
      case gameListOperations.REMOVE: {
        if (games.length > 1) {
          const selGID = get(selectedGameIDAtom);
          const prevID = games.at(games.indexOf(selGID) - 1);
          set(gameIDAtom, (a) => a.filter((i) => i !== selGID));
          set(selectedGameIDAtom, prevID || 0);
        }
        break;
      }
      case gameListOperations.SELECT: {
        if (setter.payload) {
          set(selectedGameIDAtom, setter.payload);
        }
        break;
      }
    }
  },
});

// ============================================

export enum stateListOperations {
  /**
   * ADD new state after selected state and remove remaining
   * REMOVE selected state and remaining states after that
   * SELECT the state
   * ## All these operations executed on selected game ##
   */
  ADD,
  REMOVE,
  SELECT,
  REPLACE,
}

export enum stateListSelectOperations {
  FIRST = "f",
  PREVIOUS = "p",
  NEXT = "n",
  LAST = "l",
}

export type stateListSetter = {
  operation: stateListOperations;
  payload?: StateID | StateID[] | stateListSelectOperations;
  config?: {
    gameID?: GameID;
    stateID?: StateID;
  };
};

export type stateListGetter = {
  list: GameID[];
  selected: GameID;
};

export const stateList = selector<stateListGetter | stateListSetter>({
  key: "state-list-operations",
  get: ({ get }) => ({
    list: get(stateIDAtom(get(selectedGameIDAtom))),
    selected: get(selectedStateIDAtom(get(selectedGameIDAtom))),
  }),
  set: ({ set, get }, setter) => {
    if (setter instanceof DefaultValue) return;
    setter = setter as stateListSetter;
    const GID = setter.config?.gameID ?? get(selectedGameIDAtom);
    const states = get(stateIDAtom(GID));
    const selSID = setter.config?.stateID ?? get(selectedStateIDAtom(GID));
    switch (setter.operation) {
      case stateListOperations.ADD: {
        const newID = selSID + 1;
        set(stateIDAtom(GID), (a) => {
          const newStateIDs = [...a, newID];
          return newStateIDs.slice(0, newStateIDs.indexOf(newID) + 1);
        });
        set(selectedStateIDAtom(GID), newID);
        break;
      }
      case stateListOperations.REMOVE: {
        if (states.length > 1) {
          if (selSID <= 0) return;
          set(stateIDAtom(GID), (states) =>
            states.slice(0, states.indexOf(selSID))
          );
          set(selectedStateIDAtom(GID), (id) => id - 1);
        }
        break;
      }
      case stateListOperations.SELECT: {
        let selectID: number = 0;
        const lastStateID = states.at(-1) || 0;
        if (setter.payload === undefined) return;
        if (typeof setter.payload === "number") {
          selectID = setter.payload;
        } else {
          switch (setter.payload) {
            case stateListSelectOperations.FIRST:
              selectID = 1;
              break;
            case stateListSelectOperations.PREVIOUS:
              selectID = selSID - 1;
              break;
            case stateListSelectOperations.NEXT:
              selectID = selSID + 1;
              break;
            case stateListSelectOperations.LAST:
              selectID = lastStateID;
              break;
          }
          selectID = boundNum(selectID, 0, lastStateID);
        }
        set(selectedStateIDAtom(GID), selectID);
        break;
      }
      case stateListOperations.REPLACE: {
        const stateIDs = setter.payload as StateID[];
        if (stateIDs?.length > 0) {
          set(stateIDAtom(GID), stateIDs);
          set(selectedStateIDAtom(GID), stateIDs.at(-1) || 0);
        }
      }
    }
  },
});

// ====================================

export enum gameStateOperations {
  /**
   * NEW state setted and added to statelist BY call
   * MODIFY existing state (doesnt update list assuming already exist)
   * ## Modify operations executes on selected gamestate if not provided on payload ##
   */
  NEW,
  MODIFY,
}

export type gameStateSetter = {
  operation: gameStateOperations;
  payload: GameState;
  config?: {
    gameID?: GameID;
    stateID?: StateID;
  };
};

export const gameState = selector<GameState | gameStateSetter>({
  key: "game-state-operations",
  get: ({ get }) => {
    const GID = get(selectedGameIDAtom);
    const SID = get(selectedStateIDAtom(GID));
    return get(gameStateAtom([GID, SID]));
  },
  set: ({ set, get }, setter) => {
    if (setter instanceof DefaultValue) return;
    setter = setter as gameStateSetter;
    const GID = setter.config?.gameID ?? get(selectedGameIDAtom);
    const SID = setter.config?.stateID ?? get(selectedStateIDAtom(GID));
    switch (setter.operation) {
      case gameStateOperations.NEW:
        set(gameStateAtom([GID, SID + 1]), setter.payload);
        set(stateList, {
          operation: stateListOperations.ADD,
          config: setter.config,
        });
        break;
      case gameStateOperations.MODIFY:
        set(gameStateAtom([GID, SID]), setter.payload);
        break;
    }
  },
});

export const gameStateOf = selectorFamily<GameState, StateID>({
  key: "game-state-of-getter",
  get:
    (sid) =>
    ({ get }) =>
      get(gameStateAtom([get(selectedGameIDAtom), sid])),
});
