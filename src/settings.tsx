import React from "react"
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Check from "react-bootstrap/FormCheck";
import Select from "react-bootstrap/FormSelect";
import "../assets/css/settings.css";

function SettingsPage() {
  return (
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
                  <Select size="sm">
                    <option value="1">Violet</option>
                    <option value="2">Green</option>
                    <option value="3">Traditional</option>
                  </Select>
                  <br />
                  <label>Score Piece:</label>
                  <Check id={"1"} name="piece" type="radio" label="Text" />
                  <Check id={"2"} name="piece" type="radio" label="Symbol" />
                  <br />
                  <Check id={"3"} type="checkbox" label="Disable sounds" />
                  <Check id={"4"} type="checkbox" label="Disable animations" />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="page">
                  <Check
                    id={"21"}
                    type="checkbox"
                    label="Highlight king on check"
                  />
                  <br />
                  <Check
                    id={"21"}
                    type="checkbox"
                    label="Highlight available moves"
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
        <Button variant="outline-secondary">Cancel</Button>
      </footer>
    </div>
  );
}

export { SettingsPage };
