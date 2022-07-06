import React from "react"
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
      {replacePieceChar(numerizeScore(score, props.id - 1))}
    </div>
  );
}

// HELPER Function
const numerizeScore = (score: string, i: number) =>
  i % 2 ? score : `${1 + Math.floor(i / 2)}. ${score}`;

const replacePieceChar = (char: string) => {
  const charList = char.split("");
  charList[char.indexOf("K")] = "\u2654";
  charList[char.indexOf("Q")] = "\u2655";
  charList[char.indexOf("R")] = "\u2656";
  charList[char.indexOf("B")] = "\u2657";
  charList[char.indexOf("N")] = "\u2658";
  return charList.join("");
};

export { Score };
