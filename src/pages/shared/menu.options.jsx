import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./menu.options.style.css";
import { AuthContext } from "./AuthContext";

export default function MenuOptionsComponents() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <>
      <Col md={12} className="col-2 menu-left h-100">
        <Link to="/dashboard">Início</Link>
        <br />
        <Link to="/configuracoes">Configurações</Link>
        <br />
        <Link to="/" onClick={() => handleLogout()}>
          Sair
        </Link>
        <br />
      </Col>
    </>
  );
}
