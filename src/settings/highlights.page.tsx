import React from "react"
import Check from "react-bootstrap/FormCheck";
import { useRecoilState } from "recoil";
import { enabledFeaturesAtom, Features } from "../store/config.atoms";

export function HighlightsPage() {
  const [checkState, setCheckState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECK)
  );
  const [threatState, setThreatState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_THREATS_ADVANTAGES)
  );
  return (
    <div className="page">
      <Check
        id={"21"}
        type="checkbox"
        label="Highlight king on check"
        checked={checkState}
        onChange={(e) => setCheckState((v) => !v)}
      />
      <br />
      <Check
        id={"22"}
        type="checkbox"
        label="Highlight Threats and Advantages"
        checked={threatState}
        onChange={(e) => setThreatState((v) => !v)}
      />
      <br />
      <Check id={"23"} type="checkbox" label="Highlight move made" />
    </div>
  );
}
