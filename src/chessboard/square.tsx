import React from "react"
import { BoardColor } from "../globals";
import { appSize } from "../store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { square, placePieces } from "../store/chessboard";
import { Draggable } from "../components/draggable";
import { useRef } from "react";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const piece = useRecoilValue(square(props.id));
  const movePiece = useSetRecoilState(placePieces);
  const size = useRecoilValue(appSize) / 8;
  const squareRef = useRef<HTMLDivElement>(null);
  const boardRect = squareRef.current?.parentElement?.getBoundingClientRect();
  console.log(`Square ${props.id} render`);
  return (
    <div
      ref={squareRef}
      id={`chess-ui-square-${props.id}`}
      className="square"
      style={{ backgroundColor: BoardColor[paritySq(props.id)] }}
    >
      {piece != " " ? (
        <Draggable
          boundTop={boardRect?.top}
          boundBottom={boardRect?.bottom}
          boundLeft={boardRect?.left}
          boundRight={boardRect?.right}
          onDragEnd={(e) =>
            movePiece(moveAction(piece, props.id, e.clientX, e.clientY))
          }
        >
          <img src={piecePath(piece)} alt="piece" width={size * 0.95} />
        </Draggable>
      ) : null}
    </div>
  );
}

// HELPER FUNCTIONS
function paritySq(id: number) {
  return ((id % 8) + ~~(id / 8)) % 2;
}

function piecePath(piece: string) {
  return "../../assets/pieces/" + piece + ".svg";
}

function squareIDFromCords(x: number, y: number) {
  const divId = document
    .elementsFromPoint(x, y)
    .find((e) => e.className == "square")?.id;
  if (divId?.slice(0, 15) === "chess-ui-square") return +divId.slice(16);
}

// AVOID DIRECT MANIPULATION
function moveAction(piece: string, fromID: number, x: number, y: number) {
  const toID = squareIDFromCords(x, y);
  if (toID === fromID) return [];
  if (toID !== undefined) return [`${fromID} `, `${toID}${piece}`];
  return [];
}

export { Square };
