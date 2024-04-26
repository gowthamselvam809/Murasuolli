import React, { useState } from "react";
import { Col, Container, Row, Nav } from "react-bootstrap";
import AgentComponent from "../../components/master/agentCreation";
import Magazine from "../../components/master/magazine";
import Bank from "../../components/master/bank";
import Reason from "../../components/master/reason";
import CopyConfirm from "../../components/master/copyConfirm";
import Commission from "../../components/master/commission";
import Operator from "../../components/master/operator";
// import DistrictsComponent from "../../components/master/DistrictsComponent";
// import StatesComponent from "../../components/master/StatesComponent";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("agent");

  const renderComponent = () => {
    switch (activeTab) {
      case "agent": return <AgentComponent />;
      case "magazine": return <Magazine />;
      case "bank": return <Bank />;
      case "reason": return <Reason />;
      case "copyConfirm": return <CopyConfirm />;
      case "commission": return <Commission />;
      case "operator": return <Operator />;
      // case "districts":
      //   return <DistrictsComponent />;
      // case "states":
      //   return <StatesComponent />;
      default: return null;
    }
  };

  const tabNames = [
    {
      label: "Agent Creation",
      key: "agent"
    },
    {
      label: "Districts",
      key: "districts"
    },
    {
      label: "States",
      key: "states"
    },
    {
      label: "Magazine",
      key: "magazine"
    },
    {
      label: "Copy Confirm",
      key: "copyConfirm"
    },
    {
      label: "Commission",
      key: "commission"
    },
    {
      label: "Reason",
      key: "reason"
    },
    {
      label: "Bank",
      key: "bank"
    },
    {
      label: "Operator",
      key: "operator"
    },
    {
      label: "Place",
      key: "place"
    }
  ]

  return (
    <Container className="dashboard_container">
      <Row className="dashboard_container_header">
        <h2 className="dashboard_container_header_text">MASTER MODULE</h2>
      </Row>
      <Row className="dashboard_container_body">
        <Col lg={3} xl={3} className="dashboard_container_body_left">
          <Nav variant="pills" className="flex-column">
            {tabNames.map((tab, i) => (
              <Nav.Item key={i} className="dashboard_container_body_left_label" >
                <Nav.Link active={activeTab === tab.key} className="dashboard_container_body_left_label_link" onClick={() => setActiveTab(tab.key)}>{tab.label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col lg={9} xl={9} className="dashboard_container_body_right">
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

export { DashBoard };
