import React, { useEffect, useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import axios from "axios";

const PreguntasFrecuentes = () => {
  const API_URL = "http://localhost:5000";
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${API_URL}/preguntas/ver`);
        setPreguntas(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar las preguntas.");
        setLoading(false);
      }
    };
    fetchPreguntas();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando preguntas...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <Container className="mt-5 mb-5" style={{ fontFamily: "'Century Gothic', sans-serif" }}>
      <h2 className="text-center mb-4" style={{ color: "#2B2347", fontWeight: "bold" }}>
        Preguntas Frecuentes
      </h2>
      <Accordion flush>
        {preguntas.map((pregunta, index) => (
          <Accordion.Item
            key={pregunta._id}
            eventKey={index.toString()}
            style={{ borderColor: "#7A5CFB", marginBottom: "10px" }}
          >
            <Accordion.Header style={{ backgroundColor: "#2B2347", color: "#FFFFFF", fontWeight: "600" }}>
              {pregunta.pregunta}
            </Accordion.Header>
            <Accordion.Body style={{ backgroundColor: "#F5F5F5", color: "#2B2347" }}>
              {pregunta.respuesta}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default PreguntasFrecuentes;