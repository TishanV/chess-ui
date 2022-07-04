import { BoardPosition, BoardState, MoveCords, PromotionPiece } from "./types";
import {
  firstNum,
  lastNum,
  mapPos,
  mapSanPos,
  filterBoard,
  assertSquare,
  assertPiece,
} from "./utils";

export function toCordsFromSAN(
  san: string,
  state: BoardState
): MoveCords | undefined {
  if (san === "O-O" || san === "0-0") {
    const [from, to] = state.player === "w" ? [85, 87] : [15, 17];
    if (state.moves[from]?.includes(to)) return [from, to];
  }
  if (san === "O-O-O" || san === "0-0-0") {
    const [from, to] = state.player === "w" ? [85, 83] : [15, 13];
    if (state.moves[from]?.includes(to)) return [from, to];
  }
  const positions = san.match(/[abcdefgh][12345678]/g);
  if ((positions?.length || 0) > 1)
    return [mapPos(positions![1]), mapPos(positions![0])];
  if (positions?.length) {
    let from: BoardPosition = 0;
    const to = mapPos(positions![0]);
    const pieceSelector = san.match(/[KQRBN]/g)?.slice(0, 1)[0] || "P";
    const piecePositions = filterBoard(
      state.board,
      (p) => pieceSelector === p.toUpperCase()
    ).filter((from) => state.moves[from]?.includes(to));
    if (piecePositions.length > 1) {
      const source = san.match(/[abcdefgh12345678]/g)?.slice(0, 1)[0];
      const filtered = piecePositions.filter((pos) =>
        mapSanPos(pos).includes(source || "x")
      );
      if (filtered.length === 1) from = filtered[0];
    }
    if (piecePositions.length === 1) from = piecePositions[0];
    if (from) return [from, to];
  }
}

export const promotionOf = (san: string): PromotionPiece => {
  const promP = san.split("=")[1]?.slice(0, 1) as PromotionPiece;
  return ("QRBN".includes(promP) && promP) || "Q";
};

export const sourceOf = (origin: BoardPosition, others: BoardPosition[]) => {
  const inOtherFiles = others
    .map((pos) => lastNum(pos))
    .includes(lastNum(origin));
  const inOtherRanks = others
    .map((pos) => firstNum(pos))
    .includes(firstNum(origin));
  const sanOrigin = mapSanPos(origin);
  if (inOtherFiles && inOtherRanks) return sanOrigin;
  if (inOtherRanks) return sanOrigin[0];
  if (inOtherFiles) return sanOrigin[1];
  return "";
};

export function toSANMove(
  [from, to]: MoveCords,
  beforeState: BoardState,
  afterState: BoardState
): string {
  const { board: beforeBoard, moves: beforeMoves } = beforeState;
  const { board: afterBoard, moves: afterMoves } = afterState;
  if (assertPiece.isKing(beforeBoard[from]) && Math.abs(to - from) === 2) {
    return to - from > 0 ? "O-O" : "O-O-O";
  }
  const isPawn = assertPiece.isPawn(beforeBoard[from]);
  const piece = isPawn ? "" : beforeBoard[from].toUpperCase();
  const capture =
    assertSquare.hasPiece(beforeBoard[to]) ||
    (isPawn && beforeState.enpassant === to)
      ? "x"
      : "";
  const source =
    isPawn && capture
      ? mapSanPos(from)[0]
      : sourceOf(
          from,
          filterBoard(beforeBoard, (p) => p === beforeBoard[from]).filter(
            (pos) => pos !== from && beforeMoves[pos]?.includes(to)
          )
        );
  const dest = mapSanPos(to);
  const promotion =
    isPawn && !assertPiece.isPawn(afterBoard[to])
      ? "=" + afterBoard[to].toUpperCase()
      : "";
  const result =
    afterState.checkline.length &&
    Object.values(afterMoves).every((m) => !m.length)
      ? "#"
      : afterState.checkline.length
      ? "+"
      : "";
  return piece + source + capture + dest + promotion + result;
}
