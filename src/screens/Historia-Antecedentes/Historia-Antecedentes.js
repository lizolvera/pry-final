import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HistoriaAntecedentes = () => {
  const [historiales, setHistoriales] = useState([]);
  const [antecedentes, setAntecedentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorialAntecedentes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/historial-antecedentes/ver");
        const data = response.data;
        setHistoriales(data.map(item => item.historial));
        setAntecedentes(data.map(item => item.antecedentes));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar la información.");
        setLoading(false);
      }
    };
    fetchHistorialAntecedentes();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando información...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Sección principal con fondo degradado */}
      <div
        style={{
          background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 60%, #2B2347 100%)",
          minHeight: "100vh",
          padding: "60px 0",
        }}
      >
        <Container className="text-center flex-grow-1 mt-5">
          <h2 className="fw-bold" style={{ color: "#00D283" }}>
            Historia y Antecedentes
          </h2>
          <p className="fs-5" style={{ color: "#FFFFFF" }}>
            Conoce más sobre nuestros orígenes y el camino que hemos recorrido en
            el mundo de la tecnología y la seguridad.
          </p>

          <Row className="mt-4 justify-content-center gap-4">
            {/* Historia */}
            <Col md={5}>
              <Card
                className="shadow-lg border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #2B2347, #7A5CFB)",
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    Nuestra Historia
                  </Card.Title>
                  {historiales.map((historial, index) => (
                    <Card.Text key={index} className="text-light fs-5 text-justify">
                      {historial}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Antecedentes */}
            <Col md={5}>
              <Card
                className="shadow-lg border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #00D283, #2B2347)",
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    Antecedentes
                  </Card.Title>
                  {antecedentes.map((antecedente, index) => (
                    <Card.Text key={index} className="text-light fs-5 text-justify">
                      {antecedente}
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

export default HistoriaAntecedentes;
