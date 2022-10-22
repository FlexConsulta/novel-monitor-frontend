import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.style.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Container className={"container-init"} fluid>
    <Routes />
  </Container>
);
