import React from "react";
import { Col, Row } from "react-bootstrap";

import MenuOptionsComponents from "../shared/menu.options";

export default function DashboardCompnent() {
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <h1>Página inicial</h1>
      </Col>
    </Row>
  );
}
