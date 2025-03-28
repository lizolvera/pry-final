import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="text-center"
      style={{
        width: "280px",
        borderRadius: "15px",
        border: "none",
        background: "linear-gradient(135deg, #ffffff, #f7f7f7)", // Fondo claro degradado
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Sombra suave
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          height: "160px",
          overflow: "hidden",
          padding: "5px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title
          className="fs-6"
          style={{ color: "#4CAF50", fontWeight: "bold" }}
        >
          {title}
        </Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
          {description}
        </Card.Text>
        <Button
          variant="success"
          size="sm"
          onClick={() => navigate(`/producto/${id}`)}
          style={{
            fontWeight: "bold",
            borderRadius: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
