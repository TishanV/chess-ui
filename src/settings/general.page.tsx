import React from "react"
import Check from "react-bootstrap/FormCheck";
import Select from "react-bootstrap/FormSelect";
import { useRecoilState } from "recoil";
import {
  boardColorAtom,
  enabledFeaturesAtom,
  Features,
} from "../store/config.atoms";
import { Theme } from "../globals";

export function GeneralPage() {
  const [selectedTheme, setTheme] = useRecoilState(boardColorAtom);
  const [pieceSymbolState, setPieceSymbolState] = useRecoilState(
    enabledFeaturesAtom(Features.PIECE_SYMBOL)
  );
  const [pieceSound, setPieceSoundState] = useRecoilState(
    enabledFeaturesAtom(Features.PIECE_SOUND)
  );
  return (
    <div className="page">
      <label>Theme:</label>
      <Select
        size="sm"
        onChange={(e) => setTheme(e.target.value)}
        defaultValue={selectedTheme}
      >
        {Object.keys(Theme).map((theme) => (
          <option value={theme}>{theme}</option>
        ))}
      </Select>
      <br />
      <label>Score Piece:</label>
      <Check
        id={"1"}
        name="piece"
        type="radio"
        label="Text"
        checked={!pieceSymbolState}
        onChange={(_) => setPieceSymbolState(false)}
      />
      <Check
        id={"2"}
        name="piece"
        type="radio"
        label="Symbol"
        checked={pieceSymbolState}
        onChange={(_) => setPieceSymbolState(true)}
      />
      <br />
      <Check
        id={"3"}
        type="checkbox"
        label="Disable sounds"
        checked={!pieceSound}
        onChange={(_) => setPieceSoundState((v) => !v)}
      />
      <Check id={"4"} type="checkbox" label="Disable animations" />
    </div>
  );
}
