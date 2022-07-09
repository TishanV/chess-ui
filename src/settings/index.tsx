import React from "react"
import { useRecoilState } from "recoil";
import { popup } from "../store";
import { Tab } from "../components/tab";
import { GeneralPage } from "../settings/general.page";
import { HighlightsPage } from "../settings/highlights.page";
import { Button } from "../components/buttons";
import { footerStyle, settingsStyle } from "./style";

function Settings() {
  const [currentPopup, setPopup] = useRecoilState(popup);

  return currentPopup == "settings" ? (
    <div style={settingsStyle}>
      <Tab menuItems={["General", "Highlights"]}>
        <GeneralPage />
        <HighlightsPage />
      </Tab>
      <div style={{ flex: 1 }}></div>
      <footer style={footerStyle}>
        <Button.SECONDARY value="Close" onClick={(_) => setPopup("")} />
      </footer>
    </div>
  ) : (
    <></>
  );
}

export { Settings };
