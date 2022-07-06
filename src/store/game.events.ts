import { DefaultValue, selector } from "recoil";
import { doMove } from "../core/moveable";
import { toSANMove } from "../core/san";
import {
  gameIDAtom,
  gameStateAtom,
  selectedGameIDAtom,
  selectedStateIDAtom,
  stateIDAtom,
} from "./game.atoms";

export const movePieceSelector = selector<[number, number]>({
  key: "move-piece-event",
  get: () => [0, 0],
  set: ({ set, get }, cords) => {
    if (cords instanceof DefaultValue) return;
    const selGID = get(selectedGameIDAtom);
    const selSID = get(selectedStateIDAtom(selGID));
    const selState = get(gameStateAtom([selGID, selSID])).boardState;
    if (!selState.moves[cords[0]]) return;
    const newState = doMove(selState, cords);
    if (newState) {
      const newStateID = selSID + 1;
      const san = toSANMove(cords, selState, newState);
      set(gameStateAtom([selGID, newStateID]), {
        boardState: newState,
        sanMove: san,
      });
      set(stateIDAtom(selGID), (stateIDs) => {
        const newStateIDs = [...stateIDs, newStateID];
        return newStateIDs.slice(0, newStateIDs.indexOf(newStateID) + 1);
      });
      set(selectedStateIDAtom(selGID), newStateID);
      console.log("moved", san, newStateID);
    }
  },
});

export enum GameBoardAction {
  ADD,
  REMOVE,
}

export const gameManager = selector<GameBoardAction>({
  key: "game-manage-event",
  get: () => GameBoardAction.ADD,
  set: ({ set, get }, action) => {
    const idList = get(gameIDAtom);
    if (action === GameBoardAction.ADD) {
      const newID = Math.max(...idList) + 1;
      set(gameIDAtom, (a) => [...a, newID]);
      set(selectedGameIDAtom, newID);
    } else if (action === GameBoardAction.REMOVE && idList.length > 1) {
      const selGID = get(selectedGameIDAtom);
      const prevID = idList.at(idList.indexOf(selGID) - 1);
      set(gameIDAtom, (a) => a.filter((i) => i !== selGID));
      set(selectedGameIDAtom, prevID || 0);
    }
  },
});
