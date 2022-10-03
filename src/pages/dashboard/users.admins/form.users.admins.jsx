import React from "react";
import { useState, useEffect } from "react";
import Roles from "../../shared/Roles";
import FormGroup from "../../shared/FormGroup";
import { useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";
import FormsControl from "../../shared/FormsControl";
import { Form, Card, Col, FormControl } from "react-bootstrap";
import Api from "../../../utils/axios";
import Frm from "../../../utils/forms.validation";

export default function FormUserClient(props) {
  const { authenticateUser } = useContext(AuthContext);

  const [profiles, setProfiles] = useState([]);
  const { person, setPerson, user, setUser } = props;

  const [clients, setClients] = useState([]);

  const loadProfiles = async () => {
    const response = await Api.get("profile");
    setProfiles(response?.data.docs);
  };

  const loadClients = async () => {
    const response = await Api.get("clients");
    setClients(response?.data.docs);
  };

  useEffect(() => {
    loadClients().then(() => {
      loadProfiles();
    });
  }, []);

  return (
    <>
      <Col>
        <Card style={{ height: "auto", overflow: "auto", width: "400px" }}>
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form id={"person"}>
              <FormGroup
                action={Roles.Actions.changeClient}
                profile={authenticateUser?.role}
                className="col-12"
              >
                <Form.Label>
                  Cliente<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  required
                  type="text"
                  onFocus={Frm.neutro}
                  value={user?.id_client}
                  onChange={(e) =>
                    setUser((state) => ({
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
                        selected={user?.id_client === client.id}
                        key={idx + 1}
                        value={client.id}
                      >
                        {client.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </FormGroup>
              <FormGroup
                action={Roles.Actions.changeProfile}
                profile={authenticateUser?.role}
                className="col-12"
              >
                <Form.Label>
                  Perfil do usuário<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  required
                  type="text"
                  onFocus={Frm.neutro}
                  value={user?.id_profile}
                  onChange={(e) =>
                    setUser((state) => ({
                      ...state,
                      id_profile: e.target.value,
                    }))
                  }
                >
                  <option key={0} value={""}>
                    {"Selecione o perfil do usuário..."}
                  </option>
                  {profiles &&
                    profiles.map((profile, idx) => (
                      <option key={idx + 1} value={profile.id}>
                        {profile.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </FormGroup>
              <Form.Group className="col-12 mt-2">
                <Form.Label>
                  Nome completo<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  onFocus={Frm.neutro}
                  value={person?.name}
                  onChange={(e) =>
                    setPerson((state) => ({ ...state, name: e.target.value }))
                  }
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email<span className="text-danger">*</span>
                </Form.Label>
                <FormControl
                  id="email"
                  name="email"
                  required
                  type="email"
                  data-mformat="email"
                  autoComplete={false}
                  value={person?.email}
                  onChange={(e) =>
                    setPerson((state) => ({ ...state, email: e.target.value }))
                  }
                  placeholder="Digite o email..."
                  onFocus={Frm.neutro}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <FormsControl.NumberFormat
                  id={"phone"}
                  name={"phone"}
                  label={"Telefone"}
                  required={true}
                  format={"(##) ####-####"}
                  onFocus={Frm.neutro}
                  onChange={(e) =>
                    setPerson((state) => ({ ...state, phone: e.target.value }))
                  }
                  value={person?.phone}
                  placeholder="Digite o telefone..."
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
      <Col></Col>
    </>
  );
}
