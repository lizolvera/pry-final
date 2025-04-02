import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/cartproductos/cartproductos';
import { Container, Row, Col, Spinner, Alert, ListGroup, Pagination } from 'react-bootstrap';

const ProductosCat = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(searchParams.get("categoria") || "Todos");
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
    const productsPerPage = 10;

    const categorias = ["Todos", "Puertas", "Herramientas", "Camaras"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener productos
                const respuestaProductos = await axios.get('http://localhost:5000/productos');
                setProductos(respuestaProductos.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError('No se pudieron cargar los datos. Intenta nuevamente.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const productosFiltrados = () => {
        let filtrados = productos;

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'Todos') {
            filtrados = filtrados.filter(producto => producto.categoria === categoriaSeleccionada);
        }

        return filtrados;
    };

    const handleSelectCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setSearchParams({ categoria, page: 1 }); // Resetear a la primera página al cambiar de categoría
        setCurrentPage(1); // Resetear a la primera página al cambiar de categoría
        window.scrollTo(0, 0); // Desplazar al inicio al cambiar de categoría
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productosFiltrados().slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setSearchParams({ categoria: categoriaSeleccionada, page: pageNumber });
        window.scrollTo(0, 0); // Desplazar al inicio al cambiar de página
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status" style={{ color: "#7A5CFB" }}>
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p style={{ color: "#2B2347", marginTop: "10px" }}>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center mt-5">
                {error}
            </Alert>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                {/* Sección de Categorías */}
                <Col md={3} className="mb-4">
                    <ListGroup>
                        {categorias.map((categoria, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleSelectCategoria(categoria)}
                                active={categoria === categoriaSeleccionada}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: categoria === categoriaSeleccionada ? "#7A5CFB" : "white",
                                    color: categoria === categoriaSeleccionada ? "white" : "#2B2347",
                                    border: "1px solid #7A5CFB"
                                }}
                            >
                                {categoria}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                {/* Sección de Productos */}
                <Col md={9}>
                    <h2 style={{ color: "#2B2347", fontWeight: "bold", fontSize: "2rem", marginBottom: "20px" }}>
                        {categoriaSeleccionada === "Todos" ? "Todos los Productos" : `Productos de ${categoriaSeleccionada}`}
                    </h2>
                    <Row>
                        {currentProducts.length > 0 ? (
                            currentProducts.map(producto => (
                                <Col key={producto._id} md={4} className="mb-4">
                                    <ProductCard
                                        id={producto._id}
                                        image={producto.imagenUrl}
                                        title={producto.nombre}
                                        description={producto.descripcion}
                                        Precio={producto.precio}
                                        Stock={producto.stock}
                                        style={{
                                            border: "1px solid #7A5CFB",
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            transition: "transform 0.2s",
                                            overflow: "hidden"
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p className="text-center" style={{ color: "#2B2347", fontSize: "1.2rem" }}>
                                No hay productos en esta categoría.
                            </p>
                        )}
                    </Row>

                    {/* Paginación */}
                    <Pagination className="justify-content-center">
                        {Array.from({ length: Math.ceil(productosFiltrados().length / productsPerPage) }).map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductosCat;
