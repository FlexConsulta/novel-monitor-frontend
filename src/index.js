import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.style.css";
import "./styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Container className={"container-init"} fluid>
    <Routes />
  </Container>
);
