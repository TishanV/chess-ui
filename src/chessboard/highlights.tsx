import React from "react"
import { useRecoilValue } from "recoil";
import { enabledFeaturesAtom, Features } from "../store/config.atoms";
import {
  captureSquares,
  checkSquare,
  movableSquares,
  selectedPiece,
  vulnerableSquares,
} from "../store/highlights.selectors";
import { highlightStyles } from "./style";

export type HighlightProps = {
  id: number;
  size: number;
};

export function Highlights(props: HighlightProps) {
  const isSelected = useRecoilValue(selectedPiece(props.id));
  const isMovable = useRecoilValue(movableSquares(props.id));
  const isCheck = useRecoilValue(checkSquare(props.id));
  const isVulnerable = useRecoilValue(vulnerableSquares(props.id));
  const isCaptured = useRecoilValue(captureSquares(props.id));

  const checkHighlightsEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECK)
  );
  const threatHighlightsEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.HIGHLIGHT_THREATS_ADVANTAGES)
  );
  return (
    <>
      {isSelected ? (
        <div style={highlightStyles.SELECT(props.size)}></div>
      ) : null}
      {isMovable ? (
        <div style={highlightStyles.MOVABLE(props.size)}></div>
      ) : null}
      {isCheck && checkHighlightsEnabled ? (
        <div style={highlightStyles.CHECK(props.size)}></div>
      ) : null}
      {isVulnerable && threatHighlightsEnabled ? (
        <div style={highlightStyles.VULNERABLE(props.size)}></div>
      ) : null}
      {isCaptured && threatHighlightsEnabled ? (
        <div style={highlightStyles.CAPTURE(props.size)}></div>
      ) : null}
    </>
  );
}
