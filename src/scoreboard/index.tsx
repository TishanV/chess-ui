import React from "react"
import { Score } from "./score";
import "../../assets/css/scoreboard.css";
import { useRecoilValue } from "recoil";
import { selectedGameIDAtom, stateIDAtom } from "../store/game.atoms";
import { useRef } from "react";

function ScoreBoard() {
  const selectedGameId = useRecoilValue(selectedGameIDAtom);
  const stateIds = useRecoilValue(stateIDAtom(selectedGameId));
  const scoreBoardRef = useRef<HTMLDivElement>(null);
  if (scoreBoardRef.current) {
    scoreBoardRef.current.scrollTop = scoreBoardRef.current.scrollHeight;
  }
  console.log("Scoreboard render");
  return (
    <div ref={scoreBoardRef} className="score-board">
      {stateIds.slice(1).map((id) => (
        <Score id={id} key={id} />
      ))}
    </div>
  );
}

export { ScoreBoard };
