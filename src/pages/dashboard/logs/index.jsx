import React, { useContext } from "react";
import { Col, Row, Table, Card, Button, Badge } from "react-bootstrap";
import "./index.style.css";
import { IconDataBase, IconUsers } from "../../../assets/Icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Api from "../../../utils/axios";
import { AuthContext } from "../../shared/AuthContext";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import { useEffect } from "react";
import { useState } from "react";

export default function LogsDatabasesComponent() {
  const { authenticateUser } = useContext(AuthContext);
  const { client_id } = authenticateUser;
  const location = useLocation();
  const server_id = location?.state?.server_id;
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    console.log(logList);
  }, [logList]);

  useEffect(() => {
    console.log(client_id);
    setLoading(true);
    if (client_id) {
      Api.get(`logs/customer?customerid=${client_id}`)
        .then(({ data }) => {
          setLogList(data.docs);
        })
        .catch((error) => {
          alert("error");
        });
    }
    if (server_id) {
      Api.get(`logs/customer?serverid=${server_id}`)
        .then(({ data }) => {
          setLogList(data.docs);
        })
        .catch((error) => {
          alert("error");
        });
    }

    setLoading(false);
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
                { label: "lista de Clientes", rota: "/empresas" },
                { label: "Cliente", rota: "/logs-conexoes" },
              ]}
            />
          </Col>
        </Row>
        <Row className="mt-4 flex-grow-1">
          {logList?.length > 0 &&
            logList.map((log) => (
              <Col className="col-3" key={log.id} style={{ minWidth: "330px" }}>
                <Card className="card-logs">
                  <Card.Header style={{ paddingBottom: "0px" }}>
                    <Row>
                      <Col>{log?.databasis?.name_default}</Col>
                      <Col>
                        <Badge
                          bg={
                            log?.status_connection == 200 ? "success" : "danger"
                          }
                          text="white"
                        >
                          {new Date(log?.created_at).toLocaleString()}
                        </Badge>
                      </Col>
                    </Row>
                    <Row style={{ paddingTop: "10px" }}>
                      <Col></Col>
                      <Col>Local</Col>
                      <Col>Cliente </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body className="pb-1 px-1">
                    <Row>
                      <Col>Viagens:</Col>
                      <Col>
                        <Badge
                          bg={
                            JSON.parse(log.description)?.travelsLocal == "Erro"
                              ? "danger"
                              : "success"
                          }
                          text="white"
                        >
                          {JSON.parse(log.description)?.travelsLocal}
                        </Badge>
                      </Col>
                      <Col>
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
                    <Row>
                      <Col>Notas:</Col>
                      <Col>
                        <Badge
                          bg={
                            JSON.parse(log.description)?.incoicesLocal ||
                            0 == "Erro"
                              ? "danger"
                              : "success"
                          }
                          text="white"
                        >
                          {JSON.parse(log.description)?.incoicesLocal || 0}
                        </Badge>
                      </Col>
                      <Col>
                        <Badge
                          bg={
                            JSON.parse(log.description)?.invoicesCustomer ||
                            0 == "Erro"
                              ? "danger"
                              : "success"
                          }
                          text="white"
                        >
                          {JSON.parse(log.description)?.invoicesCustomer || 0}
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
}
