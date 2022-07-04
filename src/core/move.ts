import {
  Board,
  BoardPosition,
  Player,
  Moves,
  Pins,
  Side,
  AttackMap,
} from "./types";
import { opponentAttackersOn } from "./attack";
import { firstNum, assertPiece, assertSquare } from "./utils";

const regularMove = (
  pos: BoardPosition,
  player: Player,
  board: Board,
  attackMap: AttackMap
) => attackMap[pos].filter((pos) => !assertPiece.isPlayer(board[pos], player));

const isBehindCheckline = (
  pos: BoardPosition,
  kingPos: BoardPosition,
  board: Board,
  checkline: BoardPosition[][]
) =>
  checkline.some(
    (line) =>
      "qQrRbB".includes(board[line[0]]) &&
      pos - kingPos === kingPos - (line.slice(-1)[0] || 0)
  );

const kingMove = (
  pos: BoardPosition,
  player: Player,
  board: Board,
  checkline: BoardPosition[][],
  attackMap: AttackMap
) =>
  attackMap[pos].filter(
    (mPos) =>
      !assertPiece.isPlayer(board[mPos], player) &&
      !opponentAttackersOn(mPos, player, board, attackMap).length &&
      !isBehindCheckline(mPos, pos, board, checkline)
  );

const castleBetweens = {
  k: [16, 17],
  q: [12, 13, 14],
  K: [86, 87],
  Q: [82, 83, 84],
};

const castleTo = {
  k: 17,
  q: 13,
  K: 87,
  Q: 83,
};

const castleMove = (
  player: Player,
  board: Board,
  castle: string,
  attackMap: AttackMap
): BoardPosition[] =>
  (castle
    .match(player === "w" ? /[KQ]/g : /[kq]/g)
    ?.map((s) =>
      castleBetweens[s as Side].reduce(
        (a: boolean, p) =>
          a &&
          assertSquare.isEmpty(board[p]) &&
          !opponentAttackersOn(p, player, board, attackMap).length,
        true
      )
        ? castleTo[s as Side]
        : null
    )
    .filter((e) => e) as BoardPosition[]) || [];

const forwardVectors = (rank: number, player: Player) => {
  const dir = player === "w" ? -1 : 1;
  const vector = [10];
  if ((player === "w" && rank === 7) || (player === "b" && rank === 2))
    vector.push(20);
  return vector.map((v) => dir * v);
};

const pawnForwardMove = (pos: BoardPosition, player: Player, board: Board) => {
  const vectors = forwardVectors(firstNum(pos), player);
  const moves = [];
  for (let v of vectors) {
    const next = v + pos;
    if (assertSquare.isEmpty(board[next])) moves.push(next);
    else break;
  }
  return moves;
};

const pawnMove = (
  pos: BoardPosition,
  player: Player,
  board: Board,
  enpassant: BoardPosition,
  attackMap: AttackMap
) => [
  ...attackMap[pos].filter(
    (pos) => enpassant === pos || assertPiece.isOpponent(board[pos], player)
  ),
  ...pawnForwardMove(pos, player, board),
];

export function mapMove(
  pos: BoardPosition,
  player: Player,
  board: Board,
  enpassant: BoardPosition,
  checkline: any[],
  attackMap: AttackMap
): BoardPosition[] {
  if (assertPiece.isKing(board[pos]))
    return kingMove(pos, player, board, checkline, attackMap);
  if (assertPiece.isPawn(board[pos]))
    return pawnMove(pos, player, board, enpassant, attackMap);
  return regularMove(pos, player, board, attackMap);
}

export function pieceMove(
  pos: BoardPosition,
  player: Player,
  board: Board,
  castle: string,
  enpassant: BoardPosition,
  checkline: BoardPosition[][],
  pins: Pins,
  attackMap: AttackMap
): BoardPosition[] {
  const isKing = assertPiece.isKing(board[pos]);
  if (checkline.length > 1 && !isKing) return [];
  let moves = mapMove(pos, player, board, enpassant, checkline, attackMap);
  if (pos in pins) {
    moves = moves.filter((p) => pins[pos].includes(p));
  }
  if (checkline.length === 1 && !isKing) {
    moves = moves.filter((p) => checkline[0].includes(p));
  }
  if (!checkline.length && isKing) {
    moves = [...moves, ...castleMove(player, board, castle, attackMap)];
  }
  return moves;
}

export function allMoves(
  player: Player,
  board: Board,
  castle: string,
  enpassant: BoardPosition,
  checkline: BoardPosition[][],
  pins: Pins,
  attackMap: AttackMap
): Moves {
  return Object.fromEntries(
    Object.keys(attackMap)
      .filter((pos) => assertPiece.isPlayer(board[+pos], player))
      .map((pos) => [
        +pos,
        pieceMove(
          +pos,
          player,
          board,
          castle,
          enpassant,
          checkline,
          pins,
          attackMap
        ),
      ])
  );
}
