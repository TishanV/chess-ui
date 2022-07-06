import React from "react"
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BoardColor } from "../globals";
import { appSize } from "../store";
import { Draggable } from "../components/draggable";
import { movePieceSelector } from "../store/game.events";
import { pieceSelector } from "../store/game.selector";
import { toCorePos } from "../utils";
import {
  captureSquares,
  checkSquare,
  movableSquares,
  selectedPiece,
  vulnerableSquares,
} from "../store/highlights.selectors";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const piece = useRecoilValue(pieceSelector(props.id));
  const movePiece = useSetRecoilState(movePieceSelector);

  const [isSelected, selectSquare] = useRecoilState(selectedPiece(props.id));
  const isMovable = useRecoilValue(movableSquares(props.id));
  const isCheck = useRecoilValue(checkSquare(props.id));
  const isVulnerable = useRecoilValue(vulnerableSquares(props.id));
  const isCaptured = useRecoilValue(captureSquares(props.id));

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
      {isSelected ? (
        <div
          style={{ width: size, height: size }}
          className="highlight select"
        ></div>
      ) : null}
      {isMovable ? (
        <div
          style={{ width: size / 4, height: size / 4 }}
          className="highlight movable"
        ></div>
      ) : null}
      {isCheck ? (
        <div
          style={{ width: size / 4, height: size / 4 }}
          className="highlight check"
        ></div>
      ) : null}
      {isVulnerable ? (
        <div
          style={{ width: size / 1.2, height: size / 1.2 }}
          className="highlight vulnerable"
        ></div>
      ) : null}
      {isCaptured ? (
        <div
          style={{ width: size / 1.2, height: size / 1.2 }}
          className="highlight capture"
        ></div>
      ) : null}
      {piece != "-" ? (
        <Draggable
          boundTop={boardRect?.top}
          boundBottom={boardRect?.bottom}
          boundLeft={boardRect?.left}
          boundRight={boardRect?.right}
          onDragStart={(_) => selectSquare(true)}
          onDragEnd={(e) => {
            selectSquare(false);
            movePiece(moveAction(props.id, e.clientX, e.clientY));
          }}
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
function moveAction(fromID: number, x: number, y: number): [number, number] {
  const toID = squareIDFromCords(x, y);
  const from = toCorePos(fromID);
  if (toID !== undefined) return [from, toCorePos(toID)];
  return [from, from];
}

export { Square };
