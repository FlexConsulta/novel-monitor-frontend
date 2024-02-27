import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardConfiguration from "./card.configurations";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaUserTie,
  FaServer,
  FaRegFileAlt,
  FaDatabase,
} from "react-icons/fa";

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
      title: "Usuários",
      descricao: "Cadastro de usuários",
      icon: <FaUserAlt size={60} color={"#085ED6"} />,
      quantity: data?.users,
      button: function () {
        navigate("/usuarios-admin");
      },
    },
    {
      title: "Clientes",
      quantity: data?.clients?.total,
      icon: <FaUserTie size={60} color={"#085ED6"} />,
      descricao: "Cadastro de clientes",
      button: function () {
        navigate("/empresas");
      },
    },
    {
      title: "Servidores",
      descricao: "Cadastro de Servidores",
      quantity: data?.servers?.total,
      icon: <FaServer size={60} color={"#085ED6"} />,
      button: function () {
        navigate("/servidores");
      },
    },
    {
      title: "Logs",
      descricao: "Logs de sincronização",
      quantity: data?.logs?.length,
      icon: <FaRegFileAlt size={60} color={"#085ED6"} />,
      button: function () {
        navigate("/logs-customer");
      },
    },
    {
      title: "Banco de dados",
      descricao: "Cadastro de banco de dados",
      quantity: data?.databases?.total,
      icon: <FaDatabase size={60} color={"#085ED6"} />,
      button: function () {
        navigate("/banco-dados");
      },
    },
  ];
  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row>
          <Col className="mt-3 col-12 d-flex align-items-center">
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
