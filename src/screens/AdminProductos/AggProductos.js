import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AggProductos = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [categoria, setCategoria] = useState('Puertas');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!nombre || !descripcion || !precio || !stock || !imagenUrl || !categoria) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      imagenUrl,
      categoria
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/productos',
        nuevoProducto
      );
      if (response.status === 201) {
        setMensaje('Producto agregado exitosamente');
        // Limpiar el formulario
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setImagenUrl('');
        setCategoria('Puertas');
        navigate('/ProductosCat');
      } else {
        setMensaje('Error al agregar producto');
      }
    } catch (error) {
      setMensaje('Error al agregar producto: ' + error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Agregar Producto</h2>
      {mensaje && <Alert variant="info">{mensaje}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="descripcion" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="precio" className="mt-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="stock" className="mt-3">
          <Form.Label>Stock disponible</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el stock disponible"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="imagenUrl" className="mt-3">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la URL de la imagen"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="categoria" className="mt-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Puertas">Puertas</option>
            <option value="Herramientas">Herramientas</option>
            <option value="Camaras">Camaras</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default AggProductos;
