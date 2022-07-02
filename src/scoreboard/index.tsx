import React from "react"
import { Score } from "./score";
import "../../assets/css/scoreboard.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pushScore, scoreIDs } from "../store/scoreboard";
import { useEffect } from "react";

function ScoreBoard() {
  const scoreIds = useRecoilValue(scoreIDs);
  console.log("Scoreboard render");
  const setter = useSetRecoilState(pushScore);
  useEffect(() => {
    ["e2", "e5", "Nf5", "Nc7", "g3"].map((s) => setter(s));
    console.log("Effect: Scoreboard");
  }, []);
  return (
    <div className="score-board">
      {scoreIds.map((v) => (
        <Score id={v} key={v} />
      ))}
    </div>
  );
}

export { ScoreBoard };
