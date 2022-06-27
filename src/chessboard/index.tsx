import React from "react"
import { Square } from "./square"

/**
 *@TODO: Board layout
 *@TODO: Board labels (rows and files)
*/ 

function ChessBoard(){
    return (
        <div className="chess-board">
            chess board
            {[0,1,2,3].map(() => <Square />)}
        </div>
    )
}

export {ChessBoard}