import React from "react";
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
      <NavigationControl
        src={NavigationImages.StartMove}
        title="First move"
        onClick={(_) => setMove(1)}
      />
      <NavigationControl
        src={NavigationImages.PreviousMove}
        title="Previous move"
        onClick={(_) => setMove((n) => n - 1)}
      />
      <NavigationControl
        src={NavigationImages.Play}
        title="Play subsequent moves"
        onClick={() => null}
      />
      <NavigationControl
        src={NavigationImages.NextMove}
        title="Next move"
        onClick={(_) => setMove((n) => n + 1)}
      />
      <NavigationControl
        src={NavigationImages.LastMove}
        title="Last Move"
        onClick={(_) => setMove(-1)}
      />
      <NavigationControl
        style={{ height: 20 }}
        src={NavigationImages.Undo}
        title="Undo Move"
        onClick={(_) => undoMove(undefined)}
      />
      <div style={{ flex: 1 }} />
      <NavigationControl
        className="other"
        src={NavigationImages.PGN}
        title="PGN-FEN"
        onClick={(_) => popupSetter("pgn")}
      />
      <NavigationControl
        className="other"
        src={NavigationImages.FlipBoard}
        title="Flip board"
        onClick={(_) => flip((s) => !s)}
      />
      <NavigationControl
        className="other"
        src={NavigationImages.Settings}
        title="Settings"
        onClick={(_) => popupSetter("settings")}
      />
    </div>
  );
}

type NavigationControlProps = {
  className?: string;
  src: string;
  title: string;
  onClick: (e?: MouseEvent | React.MouseEvent) => any;
  style?: object;
};

function NavigationControl(props: NavigationControlProps) {
  return (
    <img
      className={"controls " + props.className}
      src={props.src}
      alt={props.title}
      title={props.title}
      style={props.style}
      onClick={props.onClick}
    />
  );
}

export { Navigator };
