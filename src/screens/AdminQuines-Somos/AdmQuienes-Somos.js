import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdmQuienesSomos = () => {
  const API_URL = "http://localhost:5000";
  const [misionesVisiones, setMisionesVisiones] = useState([]);
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMision = await axios.get(`${API_URL}/mision-vision/ver`);
        const resHistorial = await axios.get(`${API_URL}/historial-antecedentes/ver`);
        setMisionesVisiones(resMision.data);
        setHistoriales(resHistorial.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener la información.");
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleEditClick = (section, id) => {
    navigate(`/editar-quienes-somos/${section}/${id}`);
  };
  

  const handleAddClick = (section) => {
    navigate(`/crear-quienes-somos/${section}`);
  };

  const handleDelete = async (section, id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        if (section === "misionVision") {
          await axios.delete(`${API_URL}/mision-vision/eliminar/${id}`);
          setMisionesVisiones(misionesVisiones.filter(mv => mv._id !== id));
        } else if (section === "historial") {
          await axios.delete(`${API_URL}/historial-antecedentes/eliminar/${id}`);
          setHistoriales(historiales.filter(h => h._id !== id));
        }
      } catch (err) {
        setError("Error al eliminar el registro.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Administración de Quiénes Somos</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center">Cargando información...</p>
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Misión, Visión y Valores</h4>
              </Card.Header>
              <Card.Body>
                {misionesVisiones.length > 0 ? (
                  misionesVisiones.map((mv) => (
                    <div key={mv._id}>
                      <p><strong>Misión:</strong> {mv.mision}</p>
                      <p><strong>Visión:</strong> {mv.vision}</p>
                      <p><strong>Valores:</strong> {mv.valores}</p>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditClick("misionVision", mv._id)}
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("misionVision", mv._id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hay información registrada.</p>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddClick("misionVision")}
                  className="mt-3"
                >
                  Crear Nuevo
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Historial y Antecedentes</h4>
              </Card.Header>
              <Card.Body>
                {historiales.length > 0 ? (
                  historiales.map((h) => (
                    <div key={h._id}>
                      <p><strong>Historial:</strong> {h.historial}</p>
                      <p><strong>Antecedentes:</strong> {h.antecedentes}</p>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditClick("historial", h._id)}
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("historial", h._id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hay información registrada.</p>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddClick("historial")}
                  className="mt-3"
                >
                  Crear Nuevo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdmQuienesSomos;