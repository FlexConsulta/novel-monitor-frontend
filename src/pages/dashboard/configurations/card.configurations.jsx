import React from "react";
import { Card, Button } from "react-bootstrap";
import ReactLoading from "react-loading";

export default function CardConfiguration({ elemento, loading }) {
  return (
    <Card className="card-tam ">
      <Card.Header
        style={{
          minHeight: "85px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#085ED6",
        }}
      >
        <span
          className="font-card-one"
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: "22px",
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {elemento.title}
        </span>
      </Card.Header>

      {loading ? (
        <Card.Body
          style={{
            minHeight: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type={"bars"}
            color={"#085ED6"}
            height={10}
            width={50}
          />
        </Card.Body>
      ) : (
        <Card.Body
          style={{
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: "3",
            }}
          >
            {elemento?.icon}
          </div>
          <div
            className="descricao-card color-desc font-10"
            style={{ margin: "0px", padding: "0px", height: "12px" }}
          >
            <span>{elemento.quantity} registros</span>
          </div>
        </Card.Body>
      )}
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <div>
            <Button onClick={elemento.button} className="button-footer">
              Detalhes
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}
