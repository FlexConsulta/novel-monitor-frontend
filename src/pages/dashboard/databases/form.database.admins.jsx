import React from "react";
import { useState, useEffect } from "react";
import Roles from "../../shared/Roles";
import FormGroup from "../../shared/FormGroup";
import { useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";

import { Form, Card, Col, Badge } from "react-bootstrap";
// import NumberFormat from "react-number-format";
import Api from "../../../utils/axios";
import Frm from "../../../utils/forms.validation";
import { getLoggedUserInfo } from "../../../utils/profile";

export default function FormDatabase(props) {
  const [servers, setServers] = useState([]);
  const [clients, setClients] = useState([]);
  const { database, setDatabase } = props;

  const loadLists = async () => {
    const response_servers = await Api.get("servers");
    const respponse_clients = await Api.get("clients");
    setServers(response_servers?.data.docs);
    setClients(respponse_clients?.data.docs);
  };

  useEffect(() => {
    loadLists();
  }, []);

  return (
    <>
      <Col>
        <Card style={{ height: "auto", overflow: "auto", width: "400px" }}>
          <Card.Header>Banco DLC</Card.Header>
          <Card.Body>
            <Form id={"database"}>
              <Form.Group className="col-12">
                <Form.Label>
                  Servidor<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  required
                  type="text"
                  onFocus={Frm.neutro}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      id_server: e.target.value,
                    }))
                  }
                >
                  <option key={0} value={""}>
                    {"Selecione um servidor..."}
                  </option>
                  {servers &&
                    servers.map((server, idx) => (
                      <option
                        selected={database?.id_server === server.id}
                        key={idx + 1}
                        value={server.id}
                      >
                        {`${server.name} - ${server.port}`}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-12">
                <Form.Label>
                  Cliente<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  required
                  type="text"
                  onFocus={Frm.neutro}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      id_client: e.target.value,
                    }))
                  }
                >
                  <option key={0} value={""}>
                    {"Selecione um cliente..."}
                  </option>
                  {clients &&
                    clients.map((client, idx) => (
                      <option
                        selected={database?.id_client === client.id}
                        key={idx + 1}
                        value={client.id}
                      >
                        {client.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Nome Banco de Dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name_database"
                  onFocus={Frm.neutro}
                  value={database?.name_default}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      name_default: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Usuário Banco de Dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="user_database"
                  onFocus={Frm.neutro}
                  value={database?.user_default}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      user_default: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Senha Banco de Dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password_database"
                  onFocus={Frm.neutro}
                  value={database?.password_default}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      password_default: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="description"
                  onFocus={Frm.neutro}
                  value={database?.description}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      description: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <FormGroup
                action={Roles.Actions.activeUser}
                profile={getLoggedUserInfo().profile}
                className="col-12"
              >
                <Form.Check
                  checked={database?.sincronizacao}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      sincronizacao: !database?.sincronizacao,
                    }))
                  }
                  type="switch"
                  id="sincronizacao-bd"
                  label="Desativar / Ativar sincronização"
                />
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ height: "auto", overflow: "auto", width: "400px" }}>
          <Card.Header>Banco Cliente</Card.Header>
          <Card.Body>
            <Form id={"database_client"}>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Servidor<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="hostname_client"
                  onFocus={Frm.neutro}
                  value={database?.hostname_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      hostname_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>Servidor alternativo</Form.Label>
                <Form.Control
                  type="text"
                  name="alternative_hostname_client"
                  onFocus={Frm.neutro}
                  value={database?.alternative_hostname_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      alternative_hostname_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Nome banco de dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name_client"
                  onFocus={Frm.neutro}
                  value={database?.name_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      name_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Usuário Banco de Dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="user_client"
                  onFocus={Frm.neutro}
                  value={database?.user_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      user_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Senha Banco de Dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password_client"
                  onFocus={Frm.neutro}
                  value={database?.password_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      password_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Porta banco de dados<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="port_client"
                  onFocus={Frm.neutro}
                  value={database?.port_client}
                  onChange={(e) =>
                    setDatabase((state) => ({
                      ...state,
                      port_client: e.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </>
  );
}
