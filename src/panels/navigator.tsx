import React from "react"
import { useSetRecoilState } from "recoil";
import { NavigationImages } from "../globals";
import { boardOrientation, popup } from "../store";
import { removeStateEvent } from "../store/game.events";
import { stateSelector } from "../store/game.selector";
import { navigatorStyle, navControlStyles } from "./navigator.style";

function Navigator() {
  const flip = useSetRecoilState(boardOrientation);
  const setMove = useSetRecoilState(stateSelector);
  const undoMove = useSetRecoilState(removeStateEvent);
  const popupSetter = useSetRecoilState(popup);
  console.log("Navigator render");
  return (
    <div style={navigatorStyle}>
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
        src={NavigationImages.Undo}
        title="Undo Move"
        style={navControlStyles.UNDO}
        onClick={(_) => undoMove(undefined)}
      />
      <div style={{ flex: 1 }} />
      <NavigationControl
        src={NavigationImages.PGN}
        title="PGN-FEN"
        style={navControlStyles.OTHER}
        onClick={(_) => popupSetter("pgn")}
      />
      <NavigationControl
        src={NavigationImages.FlipBoard}
        title="Flip board"
        style={navControlStyles.OTHER}
        onClick={(_) => flip((s) => !s)}
      />
      <NavigationControl
        src={NavigationImages.Settings}
        title="Settings"
        style={navControlStyles.OTHER}
        onClick={(_) => popupSetter("settings")}
      />
    </div>
  );
}

type NavigationControlProps = {
  src: string;
  title: string;
  onClick: (e?: MouseEvent | React.MouseEvent) => any;
  style?: object;
};

function NavigationControl(props: NavigationControlProps) {
  return (
    <img
      className="nav-controls"
      src={props.src}
      alt={props.title}
      title={props.title}
      style={{ ...navControlStyles.BASE, ...props.style }}
      onClick={props.onClick}
    />
  );
}

export { Navigator };
