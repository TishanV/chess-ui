import React from "react"
import { useSetRecoilState } from "recoil";
import "../../assets/css/navigator.css";
import { NavigationImages } from "../globals";
import { boardOrientation, popup } from "../store";
import { removeStateEvent } from "../store/game.events";
import { stateSelector } from "../store/game.selector";

function Navigator() {
  const flip = useSetRecoilState(boardOrientation);
  const setMove = useSetRecoilState(stateSelector);
  const undoMove = useSetRecoilState(removeStateEvent);
  const popupSetter = useSetRecoilState(popup);
  console.log("Navigator render");
  return (
    <div className="navigator">
      <img
        className="controls"
        src={NavigationImages.StartMove}
        alt="first"
        title="First move"
        onClick={(_) => setMove(1)}
      />
      <img
        className="controls"
        src={NavigationImages.PreviousMove}
        alt="previous"
        title="Previous move"
        onClick={(_) => setMove((n) => n - 1)}
      />
      <img
        className="controls"
        src={NavigationImages.Play}
        alt="play"
        title="Play subsequent moves"
      />
      <img
        className="controls"
        src={NavigationImages.NextMove}
        alt="next"
        title="Next move"
        onClick={(_) => setMove((n) => n + 1)}
      />
      <img
        className="controls"
        src={NavigationImages.LastMove}
        alt="last"
        title="Last Move"
        onClick={(_) => setMove(-1)}
      />
      <img
        className="controls"
        style={{ height: 20 }}
        src={NavigationImages.Undo}
        alt="undo"
        title="Undo Move"
        onClick={(_) => undoMove(undefined)}
      />
      <div style={{ flex: 1 }} />
      <img
        className="controls other"
        src={NavigationImages.PGN}
        alt="pgn/fen"
        title="PGN-FEN"
        onClick={(_) => popupSetter("pgn")}
      />
      <img
        className="controls other"
        src={NavigationImages.FlipBoard}
        alt="flip-board"
        title="Flip board"
        onClick={(_) => flip((s) => !s)}
      />
      <img
        className="controls other"
        src={NavigationImages.Settings}
        alt="settings"
        title="Settings"
        onClick={(_) => popupSetter("settings")}
      />
    </div>
  );
}

export { Navigator };
