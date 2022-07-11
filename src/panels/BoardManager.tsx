import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../components/buttons";
import { Dropdown } from "../components/dropdown";
import {
  gamesList,
  gameListGetter,
  gameListOperations,
} from "../store/game.atoms";
import { boardNameListSelector } from "../store/game.selector";
import { boardManagerStyle, boardNamesStyle } from "./boardmanager.style";

function BoardManager() {
  const boardNames = useRecoilValue(boardNameListSelector);
  const [boardListData, setBoardAction] = useRecoilState(gamesList);
  const { list, selected } = boardListData as gameListGetter;
  console.log("BoardManager rendered", boardListData);
  return (
    <div style={boardManagerStyle}>
      <Button.RED
        value="DL"
        onClick={(_) =>
          setBoardAction({
            operation: gameListOperations.REMOVE,
          })
        }
      />{" "}
      <Button.PRIMARY
        value="ADD"
        onClick={(_) =>
          setBoardAction({
            operation: gameListOperations.ADD,
          })
        }
      />{" "}
      <Dropdown
        selectedIndex={list.indexOf(selected)}
        list={boardNames}
        onChange={(i) =>
          setBoardAction({
            operation: gameListOperations.SELECT,
            payload: list[i],
          })
        }
        style={boardNamesStyle}
      />
    </div>
  );
}

export { BoardManager };
