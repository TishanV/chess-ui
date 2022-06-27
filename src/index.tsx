import React from "react"
import { ChessBoard } from "./chessboard"
import { ScoreBoard} from "./scoreboard"
import { Navigator } from "./panels"
import { BoardManager } from "./panels"
import { SettingsPage } from "./settings"

function ChessUI(){
    return (
        <div className="chess-ui">
          <ChessBoard />
          <BoardManager />
          <Navigator />
          <ScoreBoard />
          <SettingsPage />
        </div>
      )
}

export {ChessUI}