import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import "../dashboard/index.style.css"
import MenuOptionsComponents from "../shared/menu.options";

export default function DashboardCompnent() {
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row className="d-flex flex-row  align-items-center w-100">
          <Col className={"col-12 col-md-8 w-100 row-atualizar"}>
            <p>ÚLTIMA ATUALIZAÇÃO DO DASHBOARD: 24/10/2022 14:00</p>
            <Badge
                bg={"primary"}
                text="white"
                className="badge"
              >
                ATUALIZAR
              </Badge>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Badge
              bg={"danger"}
              text="white"
              className="badge"
            >
              <span>10</span> 
              BD COM ERRO

            </Badge>
            <Badge
            bg={"warning"}
            text="white"
            className="badge"
            >
              <span>10</span>
              BD INCONSISTENTE
            </Badge>
            <Badge
            bg={"success"}
            text="white"
            className="badge"
            >
              <span>10</span>
              BD OK
            </Badge>

            <Badge
            bg={"secondary"}
            text="white"
            className="badge"
            >
              <span>10</span>
              SERVIDOR
            </Badge>
            <Badge
            bg={"secondary"}
            text="white"
            className="badge"
            >
              <span>10</span>
              TOTAL BD
            </Badge>
          </Col>
        </Row>
      </Col>
      
    </Row>
  );
}
