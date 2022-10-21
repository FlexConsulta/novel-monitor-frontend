import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import MenuOptionsComponents from "../../shared/menu.options";
import Api from "../../../utils/axios";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import { Link } from "react-router-dom";
import "./index.style.css";
import { useEffect } from "react";
import TableComponent from "./components/table/table";
import ReactLoading from "react-loading";

export default function ClientsComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [resume, setResume] = useState({
    totalRecords: 0,
    totalActiveRecords: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const fetchDataPaged = async () => {
    setLoading(true);
    const response = await Api.get("clients", {
      params: { page, paginate: process.env.REACT_APP_DEFAULT_PAGINATE },
    });
    setTotalPages(response?.data?.pages);
    setData(response?.data?.docs);
    setResume({
      totalRecords: response?.data?.total,
      totalActiveRecords: response?.data?.totalActiveRecords,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchDataPaged();
  }, [page]);

  return (
    <Row className="h-100 w-100">
      <Col className="p-0" style={{ maxWidth: "250px" }}>
        <MenuOptionsComponents />
      </Col>
      <Col className="p-0">
        <Row className="d-flex flex-row  align-items-center ">
          <Col className={"col-12 col-md-8"}>
            <div className="title-empresa mb-2 mb-md-0">
              <h1>Empresas</h1>
              <Link
                to={"/new-empresas"}
                className="ms-3 ps-5 pe-5 btn-criar-empresa"
              >
                <i className={"fa fa-plus me-2"}></i>
                Adicionar{" "}
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Breadcrump
              way={[
                { label: "Pagina Inicial", rota: "./../dashboard" },
                { label: "lista de Clientes", rota: "./empresas" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Col
              style={{
                minHeight: "160px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ReactLoading
                type={"bars"}
                color={"#085ED6"}
                height={10}
                width={50}
              />
            </Col>
          ) : (
            <Col>
              <TableComponent
                data={data}
                page={page}
                totalPages={totalPages}
                togglePage={setPage}
                fetchData={fetchDataPaged}
              />
            </Col>
          )}
        </Row>
        <Row className="footer-card-bd flex-grow-0 overflow-auto  overflow-sm-none">
          <Col className="p-0 ">
            <footer
              style={{ display: "flex" }}
              className="font-desc-footer h-100 text-center"
            >
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Col className="col-3 flex-column justify-content-top">
                  <span className="mx-2">
                    Total de clientes{" "}
                    <span
                      className="font-title-card"
                      style={{ marginLeft: "5px" }}
                    >
                      {resume.totalRecords || 0}
                    </span>{" "}
                  </span>
                </Col>
                |
                <Col className="col-3 ">
                  <span className="mx-2">
                    {" "}
                    Clientes ativos{" "}
                    <span
                      className="font-title-card"
                      style={{ marginLeft: "5px" }}
                    >
                      {resume.totalActiveRecords || 0}
                    </span>
                  </span>{" "}
                </Col>
              </Row>
            </footer>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
