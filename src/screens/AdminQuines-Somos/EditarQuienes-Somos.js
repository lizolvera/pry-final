import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarQuienesSomos = () => {
  const API_URL = "http://localhost:5000";
  const { section, id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Se obtiene la información del registro según la sección y el id
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (section === "misionVision") {
          res = await axios.get(`${API_URL}/mision-vision/ver/${id}`);
        } else if (section === "historial") {
          res = await axios.get(`${API_URL}/historial-antecedentes/ver/${id}`);
        } else {
          setError("Sección no válida");
          setLoading(false);
          return;
        }
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener la información.");
        setLoading(false);
      }
    };
  
    fetchData();
  }, [API_URL, section, id]);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (section === "misionVision") {
        res = await axios.put(`${API_URL}/mision-vision/actualizar/${id}`, formData);
      } else if (section === "historial") {
        res = await axios.put(`${API_URL}/historial-antecedentes/actualizar/${id}`, formData);
      }
      navigate("/admin/quienes-somos"); // Redirige de vuelta al panel de administración
    } catch (err) {
      setError("Error al actualizar la información.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            {section === "misionVision"
              ? "Editar Misión, Visión y Valores"
              : "Editar Historial y Antecedentes"}
          </h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <p>Cargando información...</p>
          ) : (
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
                  Guardar Cambios
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarQuienesSomos;