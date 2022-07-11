import React from "react"
import { unselectedScoreColor, Theme } from "../globals";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { StateID, stateList, stateListOperations } from "../store/game.atoms";
import { scoreSelector } from "../store/game.selector";
import {
  boardColorAtom,
  enabledFeaturesAtom,
  Features,
} from "../store/config.atoms";
import { scoreStyle } from "./style";

interface ScoreProps {
  id: StateID;
}

function Score(props: ScoreProps) {
  const { score, isSelected } = JSON.parse(
    useRecoilValue(scoreSelector(props.id))
  );
  const setStateList = useSetRecoilState(stateList);

  const pieceSymbolEnabled = useRecoilValue(
    enabledFeaturesAtom(Features.PIECE_SYMBOL)
  );

  const selectedColor: string = Theme[useRecoilValue(boardColorAtom)][1];

  const selectID = (id: number) =>
    setStateList({ operation: stateListOperations.SELECT, payload: id });
  const numberScore = numerizeScore(score, props.id - 1);
  console.log(`Score ${props.id} render`);
  return (
    <div
      style={{
        ...scoreStyle,
        backgroundColor: isSelected ? selectedColor : unselectedScoreColor,
      }}
      onClick={(_) => selectID(props.id)}
    >
      {pieceSymbolEnabled ? replacePieceChar(numberScore) : numberScore}
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
