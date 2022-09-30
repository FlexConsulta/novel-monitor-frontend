import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import Frm from "../../../utils/forms.validation";
import SweetAlert from "../../../utils/sweetalert";
import FormDatabase from "./form.database.admins";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";
import FormGroup from "../../shared/FormGroup";
import Roles from "../../shared/Roles";

export default function RegisterDatabase() {
  const [database, setDatabase] = useState({});
  const navigator = useNavigate();
  const location = useLocation();

  const fetchData = async (database_id) => {
    const response = await Api.get(`databases/${database_id}`);
    setDatabase(response.data);
  };

  useEffect(() => {
    if (location?.state?.database_id) fetchData(location?.state?.database_id);
  }, [location?.state?.database_id]);

  async function submit(e) {
    e.preventDefault();

    const formsControls = document.querySelectorAll(".form-control");
    const formsSelect = document.querySelectorAll(".form-select");

    try {
      if (Frm.FormValidation([...formsControls, ...formsSelect])) {
        let response;

        if (location?.state?.database_id) {
          response = await Api.put(`databases/${database.id}`, database).catch(
            (error) => {
              if (error) {
                throw new Error(error?.response?.data);
              }
            }
          );
        } else {
          response = await Api.post("databases", database).catch((error) => {
            if (error) {
              throw new Error(error?.response?.data);
            }
          });
        }
        SweetAlert.mixin({
          icon: "success",
          title: "Empresa Cadastrada com sucesso!",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        SweetAlert.mixin({ icon: "error", title: error.message });
      } else {
        SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
      }
    }
    // navigator("/usuarios-admin");
  }
  return (
    <Row className="h-100 w-100">
      <Col className="col-2 ps-0">
        <MenuOptionsComponents />
      </Col>
      <Col className="col-10">
        <Row className="my-2">
          <h1>Banco de Dados</h1>
        </Row>
        <Row className="mb-3 col-12">
          <Col>
            <Breadcrump
              way={[
                { label: "Pagina Incial", rota: "./../dashboard" },
                { label: "Banco de dados", rota: "/banco-dados" },
                { label: "Cadastro", rota: "" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <FormDatabase
            id={"formDatabase"}
            database={database}
            setDatabase={setDatabase}
          />
        </Row>
        <Row>
          <Col className="col-12 mt-2"></Col>
          <Col className="col-6 mt-2 mb-5">
            <Button
              type="submit"
              form={"formDatabase"}
              variant="success"
              onClick={submit}
            >
              Salvar
            </Button>
            <Button
              onClick={() => navigator("/banco-dados")}
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
