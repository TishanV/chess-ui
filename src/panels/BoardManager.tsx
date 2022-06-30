import React from "react"
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../../assets/css/board-manager.css";

function BoardManager() {
  return (
    <div className="board-manager">
      <Button variant="danger">Delete</Button>{" "}
      <Button variant="primary">Add</Button>{" "}
      <Dropdown className="boards">
        <Dropdown.Toggle variant="secondary">Board 1</Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item active>Board 1</Dropdown.Item>
          <Dropdown.Item>Board 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export { BoardManager };
