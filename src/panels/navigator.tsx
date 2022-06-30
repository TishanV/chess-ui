import React from "react"
import "../../assets/css/navigator.css";

function Navigator() {
  return (
    <div className="navigator">
      <img
        className="controls"
        src="../../assets/navigations/previous.svg"
        alt="first"
        title="First move"
      />
      <img
        className="controls"
        src="../../assets/navigations/fastr.svg"
        alt="previous"
        title="Previous move"
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
      />
      <img
        className="controls"
        src="../../assets/navigations/next.svg"
        alt="last"
        title="Last Move"
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
      />
      <img
        className="controls other"
        src="../../assets/navigations/settings.svg"
        alt="settings"
        title="Settings"
      />
    </div>
  );
}

export { Navigator };
