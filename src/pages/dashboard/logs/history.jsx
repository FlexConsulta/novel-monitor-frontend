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
import { compareDate } from "../../../utils/compareDate";

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
          <Container fluid="md">
            <Row
              style={{
                padding: "0px",
                margin: "0px",
                paddingTop: "30px",
                paddingBottom: "10px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <span>Banco de dados</span>
              <span style={{ fontWeight: "600", fontSize: "24px" }}>
                {logList[0]?.databasis?.name_default}
              </span>
            </Row>
            <Row
              style={{
                padding: "0px",
                margin: "0px",
                paddingTop: "30px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "500px",
                overflowY: "auto",
                paddingLeft: "12px",
              }}
            >
              <table className="table table-hover bordered table-striped">
                <thead>
                  <tr>
                    <th>CT-e Local</th>
                    <th>CT-e Cliente</th>
                    <th>Data Local</th>
                    <th>Data Cliente</th>
                    <th>Erro</th>
                    <th>Data Sync</th>
                  </tr>
                </thead>
                <tbody>
                  {logList?.length > 0 &&
                    logList.map((log) => (
                      <tr key={log.id}>
                        <td
                          style={{
                            width: "100px",
                            minWidth: "100px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log.description)?.travelsLocal ==
                              "Erro"
                                ? "danger"
                                : JSON.parse(log.description)?.travelsLocal !=
                                  JSON.parse(log.description)?.travelsCustomer
                                ? "warning"
                                : "success"
                            }
                            text="white"
                          >
                            {JSON.parse(log.description)?.travelsLocal}
                          </Badge>
                        </td>
                        <td
                          style={{
                            width: "130px",
                            minWidth: "130px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log.description)?.travelsLocal ==
                              "Erro"
                                ? "danger"
                                : JSON.parse(log.description)?.travelsLocal !=
                                  JSON.parse(log.description)?.travelsCustomer
                                ? "warning"
                                : "success"
                            }
                            text="white"
                          >
                            {JSON.parse(log.description)?.travelsCustomer}
                          </Badge>
                        </td>
                        <td
                          style={{
                            width: "125px",
                            minWidth: "125px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log.description)?.currentDateLocal ===
                              "Erro"
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
                        </td>
                        <td
                          style={{
                            width: "120px",
                            minWidth: "120px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log.description)?.currentDateLocal ===
                              "Erro"
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
                        </td>
                        <td
                          style={{
                            width: "100%",
                            minWidth: "120px",
                          }}
                        >
                          {JSON.parse(log.description)?.errorMessageLocal && (
                            <Badge bg={"danger"} text="white">
                              {JSON.parse(log.description)?.errorMessageLocal}
                            </Badge>
                          )}
                          {JSON.parse(log.description)
                            ?.errorMessageCustomer && (
                            <Badge bg={"danger"} text="white">
                              {
                                JSON.parse(log.description)
                                  ?.errorMessageCustomer
                              }
                            </Badge>
                          )}
                        </td>
                        <td
                          style={{
                            width: "120px",
                            minWidth: "120px",
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
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
}
