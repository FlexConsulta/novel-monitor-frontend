import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardConfiguration from "./card.configurations";
import { useNavigate } from "react-router-dom";

// Pages
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import Api from "../../../utils/axios";
import { useEffect } from "react";

export default function ConfiguracoesComponent() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await Api.get("resume");
    setLoading(false);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const dados = [
    {
      title: "Administração de Usuários",
      descricao: "Cadastro de usuários",
      quantity: data?.users,
      button: function () {
        navigate("/usuarios-admin");
      },
    },
    {
      title: "Clientes",
      quantity: data?.clients,
      descricao: "Cadastro de clientes",
      button: function () {
        navigate("/empresas");
      },
    },
    {
      title: "Servidores",
      descricao: "Cadastro de Servidores",
      quantity: data?.servers,
      button: function () {
        navigate("/servidores");
      },
    },
    {
      title: "Logs de sincronização",
      descricao: "Logs de sincronização",
      quantity: data?.logs,
      button: function () {
        navigate("/logs-customer");
      },
    },
    {
      title: "Banco de dados",
      descricao: "Cadastro de banco de dados",
      quantity: data?.databases,
      button: function () {
        navigate("/banco-dados");
      },
    },
  ];
  return (
    <Row className="h-100 w-100">
      <Col className="col-2 ps-0">
        <MenuOptionsComponents />
      </Col>
      <Col md={10} className="h-100 d-flex flex-column">
        <Row>
          <Col>
            <h1>Configurações de Administração</h1>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Breadcrump
              way={[
                { label: "Início", rota: "/dashboard" },
                { label: "Configurações", rota: "/configuracoes" },
              ]}
            />
          </Col>
        </Row>
        <Row className={"overflow-auto"} style={{ paddingTop: "16px" }}>
          {dados.map((elemento, idx) => (
            <Col key={idx}>
              <CardConfiguration elemento={elemento} loading={loading} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
