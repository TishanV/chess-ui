import React from "react";
import { Square } from "./square";
import { appSize, boardOrientation } from "../store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chessBoardStyle } from "./style";
import { PieceCard } from "./piece.card";
import { popupPosition, popupAtom } from "../store/config.atoms";
import { promoteEvent } from "../store/game.events";

function ChessBoard() {
  const size = useRecoilValue(appSize);
  const flipped = useRecoilValue(boardOrientation);
  console.log("ChessBoard render");
  return (
    <div className="chess-board" style={chessBoardStyle(size)}>
      {Array(64)
        .fill(0)
        .map((_, i) => (
          <Square id={flipped ? 63 - i : i} key={i} />
        ))}
      <PromotionCard />
    </div>
  );
}

function PromotionCard() {
  const isPopup = useRecoilValue(popupAtom);
  const position = useRecoilValue(popupPosition).split(",");
  const setPromotion = useSetRecoilState(promoteEvent);
  return isPopup === "promotion" ? (
    <PieceCard
      position={[+position[0], +position[1]]}
      pieces={["Q", "R", "B", "N"]}
      onClick={(p) => [console.log("Piece", p), setPromotion(p)]}
    />
  ) : null;
}

export { ChessBoard };
