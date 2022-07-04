import React from "react"
import { scoreColor } from "../globals";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  gameStateAtom,
  GameStateID,
  selectedStateIDAtom,
} from "../store/game.atoms";

interface ScoreProps {
  id: GameStateID;
}

function Score(props: ScoreProps) {
  const score = useRecoilValue(gameStateAtom(props.id)).sanMove;
  const [selectedID, selectID] = useRecoilState(
    selectedStateIDAtom(props.id[0])
  );
  console.log(`Score ${props.id} render`);
  return (
    <div
      className="score"
      style={{ backgroundColor: scoreColor[+(selectedID === props.id[1])] }}
      onClick={(_) => selectID(props.id[1])}
    >
      {numerizeScore(score, props.id[1] - 1)}
    </div>
  );
}

// HELPER Function
const numerizeScore = (score: string, i: number) =>
  i % 2 ? score : `${1 + Math.floor(i / 2)}. ${score}`;

export { Score };
