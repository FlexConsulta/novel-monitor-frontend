import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import FormClient from "./form.clients";
import Frm from "../../../utils/forms.validation";
import SweetAlert from "../../../utils/sweetalert";
import { useNavigate, useLocation } from "react-router-dom";
import Api from "../../../utils/axios";
import { useEffect } from "react";

export default function EditClients() {
  const location = useLocation();

  const [clientData, setClientData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const fetchData = async (client_id) => {
    const response = await Api.get(`clients/${client_id}`);
    setClientData(response.data);
  };

  useEffect(() => {
    if (location?.state?.client_id) fetchData(location?.state?.client_id);
  }, [location?.state?.client_id]);

  async function submit(e) {
    e.preventDefault();

    const formsControls = document.querySelectorAll(
      ".form-control:not(.contato)"
    );
    try {
      if (Frm.FormValidation(formsControls)) {
        if (location?.state?.client_id) {
          await Api.put(
            `clients/${location?.state?.client_id}`,
            clientData
          ).catch((error) => {
            throw new Error(error?.response?.data);
          });
        } else {
          await Api.post("clients", clientData).catch((error) => {
            throw new Error(error?.response?.data);
          });
        }
        SweetAlert.mixin({ icon: "success", title: "Cliente cadastrado!" });
      } else {
        SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
      }
    } catch (e) {
      if (e instanceof Error) {
        SweetAlert.mixin({ icon: "error", title: e.message });
      } else {
        SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
      }
    }
  }
  return (
    <Row className="h-100 w-100">
      <Col className="col-2 ps-0">
        <MenuOptionsComponents />
      </Col>
      <Col className="col-10">
        <Row className="mb-3">
          <Col className="col-12">
            <Breadcrump
              way={[
                { label: "Pagina Incial", rota: "./../dashboard" },
                { label: "Lista de Clientes", rota: "../empresas" },
                { label: "Edição de Cliente", rota: "" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <FormClient
            id={"formCliente"}
            client={clientData}
            setClient={setClientData}
          />
        </Row>
        <Row>
          <Col className="col-6 mt-2 mb-5">
            <Button
              type="submit"
              form={"formCliente"}
              variant="success"
              onClick={submit}
            >
              Salvar
            </Button>
            <Button
              onClick={() => {
                navigator(`/logs-conexoes`);
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
