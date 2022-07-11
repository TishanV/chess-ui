import React from "react"
import { useRecoilValue } from "recoil";
import { enabledFeaturesAtom, Features } from "../store/config.atoms";
import {
  captureSquares,
  checkSquare,
  mateHighlight,
  mateSquares,
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
  const mateDir = useRecoilValue(mateSquares(props.id));
  const mateHighlighter = {
    [mateHighlight.FROM]: highlightStyles.MATE_FROM,
    [mateHighlight.TO]: highlightStyles.MATE_TO,
  };

  const checkMateEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECKMATE_MOVE)
  );
  const checkEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECK)
  );
  const threatsEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.HIGHLIGHT_THREATS_ADVANTAGES)
  );
  return (
    <>
      {mateDir !== null && checkMateEnabled ? (
        <div style={mateHighlighter[mateDir](props.size)}></div>
      ) : null}
      {isSelected ? (
        <div style={highlightStyles.SELECT(props.size)}></div>
      ) : null}
      {isMovable ? (
        <div style={highlightStyles.MOVABLE(props.size)}></div>
      ) : null}
      {isCheck && checkEnabled ? (
        <div style={highlightStyles.CHECK(props.size)}></div>
      ) : null}
      {isVulnerable && threatsEnabled ? (
        <div style={highlightStyles.VULNERABLE(props.size)}></div>
      ) : null}
      {isCaptured && threatsEnabled ? (
        <div style={highlightStyles.CAPTURE(props.size)}></div>
      ) : null}
    </>
  );
}
