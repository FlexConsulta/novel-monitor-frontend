import React, { useContext } from "react";
import { Col, Row, Card, Badge, Container, Alert } from "react-bootstrap";
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

export default function LogsDatabasesHistoryComponent() {
  const { authenticateUser } = useContext(AuthContext);
  const location = useLocation();
  const id_database = location?.state?.id_database;
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataPaged();
  }, []);

  const fetchDataPaged = async () => {
    setLoading(true);

    if (id_database) {
      Api.get(`logs/database?id_database=${id_database}`)
        .then(({ data }) => {
          setLogList(data.docs);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDataPaged();
  }, []);

  return (
    <Row className="h-100 w-100">
      <Col className="col-2 ps-0">
        <MenuOptionsComponents />
      </Col>
      <Col md={10} className="col-10 pt-5 d-flex flex-column   h-100">
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
                { label: "Pagina Incial", rota: "./dashboard" },
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
              color={"#1aa0e6"}
              height={10}
              width={50}
            />
          </Row>
        ) : (
          <Container fluid="md">
            <Row
              className="mt-4 flex-grow-1"
              style={{ maxHeight: "460px", overflowY: "scroll" }}
            >
              {logList?.length > 0 &&
                logList.map((log) => (
                  <Col
                    className="col-4"
                    key={log.id}
                    style={{ minWidth: "420px", minHeight: "160px" }}
                  >
                    <Card className="card-logs" style={{ width: "100%" }}>
                      <Card.Header style={{ paddingBottom: "0px" }}>
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
                        <Row col={3} style={{ paddingBottom: "16px" }}>
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
                                  : dropSeconds(
                                      JSON.parse(log.description)
                                        ?.currentDateLocal
                                    ) !==
                                    dropSeconds(
                                      JSON.parse(log.description)
                                        ?.currentDateCustomer
                                    )
                                  ? "warning"
                                  : "success"
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
                                  ?.currentDateCustomer === "Erro"
                                  ? "danger"
                                  : dropSeconds(
                                      JSON.parse(log.description)
                                        ?.currentDateLocal
                                    ) !==
                                    dropSeconds(
                                      JSON.parse(log.description)
                                        ?.currentDateCustomer
                                    )
                                  ? "warning"
                                  : "success"
                              }
                              text="white"
                            >
                              {dropSeconds(
                                JSON.parse(log.description)?.currentDateCustomer
                              )}
                            </Badge>
                          </Col>
                        </Row>
                        <Row>
                          {JSON.parse(log.description)?.errorMessageLocal && (
                            <Alert variant={"danger"}>
                              {JSON.parse(log.description)?.errorMessageLocal}
                            </Alert>
                          )}
                        </Row>
                        <Row>
                          {JSON.parse(log.description)
                            ?.errorMessageCustomer && (
                            <Alert variant={"danger"}>
                              {
                                JSON.parse(log.description)
                                  ?.errorMessageCustomer
                              }
                            </Alert>
                          )}
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
