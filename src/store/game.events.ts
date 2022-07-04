import { DefaultValue, selector } from "recoil";
import { doMove } from "../core/moveable";
import { toSANMove } from "../core/san";
import {
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
    const newState = doMove(selState, cords);
    const newStateID = selSID + 1;
    if (newState) {
      const san = toSANMove(cords, selState, newState);
      set(gameStateAtom([selGID, newStateID]), {
        boardState: newState,
        sanMove: san,
      });
      set(stateIDAtom(selGID), (stateIDs) => [...stateIDs, newStateID]);
      set(selectedStateIDAtom(selGID), newStateID);
      console.log("moved", san, newStateID);
    }
  },
});
