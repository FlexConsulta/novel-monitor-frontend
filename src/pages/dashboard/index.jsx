import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import "../dashboard/index.style.css";
import MenuOptionsComponents from "../shared/menu.options";

export default function DashboardCompnent() {
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row className="d-flex flex-row  align-items-center w-100 dashboard__title">
          <Col className={"col-12 col-md-8 w-100 row-atualizar"}>
            <p>ÚLTIMA ATUALIZAÇÃO DO DASHBOARD: 24/10/2022 14:00</p>
            <Badge
              className="badge__dashboard"
              style={{ width: "180px", height: "60px" }}
              bg={"primary"}
              text="white"
            >
              ATUALIZAR
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 dashboard__items">
            <Badge className={"badge__dashboard"} bg={"danger"} text="white">
              <span>10</span>
              BD COM ERRO
            </Badge>
            <Badge className={"badge__dashboard"} bg={"warning"} text="white">
              <span>10</span>
              BD INCONSISTENTE
            </Badge>
            <Badge className={"badge__dashboard"} bg={"success"} text="white">
              <span>10</span>
              BD OK
            </Badge>

            <Badge className={"badge__dashboard"} bg={"secondary"} text="white">
              <span>10</span>
              SERVIDOR
            </Badge>
            <Badge className={"badge__dashboard"} bg={"secondary"} text="white">
              <span>10</span>
              TOTAL BD
            </Badge>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
