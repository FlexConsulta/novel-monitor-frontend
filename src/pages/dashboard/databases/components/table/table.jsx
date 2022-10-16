import { React, useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import "./table.style.css";
import { IconSearch } from "../../../../../assets/Icons";
import PaginationComponent from "../../../../../components/pagination/pagination";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import DeleteRecord from "../delete";
import Api from "../../../../../utils/axios";
import { SiGraylog } from "react-icons/si";

export default function TableComponent(props) {
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { page, totalPages, togglePage, fetchData } = props;
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData([...props.data]);
  }, [props]);

  useEffect(() => {
    if (search.length > 0) {
      const params = search
        .map((item) => `${item.prop}=${item.value}`)
        .toString()
        .replaceAll(",", "&");

      Api.get(`databases?${params}`).then((response) => {
        setFilterData(response.data.docs);
      });
    }
  }, [search]);

  useEffect(() => {
    if (!showSearch) {
      setSearch([]);
      setFilterData([...props.data]);
    }
  }, [showSearch]);

  return (
    <>
      <Row>
        <Col className="table-container" style={{ minHeight: "350px" }}>
          <table className="table table-hover bordered table-striped">
            <thead>
              <tr>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Nome"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter(
                            (item) => item.prop !== "namedefault"
                          ),
                          {
                            prop: "namedefault",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Nome Banco</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Cliente"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "client"),
                          {
                            prop: "client",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Cliente</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Servidor"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "server"),
                          {
                            prop: "server",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Servidor</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Select
                      type="select"
                      style={{ width: "140px", marginRight: "5px" }}
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter(
                            (item) => item.prop !== "sincronizacao"
                          ),
                          {
                            prop: "sincronizacao",
                            value:
                              e.target.value === "ativo"
                                ? true
                                : e.target.value === "inativo"
                                ? false
                                : "",
                          },
                        ])
                      }
                    >
                      <option disabled value="">
                        {"Selecione o status..."}
                      </option>
                      <option value={"ativo/inativo"}>Ativo/Inativo</option>
                      <option value={"ativo"}>Ativo</option>
                      <option value={"inativo"}>Inativo</option>
                    </Form.Select>
                  ) : (
                    <span style={{ marginRight: "15px" }}>Sincronizar</span>
                  )}
                </th>

                <th
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "5px",
                  }}
                >
                  <Button onClick={() => setShowSearch(!showSearch)}>
                    {IconSearch()}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((database, idx) => (
                <tr key={idx}>
                  <td>{database?.name_default}</td>
                  <td>{database?.client?.name}</td>
                  <td>{database?.server?.name}</td>
                  <td>{database?.sincronizacao ? "Ativo" : "Inativo"}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{ width: "135px", display: "flex", gap: "3px" }}
                    >
                      <Button
                        onClick={() =>
                          navigate("/logs-history", {
                            state: { id_database: database.id },
                          })
                        }
                      >
                        <SiGraylog size={16} />
                      </Button>
                      <Button
                        style={{ marginRight: "3px" }}
                        onClick={() =>
                          navigate("/edit-banco-dados", {
                            state: { database_id: database.id },
                          })
                        }
                      >
                        <BsFillPencilFill size={16} />
                      </Button>
                      <DeleteRecord database={database} fetchData={fetchData} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col className="col-12 mt-2">
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            togglePage={togglePage}
          />
        </Col>
      </Row>
    </>
  );
}
