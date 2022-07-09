import React from "react"
import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { appSize } from "../store";
import { Draggable } from "../components/draggable";
import { movePieceSelector } from "../store/game.events";
import { pieceSelector } from "../store/game.selector";
import { toCorePos } from "../utils";
import { selectedPiece } from "../store/highlights.selectors";
import { boardColorAtom } from "../store/config.atoms";
import { PieceImages, Theme } from "../globals";
import { Highlights } from "./highlights";
import { squareStyle } from "./style";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const piece = useRecoilValue(pieceSelector(props.id));
  const movePiece = useSetRecoilState(movePieceSelector);

  const selectSquare = useSetRecoilState(selectedPiece(props.id));

  const size = useRecoilValue(appSize) / 8;
  const boardColor: string[] = Theme[useRecoilValue(boardColorAtom)];
  const squareRef = useRef<HTMLDivElement>(null);
  const boardRect = squareRef.current?.parentElement?.getBoundingClientRect();
  console.log(`Square ${props.id} render`);
  return (
    <div
      ref={squareRef}
      id={`chess-ui-square-${props.id}`}
      className="square"
      style={squareStyle(boardColor[paritySq(props.id)])}
    >
      <Highlights id={props.id} size={size} />
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
  return PieceImages[piece];
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
