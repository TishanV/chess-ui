import WhiteKing from "../assets/pieces/K.svg";
import BlackKing from "../assets/pieces/k.svg";
import WhiteQueen from "../assets/pieces/Q.svg";
import BlackQueen from "../assets/pieces/q.svg";
import WhiteRook from "../assets/pieces/R.svg";
import BlackRook from "../assets/pieces/r.svg";
import WhiteBishop from "../assets/pieces/B.svg";
import BlackBishop from "../assets/pieces/b.svg";
import WhiteKnight from "../assets/pieces/N.svg";
import BlackKnight from "../assets/pieces/n.svg";
import WhitePawn from "../assets/pieces/P.svg";
import BlackPawn from "../assets/pieces/p.svg";

import FastForward from "../assets/navigations/fastf.svg";
import FastRewind from "../assets/navigations/fastr.svg";
import Flip from "../assets/navigations/flip.svg";
import Next from "../assets/navigations/next.svg";
import Page from "../assets/navigations/page.svg";
import Previous from "../assets/navigations/previous.svg";
import Settings from "../assets/navigations/settings.svg";
import Undo from "../assets/navigations/undo.svg";
import Play from "../assets/navigations/play_fill.svg";

export const PieceImages: { [piece: string]: string } = {
  K: WhiteKing,
  k: BlackKing,
  Q: WhiteQueen,
  q: BlackQueen,
  R: WhiteRook,
  r: BlackRook,
  B: WhiteBishop,
  b: BlackBishop,
  N: WhiteKnight,
  n: BlackKnight,
  P: WhitePawn,
  p: BlackPawn,
};

export const NavigationImages = {
  StartMove: Previous,
  PreviousMove: FastRewind,
  Play: Play,
  NextMove: FastForward,
  LastMove: Next,
  Undo: Undo,
  PGN: Page,
  FlipBoard: Flip,
  Settings: Settings,
};

export const defaultFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const defaultUIProps = {
  width: 500,
};

export const pieceSound = new Audio("../assets/piece.mp3");

// DYNAMIC PROPS (NEED TO BE IN ATOMS STORE FOR RECOIL]
export const Theme: { [theme: string]: string[] } = {
  Violet: ["#D7C7FF", "#6D31FF"],
  Green: ["#EEEED2", "#769656"],
  Brown: ["#E4943E", "#783F10"],
};

const scoreColor = ["#62626D", "#7976FF"]; // Unselected, Selected

export { defaultUIProps, scoreColor };
