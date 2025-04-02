import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container, Pagination } from "react-bootstrap";

const EditProductos = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/productos";

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Redirigir al formulario de edición con el ID del producto
  const editarProducto = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  // Eliminar un producto por ID
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Producto eliminado correctamente");
        obtenerProductos(); // Recargar la lista de productos
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  // Agregar un nuevo producto
  const agregarProducto = () => {
    navigate("/agg-productos");
  };

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Desplazar al inicio al cambiar de página
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-success mb-4">Administrar Productos</h2>

      {/* Botón para agregar producto */}
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
          {currentProducts.length > 0 ? (
            currentProducts.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => editarProducto(producto._id)}
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

      {/* Paginación */}
      <Pagination className="justify-content-center mt-3">
        {Array.from({ length: Math.ceil(productos.length / productsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );
};

export default EditProductos;
