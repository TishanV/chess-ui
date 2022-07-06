import { assertPiece, opponent } from "./utils";
import { opponentAttackersOn } from "./attack";
import { AttackMap, BoardPosition, BoardState } from "./types";

const reduceKingsAttacksMap = ({
  attackMap,
  board,
  player,
}: BoardState): AttackMap => {
  const reducedKingMap = Object.fromEntries(
    Object.entries(attackMap)
      .filter(([k, v]) => assertPiece.isKing(board[+k]))
      .map(([k, v]) => [
        k,
        v.filter(
          (p) => !opponentAttackersOn(p, player, board, attackMap).length
        ),
      ])
  );
  return { ...attackMap, ...reducedKingMap };
};

export const listVulnerables = (
  { attackMap, player, board }: BoardState,
  onDanger = false
): BoardPosition[] =>
  Object.keys(attackMap)
    .filter(
      (p) =>
        assertPiece.isPlayer(board[+p], player) &&
        opponentAttackersOn(+p, player, board, attackMap).length &&
        (!onDanger ||
          !opponentAttackersOn(
            +p,
            opponent(player),
            board,
            reduceKingsAttacksMap({ attackMap, board, player } as BoardState)
          ).length)
    )
    .map((e) => +e);

export const listCaptures = (
  { attackMap, player, board }: BoardState,
  safeCapture = false
): BoardPosition[] =>
  Object.keys(attackMap)
    .filter(
      (p) =>
        assertPiece.isOpponent(board[+p], player) &&
        opponentAttackersOn(+p, opponent(player), board, attackMap).length &&
        (!safeCapture ||
          !opponentAttackersOn(
            +p,
            player,
            board,
            reduceKingsAttacksMap({ attackMap, board, player } as BoardState)
          ).length)
    )
    .map((e) => +e);
