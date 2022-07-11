import React from "react";
import { useSetRecoilState } from "recoil";
import { NavigationImages } from "../globals";
import { boardOrientation, popup } from "../store";
import {
  stateList,
  stateListOperations,
  stateListSelectOperations,
} from "../store/game.atoms";
import { navigatorStyle, navControlStyles } from "./navigator.style";

function Navigator() {
  const flip = useSetRecoilState(boardOrientation);
  const popupSetter = useSetRecoilState(popup);
  const setStateList = useSetRecoilState(stateList);

  const firstMove = () =>
    setStateList({
      operation: stateListOperations.SELECT,
      payload: stateListSelectOperations.FIRST,
    });
  const previousMove = () =>
    setStateList({
      operation: stateListOperations.SELECT,
      payload: stateListSelectOperations.PREVIOUS,
    });
  const nextMove = () =>
    setStateList({
      operation: stateListOperations.SELECT,
      payload: stateListSelectOperations.NEXT,
    });
  const lastMove = () =>
    setStateList({
      operation: stateListOperations.SELECT,
      payload: stateListSelectOperations.LAST,
    });
  const undoMove = () =>
    setStateList({ operation: stateListOperations.REMOVE });

  return (
    <div style={navigatorStyle}>
      <NavigationControl
        src={NavigationImages.StartMove}
        title="First move"
        onClick={firstMove}
      />
      <NavigationControl
        src={NavigationImages.PreviousMove}
        title="Previous move"
        onClick={previousMove}
      />
      <NavigationControl
        src={NavigationImages.Play}
        title="Play subsequent moves"
        onClick={() => null}
      />
      <NavigationControl
        src={NavigationImages.NextMove}
        title="Next move"
        onClick={nextMove}
      />
      <NavigationControl
        src={NavigationImages.LastMove}
        title="Last Move"
        onClick={lastMove}
      />
      <NavigationControl
        src={NavigationImages.Undo}
        title="Undo Move"
        style={navControlStyles.UNDO}
        onClick={undoMove}
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
