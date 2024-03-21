import React from "react";
import {
  Col,
  Row,
  Card,
  Badge,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/axios";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import { useEffect, useState } from "react";
import { IconSearch } from "../../../assets/Icons";
import ReactLoading from "react-loading";
import { dropSeconds } from "../../../utils/dateTimeFormat";
import { useNavigate } from "react-router-dom";
import { compareDate } from "../../../utils/compareDate";
import { getLoggedUserInfo } from "../../../utils/profile";
import Roles from "../../shared/Roles";
import PaginationComponent from "../../../components/pagination/pagination";

export default function TableFiltered(props) {
  const [logList, setLogList] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      await Api.get(`resume`).then(({ data }) => {
        setLogList(filterData(data?.logs));
        setDatabases(data?.databases?.docs);
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function filterData(data) {
    if (props?.typeFilter?.toString() === "Error") {
      return data.filter((log) => log?.status_connection == 500);
    }

    if (props?.typeFilter?.toString() === "Success") {
      return data.filter(
        (log) =>
          log?.status_connection == 200 &&
          Number(JSON.parse(log.description)?.travelsLocal) ===
            Number(JSON.parse(log.description)?.travelsCustomer)
      );
    }

    if (props?.typeFilter?.toString() === "Warning") {
      return data.filter(
        (log) =>
          log?.status_connection == 200 &&
          Number(JSON.parse(log.description)?.travelsLocal) !==
            Number(JSON.parse(log.description)?.travelsCustomer)
      );
    }
  }
  useEffect(() => {
    fetchData();
  }, [props.typeFilter]);

  const handleLogDetail = (log) => {
    navigate("/logs-history", {
      state: { id_database: log.id_database },
    });
  };

  const getDBname = (id_database) => {
    const db = databases.find(({ id }) => id === id_database);
    // console.log("getdbname", id_database, db)
    return db?.name_default;
  };

  return (
    <Row className="h-100 w-100">
      <Col className="table-container" style={{ minHeight: "620px" }}>
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
              height={20}
              width={80}
            />
          </Row>
        ) : (
          <Container
            fluid="md"
            style={{
              margin: "30px 0px 0px",
              padding: "0px",
            }}
          >
            <Row
              style={{
                padding: "0px",
                margin: "auto",
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                maxHeight: "500px",
                overflowY: "auto",
                paddingLeft: "12px",
              }}
            >
              <table className="table table-hover bordered table-striped">
                <thead>
                  <tr style={{ fontSize: "16px" }}>
                    <th>
                      <span>Nome BD</span>
                    </th>
                    <th>
                      <span>CT-e Local</span>
                    </th>
                    <th>
                      <span>CT-e Cliente</span>
                    </th>
                    <th>
                      <span>Data Local</span>
                    </th>
                    <th>
                      <span>Data Cliente</span>
                    </th>
                    <th>
                      <span>Últ. Nota</span>
                    </th>
                    <th>
                      <span>Últ. CT-e</span>
                    </th>
                    <th>
                      <span>Data Sync</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logList?.length > 0 &&
                    logList.map((log) => (
                      <tr
                        key={log.id}
                        onClick={() => handleLogDetail(log)}
                        style={{
                          maxHeight: "16px",
                          height: "16px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        <td
                          style={{
                            width: "100px",
                            maxHeight: "16px",
                            minWidth: "100px",
                          }}
                        >
                          {log?.name_default || getDBname(log.id_database)}
                        </td>
                        <td
                          style={{
                            maxHeight: "16px",
                            minWidth: "70px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log?.description)?.travelsCustomer ==
                                "Erro" ||
                              JSON.parse(log?.description)?.travelsLocal ==
                                "Erro"
                                ? "danger"
                                : JSON.parse(log.description)?.travelsLocal !=
                                  JSON.parse(log.description)?.travelsCustomer
                                ? "warning"
                                : "success"
                            }
                            text="white"
                          >
                            {JSON.parse(log?.description)?.travelsLocal}
                          </Badge>
                        </td>
                        <td
                          style={{
                            maxHeight: "16px",
                            minWidth: "70px",
                          }}
                        >
                          <Badge
                            bg={
                              JSON.parse(log.description)?.travelsLocal ==
                                "Erro" ||
                              JSON.parse(log.description)?.travelsCustomer ==
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
                                "Erro" ||
                              JSON.parse(log.description)
                                ?.currentDateCustomer === "Erro"
                                ? "danger"
                                : JSON.parse(log.description)?.travelsLocal ==
                                  JSON.parse(log.description)?.travelsCustomer
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
                                "Erro" ||
                              JSON.parse(log.description)
                                ?.currentDateCustomer === "Erro"
                                ? "danger"
                                : JSON.parse(log.description)?.travelsLocal ==
                                  JSON.parse(log.description)?.travelsCustomer
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
                            maxHeight: "16px",
                            width: "120px",
                            minWidth: "120px",
                          }}
                        >
                          {JSON.parse(log.description)?.max_invoice_today}
                        </td>
                        <td
                          style={{
                            maxHeight: "16px",
                            minWidth: "90px",
                          }}
                        >
                          {JSON.parse(log.description)?.max_cte_today}
                        </td>
                        <td
                          style={{
                            maxHeight: "16px",
                            minWidth: "90px",
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
