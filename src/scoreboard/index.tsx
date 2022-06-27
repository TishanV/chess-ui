import React from "react"
import { Score } from "./score";

function ScoreBoard() {
  return (
    <div className="score-board">
      Score board
      {[0, 1, 2, 3].map(() => (
        <Score />
      ))}
    </div>
  );
}

export { ScoreBoard };
