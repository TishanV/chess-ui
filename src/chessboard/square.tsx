import React from "react"
import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { appSize } from "../store";
import { Draggable } from "../components/draggable";
import { movePieceSelector, showPromotion } from "../store/game.events";
import { pieceSelector } from "../store/game.selector";
import { toCorePos } from "../utils";
import { selectedPiece } from "../store/highlights.selectors";
import { boardColorAtom, popupAtom } from "../store/config.atoms";
import { PieceImages, Theme } from "../globals";
import { Highlights } from "./highlights";
import { squareStyle } from "./style";

interface SquareProps {
  id: number;
}

function Square(props: SquareProps) {
  const squareRef = useRef<HTMLDivElement>(null);
  const size = useRecoilValue(appSize) / 8;
  const boardColor: string[] = Theme[useRecoilValue(boardColorAtom)];
  const boardRect = squareRef.current?.parentElement?.getBoundingClientRect();

  const piece = useRecoilValue(pieceSelector(props.id));
  const movePiece = useSetRecoilState(movePieceSelector);

  const selectSquare = useSetRecoilState(selectedPiece(props.id));

  const setPopup = useSetRecoilState(popupAtom);
  const setPromotion = useSetRecoilState(showPromotion);
  console.log(`Square ${props.id} render`);
  return (
    <div
      ref={squareRef}
      className="square"
      id={`chess-ui-square-${props.id}`}
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
            const cords = moveAction(props.id, e.clientX, e.clientY);
            if (isPromotion(piece, cords[1])) {
              setPromotion({ position: [e.clientX, e.clientY], cords: cords });
              document.addEventListener("mousedown", () => setPopup(""), {
                once: true,
              });
            } else movePiece(cords);
          }}
        >
          <img src={PieceImages[piece]} alt="piece" width={size * 0.95} />
        </Draggable>
      ) : null}
    </div>
  );
}

// HELPER FUNCTIONS
function paritySq(id: number) {
  return ((id % 8) + ~~(id / 8)) % 2;
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

function isPromotion(piece: string, to: number): boolean {
  if (piece === "P" && to < 19) return true;
  if (piece === "p" && to > 80) return true;
  return false;
}

export { Square };
