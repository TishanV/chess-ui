import React from "react"
import { Score } from "./score";
import "../../assets/css/scoreboard.css";
import { useRecoilValue } from "recoil";
import { selectedGameIDAtom, stateIDAtom } from "../store/game.atoms";

function ScoreBoard() {
  const selectedGameId = useRecoilValue(selectedGameIDAtom);
  const stateIds = useRecoilValue(stateIDAtom(selectedGameId));
  console.log("Scoreboard render");
  return (
    <div className="score-board">
      {stateIds.slice(1).map((id) => (
        <Score id={id} key={id} />
      ))}
    </div>
  );
}

export { ScoreBoard };
