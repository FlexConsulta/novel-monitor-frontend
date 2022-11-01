import { React, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import "./table.style.css";
import { IconSearch } from "../../../../../assets/Icons";
import PaginationComponent from "../../../../../components/pagination/pagination";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { SiGraylog } from "react-icons/si";
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

      Api.get(`servers?${params}`).then((response) => {
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
        <Col className="table-container" style={{ minHeight: "460px" }}>
          <table className="table table-hover bordered table-striped">
            <thead>
              <tr style={{fontSize:"16px"}}>
                <th>
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
                    <span>Nome Servidor</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="url"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "url"),
                          {
                            prop: "url",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>URL Servidor</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Porta"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "port"),
                          {
                            prop: "port",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Porta</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Select
                      type="select"
                      style={{ width: "140px", marginRight: "5px" }}
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "ativo"),
                          {
                            prop: "ativo",
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
                    <span style={{ marginRight: "15px" }}>Ativo</span>
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
              {filterData.map((server, idx) => (
                <tr key={idx} className={"linhaTabela"} style={{fontSize:"14px", cursor:"pointer"}}>
                  <td>{server.name}</td>
                  <td>{server.url}</td>
                  <td>{server.port}</td>
                  <td>{server.ativo ? "Ativo" : "Inativo"}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{ width: "135px", display: "flex", gap: "3px" }}
                    >
                      <Button
                        onClick={() =>
                          navigate("/logs-server", {
                            state: { server_id: server.id },
                          })
                        }
                      >
                        <SiGraylog size={16} />
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/edit-servidores", {
                            state: { server_id: server.id },
                          })
                        }
                      >
                        <BsFillPencilFill size={16} />
                      </Button>
                      <DeleteRecord server={server} fetchData={fetchData} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        {!showSearch && (
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
