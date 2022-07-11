import { BoardState, MoveCords, PromotionPiece } from "./types";
import { doMove } from "./moveable";
import { assertPiece, isPromotionRank } from "./utils";

const isCheckmate = (state: BoardState) =>
  state.checkline.length && Object.values(state.moves).every((e) => !e.length);

const allCords = (state: BoardState): MoveCords[] => {
  let cordsList: MoveCords[] = [];
  for (let from in state.moves)
    for (let to of state.moves[from]) cordsList.push([+from, to]);
  return cordsList;
};

const simulateMove = (state: BoardState, cords: MoveCords) =>
  assertPiece.isPawn(state.board[cords[0]]) &&
  isPromotionRank(cords[1], state.player)
    ? ["Q", "R", "B", "N"].map((e) => ({
        cords,
        state: doMove(state, cords, e as PromotionPiece),
      }))
    : [{ cords, state: doMove(state, cords) }];

export function findMate(state: BoardState): MoveCords[] {
  const simList = allCords(state).reduce(
    (a: { cords: MoveCords; state: BoardState | undefined }[], cords) => [
      ...a,
      ...simulateMove(state, cords),
    ],
    []
  );
  const checkmates: MoveCords[] = [];
  simList.forEach((sim) => {
    isCheckmate(sim.state!) ? checkmates.push(sim.cords) : 0;
  });
  return Array.from(
    new Set(checkmates.map((cords) => cords[0] * 100 + cords[1]))
  ).map((n) => [Math.floor(n / 100), n % 100]);
}
