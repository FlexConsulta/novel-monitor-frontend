import React from "react";
import { useEffect } from "react";
import { Form, Card, Col } from "react-bootstrap";
import Frm from "../../../utils/forms.validation";
import "./form.server.style.css";

export default function FormServer(props) {
  const { server, setServer } = props;

  return (
    <>
      <Col>
        <Card style={{ overflow: "auto" }}>
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form.Group className="col-12 mt-2">
              <Form.Label>
                Nome Servidor<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onFocus={Frm.neutro}
                value={server?.name}
                onChange={(e) =>
                  setServer((state) => ({ ...state, name: e.target.value }))
                }
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-12 mt-2">
              <Form.Label>
                URL Servidor<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="url"
                onFocus={Frm.neutro}
                value={server?.url}
                onChange={(e) =>
                  setServer((state) => ({ ...state, url: e.target.value }))
                }
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-12 mt-2">
              <Form.Label>
                Porta<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="porta"
                onFocus={Frm.neutro}
                value={server?.port}
                onChange={(e) =>
                  setServer((state) => ({ ...state, port: e.target.value }))
                }
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-12">
              <Form.Check
                checked={server?.ativo}
                onChange={(e) =>
                  setServer((state) => ({ ...state, ativo: !server?.ativo }))
                }
                type="switch"
                id="userAtivo"
                label="Desativar / Ativar server"
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
