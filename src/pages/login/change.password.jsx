import React, { useEffect } from "react";
import { useState } from "react";
import {
  Form,
  Row,
  Button,
  Col,
  Spinner,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert from "../../utils/sweetalert";
import Frm from "../../utils/forms.validation";
import "./index.style.css";
import "./recovery.password.style.css";
import "./change.password.style.css";

export default function ChangePasswordComponent() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [repetirNovaSenha, setRepetirNovaSenha] = useState("");
  const [helpPassword, setHelpPassword] = useState(false);

  useEffect(() => {
    if (helpPassword) {
      document.getElementById("banner-password").style.display = "block";
    } else {
      document.getElementById("banner-password").style.display = "none";
    }
  }, [helpPassword]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const formsControls = document.querySelectorAll(".form-control");
      //Adicionar requisição de autenticacao (login)
      if (Frm.FormValidation(formsControls)) {
        if (!Frm.isMatch(novaSenha, repetirNovaSenha)) {
          const repetirSenhaInput = [...formsControls].filter(
            (e) => e.name === "repetirsenha"
          )[0];
          repetirSenhaInput.classList.add("is-invalid");
          repetirSenhaInput.nextSibling.innerHTML =
            "A senha repetida não corresponde à nova senha!";

          throw new Error("A senha repetida não corresponde à nova senha!");
        }
        if (!Frm.passwordStrength(novaSenha)) {
          setHelpPassword(true);
          throw new Error("Senha inválida!");
        }
        //Enviar objeto para validação
       /* let data = {
          email: email,
          novaSenha: novaSenha,
          repetirNovaSenha: repetirNovaSenha,
        };*/
        SweetAlert.small({
          timer: 2000,
          type: "success",
          title: "Cadastrado com sucesso",
          cb: () => {
            navigate("/");
          },
        });
      }
    } catch (err) {
      setLoader(false);
      SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
    }
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Criação da senha</Popover.Header>
      <Popover.Body>
        Clica aqui para ver as regras da criação da nova senha...
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Row className="row-login h-100 ">
        <Col className="full-height col-12 col-md-6">
          <div className="card-login">
            <div className="form">
              <div style={{ display: "flex" }}>
                <h2>Criar senha</h2>
                <OverlayTrigger
                  trigger="hover"
                  placement="right"
                  overlay={popover}
                >
                  <i
                    onClick={() => setHelpPassword(!helpPassword)}
                    className={"fa fa-info-circle"}
                  ></i>
                </OverlayTrigger>
              </div>
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

                <Form.Group className="mb-2 mt-2" controlId="repetepassword">
                  <Form.Label>
                    Nova senha<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="novasenha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    onFocus={Frm.neutro}
                    data-mformat="password"
                    required
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2" controlId="password">
                  <Form.Label>
                    Repetir nova senha<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="repetirsenha"
                    value={repetirNovaSenha}
                    onChange={(e) => setRepetirNovaSenha(e.target.value)}
                    onFocus={Frm.neutro}
                    data-mformat="password"
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
                    "Confirmar"}
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
            <div className="banner-password" id="banner-password">
              <h5>Regras de criação da senha!</h5>
              <ul className="help-password">
                <li>Ter no mínimo 8 caracteres</li>
                <li>Ter no mínimo 1 letras maiúsculas</li>
                <li>Ter no mínimo 1 letra minúscula</li>
                <li>Tem no mínimo 1 número</li>
                <li>Ter no mínimo 1 símbolos</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col className="half-login col-12 col-md-6">
          <footer>
            <small className="text-white">Versão 1.0.0</small>
          </footer>
        </Col>
      </Row>
    </>
  );
}
