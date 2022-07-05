import React from "react"
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "../../assets/css/board-manager.css";
import {
  gameIDAtom,
  gameNameAtom,
  selectedGameIDAtom,
} from "../store/game.atoms";
import { GameBoardAction, gameManager } from "../store/game.events";

function BoardManager() {
  const boardIDs = useRecoilValue(gameIDAtom);
  const [currentBoardID, setBoard] = useRecoilState(selectedGameIDAtom);
  const dispatchAction = useSetRecoilState(gameManager);

  console.log("BoardManager rendered");
  return (
    <div className="board-manager">
      <Button
        variant="danger"
        onClick={(_) => dispatchAction(GameBoardAction.REMOVE)}
      >
        Delete
      </Button>{" "}
      <Button
        variant="primary"
        onClick={(_) => dispatchAction(GameBoardAction.ADD)}
      >
        Add
      </Button>{" "}
      <Dropdown className="boards">
        <Dropdown.Toggle variant="secondary">
          <BoardName id={currentBoardID} />
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {boardIDs.map((i) => (
            <Dropdown.Item
              key={i}
              active={i == currentBoardID}
              onClick={(_) => setBoard(i)}
            >
              <BoardName id={i} />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function BoardName(props: { id: number }) {
  const name = useRecoilValue(gameNameAtom(props.id));
  return <label>{name}</label>;
}

export { BoardManager };
