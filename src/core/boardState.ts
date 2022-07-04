import { Board, Player, FENState, BoardState } from "./types";
import { checklinesOf, getAttackMap } from "./attack";
import { pinsOn } from "./pin";
import { allMoves } from "./move";
import { mapPos } from "./utils";

export const fenPositionsToBoard = (fenPos: string): Board =>
  "*".repeat(11) +
  fenPos
    .split("")
    .map((e) =>
      "123456789".includes(e) ? "-".repeat(+e) : e == "/" ? "//" : e
    )
    .join("");

export const composeFEN = (fen: string): FENState => {
  const [fenPos, player, castle, enpassantSAN, half_move, full_move] =
    fen.split(" ");
  const board = fenPositionsToBoard(fenPos);
  const enpassant = enpassantSAN === "-" ? 0 : mapPos(enpassantSAN);
  return {
    board,
    player: player as Player,
    castle,
    enpassant,
    halfMove: +half_move,
    fullMove: +full_move,
  };
};

export const toBoardState = (fenObj: FENState): BoardState => {
  const attackMap = getAttackMap(fenObj.board);
  const pins = pinsOn(fenObj.board, fenObj.player);
  const checkline = checklinesOf(fenObj.board, fenObj.player, attackMap);
  const moves = allMoves(
    fenObj.player,
    fenObj.board,
    fenObj.castle,
    fenObj.enpassant,
    checkline,
    pins,
    attackMap
  );
  return { ...fenObj, attackMap, checkline, moves };
};

export const fenToBoardState = (fen: string): BoardState =>
  toBoardState(composeFEN(fen));
