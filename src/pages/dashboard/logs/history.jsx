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
import PaginationComponent from "../../../components/pagination/pagination";

export default function LogsDatabasesHistoryComponent() {
  const location = useLocation();
  const id_database = location?.state?.id_database;
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    fetchDataPaged();
  }, []);

  const fetchDataPaged = async () => {
    setLoading(true);

    if (id_database) {
      Api.get(`logs/database`, {
        params: { page, paginate: 10, id_database },
      })
        .then(({ data }) => {
          setLogList(data?.docs);
          setLoading(false);
          setTotalPages(data?.pages > 22 ? 22 : data.pages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchDataPaged();
  }, [page]);

  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0 col-9">
        <Row className="d-flex flex-row  align-items-center ">
          <Col className={"col-8"}>
            <div className="title-empresa mb-2 mb-md-0">
              <h1 style={{fontSize:"28px"}}>Log</h1>
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
          <Col
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
              height={20}
              width={80}
            />
          </Col>
        ) : (
          <Container fluid="md">
            <Row
              style={{
                padding: "0px",
                margin: "0px",
                paddingTop: "10px",
                paddingBottom: "0px",
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
                paddingTop: "0px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxHeight: "500px",
                overflowY: "auto",
                paddingLeft: "12px",
              }}
            >
              <table className="table table-hover bordered" style={{marginBottom:"12px"}}>
                <thead>
                  <tr style={{fontSize:"16px"}}>
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
                      <tr
                        key={log.id}
                        style={{
                          maxHeight: "16px",
                          height: "16px",
                          fontSize:"14px", 
                          cursor:"pointer"
                        }}
                      >
                        <td
                          style={{
                            width: "100px",
                            maxHeight: "16px",
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
                            maxHeight: "16px",
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
                            maxHeight: "16px",
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
                            maxHeight: "16px",
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
                            maxHeight: "16px",
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
                            maxHeight: "16px",
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
            <Row>
              <Col className="col-12 mt-2">
                <PaginationComponent
                  page={page}
                  totalPages={totalPages}
                  togglePage={setPage}
                />
              </Col>
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
}
