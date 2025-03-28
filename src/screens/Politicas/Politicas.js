import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const Politicas = () => {
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/politicas/ver");
        setPoliticas(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la información.");
        setLoading(false);
      }
    };
    fetchPoliticas();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="success" />
        <p>Cargando información...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  // Agrupar políticas por tipo
  const politicasDeUso = politicas.filter(politica => politica.politicaDeUso).map(politica => politica.politicaDeUso);
  const politicasDePrivacidad = politicas.filter(politica => politica.politicaDePrivacidad).map(politica => politica.politicaDePrivacidad);
  const terminosYCondiciones = politicas.filter(politica => politica.terminosYCondiciones).map(politica => politica.terminosYCondiciones);

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
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{ color: "#00D283", fontSize: "3rem" }}
            >
              Nuestras Políticas
            </h2>
            <p className="lead" style={{ color: "#FFFFFF", fontSize: "1.3rem" }}>
              Conoce los lineamientos que rigen nuestra plataforma y protegen tu información.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {/* Política de Uso */}
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
                    Política de Uso
                  </Card.Title>
                  {politicasDeUso.map((uso, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {uso}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Política de Privacidad */}
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
                    Política de Privacidad
                  </Card.Title>
                  {politicasDePrivacidad.map((privacidad, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {privacidad}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Términos y Condiciones */}
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
                    Términos y Condiciones
                  </Card.Title>
                  {terminosYCondiciones.map((termino, index) => (
                    <Card.Text
                      key={index}
                      className="text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {termino}
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
          marginTop: "100px",
        }}
      >
        <h5 className="m-0" style={{ color: "#00D283" }}>NEXUS.ITC</h5>
        <p className="m-0" style={{ color: "#FFFFFF" }}>
          Innovación y tecnología para la seguridad y el control de acceso.
        </p>
      </footer>
    </div>
  );
};

export default Politicas;
