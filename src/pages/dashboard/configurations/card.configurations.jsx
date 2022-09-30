import React from "react";
import { Card, Button } from "react-bootstrap";
import ReactLoading from "react-loading";

export default function CardConfiguration({ elemento, loading }) {
  return (
    <Card className="card-tam ">
      <Card.Header>
        <span className="font-card-one" style={{ fontWeight: 450 }}>
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
            color={"#1aa0e6"}
            height={10}
            width={50}
          />
        </Card.Body>
      ) : (
        <Card.Body style={{ minHeight: "160px" }}>
          <div className="alinhamento-card" style={{ fontSize: "25px" }}>
            <div>
              <span className="font-title-card color-desc">Registros</span>
            </div>
            <span className="font-title-total">{elemento.quantity}</span>
          </div>
          <div className="descricao-card color-desc font-10">
            <span>{elemento.descricao}</span>
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
