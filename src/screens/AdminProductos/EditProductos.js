import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const EditProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/productos"; // ✅ URL de la API corregida

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔥 Obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/`); // ✅ Ruta corregida
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // 🔥 Redirigir al formulario de edición con el ID del producto
  const editarProducto = (id) => {
    console.log(`Redirigiendo a /editar-producto/${id}`); // ✅ Debugging para ver el ID
    navigate(`/editar-producto/${id}`); // ✅ Ahora va a `EditarProductos.js`
  };

  // 🔥 Eliminar un producto por ID
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`); // ✅ Ruta corregida para eliminar
        alert("Producto eliminado correctamente");
        obtenerProductos(); // 🔄 Recargar la lista de productos
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  // 🔥 Agregar un nuevo producto
  const agregarProducto = () => {
    navigate("/agg-productos"); // ✅ Redirige a la página para agregar productos
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-success mb-4">Administrar Productos</h2>

      {/* ✅ Botón para agregar producto */}
      <Button variant="success" className="mb-3" onClick={agregarProducto}>
        + Agregar Producto
      </Button>

      <Table striped bordered hover responsive className="shadow-lg">
        <thead className="bg-success text-white text-center">
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => editarProducto(producto._id)} // ✅ Redirige a `EditarProductos.js`
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EditProductos;
