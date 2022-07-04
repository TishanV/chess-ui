import { SANPosition, BoardPosition, Player, Board } from "./types";

export const firstNum = (num: number): number => Math.floor(num / 10);
export const lastNum = (num: number): number => num % 10;
export const gcd = (...arr: number[]): number => {
  const _gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
//

export const withinBoard = (pos: BoardPosition) =>
  pos < 89 && pos > 10 && pos % 10 != 0 && pos % 10 != 9;

export const mapPos = (sanPos: SANPosition): BoardPosition =>
  sanPos.charCodeAt(0) - 96 + (9 - +sanPos[1]) * 10;

export const mapSanPos = (pos: BoardPosition): SANPosition =>
  `${String.fromCharCode(lastNum(pos) + 96)}${9 - firstNum(pos)}`;

export const sameColorPos = (pos1: BoardPosition, pos2: BoardPosition) =>
  (firstNum(pos1) + lastNum(pos1)) % 2 === (firstNum(pos2) + lastNum(pos2)) % 2;

export const isPromotionRank = (pos: BoardPosition, player: Player): boolean =>
  player === "w" ? firstNum(pos) === 1 : firstNum(pos) === 8;

export const opponent = (player: Player): Player =>
  player === "w" ? "b" : "w";

export const playerOf = (p: string): Player =>
  assertPiece.isWhite(p) ? "w" : "b";

// Board Search or Filters

export const assertPiece = {
  isKing: (p: string) => "kK".includes(p),
  isQueen: (p: string) => "qQ".includes(p),
  isRook: (p: string) => "rR".includes(p),
  isBishop: (p: string) => "bB".includes(p),
  isKnight: (p: string) => "nN".includes(p),
  isPawn: (p: string) => "pP".includes(p),
  isWhite: (p: string) => "KQRBNP".includes(p),
  isBlack: (p: string) => "kqrbnp".includes(p),
  isPlayer: (p: string, player: Player) =>
    player === "w" ? assertPiece.isWhite(p) : assertPiece.isBlack(p),
  isOpponent: (p: string, player: Player) =>
    player === "w" ? assertPiece.isBlack(p) : assertPiece.isWhite(p),
};

export const assertSquare = {
  isEmpty: (s: string) => s === "-",
  hasPiece: (s: string) => "KQRBNPkqrbnp".includes(s),
};

////

export function betweenLine(
  a: BoardPosition,
  b: BoardPosition
): BoardPosition[] {
  const baseVector = [firstNum(b) - firstNum(a), lastNum(b) - lastNum(a)];
  const magnitude = Math.abs(gcd(...baseVector));
  const unitVector = (baseVector[0] * 10 + baseVector[1]) / magnitude;
  return Array(magnitude - 1)
    .fill(unitVector)
    .map((e, i) => a + (i + 1) * e);
}

export function filterBoard(
  board: Board,
  by: (boardPiece: string) => boolean
): BoardPosition[] {
  const filtered: BoardPosition[] = [];
  for (let i = 11; i < 89; i++) {
    by(board[i]) ? filtered.push(i) : 0;
  }
  return filtered;
}
