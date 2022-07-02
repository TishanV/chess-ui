import React from "react"
import { Square } from "./square";
import "../../assets/css/chessboard.css";
import { appSize, boardOrientation } from "../store";
import { useRecoilValue } from "recoil";

function ChessBoard() {
  const width = useRecoilValue(appSize);
  const flipped = useRecoilValue(boardOrientation);
  const square_size = width / 8;
  console.log("ChessBoard render");
  return (
    <div
      className="chess-board"
      style={{
        gridTemplateRows: `repeat(8, ${square_size}px)`,
        gridTemplateColumns: `repeat(8, ${square_size}px)`,
        height: width,
      }}
    >
      {Array(64)
        .fill(0)
        .map((_, i) => (
          <Square id={flipped ? 63 - i : i} key={i} />
        ))}
    </div>
  );
}

export { ChessBoard };
