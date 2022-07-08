import React from "react"
import BootstrapTab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type TabProps = {
  menuItems: string[];
  children: JSX.Element[];
};

export function Tab(props: TabProps) {
  return (
    <BootstrapTab.Container defaultActiveKey="menu-0">
      <Row>
        <Col sm={4}>
          <Nav variant="pills" className="flex-column">
            {props.menuItems.map((tabName, i) => (
              <Nav.Item>
                <Nav.Link eventKey={`menu-${i}`}>
                  <label>{tabName}</label>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={8}>
          <BootstrapTab.Content>
            {props.children.map((page, i) => (
              <BootstrapTab.Pane eventKey={`menu-${i}`}>
                {page}
              </BootstrapTab.Pane>
            ))}
          </BootstrapTab.Content>
        </Col>
      </Row>
    </BootstrapTab.Container>
  );
}
