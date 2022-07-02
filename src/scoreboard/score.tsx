import React from "react"
import { scoreColor } from "../globals";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { score, selectScore } from "../store/scoreboard";

interface ScoreProps {
  id: number;
}

function Score(props: ScoreProps) {
  const _score = useRecoilValue(score(props.id));
  const select = useSetRecoilState(selectScore);
  console.log(`Score ${props.id} render`);
  return (
    <div
      className="score"
      style={{ backgroundColor: scoreColor[+_score.isSelected] }}
      onClick={(_) => select(props.id)}
    >
      {numerizeScore(_score.value, props.id - 1)}
    </div>
  );
}

// HELPER Function
const numerizeScore = (score: string, i: number) =>
  i % 2 ? score : `${1 + Math.floor(i / 2)}. ${score}`;

export { Score };
