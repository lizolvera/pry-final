import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const EditarProducto = () => {
  const { id } = useParams(); // 🔥 Obtiene el ID del producto desde la URL
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/productos"; // ✅ URL de la API

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagenUrl: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto();
  }, []);

  // 🔥 Obtener los datos del producto a editar
  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setFormData({
        nombre: response.data.nombre,
        descripcion: response.data.descripcion,
        precio: response.data.precio,
        categoria: response.data.categoria,
        imagenUrl: response.data.imagenUrl,
        stock: response.data.stock,
      });
      setLoading(false);
    } catch (error) {
      setError("Error al obtener los datos del producto.");
      setLoading(false);
    }
  };

  // 🔥 Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Enviar datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/${id}`, formData);
      alert("Producto actualizado correctamente");
      navigate("/editar-productos"); // ✅ Redirige a la página de administración
    } catch (error) {
      setError("Error al actualizar el producto.");
    }
  };

  if (loading) {
    return <p className="text-center">Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center text-success">Editar Producto</h2>
      <Form onSubmit={handleSubmit} className="shadow-lg p-4 bg-white rounded">
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen URL</Form.Label>
          <Form.Control
            type="text"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock Disponible</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate("/editar-productos")}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarProducto;
