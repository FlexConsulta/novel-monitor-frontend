import React from "react";
import { Col, Row } from "react-bootstrap";

// Pages
import MenuComponent from "../shared/menu.options";

export default function DashboardCompnent() {
  return (
    <Row className="h-100 w-100">
      <Col className="col-2 ps-0">
        <MenuComponent />
      </Col>
      <Col className="col-10">
        <h1>Página inicial</h1>
      </Col>
    </Row>
  );
}
