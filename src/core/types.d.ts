export type AttackMap = { [key: BoardPosition]: BoardPosition[] };
export type Board = string;
export type Player = "w" | "b";
export type BoardPosition = number;
export type SANPosition = string;

export type MoveCords = [BoardPosition, BoardPosition];

export type Moves = { [key: number]: any[] };
export type Pins = { [key: number]: any[] };

export type Side = "K" | "k" | "Q" | "q";

export type PromotionPiece = "Q" | "R" | "B" | "N";

export type PGNObject = {
  Event?: string;
  White?: string;
  Black?: string;
  Date?: string;
  score: [];
};

export interface FENState {
  readonly board: Board;
  readonly player: Player;
  readonly castle: string;
  readonly enpassant: BoardPosition | 0;
  readonly halfMove: number;
  readonly fullMove: number;
}

export interface BoardState extends FENState {
  readonly attackMap: AttackMap;
  readonly checkline: BoardPosition[][];
  readonly moves: Moves;
}
