import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import Frm from "../../../utils/forms.validation";
import SweetAlert from "../../../utils/sweetalert";
import FormUserClient from "./form.users.admins";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";
import FormGroup from "../../shared/FormGroup";
import Roles from "../../shared/Roles";

export default function RegisterDatabase() {
  const [ativarUser, setAtivarUser] = useState(true);
  const [person, setPerson] = useState({});
  const [user, setUser] = useState({});
  const navigator = useNavigate();
  const location = useLocation();

  const { authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("authenticateUser", authenticateUser);
  }, [authenticateUser]);

  const fetchData = async (user_id) => {
    const response = await Api.get(`users/${user_id}`);
    setPerson(response.data.person);
    const { id_client, id_person, id_profile } = response.data;
    setUser({ id_profile, id_person, id_client });
    setAtivarUser(response.data.active);
  };

  useEffect(() => {
    if (location?.state?.user_id) fetchData(location?.state?.user_id);
  }, [location?.state?.user_id]);

  async function submit(e) {
    e.preventDefault();

    const formsControls = document.querySelectorAll(".form-control");
    const formsSelect = document.querySelectorAll(".form-select");

    try {
      if (Frm.FormValidation([...formsControls, ...formsSelect])) {
        let response;

        if (location?.state?.user_id) {
          response = await Api.put(`persons/${person.id}`, person).catch(
            (error) => {
              if (error) {
                throw new Error(error?.response?.data);
              }
            }
          );

          if (response) {
            const newUser = {
              ...user,
              id_person: response?.data?.id,
              active: ativarUser,
              id_profile: Number(user.id_profile),
            };
            await Api.put(`users/${location?.state?.user_id}`, newUser).catch(
              (error) => {
                if (error) {
                  throw new Error(error?.response?.data);
                }
              }
            );
          }
        } else {
          response = await Api.post("persons", person).catch((error) => {
            if (error) {
              throw new Error(error?.response?.data);
            }
          });

          if (response) {
            const newUser = {
              ...user,
              id_person: response?.data?.id,
              active: ativarUser,
              id_profile: Number(user.id_profile),
            };
            await Api.post("users", newUser).catch((error) => {
              if (error) {
                throw new Error(error?.response?.data);
              }
            });
          }
        }
        SweetAlert.mixin({
          icon: "success",
          title: `Usuário ${
            location?.state?.user_id ? "alterado" : "cadastrado"
          } com sucesso!`,
        });
      }
      navigator("/usuarios-admin");
    } catch (e) {
      if (e instanceof Error) {
        SweetAlert.mixin({ icon: "error", title: e.message });
      } else {
        SweetAlert.mixin({ icon: "error", title: "Ocorreu um erro!" });
      }
    }
    // navigator("/usuarios-admin");
  }
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row className="my-2">
          <h1>Usuários</h1>
        </Row>
        <Row className="mb-3 col-12">
          <Col>
            <Breadcrump
              way={[
                { label: "Pagina Inicial", rota: "./../dashboard" },
                { label: "Usuários", rota: "/usuarios-admin" },
                { label: "Cadastro", rota: "" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <FormUserClient
            id={"formCliente"}
            person={person}
            setPerson={setPerson}
            user={user}
            setUser={setUser}
          />
        </Row>
        <Row>
          <Col className="col-12 mt-2">
            <FormGroup
              action={Roles.Actions.activeUser}
              profile={authenticateUser?.role}
              className="col-12"
            >
              <Form.Check
                checked={ativarUser}
                onChange={(e) => setAtivarUser(!ativarUser)}
                type="switch"
                id="ativarUser"
                label="Desativar / Ativar usuário"
              />
            </FormGroup>
          </Col>
          <Col className="col-6 mt-2 mb-5">
            <Button
              type="submit"
              form={"formUserCliente"}
              variant="success"
              onClick={submit}
            >
              Salvar
            </Button>
            <Button
              onClick={() => navigator("/usuarios-admin")}
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
