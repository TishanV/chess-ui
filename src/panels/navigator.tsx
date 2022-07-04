import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import "../../assets/css/navigator.css";
import { boardOrientation, popup } from "../store";
import {
  selectedGameIDAtom,
  selectedStateIDAtom,
  stateIDAtom,
} from "../store/game.atoms";

function Navigator() {
  const flip = useSetRecoilState(boardOrientation);
  const selGameID = useRecoilValue(selectedGameIDAtom);
  const NStates = useRecoilValue(stateIDAtom(selGameID)).at(-1) || 0;
  const setMove = useSetRecoilState(selectedStateIDAtom(selGameID));
  const popupSetter = useSetRecoilState(popup);

  return (
    <div className="navigator">
      <img
        className="controls"
        src="../../assets/navigations/previous.svg"
        alt="first"
        title="First move"
        onClick={(_) => setMove(1)}
      />
      <img
        className="controls"
        src="../../assets/navigations/fastr.svg"
        alt="previous"
        title="Previous move"
        onClick={(_) => setMove((n) => wrapSum(n, -1, NStates))}
      />
      <img
        className="controls"
        src="../../assets/navigations/play_fill.svg"
        alt="play"
        title="Play subsequent moves"
      />
      <img
        className="controls"
        src="../../assets/navigations/fastf.svg"
        alt="next"
        title="Next move"
        onClick={(_) => setMove((n) => wrapSum(n, 1, NStates))}
      />
      <img
        className="controls"
        src="../../assets/navigations/next.svg"
        alt="last"
        title="Last Move"
        onClick={(_) => setMove(-1)}
      />
      <div style={{ flex: 1 }} />
      <img
        className="controls other"
        src="../../assets/navigations/page.svg"
        alt="pgn/fen"
        title="PGN-FEN"
      />
      <img
        className="controls other"
        src="../../assets/navigations/flip.svg"
        alt="flip-board"
        title="Flip board"
        onClick={(_) => flip((s) => !s)}
      />
      <img
        className="controls other"
        src="../../assets/navigations/settings.svg"
        alt="settings"
        title="Settings"
        onClick={(_) => popupSetter("settings")}
      />
    </div>
  );
}

// HELPER FUNCTIONS
const wrapSum = (a: number, b: number, max: number) => {
  const sum = a + b;
  if (sum > max) return max;
  if (sum < 0) return 0;
  return sum;
};

export { Navigator };
