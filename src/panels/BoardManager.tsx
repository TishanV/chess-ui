import React from "react"
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "../../assets/css/board-manager.css";
import {
  addBoard,
  boardNames,
  removeBoard,
  selectedBoardID,
} from "../store/bordmanager";

function BoardManager() {
  const boards = useRecoilValue(boardNames);
  const [currentBoardID, setBoard] = useRecoilState(selectedBoardID);
  const add = useSetRecoilState(addBoard);
  const remove = useSetRecoilState(removeBoard);
  console.log("BoardManager rendered");
  return (
    <div className="board-manager">
      <Button variant="danger" onClick={(_) => remove(currentBoardID)}>
        Delete
      </Button>{" "}
      <Button
        variant="primary"
        onClick={(_) => add(`Board ${boards.length + 1}`)}
      >
        Add
      </Button>{" "}
      <Dropdown className="boards">
        <Dropdown.Toggle variant="secondary">
          {boards[currentBoardID]}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {boards.map((name, i) => (
            <Dropdown.Item
              key={i}
              active={i == currentBoardID}
              onClick={(_) => setBoard(i)}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export { BoardManager };
