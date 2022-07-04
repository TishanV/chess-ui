import React from "react"
import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BoardColor } from "../globals";
import { appSize } from "../store";
import { Draggable } from "../components/draggable";
import {
  gameStateAtom,
  selectedGameIDAtom,
  selectedStateIDAtom,
} from "../store/game.atoms";
import { movePieceSelector } from "../store/game.events";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const selGameID = useRecoilValue(selectedGameIDAtom);
  const selStateID = useRecoilValue(selectedStateIDAtom(selGameID));
  const boardState = useRecoilValue(
    gameStateAtom([selGameID, selStateID])
  ).boardState;
  const piece = boardState.board[toCorePos(props.id)];
  const movePiece = useSetRecoilState(movePieceSelector);

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
      {piece != "-" ? (
        <Draggable
          boundTop={boardRect?.top}
          boundBottom={boardRect?.bottom}
          boundLeft={boardRect?.left}
          boundRight={boardRect?.right}
          onDragEnd={(e) =>
            movePiece(moveAction(props.id, e.clientX, e.clientY))
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

function toCorePos(UIPos: number) {
  return 10 * (1 + Math.floor(UIPos / 8)) + (UIPos % 8) + 1;
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
