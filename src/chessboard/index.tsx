import React from "react"
import { Square } from "./square";
import { appSize, boardOrientation } from "../store";
import { useRecoilValue } from "recoil";
import { chessBoardStyle } from "./style";

function ChessBoard() {
  const size = useRecoilValue(appSize);
  const flipped = useRecoilValue(boardOrientation);
  console.log("ChessBoard render");
  return (
    <div className="chess-board" style={chessBoardStyle(size)}>
      {Array(64)
        .fill(0)
        .map((_, i) => (
          <Square id={flipped ? 63 - i : i} key={i} />
        ))}
    </div>
  );
}

export { ChessBoard };
