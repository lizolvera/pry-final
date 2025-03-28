import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const AdmUsuarios = () => {
  const API_URL = "http://localhost:5000";
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // =============================
  // Obtención del listado de usuarios
  // =============================
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/`);
      setUsuarios(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al obtener los usuarios.");
      setLoading(false);
    }
  };

  // =============================
  // Función para eliminar usuario
  // =============================
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await axios.delete(`${API_URL}/usuarios/${id}`);
        setUsuarios(usuarios.filter((u) => u._id !== id));
      } catch (err) {
        setError("Error al eliminar el usuario.");
      }
    }
  };

  // =============================
  // Funciones para editar usuario
  // =============================
  const handleEditClick = (usuario) => {
    setCurrentUser(usuario);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifica en consola lo que se enviará
      console.log("Usuario a actualizar:", currentUser);
      
      const response = await axios.put(`${API_URL}/usuarios/${currentUser._id}`, currentUser);
      setUsuarios(
        usuarios.map((u) => (u._id === currentUser._id ? response.data.usuario : u))
      );
      setShowEditModal(false);
      setCurrentUser(null);
    } catch (err) {
      setError("Error al actualizar el usuario.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Administración de Usuarios</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>
                  {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                </td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.rol}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditClick(usuario)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuario._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={currentUser.nombre}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidoP"
                  value={currentUser.apellidoP}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              {/* Campo agregado para Apellido Materno */}
              <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidoM"
                  value={currentUser.apellidoM}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={currentUser.telefono}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="rol"
                  value={currentUser.rol}
                  onChange={handleEditChange}
                  required
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar cambios
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdmUsuarios;
