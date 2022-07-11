import React from "react"
import { useState } from "react";
import { PopupCard } from "../components/popup";
import { PieceImages } from "../globals";

type PieceCardProps = {
  position: [number, number];
  pieces: string[];
  onClick: (piece: string) => any;
};

export function PieceCard(props: PieceCardProps) {
  return (
    <PopupCard position={props.position}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {props.pieces.map((p) => (
          <Piece piece={p} onClick={props.onClick} />
        ))}
      </div>
    </PopupCard>
  );
}

function Piece({
  piece,
  onClick,
}: {
  piece: string;
  onClick: (piece: string) => any;
}) {
  const [isOver, setOver] = useState(false);
  return (
    <img
      style={{ backgroundColor: isOver ? "lightgrey" : "" }}
      src={PieceImages[piece]}
      alt={piece}
      onMouseEnter={(_) => setOver(true)}
      onMouseLeave={(_) => setOver(false)}
      onMouseDown={(_) => onClick(piece)}
    />
  );
}
