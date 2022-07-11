import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/index.css";
import { ChessBoard } from "./chessboard";
import { ScoreBoard } from "./scoreboard";
import { Navigator } from "./panels";
import { BoardManager } from "./panels";
import { Settings } from "./settings";
import { RecoilRoot } from "recoil";
import { appSize } from "./store";
import { PGNPage } from "./pgn";
import { chessUIBaseStyle, sidePanelStyle } from "./index.style";

function ChessUI(props: { width: number }) {
  console.log("Chess UI render");
  return (
    <RecoilRoot initializeState={({ set }) => set(appSize, props.width ?? 500)}>
      <div style={chessUIBaseStyle}>
        <ChessBoard />
        <div style={{ ...sidePanelStyle, height: props.width }}>
          <ScoreBoard />
          <BoardManager />
          <Navigator />
        </div>

        <Settings />
        <PGNPage />
      </div>
    </RecoilRoot>
  );
}

export { ChessUI };
