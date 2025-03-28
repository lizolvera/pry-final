import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CrearQuienesSomos = () => {
  const API_URL = "http://localhost:5000";
  const { section } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (section === "misionVision") {
        res = await axios.post(`${API_URL}/mision-vision/agregar`, formData);
      } else if (section === "historial") {
        res = await axios.post(`${API_URL}/historial-antecedentes/agregar`, formData);
      }
      navigate("/admin/quienes-somos");
    } catch (err) {
      setError("Error al crear la información.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            {section === "misionVision"
              ? "Crear Misión, Visión y Valores"
              : "Crear Historial y Antecedentes"}
          </h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {section === "misionVision" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Misión</Form.Label>
                  <Form.Control
                    type="text"
                    name="mision"
                    value={formData.mision || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Visión</Form.Label>
                  <Form.Control
                    type="text"
                    name="vision"
                    value={formData.vision || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Valores</Form.Label>
                  <Form.Control
                    type="text"
                    name="valores"
                    value={formData.valores || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Historial</Form.Label>
                  <Form.Control
                    type="text"
                    name="historial"
                    value={formData.historial || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Antecedentes</Form.Label>
                  <Form.Control
                    type="text"
                    name="antecedentes"
                    value={formData.antecedentes || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => navigate("/admin/quienes-somos")}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearQuienesSomos;
