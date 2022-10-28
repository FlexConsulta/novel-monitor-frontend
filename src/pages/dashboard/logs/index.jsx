import React from "react";
import { Col, Row, Card, Badge, Container, Form, Button } from "react-bootstrap";
import "./index.style.css";
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

export default function LogsDatabasesComponent() {
  const { client_id } = getLoggedUserInfo();

  const location = useLocation();
  const server_id = location?.state?.server_id;
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataPaged();
  }, []);

  const fetchDataPaged = async () => {
    setLoading(true);

    if (getLoggedUserInfo().profile === Roles.Profiles.administracao) {
      Api.get(`logs`)
        .then(({ data }) => {
          setLogList(data);
          setLoading(false);
          setTotalPages(data?.pages > 22 ? 22 : data.pages);
        })
        .catch((error) => {
          console.log("error", error);
        });

      return;
    }
    if (server_id) {
      Api.get(`logs/server?id_server=${server_id}`)
        .then(({ data }) => {
          setLogList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }

    if (client_id) {
      Api.get(`logs/customer?id_customer=${client_id}`)
        .then(({ data }) => {
          setLogList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }
  };

  useEffect(() => {
    fetchDataPaged();
  }, [page]);

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
              height={20}
              width={80}
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
              style={{
                padding: "0px",
                margin: "0px",
                paddingTop: "30px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxHeight: "500px",
                overflowY: "auto",
                paddingLeft: "12px",
              }}
            >
              <table className="table table-hover bordered table-striped">
                <thead>
                  <tr>
                    <th>{showSearch ? (
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width:"70px" }}
                        placeholder="Nome"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter(
                              (item) => item.prop !== "namedefault"
                            ),
                            {
                              prop: "namedefault",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Nome BD</span>
                    )}</th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="text"
                        style={{ height: "40px"}}
                        placeholder="CT-e Local"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "travelsLocal"),
                            {
                              prop: "travelsLocal",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>CT-e Local</span>
                    )}</th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width:"115px" }}
                        placeholder="CT-e Cliente"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "travelsCustomer"),
                            {
                              prop: "travelsCustomer",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>CT-e Cliente</span>
                    )}</th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="date"
                        style={{ height: "40px", width:"125px" }}
                        placeholder="Data Local"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "currentDateLocal"),
                            {
                              prop: "currentDateLocal",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Data Local</span>
                    )}
                    </th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="date"
                        style={{ height: "40px", width:"125px" }}
                        placeholder="Data Cliente"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "currentDateCustomer"),
                            {
                              prop: "currentDateCustomer",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Data Cliente</span>
                    )}
                    </th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width:"88px" }}
                        placeholder="Últ. Nota"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "ultNota"),
                            {
                              prop: "ultNota",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Últ. Nota</span>
                    )}
                    </th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width:"88px" }}
                        placeholder="Últ. CT-e"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "ultCte"),
                            {
                              prop: "ultCte",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Últ. CT-e</span>
                    )}
                    </th>
                    <th>{showSearch ? (
                      <Form.Control
                        type="date"
                        style={{ height: "40px", width:"125px" }}
                        placeholder="Data Sync"
                        onChange={(e) =>
                          setSearch((state) => [
                            ...state.filter((item) => item.prop !== "created_at"),
                            {
                              prop: "created_at",
                              value: e.target.value,
                            },
                          ])
                        }
                      />
                    ) : (
                      <span>Data Sync</span>
                    )}
                    </th>
                    <th
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "5px",
                      }}
                    >
                      <Button onClick={() => setShowSearch(!showSearch)}>
                        {IconSearch()}
                      </Button>
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
                        }}
                      >
                        <td style={{
                          width: "100px",
                          maxHeight: "16px",
                          minWidth: "100px",
                        }}>
                          {log?.databasis?.name_default}
                        </td>
                        <td
                          style={{
                            width: "100px",
                            maxHeight: "16px",
                            minWidth: "100px",
                          }}
                        >
                          <Badge
                            bg={
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
                            maxHeight: "16px",
                            width: "120px",
                            minWidth: "120px",
                          }}
                        >
                          {log?.ultNota}
                        </td>
                        <td
                          style={{
                            maxHeight: "16px",
                            width: "120px",
                            minWidth: "120px",
                          }}
                        >
                          {log?.ultCte}
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
                        <td
                          style={{
                            maxHeight: "16px",
                            width: "120px",
                            minWidth: "120px",
                          }}
                        >
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
