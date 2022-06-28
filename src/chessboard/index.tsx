import React from "react"
import { Square } from "./square"
import "../../assets/css/chessboard.css"
import { UIProps } from "../globals"

/**
 *@TODO: Board layout
 *@TODO: Board labels (rows and files)
*/ 

const testBoard = Array(64).fill(null)
testBoard[3] = 'P'
// testBoard[34] = 'q'

function ChessBoard(props: UIProps){
    const square_size = (props.width??500)/8
    return (
        <div
            className="chess-board"
            style={{
                    gridTemplateRows: `repeat(8, ${square_size}px)`,
                    gridTemplateColumns: `repeat(8, ${square_size}px)`,
                    height: props.width
                }}
        >
            {testBoard.map((p,i) => <Square id={i} key={i} piece={p} size={square_size}/>)}
        </div>
    )
}

export {ChessBoard}