import React from "react"
import { Score } from "./score";
import { useRecoilValue } from "recoil";
import { stateList, stateListGetter } from "../store/game.atoms";
import { useRef } from "react";
import { scoreBoardStyle } from "./style";

function ScoreBoard() {
  const stateIds = (useRecoilValue(stateList) as stateListGetter).list;
  const scoreBoardRef = useRef<HTMLDivElement>(null);
  if (scoreBoardRef.current) {
    scoreBoardRef.current.scrollTop = scoreBoardRef.current.scrollHeight;
  }
  console.log("Scoreboard render");
  return (
    <div ref={scoreBoardRef} style={scoreBoardStyle}>
      {stateIds.slice(1).map((id) => (
        <Score id={id} key={id} />
      ))}
    </div>
  );
}

export { ScoreBoard };
