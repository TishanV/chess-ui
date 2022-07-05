import React from "react";
import { scoreColor } from "../globals";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { StateID } from "../store/game.atoms";
import { scoreSelector, stateSelector } from "../store/game.selector";

interface ScoreProps {
  id: StateID;
}

function Score(props: ScoreProps) {
  const { score, isSelected } = JSON.parse(
    useRecoilValue(scoreSelector(props.id))
  );
  const selectID = useSetRecoilState(stateSelector);
  console.log(`Score ${props.id} render`);
  return (
    <div
      className="score"
      style={{ backgroundColor: scoreColor[+isSelected] }}
      onClick={(_) => selectID(props.id)}
    >
      {numerizeScore(score, props.id - 1)}
    </div>
  );
}

// HELPER Function
const numerizeScore = (score: string, i: number) =>
  i % 2 ? score : `${1 + Math.floor(i / 2)}. ${score}`;

export { Score };
