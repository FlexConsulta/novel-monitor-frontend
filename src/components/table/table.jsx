import { React, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import "./table.style.css";
import { IconSearch } from "../../assets/Icons";
import PaginationComponent from "../pagination/pagination";
import { useEffect } from "react";

export default function TableComponent(props) {
  const [search, setSearch] = useState(false);
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");

  //Adicionar função da requisição
  useEffect(() => {
  }, [data, descricao, status]);
  const { headCells, RowTable } = props;
  const obj = [
    { data: "11/01/2022", status: true, descricao: "serviço" },
    { data: "12/01/2022", status: false, descricao: "serviço" },
    { data: "13/01/2022", status: true, descricao: "serviço" },
    { data: "14/01/2022", status: false, descricao: "serviço" },
    { data: "14/01/2022", status: false, descricao: "serviço" },
    { data: "14/01/2022", status: false, descricao: "serviço" },
    { data: "14/01/2022", status: false, descricao: "serviço" },
    { data: "14/01/2022", status: false, descricao: "serviço" },
  ];
  return (
    <Row>
      <Col className="table-container" style={{ marginBottom: "5px" }}>
        <table

          className="table table-hover bordered table-striped"
        >
          <thead>
            <tr>
              <th>
                {search ? (
                  <Form.Control
                    type="date"
                    style={{ height: "40px" }}
                    placeholder="Enter email"
                    onChange={(e) => setData(e.target.value)}
                  />
                ) : (
                  <span>Data</span>

                )}
              </th>
              <th>
                {search ? (
                  <Form.Select
                    type="select"
                    /*as="aaaaaa"*/
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled value="">{'Selecione o status...'}</option>
                    <option value={"ativo/inativo"}>Ativo/Inativo</option>
                    <option value={"ativo"}>Ativo</option>
                    <option value={"inativo"}>Inativo</option>
                  </Form.Select>
                ) : (
                  <span>status</span>

                )}{" "}
              </th>
              <th
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                {search ? (
                  <Form.Control
                    type="text"
                    style={{ height: "40px", marginRight: "5px" }}
                    placeholder="Descrição..."
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                ) : (
                  <span>Descrição </span>
                )}
                <Button onClick={() => setSearch(!search)}>
                  {IconSearch()}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {obj.map((elemento, idx) => (
              <tr key={idx}>
                <td>{elemento.data}</td>
                <td>{elemento.status === true ? "Ativo" : "Inativo"}</td>
                <td>{elemento.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
      <Col className="col-12 mt-2">
        <PaginationComponent />
      </Col>
    </Row>
  );
}
