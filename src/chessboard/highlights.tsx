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
        <div
          style={{ width: props.size, height: props.size }}
          className="highlight select"
        ></div>
      ) : null}
      {isMovable ? (
        <div
          style={{ width: props.size / 4, height: props.size / 4 }}
          className="highlight movable"
        ></div>
      ) : null}
      {isCheck && checkHighlightsEnabled ? (
        <div
          style={{ width: props.size / 4, height: props.size / 4 }}
          className="highlight check"
        ></div>
      ) : null}
      {isVulnerable && threatHighlightsEnabled ? (
        <div
          style={{ width: props.size / 1.2, height: props.size / 1.2 }}
          className="highlight vulnerable"
        ></div>
      ) : null}
      {isCaptured && threatHighlightsEnabled ? (
        <div
          style={{ width: props.size / 1.2, height: props.size / 1.2 }}
          className="highlight capture"
        ></div>
      ) : null}
    </>
  );
}
