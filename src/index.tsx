import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { ChessBoard } from "./chessboard";
import { ScoreBoard } from "./scoreboard";
import { Navigator } from "./panels";
import { BoardManager } from "./panels";
import { Settings } from "./settings";
import { RecoilRoot } from "recoil";
import { appSize } from "./store";
import { PGNPage } from "./pgn";

function ChessUI(props: { width: number }) {
  console.log("Chess UI render");
  return (
    <RecoilRoot initializeState={({ set }) => set(appSize, props.width ?? 500)}>
      <div className="chess-ui" style={{ width: props.width }}>
        <ChessBoard />
        <BoardManager />
        <Navigator />
        <ScoreBoard />
        <Settings />
        <PGNPage />
      </div>
    </RecoilRoot>
  );
}

export { ChessUI };
