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

function BoardManager() {
  const boardIDs = useRecoilValue(gameIDAtom);
  const [currentBoardID, setBoard] = useRecoilState(selectedGameIDAtom);
  // const add = useSetRecoilState(addBoard);
  // const remove = useSetRecoilState(removeBoard);
  console.log("BoardManager rendered");
  return (
    <div className="board-manager">
      <Button variant="danger" onClick={(_) => currentBoardID}>
        Delete
      </Button>{" "}
      <Button variant="primary" onClick={(_) => `Board ${boardIDs.length + 1}`}>
        Add
      </Button>{" "}
      <Dropdown className="boards">
        <Dropdown.Toggle variant="secondary">
          {useRecoilValue(gameNameAtom(currentBoardID))}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {boardIDs.map((i) => (
            <Dropdown.Item
              key={i}
              active={i == currentBoardID}
              onClick={(_) => setBoard(i)}
            >
              {useRecoilValue(gameNameAtom(i))}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export { BoardManager };
