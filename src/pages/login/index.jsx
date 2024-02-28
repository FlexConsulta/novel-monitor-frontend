import React, { useContext } from "react";
import { useState } from "react";
import { Form, Row, Button, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.style.css";
import Frm from "../../utils/forms.validation";
import SweetAlert from "../../utils/sweetalert";
import { AuthContext } from "../shared/AuthContext";
import LogoDCBrasil from "../../assets/logo.png";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const formsControls = document.querySelectorAll(".form-control");

      const data = {
        email,
        password: senha,
      };

      if (Frm.FormValidation(formsControls)) {
        await signIn(data);

        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      SweetAlert.mixin({ icon: "error", title: error?.response?.data || error });
    }
  }

  return (
    <>
      <Row className="row-login h-100">
        <Col
          className="full-height col-12 col-md-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={LogoDCBrasil}
            alt="Logomarca"
            style={{ width: "150px", height: "auto" }}
          />
          <div className="card-login">
            <div className="form">
              <h2>Login 2</h2>
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

                <Form.Group className="mt-2 mb-2" controlId="password">
                  <Form.Label>
                    Senha<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onFocus={Frm.neutro}
                    data-mformat="password"
                    required
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <div className="footer-form-login mb-2">
                  {/* <Form.Group>
                    <Form.Check
                      checked={checked}
                      onChange={(e) => setChecked(!checked)}
                      type="checkbox"
                      label="Lembrar-me"
                    />
                  </Form.Group> */}

                  <Form.Group>
                    <Link className="link" to="/recuperar-senha">
                      Esqueci a senha
                    </Link>
                  </Form.Group>
                </div>

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
                    "Entrar"}
                </Button>
              </Form>
            </div>
            <div className="w-100">
              <footer className="footer-login mt-5">
                <hr className="line mr-1" />
                <small>© 2022 Todos os direitos reservados</small>
                <hr className="line ml-1" />
              </footer>
            </div>
          </div>
        </Col>
        <Col className="half-login col-12 col-md-6">
          <div
            style={{
              display: "flex",
              flexGrow: "3",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <footer style={{ display: "flex", justifyContent: "end" }}>
            <small className="text-white">Versão 2.0.0</small>
          </footer>
        </Col>
      </Row>
    </>
  );
}
