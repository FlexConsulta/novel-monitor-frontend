import React from "react";
import { Form, Card, Col } from "react-bootstrap";
import Frm from "../../../utils/forms.validation";
import FormsControl from "../../shared/FormsControl";

export default function FormClient(props) {

  const { client, setClient } = props;

  return (
    <>
      <Col>
        <Card style={{ height: "auto", overflow: "auto" }}>
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form id={props.id}>
              <FormsControl.Text
                label={"Razão Social"}
                className={"col-12 mt-2"}
                type="text"
                placeholder={"Razão social..."}
                required={true}
                onFocus={Frm.neutro}
                value={client.razaosocial}
                onChange={(e) => setClient(state => ({ ...state, razaosocial: e.target.value }))}
              />

              <FormsControl.Text
                className={"col-12 mt-2"}
                label={"Nome Fantasia"}
                placeholder={"Nome Fantasia..."}
                required={true}
                type="text"
                onFocus={Frm.neutro}
                value={client?.name}
                onChange={(e) => setClient(state => ({ ...state, name: e?.target?.value }))}
              />
              <FormsControl.NumberFormat
                className={"col-12 mt-2"}
                id={'cnpj'}
                name={'cnpj'}
                label={"CNPJ"}
                // dataMformat={'cnpj'}
                placeholder={"Digite o CNPJ..."}
                required={true}
                // datamformat={"cnpj"}
                format={"##.###.###/####-##"}
                value={client?.cnpj}
                onFocus={Frm.neutro}
                onValueChange={(e) => setClient(state => ({ ...state, cnpj: e.value }))}
              // onValueChange={(e) => console.log(e)}
              />
              <Col className="col-12 mt-2">
                <Form.Check
                  checked={client?.sincronizacao}
                  onChange={() => setClient({ ...client, sincronizacao: !client?.sincronizacao })}
                  type="switch"
                  id="sincronizacao"
                  label="Ativar / desativar sincronização"
                />
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
