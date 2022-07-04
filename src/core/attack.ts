import { Board, BoardPosition, Player, AttackMap } from "./types";
import {
  assertPiece,
  assertSquare,
  playerOf,
  betweenLine,
  withinBoard,
  filterBoard,
} from "./utils";

export function positionAdd(
  pos: BoardPosition,
  vector: number
): BoardPosition | null {
  const next = pos + vector;
  return withinBoard(next) ? next : null;
}

export function positionAddTillEncounter(
  pos: BoardPosition,
  vector: number,
  board: Board
): BoardPosition[] {
  const next = pos + vector;
  return assertSquare.isEmpty(board[next])
    ? [next, ...positionAddTillEncounter(next, vector, board)]
    : assertSquare.hasPiece(board[next])
    ? [next]
    : [];
}

////

export function getKingAttacks(pos: BoardPosition): BoardPosition[] {
  return [10, -10, 9, -9, 11, -11, -1, 1]
    .map((v) => positionAdd(pos, v))
    .filter((e) => e) as BoardPosition[];
}

export function getQueenAttacks(
  pos: BoardPosition,
  board: Board
): BoardPosition[] {
  return [10, -10, 9, -9, 11, -11, -1, 1].reduce(
    (a: BoardPosition[], v) => [
      ...a,
      ...positionAddTillEncounter(pos, v, board),
    ],
    []
  );
}

export function getRookAttacks(
  pos: BoardPosition,
  board: Board
): BoardPosition[] {
  return [10, -10, -1, 1].reduce(
    (a: BoardPosition[], v) => [
      ...a,
      ...positionAddTillEncounter(pos, v, board),
    ],
    []
  );
}

export function getBishopAttacks(
  pos: BoardPosition,
  board: Board
): BoardPosition[] {
  return [9, -9, 11, -11].reduce(
    (a: BoardPosition[], v) => [
      ...a,
      ...positionAddTillEncounter(pos, v, board),
    ],
    []
  );
}

export function getKnightAttacks(pos: BoardPosition): BoardPosition[] {
  return [19, 21, -19, -21, 8, 12, -8, -12]
    .map((v) => positionAdd(pos, v))
    .filter((e) => e) as BoardPosition[];
}

export function getPawnAttacks(
  pos: BoardPosition,
  player: Player
): BoardPosition[] {
  const pawnVectors = player === "w" ? [-11, -9] : [11, 9];
  return pawnVectors
    .map((v) => positionAdd(pos, v))
    .filter((e) => e) as BoardPosition[];
}

function mapPieceAttacks(pos: BoardPosition, board: Board): BoardPosition[] {
  if (assertPiece.isKing(board[pos])) return getKingAttacks(pos);
  else if (assertPiece.isQueen(board[pos])) return getQueenAttacks(pos, board);
  else if (assertPiece.isRook(board[pos])) return getRookAttacks(pos, board);
  else if (assertPiece.isBishop(board[pos]))
    return getBishopAttacks(pos, board);
  else if (assertPiece.isKnight(board[pos])) return getKnightAttacks(pos);
  else if (assertPiece.isPawn(board[pos]))
    return getPawnAttacks(pos, playerOf(board[pos]));
  return [];
}

///

export function getAttackMap(board: Board): AttackMap {
  return Object.fromEntries(
    filterBoard(board, assertSquare.hasPiece).map((pos) => [
      pos,
      mapPieceAttacks(pos, board),
    ])
  );
}

export function attackersOn(
  pos: BoardPosition,
  attackMap: AttackMap
): BoardPosition[] {
  return Object.entries(attackMap).reduce(
    (a: BoardPosition[], [k, v]) => [...a, ...(v.includes(pos) ? [+k] : [])],
    []
  );
}

export function opponentAttackersOn(
  pos: BoardPosition,
  player: Player,
  board: Board,
  attackMap: AttackMap
) {
  return attackersOn(pos, attackMap).filter((pos) =>
    assertPiece.isOpponent(board[pos], player)
  );
}

export function checklinesOf(
  board: Board,
  player: Player,
  attackMap: AttackMap
): BoardPosition[][] {
  const kingPos = board.indexOf(player === "w" ? "K" : "k");
  return opponentAttackersOn(kingPos, player, board, attackMap).map((pos) => [
    pos,
    ...betweenLine(pos, kingPos),
  ]);
}
