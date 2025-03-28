import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Breadcrumb, Button } from "react-bootstrap";
import { UserContext } from "../UserContext/UserContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/productos/${id}`)
      .then((response) => {
        setProducto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setError("No se pudo cargar el producto. Intenta nuevamente.");
        setLoading(false);
      });
  }, [id]);

  const handleComprar = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/dispositivos/estado?email=${user.email}`);
      if (response.data) {
        navigate("/control-iot");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/vincular-iot");
      } else {
        console.error("Error al verificar el dispositivo:", error);
      }
    }
  };

  if (loading) {
    return <p className="text-center">Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!producto) {
    return <p className="text-center">Producto no encontrado.</p>;
  }

  return (
    <Container className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/ProductosCat")} style={{ cursor: "pointer" }}>
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-lg p-3">
        <Card.Img 
          variant="top" 
          src={producto.imagenUrl} 
          alt={producto.nombre}
          style={{
            maxHeight: "400px",
            width: "100%",
            objectFit: "contain",
          }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
          <Card.Text>
            <strong>Descripción:</strong> {producto.descripcion}
          </Card.Text>
          <Card.Text>
            <strong>Precio:</strong> ${producto.precio}
          </Card.Text>
          <Card.Text>
            <strong>Stock disponible:</strong> {producto.stock}
          </Card.Text>
          {producto.nombre.toLowerCase().includes("invernadero inteligente") && (
            <Button variant="primary" onClick={handleComprar}>
              Comprar
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
