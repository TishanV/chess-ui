import React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/buttons";
import { Dropdown } from "../components/dropdown";
import { gameIDAtom, selectedGameIDAtom } from "../store/game.atoms";
import { GameBoardAction, gameManager } from "../store/game.events";
import { boardNameListSelector } from "../store/game.selector";
import { boardManagerStyle, boardNamesStyle } from "./boardmanager.style";

function BoardManager() {
  const boardIDs = useRecoilValue(gameIDAtom);
  const boardNames = useRecoilValue(boardNameListSelector);
  const [currentBoardID, setBoard] = useRecoilState(selectedGameIDAtom);
  const dispatchAction = useSetRecoilState(gameManager);

  console.log("BoardManager rendered");
  return (
    <div style={boardManagerStyle}>
      <Button.RED
        value="Delete"
        onClick={(_) => dispatchAction(GameBoardAction.REMOVE)}
      />{" "}
      <Button.PRIMARY
        value="Add"
        onClick={(_) => dispatchAction(GameBoardAction.ADD)}
      />{" "}
      <Dropdown
        selectedIndex={boardIDs.indexOf(currentBoardID)}
        list={boardNames}
        onChange={(i) => setBoard(boardIDs[i])}
        style={boardNamesStyle}
      />
    </div>
  );
}

export { BoardManager };
