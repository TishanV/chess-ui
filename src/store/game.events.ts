import { DefaultValue, selector } from "recoil";
import { doMove } from "../core/moveable";
import { toSANMove } from "../core/san";
import { PromotionPiece } from "../core/types";
import { pieceSound } from "../globals";
import {
  enabledFeaturesAtom,
  Features,
  popupAtom,
  popupPosition,
  promotionCordAtom,
} from "./config.atoms";
import { gameState, GameState, gameStateOperations } from "./game.atoms";

export type movePieceEventArgs =
  | [number, number]
  | [number, number, PromotionPiece];

export const movePieceSelector = selector<movePieceEventArgs>({
  key: "move-piece-event",
  get: () => [0, 0],
  set: ({ set, get }, args) => {
    if (args instanceof DefaultValue) return;
    const selState = (get(gameState) as GameState).boardState;
    if (!selState.moves[args[0]]) return;
    const newState = doMove(selState, [args[0], args[1]], args[2]);
    if (newState) {
      const san = toSANMove([args[0], args[1]], selState, newState);
      const newGameState = {
        boardState: newState,
        sanMove: san,
      };
      set(gameState, {
        operation: gameStateOperations.NEW,
        payload: newGameState,
      });
      if (get(enabledFeaturesAtom(Features.PIECE_SOUND))) pieceSound.play();
      console.log("moved", san);
    }
  },
});

export const promoteEvent = selector({
  key: "promotion-event",
  get: () => "",
  set: ({ set, get }, promotionPiece) => {
    if (promotionPiece instanceof DefaultValue) return;
    const args = [...get(promotionCordAtom), promotionPiece as PromotionPiece];
    console.log(args);
    set(movePieceSelector, args as movePieceEventArgs);
  },
});

export type showPromotionArgs = {
  position: [number, number];
  cords: [number, number];
};

export const showPromotion = selector<showPromotionArgs>({
  key: "show-promotion-selector",
  get: () => ({ position: [0, 0], cords: [0, 0] }),
  set: ({ set, get }, args) => {
    if (args instanceof DefaultValue) return;
    const selState = (get(gameState) as GameState).boardState;
    if (!selState.moves[args.cords[0]]) return;
    set(popupAtom, "promotion");
    set(popupPosition, `${args.position[0]},${args.position[1]}`);
    set(promotionCordAtom, args.cords);
  },
});
