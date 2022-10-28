import React from "react";
import { Col, Row, Card, Badge, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Breadcrump from "../../shared/Breadcrump/Breadcrump";
import MenuOptionsComponents from "../../shared/menu.options";
import { compareDate } from "../../../utils/compareDate";
import { dropSeconds } from "../../../utils/dateTimeFormat";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";
import { getLoggedUserInfo } from "../../../utils/profile";
import { useNavigate } from "react-router-dom";
import Roles from "../../shared/Roles";
import Api from "../../../utils/axios";
import "./testConnection.style.css";


export default function TestConnection() {
    const location = useLocation();
    const id_database = location?.state?.id_database;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    var [responseError, setResponseError] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await Api.get(`logs/test-connection?id_database=${id_database}`)
            setLoading(false);

            if(response?.data?.travelsLocal){
                setData(response?.data);
            } 
            else{
                setData(null);
                setResponseError(response?.data)
                
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            setData(null)
        }
    }
   
    return (
        <Row className="h-100 w-100">
            <Col className="p-0" style={{ maxWidth: "250px" }}>
                <MenuOptionsComponents />
            </Col>
            <Col className="p-0">
                <Row className="d-flex flex-row  align-items-center ">
                    <Col className={"col-12 col-md-8"}>
                        <div className="title-empresa mb-2 mb-md-0">
                            <h1>Log</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12">
                        <Breadcrump
                            way={[
                                { label: "Pagina Inicial", rota: "./dashboard" },
                                { label: "Configuracoes", rota: "/configuracoes" },
                                { label: "Log", rota: "/logs-conexoes" },
                            ]}
                        />
                    </Col>
                </Row>
                { loading ? (
                    <Row
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
                            height={20}
                            width={80}
                        />
                    </Row>
                    
                ) : !data ?(<>
                <div style={{minWidth:'150px', minHeight:'100px', color:'red', fontSize:'14px', paddingLeft:"12px"}}>
                   Error: {responseError}
                </div>
                </>): (
                    <Container
                        fluid="md"
                        style={{
                            margin: "0px",
                            padding: "0px",
                        }}
                    >
                        <Row
                            className="mt-4 flex-grow-2"
                            style={{
                                maxHeight: "550px",
                                overflowY: "auto",
                                margin: "0px",
                                padding: "0px",
                            }}
                        >
                            <Col className="col-4"
                                style={{ width: "420px", minHeight: "160px" }}>
                                <Card className="card-logs" style={{ width: "100%" }}>
                                    <Card.Header
                                        style={{ paddingBottom: "0px", cursor: "pointer" }}
                                    >
                                        <Row>
                                            <Col
                                                className="col-6"
                                                style={{ justifyContent: "flex-start" }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: "700",
                                                        justifyContent: "flex-start",
                                                    }}
                                                >
                                                </span>
                                            </Col>
                                            <Col
                                                className="col-6"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                }}
                                            >
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Col
                                                col={4}
                                                style={{
                                                    maxWidth: "90px",
                                                }}
                                            ></Col>
                                            <Col col={4}>Local</Col>
                                            <Col col={4}>Cliente </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className="pb-1 px-1 card-body">
                                        <Row>
                                            <Col col={4} style={{ maxWidth: "100px" }}>
                                                Viagens:
                                            </Col>
                                            <Col
                                                col={4}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-s",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Badge
                                                    bg={
                                                        data?.travelsLocal ==
                                                            "Erro"
                                                            ? "danger"
                                                            : "success"
                                                    }
                                                    text="white"
                                                >
                                                    {data?.travelsLocal}
                                                </Badge>
                                            </Col>
                                            <Col col={4}>
                                                <Badge
                                                    bg={
                                                        data?.travelsCustomer ==
                                                            "Erro"
                                                            ? "danger"
                                                            : "success"
                                                    }
                                                    text="white"
                                                >
                                                    {data?.travelsCustomer}
                                                </Badge>
                                            </Col>
                                        </Row>
                                        <Row col={3}>
                                            <Col
                                                col={4}
                                                style={{
                                                    maxWidth: "100px",
                                                    paddingRight: "0px",
                                                }}
                                            >
                                                Data Hora:
                                            </Col>
                                            <Col col={4}>
                                                <Badge
                                                    bg={
                                                        data?.currentDateLocal == "Erro"
                                                            ? "danger"
                                                            : compareDate(
                                                                data?.currentDateLocal,
                                                                data?.currentDateCustomer
                                                            )
                                                                ? "success"
                                                                : "warning"
                                                    }
                                                    text="white"
                                                >
                                                    {dropSeconds(
                                                        data?.currentDateLocal
                                                    )}
                                                </Badge>
                                            </Col>
                                            <Col col={4}>
                                                <Badge
                                                    bg={
                                                        data
                                                            ?.currentDateLocal == "Erro"
                                                            ? "danger"
                                                            : compareDate(
                                                                data
                                                                    ?.currentDateLocal,
                                                                data
                                                                    ?.currentDateCustomer
                                                            )
                                                                ? "success"
                                                                : "warning"
                                                    }
                                                    text="white"
                                                >
                                                    {dropSeconds(
                                                        data
                                                            ?.currentDateCustomer
                                                    )}

                                                </Badge>

                                            </Col>
                                        </Row>
                                        <Row>
                                            {data?.errorMessageLocal && (
                                                <Badge bg={"danger"} text="white">
                                                    {data?.errorMessageLocal}
                                                </Badge>
                                            )}
                                            {data?.errorMessageCustomer && (
                                                <Badge bg={"danger"} text="white">
                                                    {
                                                        data?.errorMessageCustomer
                                                    }
                                                </Badge>
                                            )
                                            }
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Col>
        </Row>
    );
}
