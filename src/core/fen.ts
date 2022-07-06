import { Board, FENState, BoardPosition } from "./types";
import { mapSanPos } from "./utils";

const boardFen = (board: Board) =>
  board
    .replace(/\*/g, "")
    .replace(/\/\//g, "/")
    .split("")
    .reduce(
      (a, e) =>
        e === "-"
          ? (+a.substr(-1) ? a.substring(0, a.length - 1) : a) +
            ((+a.substr(-1) || 0) + 1)
          : a + e,
      ""
    );

const enpassantFen = (enpos: BoardPosition) => (enpos ? mapSanPos(enpos) : "-");

const castleFen = (castle: string) => (castle ? castle : "-");

export const toFEN = (fenObj: FENState): string =>
  `${boardFen(fenObj.board)} ${fenObj.player} ${castleFen(
    fenObj.castle
  )} ${enpassantFen(fenObj.enpassant)} ${fenObj.halfMove} ${fenObj.fullMove}`;

// fen validations

export const validateBoard = (fenBoard: string) => {
  if (
    fenBoard.match(/[^kKqQrRnNbBpP12345678/]/g) ||
    fenBoard.match(/[k]/g)?.length !== 1 ||
    fenBoard.match(/[K]/g)?.length !== 1 ||
    (fenBoard.match(/[qQrRnNbBpP]/g)?.length || 0) > 30
  )
    return false;
  const rows = fenBoard.split("/");
  if (rows.length !== 8 || rows[0].match(/[pP]/g) || rows[7].match(/[pP]/g))
    return false;
  return rows.every(
    (row) => row.split("").reduce((a, e) => a + (+e || 1), 0) === 8
  );
};

export const validatePlayer = (player: string) => "wb".includes(player);

export const validateCastle = (castle: string) =>
  castle === "-" ||
  (!!castle.match(/[KQkq]/g)?.length &&
    castle.length === new Set(castle.match(/[KQkq]/g)).size);

export const validateEnPassant = (enpassant: string) =>
  "abcdefgh".includes(enpassant[0]) && "36".includes(enpassant[1]);

export const validateHalfMove = (halfMove: string) => +halfMove <= 50;

export const validateFullfMove = (fullMove: string, halfMove: string) =>
  +fullMove !== 0 && +halfMove <= 2 * +fullMove;

export function validateFEN(fen: string) {
  const [board, player, castle, enpassant, half, full] = fen.split(" ");
  return (
    validateBoard(board) &&
    validatePlayer(player) &&
    validateCastle(castle) &&
    validateEnPassant(enpassant) &&
    validateHalfMove(half) &&
    validateFullfMove(full, half)
  );
}
