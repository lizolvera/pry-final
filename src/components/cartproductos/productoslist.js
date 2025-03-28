import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./cartproductos";
import { Container, Carousel, Row, Col } from "react-bootstrap";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Productos")
      .then((response) => {
        console.log("Productos recibidos:", response.data);
        setProductos(response.data.slice(0, 8)); // Limita a 8 productos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (productos.length === 0) {
    return <p className="text-center">No hay productos disponibles.</p>;
  }

  // Función para dividir el arreglo en grupos (chunks) de tamaño n
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Mostrar 4 productos por slide
  const productChunks = chunkArray(productos, 4);

  return (
    <Container className="mt-4 text-center" style={{ color: "#FFFFFF" }}>

      {/* Estilos para desplazar las flechas fuera de los recuadros */}
      <style>
        {`
          .my-carousel .carousel-control-prev,
          .my-carousel .carousel-control-next {
            width: 5%; /* Ajusta el área clicable de la flecha */
          }
          .my-carousel .carousel-control-prev {
            left: -3rem; /* Desplaza flecha izquierda */
          }
          .my-carousel .carousel-control-next {
            right: -3rem; /* Desplaza flecha derecha */
          }
        `}
      </style>

      <p className="fs-5" style={{ color: "#fffff" }}>Explora nuestros productos</p>
      <Carousel
        className="my-carousel"
        // Flechas grandes y con el color de la paleta
        prevIcon={<span style={{ fontSize: "3rem", color: "#7A5CFB", fontWeight: "bold" }}>‹</span>}
        nextIcon={<span style={{ fontSize: "3rem", color: "#7A5CFB", fontWeight: "bold" }}>›</span>}
      >
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {chunk.map((producto) => (
                <Col key={producto._id} xs={12} sm={6} md={3} className="mb-3">
                  <div
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      backgroundColor: "#2B2347", // Fondo morado grisáceo
                      padding: "10px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <ProductCard
                      id={producto._id}
                      image={producto.imagenUrl}
                      title={producto.nombre}
                      description={`Precio: $${producto.precio}`}
                      titleColor="#00D283" // Color verde esmeralda para el título
                      descriptionColor="#FFFFFF" // Color blanco para la descripción
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductList;