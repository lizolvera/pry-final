import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const QuienesSomos = () => {
  const [misiones, setMisiones] = useState([]);
  const [visiones, setVisiones] = useState([]);
  const [valores, setValores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/mision-vision/ver")
      .then((response) => {
        const data = response.data;
        setMisiones(data.map(item => item.mision));
        setVisiones(data.map(item => item.vision));
        setValores(data.map(item => item.valores));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError("No se pudo cargar la información.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando información...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Sección principal con fondo degradado */}
      <div
        style={{
          background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 60%, #2B2347 100%)",
          minHeight: "100vh",
          padding: "60px 0",
        }}
      >
        <Container className="mt-5 flex-grow-1">
          {/* Título Central */}
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{ color: "#00D283", fontSize: "3rem" }}
            >
              ¿Quiénes Somos?
            </h2>
            <p className="lead" style={{ color: "#FFFFFF", fontSize: "1.3rem" }}>
              En <strong>NEXUS.ITC</strong>, fusionamos la tecnología con la
              seguridad para crear soluciones inteligentes que optimicen la
              protección y el uso eficiente de los recursos.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {/* Misión */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #2B2347, #7A5CFB)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Nuestra Misión
                  </Card.Title>
                  {misiones.map((mision, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {mision}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Visión */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #00D283, #2B2347)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Nuestra Visión
                  </Card.Title>
                  {visiones.map((vision, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {vision}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Valores */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #7A5CFB, #2B2347)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Nuestros Valores
                  </Card.Title>
                  {valores.map((valor, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {valor}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Fijo */}
      <footer
        className="mt-auto text-center text-white py-3"
        style={{
          background: "linear-gradient(135deg, #2B2347, #7A5CFB)",
        }}
      >
        <h5 className="m-0" style={{ color: "#00D283" }}>NEXUS.ITC</h5>
        <p className="m-0" style={{ color: "#FFFFFF" }}>
          Donde la seguridad y la tecnología van de la mano.
        </p>
      </footer>
    </div>
  );
};

export default QuienesSomos;
