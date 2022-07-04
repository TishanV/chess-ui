import {
  Board,
  BoardPosition,
  Player,
  MoveCords,
  BoardState,
  PromotionPiece,
} from "./types";
import {
  firstNum,
  lastNum,
  isPromotionRank,
  opponent,
  assertPiece,
  assertSquare,
} from "./utils";
import { toBoardState } from "./boardState";

export const putPiece = (piece: string, pos: BoardPosition, board: Board) => {
  const b = board.split("");
  b[pos] = piece;
  return b.join("");
};

export const removePiece = (pos: BoardPosition, board: Board) => {
  const b = board.split("");
  b[pos] = "-";
  return b.join("");
};

export const movePiece = ([from, to]: MoveCords, board: Board) => {
  const b = board.split("");
  b[to] = b[from];
  b[from] = "-";
  return b.join("");
};

const castleSelector: { [key: string]: RegExp } = {
  k5: /[kq]/g,
  K5: /[KQ]/g,
  r1: /[q]/g,
  r8: /[k]/g,
  R1: /[Q]/g,
  R8: /[K]/g,
};

const castleRookAttackSelector: { [key: number]: RegExp } = {
  11: /[q]/g,
  18: /[k]/g,
  81: /[Q]/g,
  88: /[K]/g,
};

const castleRookMoveCords: { [key: number]: MoveCords } = {
  1: [11, 14],
  2: [18, 16],
  8: [81, 84],
  9: [88, 86],
};

export const castleStrip = (
  piece: string,
  [origin, to]: MoveCords,
  castle: string
): string =>
  castle
    .replace(castleSelector[piece + lastNum(origin)], "")
    .replace(castleRookAttackSelector[to], "");

const doCastle = (kingSide: boolean, invRank: number, board: Board): Board =>
  movePiece(castleRookMoveCords[Number(kingSide) + invRank], board);

export const castleCheck = (
  board: Board,
  castle: string,
  cords: MoveCords
): [Board, string] => {
  const piece = board[cords[1]];
  const newBoard: Board =
    assertPiece.isKing(piece) && Math.abs(cords[1] - cords[0]) === 2
      ? doCastle(cords[1] > cords[0], firstNum(cords[0]), board)
      : board;
  const newCastle: string = castleStrip(piece, cords, castle);
  return [newBoard, newCastle];
};

const promotionPiece = (promotion: PromotionPiece, player: Player) =>
  player === "w" ? promotion : promotion.toLowerCase();

export const pawnCheck = (
  board: Board,
  player: Player,
  enpassant: BoardPosition,
  promotion: PromotionPiece,
  cords: MoveCords
): [Board, BoardPosition] => {
  if (!assertPiece.isPawn(board[cords[1]])) return [board, 0];
  const dir = player === "w" ? 10 : -10;
  const newBoard: Board =
    cords[1] === enpassant
      ? removePiece(cords[1] + dir, board)
      : isPromotionRank(cords[1], player)
      ? putPiece(promotionPiece(promotion, player), cords[1], board)
      : board;
  const newEnpassant: BoardPosition =
    Math.abs(cords[1] - cords[0]) === 20 ? cords[1] + dir : 0;
  return [newBoard, newEnpassant];
};

export const halfMoveCheck = (
  halfMove: number,
  board: Board,
  cords: MoveCords
): number =>
  assertSquare.hasPiece(board[cords[1]]) || assertPiece.isPawn(board[cords[0]])
    ? 0
    : halfMove + 1;

export const fullMoveCheck = (fullMove: number, player: Player): number =>
  fullMove + (player === "b" ? 1 : 0);

export const doMove = (
  state: BoardState,
  cords: MoveCords,
  promotion: PromotionPiece = "Q"
): BoardState | undefined => {
  if (state.moves[cords[0]].includes(cords[1])) {
    let newBoard: Board, newCastle: string, newEnpassant: BoardPosition;
    const newHalfMove = halfMoveCheck(state.halfMove, state.board, cords);
    const newFullMove = fullMoveCheck(state.fullMove, state.player);
    const newPlayer = opponent(state.player);
    [newBoard, newCastle] = castleCheck(
      movePiece(cords, state.board),
      state.castle,
      cords
    );
    [newBoard, newEnpassant] = pawnCheck(
      newBoard,
      state.player,
      state.enpassant,
      promotion,
      cords
    );
    return toBoardState({
      board: newBoard,
      player: newPlayer,
      castle: newCastle,
      enpassant: newEnpassant,
      halfMove: newHalfMove,
      fullMove: newFullMove,
    });
  }
};
