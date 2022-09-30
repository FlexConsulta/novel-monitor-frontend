import React from "react";
import { Col, Row, Table, Card, Button } from "react-bootstrap";
import "./index.style.css";
import { IconDataBase, IconUsers } from "../../../assets/Icons";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../../utils/axios";
// Pages
import MenuOptionsComponents from "../../shared/menu.options";
import TableComponent from "../../../components/table/table";
import { useMemo } from "react";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import { useEffect } from "react";
import { useState } from "react";
import SweetAlert from "../../../utils/sweetalert";
export default function LogsDatabasesComponent() {
  const [listEmpresas, setListEmpresas] = useState();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [database, setDataBase] = useState([]);
  let { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    setReload(true);
    Api.get(`clients/${id}`)
      .then(({ data }) => {
        setListEmpresas(data);
      })
      .catch((error) => {
        alert("error");
      });
    Api.get(`databases/${id}`).then(({ data }) => setDataBase(data));
    setReload(false);
  }, [id]);

  function onDeleteEmpesa() {
    function confrmDelete() {
      setLoading(true);
      Api.delete(`clients/${id}`)
        .then(() => {
          SweetAlert.mixin({
            icon: "success",
            title: "Empresa Excluída com sucesso!",
          });
          history("/empresas");
        })
        .catch((error) =>
          SweetAlert.mixin({ icon: "error", title: error.response.data })
        );
      setLoading(false);
    }
    SweetAlert.default({
      title: "Deseja continuar ?",
      text: "Esta operação irá excluir a empresa da base de dados!",
      icon: "warning",
      showBtnCancel: "Cancelar",
      confirmButtonText: "Confirmar",
      callback: confrmDelete,
    });
  }
  const headCells = [
    {
      id: "data",
      label: "data",
      type: "date",
    },
    {
      id: "Status",
      label: "Status",
      type: "text",
    },

    {
      id: "Descrição",
      label: "Descrição",
      type: "",
    },
    {
      id: "Descrição",
      label: "Descrição",
    },
    {
      id: "Descrição",
      label: "Descrição",
    },
    {
      id: "Descrição",
      label: "Descrição",
    },
    {
      id: "Descrição",
      label: "Descrição",
    },
  ];

  const RowTable = useMemo(() => {
    return headCells.map((item, idx) => (
      <tr key={idx}>
        <td>a</td>
        <td>a</td>
        <td>a</td>
        <td>a</td>
        <td>a</td>
        <td>a</td>
        <td>a</td>
      </tr>
    ));
  });

  return (
    <>
      <Row className="h-100 w-100">
        <Col className="col-2 ps-0">
          <MenuOptionsComponents />
        </Col>
        <Col className="col-10 d-flex flex-column justify-content-between h-100 ">
          <Row className="mt-1 flex-grow-1 ">
            <Col
              className={
                "col-8 col-md-10 d-flex justify-content-between align-items-center"
              }
            >
              <div>
                <h1>{listEmpresas?.name}</h1>
              </div>
              <div>
                <Button
                  onClick={() => history(`/edit-empresas/${id}`)}
                  variant="outline-secondary"
                  className="h-75 mx-1"
                >
                  Editar Empresa
                </Button>
                <Button
                  onClick={onDeleteEmpesa}
                  variant="outline-danger"
                  className="h-75"
                >
                  Deletar Empresa
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Breadcrump
                way={[
                  { label: "Pagina Incial", rota: "./dashboard" },
                  { label: "lista de Clientes", rota: "/empresas" },
                  { label: "Cliente", rota: "/logs-conexoes" },
                ]}
              />
            </Col>
          </Row>
          <Row className="mt-4 flex-grow-1 ">
            <Col className="col-8 col-sm-5 col-md-4 col-lg-2">
              <Card className="card-logs">
                <Card.Header>
                  <IconUsers />
                  <span className={"desc-card-empresas"}>Usuários</span>
                </Card.Header>
                <Card.Body className="pb-1 px-1">
                  <div className="text-center card-empresa pb-3">
                    <span>10</span>
                  </div>
                  <Button
                    onClick={() => history("/usuarios-empresas")}
                    className="w-100"
                  >
                    Detalhes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-8 col-sm-5 col-md-4 col-lg-2">
              <Card className="card-logs">
                <Card.Header>
                  <IconUsers />
                  <span className={"desc-card-empresas"}>Banco de Dados</span>
                </Card.Header>
                <Card.Body className="pb-1 px-1">
                  <div className="text-center card-empresa pb-3">
                    <span>{database.length}</span>
                  </div>
                  <Button
                    className="w-100"
                    onClick={() => {
                      history(`/banco-dados/${id}`);
                    }}
                  >
                    Detalhes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4  h-100  mb-3 mx-3">
            <Col className="col-8 col-md-10 p-0">
              <TableComponent
                headCells={headCells}
                RowTable={RowTable}
              ></TableComponent>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
