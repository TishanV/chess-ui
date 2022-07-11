import React from "react"
import Check from "react-bootstrap/FormCheck";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { enabledFeaturesAtom, Features } from "../store/config.atoms";
import { pageStyle } from "./style";

export function HighlightsPage() {
  const [checkState, setCheckState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECK)
  );
  const [threatState, setThreatState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_THREATS_ADVANTAGES)
  );
  const [mateState, setMateState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECKMATE_MOVE)
  );

  return (
    <div style={pageStyle}>
      {[
        ["Highlight king on check", checkState, setCheckState],
        ["Highlight threats and advantages", threatState, setThreatState],
        ["Highlight checkmate move", mateState, setMateState],
      ].map((props, i) =>
        highlightCheckBox(
          i,
          ...(props as [string, boolean, SetterOrUpdater<boolean>])
        )
      )}
    </div>
  );
}

function highlightCheckBox(
  id: number,
  label: string,
  checked: boolean,
  checker: SetterOrUpdater<boolean>
) {
  return (
    <>
      <Check
        id={`highlight-checker-${id}`}
        type="checkbox"
        label={label}
        checked={checked}
        onChange={(e) => checker((v) => !v)}
      />
      <br />
    </>
  );
}
