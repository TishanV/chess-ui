import { Board, BoardPosition, Player, Pins } from "./types";
import { getAttackMap, attackersOn } from "./attack";
import { assertPiece, assertSquare, betweenLine } from "./utils";

export function pinOnLine(
  line: BoardPosition[],
  board: Board,
  player: Player
): BoardPosition | null {
  const betweens = line.filter((pos) => assertSquare.hasPiece(board[pos]));
  return betweens.length === 1 &&
    assertPiece.isPlayer(board[betweens[0]], player)
    ? betweens[0]
    : null;
}

export function pinsOn(board: Board, player: Player): Pins {
  const qrbBoard: Board = board.replace(
    player === "w" ? /[nkpPRNBQ]/g : /[NKPprnbq]/g,
    "-"
  );
  const kingPos: BoardPosition = board.indexOf(player === "w" ? "K" : "k");
  const pinners = attackersOn(kingPos, getAttackMap(qrbBoard));
  const pins = pinners.map((pos) =>
    pinOnLine(betweenLine(pos, kingPos), board, player)
  );
  const actualPinners = pinners.filter((_, i) => pins[i]);
  const actualPins: BoardPosition[] = pins.filter((e) => e) as BoardPosition[];
  return Object.fromEntries(
    actualPins.map((pinPos, i) => [
      pinPos,
      [
        actualPinners[i],
        ...betweenLine(actualPinners[i], pinPos),
        ...betweenLine(pinPos, kingPos),
      ],
    ])
  );
}
