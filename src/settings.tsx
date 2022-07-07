import React from "react"
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Check from "react-bootstrap/FormCheck";
import Select from "react-bootstrap/FormSelect";
import "../assets/css/settings.css";
import { useRecoilState } from "recoil";
import { popup } from "./store";
import {
  boardColorAtom,
  enabledFeaturesAtom,
  Features,
} from "./store/config.atoms";
import { Theme } from "./globals";

function SettingsPage() {
  const [currentPopup, setPopup] = useRecoilState(popup);
  const [selectedTheme, setTheme] = useRecoilState(boardColorAtom);
  const [checkState, setCheckState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_CHECK)
  );
  const [threatState, setThreatState] = useRecoilState(
    enabledFeaturesAtom(Features.HIGHLIGHT_THREATS_ADVANTAGES)
  );
  const [pieceSymbolState, setPieceSymbolState] = useRecoilState(
    enabledFeaturesAtom(Features.PIECE_SYMBOL)
  );
  const [pieceSound, setPieceSoundState] = useRecoilState(
    enabledFeaturesAtom(Features.PIECE_SOUND)
  );
  return currentPopup == "settings" ? (
    <div className="settings-page">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={4}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <label>General</label>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <label>Highlights</label>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
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
              </Tab.Pane>
              <Tab.Pane eventKey="second">
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
                  <Check
                    id={"23"}
                    type="checkbox"
                    label="Highlight move made"
                  />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <div style={{ flex: 1 }}></div>
      <footer>
        <Button variant="primary">OK</Button>{" "}
        <Button variant="outline-secondary" onClick={(_) => setPopup("")}>
          Cancel
        </Button>
      </footer>
    </div>
  ) : (
    <></>
  );
}

export { SettingsPage };
