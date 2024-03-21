import { React, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import "./table.style.css";
import { IconSearch } from "../../../../../assets/Icons";
import PaginationComponent from "../../../../../components/pagination/pagination";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import DeleteRecord from "../delete";
import Api from "../../../../../utils/axios";

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

      Api.get(`clients?${params}`).then((response) => {
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
        <Col
          className="table-container"
          style={{ minHeight: "460px", height: "70vh" }}
        >
          <table className="table table-hover bordered table-striped tableClients">
            <thead>
              <tr style={{ fontSize: "16px" }} className="linhaTitulo">
                <th style={{ padding: "0px", paddingBottom: "4px" }}>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Nome"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "name"),
                          {
                            prop: "name",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>N. Fantasia</span>
                  )}
                </th>
                <th style={{ padding: "0px", paddingBottom: "4px" }}>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Razão Social"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter(
                            (item) => item.prop !== "razaosocial"
                          ),
                          {
                            prop: "razaosocial",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>R. Social</span>
                  )}
                </th>
                <th style={{ padding: "0px", paddingBottom: "4px" }}>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="CNPJ"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "cnpj"),
                          {
                            prop: "cnpj",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>CNPJ</span>
                  )}
                </th>
                <th style={{ padding: "0px", paddingBottom: "4px" }}>
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
                    paddingBottom: "4px",
                  }}
                >
                  <Button onClick={() => setShowSearch(!showSearch)}>
                    {IconSearch()}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((client, idx) => (
                <tr
                  key={idx}
                  className={"linhaTabela"}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                >
                  <td>{client.name}</td>
                  <td>{client.razaosocial}</td>
                  <td>{client.cnpj}</td>
                  <td>{client.sincronizacao ? "Ativo" : "Inativo"}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: "90px", height: "32px", gap: "3px" }}>
                      <Button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() =>
                          navigate("/edit-empresas", {
                            state: { client_id: client.id },
                          })
                        }
                      >
                        <BsFillPencilFill size={12} />
                      </Button>
                      <DeleteRecord client={client} fetchData={fetchData} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        {!showSearch && Number(totalPages) > 1 && (
          <Col className="col-12 mt-2">
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              togglePage={togglePage}
            />
          </Col>
        )}
      </Row>
    </>
  );
}
