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

      Api.get(`users?${params}`).then((response) => {
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
        <Col className="table-container" style={{ minHeight: "420px" }}>
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
                    <span>Usuário</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Email"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "email"),
                          {
                            prop: "email",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Email</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Control
                      type="text"
                      style={{ height: "40px" }}
                      placeholder="Perfil de usuário"
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "profile"),
                          {
                            prop: "profile",
                            value: e.target.value,
                          },
                        ])
                      }
                    />
                  ) : (
                    <span>Perfil</span>
                  )}
                </th>
                <th>
                  {showSearch ? (
                    <Form.Select
                      type="select"
                      style={{ width: "140px", marginRight: "5px" }}
                      onChange={(e) =>
                        setSearch((state) => [
                          ...state.filter((item) => item.prop !== "active"),
                          {
                            prop: "active",
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
                    <span style={{ marginRight: "15px" }}>Status</span>
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
              {filterData.map((user, idx) => (
                <tr key={idx} className={"linhaTabela"} style={{fontSize:"14px", cursor:"pointer"}}>
                  <td>{user.person.name}</td>
                  <td>{user.person.email}</td>
                  <td>{user.profile.name}</td>
                  <td>{user.active ? "Ativo" : "Inativo"}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: "90px" }}>
                      <Button
                        style={{ marginRight: "3px" }}
                        onClick={() =>
                          navigate("/usuarios-empresas", {
                            state: { user_id: user.id },
                          })
                        }
                      >
                        <BsFillPencilFill size={16} />
                      </Button>
                      <DeleteRecord user={user} fetchData={fetchData} />
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
