interface UIProps {
  width?: number;
}

export const defaultFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const defaultUIProps: UIProps = {
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

export type { UIProps };
export { defaultUIProps, scoreColor };
