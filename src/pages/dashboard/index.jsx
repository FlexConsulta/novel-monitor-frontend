import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import "../dashboard/index.style.css";
import MenuOptionsComponents from "../shared/menu.options";
import { Chart } from "react-google-charts";

export default function DashboardCompnent() {

  const data = [
    ["description", "total"],
    ["BD COM ERRO", 10],
    ["BD INCONSISTENTE", 3],
    ["BD OK", 70]
  ];

  const options = {
    slices: {0: {color: '#DC3545'}, 1: {color: '#FFC107'}, 2:{color:'#198754'}},
    legend: {position: 'none'}
  };
    
  
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
              <span>3</span>
              BD INCONSISTENTE
            </Badge>
            <Badge className={"badge__dashboard"} bg={"success"} text="white">
              <span>70</span>
              BD OK
            </Badge>

            <Badge className={"badge__dashboard"} bg={"secondary"} text="white">
              <span>5</span>
              SERVIDOR
            </Badge>
            <Badge className={"badge__dashboard"} bg={"secondary"} text="white">
              <span>100</span>
              TOTAL BD
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width="100%"
              height="400px"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
