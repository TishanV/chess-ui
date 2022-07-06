import React from "react"
import { useSetRecoilState } from "recoil";
import "../../assets/css/navigator.css";
import { boardOrientation, popup } from "../store";
import { stateSelector } from "../store/game.selector";

function Navigator() {
  const flip = useSetRecoilState(boardOrientation);
  const setMove = useSetRecoilState(stateSelector);
  const popupSetter = useSetRecoilState(popup);
  console.log("Navigator render");
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
        onClick={(_) => setMove((n) => n - 1)}
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
        onClick={(_) => setMove((n) => n + 1)}
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
        onClick={(_) => popupSetter("pgn")}
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

export { Navigator };
