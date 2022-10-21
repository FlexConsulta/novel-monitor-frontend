import React, { useContext } from "react";
import { Col, Row, Card, Badge, Container } from "react-bootstrap";
import "./index.style.css";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/axios";
import { AuthContext } from "../../shared/AuthContext";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from "react-loading";
import { dropSeconds } from "../../../utils/dateTimeFormat";
import { useNavigate } from "react-router-dom";
import { compareDate } from "../../../utils/compareDate";

export default function LogsDatabasesComponent() {
  const { authenticateUser } = useContext(AuthContext);
  const { client_id } = authenticateUser;
  const location = useLocation();
  const server_id = location?.state?.server_id;
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataPaged();
  }, []);

  const fetchDataPaged = async () => {
    setLoading(true);

    if (server_id) {
      Api.get(`logs/server?id_server=${server_id}`)
        .then(({ data }) => {
          setLogList(data);
          console.log(JSON.parse(data[1].description));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (client_id) {
        Api.get(`logs/customer?id_customer=${client_id}`)
          .then(({ data }) => {
            setLogList(data);
            console.log("->", data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDataPaged();
  }, []);

  const handleLogDetail = (log) => {
    navigate("/logs-history", {
      state: { id_database: log.id_database },
    });
  };

  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row className="d-flex flex-row  align-items-center ">
          <Col className={"col-12 col-md-8"}>
            <div className="title-empresa mb-2 mb-md-0">
              <h1>Log</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Breadcrump
              way={[
                { label: "Pagina Inicial", rota: "./dashboard" },
                { label: "Configuracoes", rota: "/configuracoes" },
                { label: "Log", rota: "/logs-conexoes" },
              ]}
            />
          </Col>
        </Row>
        {loading ? (
          <Row
            style={{
              minHeight: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type={"bars"}
              color={"#085ED6"}
              height={10}
              width={50}
            />
          </Row>
        ) : (
          <Container
            fluid="md"
            style={{
              margin: "0px",
              padding: "0px",
            }}
          >
            <Row
              className="mt-4 flex-grow-2"
              style={{
                maxHeight: "550px",
                overflowY: "auto",
                margin: "0px",
                padding: "0px",
              }}
            >
              {logList?.length > 0 &&
                logList.map((log) => (
                  <Col
                    className="col-4"
                    key={log.id}
                    style={{ minWidth: "420px", minHeight: "160px" }}
                  >
                    <Card className="card-logs" style={{ width: "100%" }}>
                      <Card.Header
                        style={{ paddingBottom: "0px", cursor: "pointer" }}
                        onClick={() => handleLogDetail(log)}
                      >
                        <Row>
                          <Col
                            className="col-6"
                            style={{ justifyContent: "flex-start" }}
                          >
                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "700",
                                justifyContent: "flex-start",
                              }}
                            >
                              {log?.databasis?.name_default}
                            </span>
                          </Col>
                          <Col
                            className="col-6"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Badge
                              bg={
                                log?.status_connection == 200
                                  ? "success"
                                  : "danger"
                              }
                              text="white"
                            >
                              {dropSeconds(
                                new Date(log?.created_at).toLocaleString()
                              )}
                            </Badge>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "10px" }}>
                          <Col
                            col={4}
                            style={{
                              maxWidth: "90px",
                            }}
                          ></Col>
                          <Col col={4}>Local</Col>
                          <Col col={4}>Cliente </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body className="pb-1 px-1">
                        <Row>
                          <Col col={4} style={{ maxWidth: "100px" }}>
                            Viagens:
                          </Col>
                          <Col
                            col={4}
                            style={{
                              display: "flex",
                              justifyContent: "flex-s",
                              alignItems: "center",
                            }}
                          >
                            <Badge
                              bg={
                                JSON.parse(log.description)?.travelsLocal ==
                                "Erro"
                                  ? "danger"
                                  : "success"
                              }
                              text="white"
                            >
                              {JSON.parse(log.description)?.travelsLocal}
                            </Badge>
                          </Col>
                          <Col col={4}>
                            <Badge
                              bg={
                                JSON.parse(log.description)?.travelsCustomer ==
                                "Erro"
                                  ? "danger"
                                  : "success"
                              }
                              text="white"
                            >
                              {JSON.parse(log.description)?.travelsCustomer}
                            </Badge>
                          </Col>
                        </Row>
                        <Row col={3}>
                          <Col
                            col={4}
                            style={{
                              maxWidth: "100px",
                              paddingRight: "0px",
                            }}
                          >
                            Data Hora:
                          </Col>
                          <Col col={4}>
                            <Badge
                              bg={
                                JSON.parse(log.description)
                                  ?.currentDateLocal === "Erro"
                                  ? "danger"
                                  : compareDate(
                                      JSON.parse(log.description)
                                        ?.currentDateLocal,
                                      JSON.parse(log.description)
                                        ?.currentDateCustomer
                                    )
                                  ? "success"
                                  : "warning"
                              }
                              text="white"
                            >
                              {dropSeconds(
                                JSON.parse(log.description)?.currentDateLocal
                              )}
                            </Badge>
                          </Col>
                          <Col col={4}>
                            <Badge
                              bg={
                                JSON.parse(log.description)
                                  ?.currentDateLocal === "Erro"
                                  ? "danger"
                                  : compareDate(
                                      JSON.parse(log.description)
                                        ?.currentDateLocal,
                                      JSON.parse(log.description)
                                        ?.currentDateCustomer
                                    )
                                  ? "success"
                                  : "warning"
                              }
                              text="white"
                            >
                              {dropSeconds(
                                JSON.parse(log.description)?.currentDateCustomer
                              )}
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
}
