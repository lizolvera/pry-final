import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AdminPoliticas = () => {
  const API_URL = "http://localhost:5000";
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPoliticaId, setCurrentPoliticaId] = useState(null);
  const [formData, setFormData] = useState({
    politicaDeUso: "",
    politicaDePrivacidad: "",
    terminosYCondiciones: "",
  });

  // Obtener las políticas al montar el componente
  useEffect(() => {
    fetchPoliticas();
  }, []);

  const fetchPoliticas = async () => {
    try {
      const response = await axios.get(`${API_URL}/politicas/ver`);
      setPoliticas(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las políticas.");
      setLoading(false);
    }
  };

  // Manejar edición: abre el modal de edición
  const handleEdit = (id) => {
    const politicaToEdit = politicas.find((politica) => politica._id === id);
    setFormData({
      politicaDeUso: politicaToEdit.politicaDeUso,
      politicaDePrivacidad: politicaToEdit.politicaDePrivacidad,
      terminosYCondiciones: politicaToEdit.terminosYCondiciones,
    });
    setIsEditing(true);
    setCurrentPoliticaId(id);
    setShowModal(true);
  };

  // Manejar adición: abre el modal de adición
  const handleAdd = () => {
    setIsEditing(false);
    setCurrentPoliticaId(null);
    setFormData({
      politicaDeUso: "",
      politicaDePrivacidad: "",
      terminosYCondiciones: "",
    });
    setShowModal(true);
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta política?")) {
      try {
        await axios.delete(`${API_URL}/politicas/eliminar/${id}`);
        setPoliticas(politicas.filter((politica) => politica._id !== id));
      } catch (err) {
        setError("Error al eliminar la política.");
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
          `${API_URL}/politicas/actualizar/${currentPoliticaId}`,
          formData
        );
        setPoliticas(politicas.map((politica) =>
          politica._id === currentPoliticaId ? response.data.politicas : politica
        ));
      } else {
        const response = await axios.post(`${API_URL}/politicas/agregar`, formData);
        setPoliticas([...politicas, response.data.politica]);
      }
      setShowModal(false);
    } catch (err) {
      setError(isEditing ? "Error al actualizar la política." : "Error al agregar la política.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Administración de Políticas</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {loading ? (
        <p className="text-center">Cargando políticas...</p>
      ) : (
        <>
          <Button variant="success" className="mb-3" onClick={handleAdd}>
            Agregar Política
          </Button>
          {politicas.map((politica) => (
            <Card key={politica._id} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="text-center fw-bold">Política</Card.Title>
                <p>
                  <strong>Política de Uso:</strong> {politica.politicaDeUso}
                </p>
                <p>
                  <strong>Política de Privacidad:</strong> {politica.politicaDePrivacidad}
                </p>
                <p>
                  <strong>Términos y Condiciones:</strong> {politica.terminosYCondiciones}
                </p>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(politica._id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(politica._id)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {/* Modal para editar o agregar las políticas */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Política" : "Agregar Política"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Política de Uso</Form.Label>
              <Form.Control
                type="text"
                name="politicaDeUso"
                value={formData.politicaDeUso}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Política de Privacidad</Form.Label>
              <Form.Control
                type="text"
                name="politicaDePrivacidad"
                value={formData.politicaDePrivacidad}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Términos y Condiciones</Form.Label>
              <Form.Control
                type="text"
                name="terminosYCondiciones"
                value={formData.terminosYCondiciones}
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

export default AdminPoliticas;
