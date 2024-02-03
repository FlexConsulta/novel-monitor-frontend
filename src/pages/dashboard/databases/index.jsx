import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Api from "../../../utils/axios";
import MenuOptionsComponents from "../../shared/menu.options";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import TableComponent from "./components/table/table";
import ReactLoading from "react-loading";

export default function DatabaseComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState({
    totalRecords: 0,
    totalActiveRecords: 0,
  });

  const fetchDataPaged = async () => {
    setLoading(true);

    const response = await Api.get("databases", {
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
    <>
      <Row className="h-100 w-100">
        <Col className="p-0" style={{ maxWidth: "250px" }}>
          <MenuOptionsComponents />
        </Col>
        <Col className="p-0">
          <Row>
            <Col className="mt-3 col-12 d-flex align-items-center">
              <h1 style={{fontSize:"28px"}}>Banco de Dados</h1>
              <Link
                to={"/new-banco-dados"}
                className="ms-3 ps-5 pe-5 btn-criar-empresa"
                style={{height:"30px"}}
              >
                <i className={"fa fa-plus me-2"}></i>
                Adicionar{" "}
              </Link>
            </Col>
          </Row>

          <Row className="mb-3 col-12" style={{marginBottom:"0px"}}>
            <Col>
              <Breadcrump
                way={[
                  { label: "Pagina Inicial", rota: "./../dashboard" },
                  { label: "Banco de dados", rota: "/banco-dados" },
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
                      Total de bancos de dados{" "}
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
                      Bancos de dados ativos{" "}
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
    </>
  );
}
