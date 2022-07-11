import React from "react";

const chessBoardBaseStyle: React.CSSProperties = {
  display: "grid",
  position: "relative",
};

export const chessBoardStyle = (boardSize: number): React.CSSProperties => ({
  ...chessBoardBaseStyle,
  height: boardSize,
  gridTemplateRows: `repeat(8, ${boardSize / 8}px)`,
  gridTemplateColumns: `repeat(8, ${boardSize / 8}px)`,
});

const squareBaseStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const squareStyle = (color: string): React.CSSProperties => ({
  ...squareBaseStyle,
  backgroundColor: color,
});

const highlightBaseStyle: React.CSSProperties = {
  position: "absolute",
};

const movableStyle: React.CSSProperties = {
  borderRadius: "50%",
  backgroundColor: "black",
  opacity: 0.4,
};

const checkStyle: React.CSSProperties = {
  borderRadius: "50%",
  backgroundColor: "red",
  boxShadow: "0px 0px 10px 10px red",
};

const vulnerableStyle: React.CSSProperties = {
  borderRadius: "20%",
  border: "3px solid orange",
};

const captureStyle: React.CSSProperties = {
  borderRadius: "20%",
  border: "3px solid greenyellow",
};

const mateFromStyle: React.CSSProperties = {
  backgroundColor: "yellow",
};

const mateToStyle: React.CSSProperties = {
  backgroundColor: "lime",
};

const selectStyle: React.CSSProperties = {
  backgroundColor: "rgb(59, 192, 170)",
  opacity: 0.9,
};

const highlightSizeStyle = (size: number, factor = 1): React.CSSProperties => ({
  height: size / factor,
  width: size / factor,
});

export const highlightStyles = {
  SELECT: (s: number) => ({
    ...highlightBaseStyle,
    ...selectStyle,
    ...highlightSizeStyle(s),
  }),
  CAPTURE: (s: number) => ({
    ...highlightBaseStyle,
    ...captureStyle,
    ...highlightSizeStyle(s, 1.1),
  }),
  VULNERABLE: (s: number) => ({
    ...highlightBaseStyle,
    ...vulnerableStyle,
    ...highlightSizeStyle(s, 1.1),
  }),
  CHECK: (s: number) => ({
    ...highlightBaseStyle,
    ...checkStyle,
    ...highlightSizeStyle(s, 4),
  }),
  MOVABLE: (s: number) => ({
    ...highlightBaseStyle,
    ...movableStyle,
    ...highlightSizeStyle(s, 4),
  }),
  MATE_FROM: (s: number) => ({
    ...highlightBaseStyle,
    ...mateFromStyle,
    ...highlightSizeStyle(s),
  }),
  MATE_TO: (s: number) => ({
    ...highlightBaseStyle,
    ...mateToStyle,
    ...highlightSizeStyle(s),
  }),
};
