import React from "react"
import "../../assets/css/settings.css";
import { useRecoilState } from "recoil";
import { popup } from "../store";
import { Tab } from "../components/tab";
import { GeneralPage } from "../settings/general.page";
import { HighlightsPage } from "../settings/highlights.page";
import { Button } from "../components/buttons";

function Settings() {
  const [currentPopup, setPopup] = useRecoilState(popup);

  return currentPopup == "settings" ? (
    <div className="settings-page">
      <Tab menuItems={["General", "Highlights"]}>
        <GeneralPage />
        <HighlightsPage />
      </Tab>
      <div style={{ flex: 1 }}></div>
      <footer>
        <Button.SECONDARY value="Close" onClick={(_) => setPopup("")} />
      </footer>
    </div>
  ) : (
    <></>
  );
}

export { Settings };
