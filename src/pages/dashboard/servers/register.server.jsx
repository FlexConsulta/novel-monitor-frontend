import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import Frm from "../../../utils/forms.validation";
import { useState } from "react";
import SweetAlert from "../../../utils/sweetalert";
import FormServer from "./form.servers";
import Api from "../../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroServer() {
  const location = useLocation();
  const [server, setServer] = useState({ ativo: false });

  const fetchData = async (server_id) => {
    const response = await Api.get(`servers/${server_id}`);
    setServer(response.data);
  };

  useEffect(() => {
    if (location?.state?.server_id) fetchData(location?.state?.server_id);
  }, [location?.state?.server_id]);

  const navigator = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const formsControls = document.querySelectorAll(".form-control");
    try {
      if (Frm.FormValidation(formsControls)) {
        if (location?.state?.server_id) {
          await Api.put(`servers/${location?.state?.server_id}`, server).catch(
            (error) => {
              throw new Error(error?.response?.data);
            }
          );
        } else {
          await Api.post("servers", server).catch((error) => {
            throw new Error(error?.response?.data);
          });
        }
        SweetAlert.mixin({
          icon: "success",
          title: `Servidor ${
            location?.state?.server_id ? "alterado" : "cadastrado"
          } com sucesso!`,
        });
        navigator("/servidores");
      } else {
        SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
      }
    } catch (e) {
      SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
    }
  }
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row>
          <Col className="mt-3 mb-3 col-12 col-md-12  w-100">
            <Breadcrump
              way={[
                { label: "Pagina Inicial", rota: "./../dashboard" },
                { label: "Servidores", rota: "/servidores" },
                { label: "Novo Servidor", rota: "" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-8">
            <FormServer server={server} setServer={setServer} />
          </Col>
        </Row>
        <Row>
          <Col className="col-6 mt-2 mb-5">
            <Button
              onClick={onSubmit}
              type="submit"
              form={"formdb"}
              variant="success"
            >
              Salvar
            </Button>
            <Button
              onClick={() => {
                navigator("/servidores");
              }}
              variant="secondary"
              className="mx-3 "
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
