import React from "react";
import { useState } from "react";
import { Form, Row, Button, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert from "../../utils/sweetalert";
import Frm from "../../utils/forms.validation";
import "./index.style.css";
import "./recovery.password.style.css";
import Api from "../../utils/axios";

export default function RecoveryPasswordComponent() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const formsControls = document.querySelectorAll(".form-control");
      await Api.post('passwordrecovery', { email }).catch(error => {
        throw new Error(error.response.data)
      });

      if (Frm.FormValidation(formsControls)) {
        SweetAlert.small({
          timer: 2000,
          type: "success",
          title: "Recuperação de senha enviada com sucesso",
          cb: () => {
            navigate("/");
          },
        });
      }
    } catch (err) {
      setLoader(false);
      SweetAlert.mixin({ icon: "error", title: err.message });
    }
  }

  return (
    <>
      <Row className="row-login h-100">
        <Col className="full-height col-12 col-sm-6">
          <div className="card-login">
            <div className="form">
              <h2>Recuperar senha</h2>
              <Form
                className="col"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="email">
                  <Form.Label>
                    Email<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    data-mformat="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={Frm.neutro}
                    required
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="back-login mb-2 mt-2">
                  <Link className="link" to="/">
                    Voltar ao login
                  </Link>
                </Form.Group>

                <Button className="w-100" type="submit" disabled={loader}>
                  {(loader && (
                    <>
                      <Spinner
                        animation="grow"
                        role="status"
                        size="sm"
                      ></Spinner>{" "}
                      Aguarde...
                    </>
                  )) ||
                    "Enviar"}
                </Button>
              </Form>
            </div>
            <div className="w-100">
              <footer className="footer-login mt-5">
                <hr className="line mr-1" />
                <small>© {new Date().getFullYear()} Todos os direitos reservados</small>
                <hr className="line ml-1" />
              </footer>
            </div>
          </div>
        </Col>
        <Col className="half-login col-12 col-sm-6">
          <footer>
            <small className="text-white">Versão 3.0.0</small>
          </footer>
        </Col>
      </Row>
    </>
  );
}
