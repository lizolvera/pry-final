import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AdminUbicaciones = () => {
  const API_URL = "http://localhost:5000";
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUbicacionId, setCurrentUbicacionId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    latitud: "",
    longitud: "",
    descripcion: "",
  });

  // Obtener las ubicaciones al montar el componente
  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/ver`);
      setUbicaciones(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las ubicaciones.");
      setLoading(false);
    }
  };

  // Manejar edición: abre el modal de edición
  const handleEdit = (id) => {
    const ubicacionToEdit = ubicaciones.find((ubicacion) => ubicacion._id === id);
    setFormData({
      nombre: ubicacionToEdit.nombre,
      latitud: ubicacionToEdit.coordenadas.latitud,
      longitud: ubicacionToEdit.coordenadas.longitud,
      descripcion: ubicacionToEdit.descripcion,
    });
    setIsEditing(true);
    setCurrentUbicacionId(id);
    setShowModal(true);
  };

  // Manejar adición: abre el modal de adición
  const handleAdd = () => {
    setIsEditing(false);
    setCurrentUbicacionId(null);
    setFormData({
      nombre: "",
      latitud: "",
      longitud: "",
      descripcion: "",
    });
    setShowModal(true);
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta ubicación?")) {
      try {
        await axios.delete(`${API_URL}/ubicaciones/eliminar/${id}`);
        setUbicaciones(ubicaciones.filter((ubicacion) => ubicacion._id !== id));
      } catch (err) {
        setError("Error al eliminar la ubicación.");
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
      const ubicacionData = {
        nombre: formData.nombre,
        coordenadas: {
          latitud: parseFloat(formData.latitud),
          longitud: parseFloat(formData.longitud),
        },
        descripcion: formData.descripcion,
      };

      if (isEditing) {
        const response = await axios.put(
          `${API_URL}/ubicaciones/actualizar/${currentUbicacionId}`,
          ubicacionData
        );
        setUbicaciones(ubicaciones.map((ubicacion) =>
          ubicacion._id === currentUbicacionId ? response.data.ubicacion : ubicacion
        ));
      } else {
        const response = await axios.post(`${API_URL}/ubicaciones/agregar`, ubicacionData);
        setUbicaciones([...ubicaciones, response.data.ubicacion]);
      }
      setShowModal(false);
    } catch (err) {
      setError(isEditing ? "Error al actualizar la ubicación." : "Error al agregar la ubicación.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Administración de Ubicaciones</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {loading ? (
        <p className="text-center">Cargando ubicaciones...</p>
      ) : (
        <>
          <Button variant="success" className="mb-3" onClick={handleAdd}>
            Agregar Ubicación
          </Button>
          {ubicaciones.map((ubicacion) => (
            <Card key={ubicacion._id} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="text-center fw-bold">{ubicacion.nombre}</Card.Title>
                <p>
                  <strong>Latitud:</strong> {ubicacion.coordenadas.latitud}
                </p>
                <p>
                  <strong>Longitud:</strong> {ubicacion.coordenadas.longitud}
                </p>
                <p>
                  <strong>Descripción:</strong> {ubicacion.descripcion}
                </p>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(ubicacion._id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(ubicacion._id)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {/* Modal para editar o agregar las ubicaciones */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Ubicación" : "Agregar Ubicación"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Latitud</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="latitud"
                value={formData.latitud}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Longitud</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="longitud"
                value={formData.longitud}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
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

export default AdminUbicaciones;
