import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/cartproductos/cartproductos';
import { Container, Row, Col, Spinner, Alert, Dropdown } from 'react-bootstrap';

const ProductosCat = () => {
    const [productos, setProductos] = useState([]);
    const [catalogos, setCatalogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const categoriaSeleccionada = searchParams.get("categoria") || "Todos";
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState("Todos los catálogos");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener productos
                const respuestaProductos = await axios.get('http://localhost:5000/Productos');
                setProductos(respuestaProductos.data);
                
                // Obtener catálogos
                const respuestaCatalogos = await axios.get('http://localhost:5000/Catalogos');
                setCatalogos(respuestaCatalogos.data);
                
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
        
        // Filtrar por catálogo si no es "Todos"
        if (catalogoSeleccionado !== "Todos los catálogos") {
            const catalogo = catalogos.find(cat => cat.nombre === catalogoSeleccionado);
            if (catalogo) {
                const idsProductosCatalogo = catalogo.productos.map(p => p._id);
                filtrados = filtrados.filter(producto => idsProductosCatalogo.includes(producto._id));
            }
        }
        
        return filtrados;
    };

    const handleSelectCatalogo = (catalogo) => {
        setCatalogoSeleccionado(catalogo);
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#2B2347", fontWeight: "bold" }}>
                    {categoriaSeleccionada === "Todos" ? "Todos los Productos" : `Productos de ${categoriaSeleccionada}`}
                </h2>
                
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-catalogos">
                        {catalogoSeleccionado}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSelectCatalogo("Todos los catálogos")}>
                            Todos los catálogos
                        </Dropdown.Item>
                        {catalogos.map(catalogo => (
                            <Dropdown.Item 
                                key={catalogo._id} 
                                onClick={() => handleSelectCatalogo(catalogo.nombre)}
                            >
                                {catalogo.nombre}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <Row>
                {productosFiltrados().length > 0 ? (
                    productosFiltrados().map(producto => (
                        <Col key={producto._id} md={4} className="mb-4">
                            <ProductCard 
                                id={producto._id}
                                image={producto.imagenUrl} 
                                title={producto.nombre} 
                                description={producto.descripcion}
                                Precio={producto.precio}
                                Stock={producto.stock}   
                                style={{ border: "1px solid #7A5CFB", borderRadius: "10px" }}
                            />
                        </Col>
                    ))
                ) : (
                    <p className="text-center" style={{ color: "#2B2347" }}>
                        No hay productos en esta categoría{catalogoSeleccionado !== "Todos los catálogos" ? ` y catálogo (${catalogoSeleccionado})` : ''}.
                    </p>
                )}
            </Row>
        </Container>
    );
};

export default ProductosCat;