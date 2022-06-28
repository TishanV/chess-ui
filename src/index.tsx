import React from "react"
import { ChessBoard } from "./chessboard"
import { ScoreBoard} from "./scoreboard"
import { Navigator } from "./panels"
import { BoardManager } from "./panels"
import { SettingsPage } from "./settings"
import { defaultUIProps, UIProps } from "./globals"


function ChessUI(props: UIProps){
  props = {...defaultUIProps, ...props}
    return (
        <div className="chess-ui" style={{width: props.width}}>
          <ChessBoard {...props}/>
          <BoardManager />
          <Navigator />
          <ScoreBoard />
          <SettingsPage />
        </div>
      )
}

export {ChessUI}