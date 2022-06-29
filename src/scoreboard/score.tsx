import React from "react"
import { scoreColor } from "../globals";
import { MouseEvent } from "react";

interface ScoreProps {
  value: string;
  selected: boolean;
  onClick: (e: MouseEvent | undefined) => void;
}

function Score(props: ScoreProps) {
  return (
    <div
      className="score"
      style={{ backgroundColor: scoreColor[+props.selected] }}
      onClick={(e) => props.onClick(e)}
    >
      {props.value}
    </div>
  );
}

export { Score };
