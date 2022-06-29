import React from "react"
import { Score } from "./score";
import "../../assets/css/scoreboard.css";
import { useState } from "react";

// HELPER Function
const numerizeScore = (scoreList: string[]) =>
  scoreList.map((score, i) =>
    i % 2 ? score : `${1 + Math.floor(i / 2)}. ${score}`
  );

const testScores = numerizeScore([
  "e4",
  "e5",
  "e6",
  "Nf5",
  "e7",
  "e4",
  "e5",
  "e6",
  "Nf5",
  "e7",
  "e4",
  "e5",
  "e6",
  "Nf5",
  "e7",
]);

function ScoreBoard() {
  const [selectedIndex, setIndex] = useState(testScores.length - 1);
  return (
    <div className="score-board">
      {testScores.map((v, i) => (
        <Score
          key={i}
          value={v}
          selected={i == selectedIndex}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  );
}

export { ScoreBoard };
