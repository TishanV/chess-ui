import React from "react"
import { MouseEvent, useRef, RefObject } from "react";
import { BoardColor } from "../globals";
import { appSize } from "../store";
import { useRecoilValue } from "recoil";
import { square } from "../store/chessboard";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const pieceRef = useRef<HTMLImageElement>(null);
  const piece = useRecoilValue(square(props.id));
  const size = useRecoilValue(appSize) / 8;
  console.log(`Square ${props.id} render`);
  return (
    <div
      className="square"
      style={{ backgroundColor: BoardColor[paritySq(props.id)] }}
    >
      {piece != " " ? (
        <img
          ref={pieceRef}
          className="piece"
          src={piecePath(piece)}
          alt="piece"
          width={size * 0.95}
          onMouseDown={pieceHold}
          onMouseMove={(e) => pieceMove(e, pieceRef)}
          onMouseUp={(e) => pieceRelease(e, pieceRef)}
        />
      ) : null}
    </div>
  );
}
//
let dx = 0;
let dy = 0;
let boardY = 0;
let boardX = 0;
let drag = false;
//React.MouseEventHandler<HTMLImageElement>
const pieceHold = (e: MouseEvent) => {
  e.preventDefault();
  dx = e.clientX - e.currentTarget.getBoundingClientRect().left;
  dy = e.clientY - e.currentTarget.getBoundingClientRect().top;
  boardY =
    e.currentTarget.parentElement?.parentElement?.getBoundingClientRect().top ??
    0;
  boardX =
    e.currentTarget.parentElement?.parentElement?.getBoundingClientRect()
      .left ?? 0;
  drag = true;
};

const pieceMove = (e: MouseEvent, piece: RefObject<HTMLImageElement>) => {
  e.preventDefault();
  if (drag && piece.current) {
    piece.current.style.left = (e.clientX - boardX - dx).toString() + "px";
    piece.current.style.top = (e.clientY - boardY - dy).toString() + "px";
  }
};

const pieceRelease = (e: MouseEvent, piece: RefObject<HTMLImageElement>) => {
  drag = false;
  if (piece.current) {
    piece.current.style.left = "";
    piece.current.style.top = "";
  }
};

// HELPER FUNCTIONS
function paritySq(id: number) {
  return ((id % 8) + ~~(id / 8)) % 2;
}

function piecePath(piece: string) {
  return "../../assets/pieces/" + piece + ".svg";
}

export { Square };
