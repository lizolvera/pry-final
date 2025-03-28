import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AdmPreguntas = () => {
  const API_URL = "http://localhost:5000";
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPreguntaId, setCurrentPreguntaId] = useState(null);
  const [formData, setFormData] = useState({
    pregunta: "",
    respuesta: "",
  });

  // Obtener las preguntas al montar el componente
  useEffect(() => {
    fetchPreguntas();
  }, []);

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

  // Manejar edición: abre el modal de edición
  const handleEdit = (id) => {
    const preguntaToEdit = preguntas.find((pregunta) => pregunta._id === id);
    setFormData({
      pregunta: preguntaToEdit.pregunta,
      respuesta: preguntaToEdit.respuesta,
    });
    setIsEditing(true);
    setCurrentPreguntaId(id);
    setShowModal(true);
  };

  // Manejar adición: abre el modal de adición
  const handleAdd = () => {
    setIsEditing(false);
    setCurrentPreguntaId(null);
    setFormData({
      pregunta: "",
      respuesta: "",
    });
    setShowModal(true);
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta pregunta?")) {
      try {
        await axios.delete(`${API_URL}/preguntas/eliminar/${id}`);
        setPreguntas(preguntas.filter((pregunta) => pregunta._id !== id));
      } catch (err) {
        setError("Error al eliminar la pregunta.");
      }
    }
  };

  // Manejo de cambios en el formulario del modal
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envío del formulario para actualizar o agregar
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `${API_URL}/preguntas/actualizar/${currentPreguntaId}`,
          formData
        );
        setPreguntas(preguntas.map((pregunta) =>
          pregunta._id === currentPreguntaId ? response.data.pregunta : pregunta
        ));
      } else {
        const response = await axios.post(`${API_URL}/preguntas/agregar`, formData);
        setPreguntas([...preguntas, response.data.pregunta]);
      }
      setShowModal(false);
    } catch (err) {
      setError(isEditing ? "Error al actualizar la pregunta." : "Error al agregar la pregunta.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Administración de Preguntas</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {loading ? (
        <p className="text-center">Cargando preguntas...</p>
      ) : (
        <>
          <Button variant="success" className="mb-3" onClick={handleAdd}>
            Agregar Pregunta
          </Button>
          {preguntas.map((pregunta) => (
            <Card key={pregunta._id} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="text-center fw-bold">Pregunta</Card.Title>
                <p>
                  <strong>Pregunta:</strong> {pregunta.pregunta}
                </p>
                <p>
                  <strong>Respuesta:</strong> {pregunta.respuesta}
                </p>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(pregunta._id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(pregunta._id)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {/* Modal para editar o agregar las preguntas */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Pregunta" : "Agregar Pregunta"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Pregunta</Form.Label>
              <Form.Control
                type="text"
                name="pregunta"
                value={formData.pregunta}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Respuesta</Form.Label>
              <Form.Control
                type="text"
                name="respuesta"
                value={formData.respuesta}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? "Guardar Cambios" : "Agregar"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdmPreguntas;
