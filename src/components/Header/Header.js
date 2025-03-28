import React, { useContext, useState } from "react";
import { 
  Container, 
  Navbar, 
  Nav, 
  Button, 
  Dropdown, 
  Badge,
  Offcanvas,
  ListGroup 
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaBars, 
  FaBoxOpen, 
  FaSignOutAlt, 
  FaCogs, 
  FaShoppingCart, 
  FaBell, 
  FaHome,
  FaCog,
  FaTools,
  FaList,
  FaKey
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import logo from "./logo.jpg";
import { UserContext } from "../../screens/UserContext/UserContext";
import { FaComputer } from "react-icons/fa6";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications] = useState(3);

    const categorias = [
        { name: "Todos", icon: <FaBoxOpen className="me-2" /> },
        { name: "Puertas", icon: <i className="bi bi-door-closed me-2"></i> },
        { name: "Sensores", icon: <i className="bi bi-sensor me-2"></i> },
        { name: "Cámaras", icon: <i className="bi bi-camera-video me-2"></i> },
        { name: "Alarmas", icon: <i className="bi bi-alarm me-2"></i> },
        { name: "Cerraduras", icon: <i className="bi bi-lock me-2"></i> }
    ];

    const handleLogout = () => {
        setUser(null);
        navigate("/login");
    };

    const handleSelectCategoria = (categoria) => {
        if (categoria === "Todos") {
            navigate("/ProductosCat");
        } else {
            navigate(`/ProductosCat?categoria=${encodeURIComponent(categoria)}`);
        }
    };

    // Componente del menú lateral (Offcanvas)
    const SideMenu = ({ isOpen, onClose }) => {
        return (
            <Offcanvas show={isOpen} onHide={onClose} className="bg-dark text-white">
                <Offcanvas.Header closeButton className="border-bottom" style={{ borderColor: "#7A5CFB" }}>
                    <Offcanvas.Title className="fw-bold fs-4" style={{ color: "#00FF9D" }}>
                        Menú NEXUS.ITC
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className="p-0">
                    <ListGroup variant="flush">
                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/perfil" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaUser style={{ color: "#7A5CFB" }} /> 
                                <span>Perfil</span>
                            </Nav.Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/productos" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaBoxOpen style={{ color: "#7A5CFB" }} /> 
                                <span>Productos</span>
                            </Nav.Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/control-iot" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaComputer style={{ color: "#7A5CFB" }} /> 
                                <span>Control IoT</span>
                            </Nav.Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/configuracion" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaCog style={{ color: "#7A5CFB" }} /> 
                                <span>Configuración</span>
                            </Nav.Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/notificaciones" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaBell style={{ color: "#7A5CFB" }} /> 
                                <span>Notificaciones</span>
                                {notifications > 0 && (
                                    <Badge pill bg="danger" className="ms-auto">
                                        {notifications}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </ListGroup.Item>

                        {user?.rol === "Admin" && (
                            <>
                                <ListGroup.Item className="bg-dark border-0">
                                    <div className="text-muted small px-3 py-2">ADMINISTRACIÓN</div>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark border-0">
                                    <Nav.Link 
                                        as={Link} 
                                        to="/admin-usuarios" 
                                        className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                        onClick={onClose}
                                    >
                                        <FaUser style={{ color: "#7A5CFB" }} /> 
                                        <span>Usuarios</span>
                                    </Nav.Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark border-0">
                                    <Nav.Link 
                                        as={Link} 
                                        to="/editar-productos" 
                                        className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                        onClick={onClose}
                                    >
                                        <FaList style={{ color: "#7A5CFB" }} /> 
                                        <span>Productos</span>
                                    </Nav.Link>
                                </ListGroup.Item>
                            </>
                        )}

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                as={Link} 
                                to="/herramientas" 
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                                onClick={onClose}
                            >
                                <FaTools style={{ color: "#7A5CFB" }} /> 
                                <span>Herramientas</span>
                            </Nav.Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-dark border-0">
                            <Nav.Link 
                                onClick={() => {
                                    onClose();
                                    handleLogout();
                                }}
                                className="d-flex align-items-center gap-3 text-white py-3 px-3"
                            >
                                <FaSignOutAlt style={{ color: "#FF6B6B" }} /> 
                                <span>Cerrar Sesión</span>
                            </Nav.Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        );
    };

    return (
        <>
            <Navbar expand="lg" className="py-2" style={{
                background: "linear-gradient(135deg, #1A103D 0%, #2B2347 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                position: "sticky",
                top: 0,
                zIndex: 1030
            }}>
                <Container fluid>
                    {/* Logo y menú hamburguesa (izquierda) */}
                    <div className="d-flex align-items-center">
                        <Button
                            variant="link"
                            className="me-2 p-0 d-lg-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ color: "#FFFFFF", fontSize: "1.5rem" }}
                        >
                            <FaBars />
                        </Button>

                        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
                            <img
                                src={logo}
                                alt="NEXUS.ITC Logo"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "contain",
                                    marginRight: "10px"
                                }}
                            />
                            <span style={{
                                fontSize: "1.5rem",
                                fontWeight: "700",
                                background: "linear-gradient(90deg, #00FF9D, #7A5CFB)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                NEXUS.ITC
                            </span>
                        </Navbar.Brand>
                    </div>

                    {/* Menú central (visible en desktop) */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto d-flex align-items-center">
                            <Nav.Link as={Link} to="/" className="text-white mx-2 d-flex align-items-center">
                                <FaHome className="me-1" /> Inicio
                            </Nav.Link>
                            
                            <Dropdown className="mx-2">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-white d-flex align-items-center"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}
                                >
                                    <FaBoxOpen className="me-1" />
                                    Productos
                                    <FiChevronDown className="ms-1" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{
                                    backgroundColor: "#2B2347",
                                    border: "1px solid rgba(122, 92, 251, 0.5)",
                                    borderRadius: "8px",
                                    padding: "0.5rem 0"
                                }}>
                                    {categorias.map((categoria) => (
                                        <Dropdown.Item
                                            key={categoria.name}
                                            onClick={() => handleSelectCategoria(categoria.name)}
                                            className="d-flex align-items-center py-2 px-3"
                                            style={{
                                                color: "#FFFFFF",
                                                transition: "all 0.2s",
                                                borderLeft: "3px solid transparent"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderLeft = "3px solid #7A5CFB"}
                                            onMouseLeave={(e) => e.currentTarget.style.borderLeft = "3px solid transparent"}
                                        >
                                            {categoria.icon}
                                            {categoria.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link as={Link} to="/soluciones" className="text-white mx-2">
                                Soluciones
                            </Nav.Link>
                            <Nav.Link as={Link} to="/nosotros" className="text-white mx-2">
                                Nosotros
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contacto" className="text-white mx-2">
                                Contacto
                            </Nav.Link>
                        </Nav>

                        {/* Menú derecho (acciones de usuario) */}
                        <Nav className="d-flex align-items-center">
                            {user ? (
                                <>
                                    <Button
                                        variant="link"
                                        className="position-relative text-white mx-2"
                                        onClick={() => navigate("/notificaciones")}
                                    >
                                        <FaBell style={{ fontSize: "1.2rem" }} />
                                        {notifications > 0 && (
                                            <Badge
                                                pill
                                                bg="danger"
                                                className="position-absolute top-0 start-100 translate-middle"
                                                style={{ fontSize: "0.6rem" }}
                                            >
                                                {notifications}
                                            </Badge>
                                        )}
                                    </Button>

                                    <Button
                                        variant="link"
                                        className="text-white mx-2"
                                        onClick={() => navigate("/carrito")}
                                    >
                                        <FaShoppingCart style={{ fontSize: "1.2rem" }} />
                                    </Button>

                                    <Button
                                        variant="outline-light"
                                        onClick={() => navigate("/control-iot")}
                                        className="mx-2 d-none d-md-flex align-items-center"
                                        style={{
                                            borderColor: "#7A5CFB",
                                            color: "#7A5CFB",
                                            borderRadius: "20px"
                                        }}
                                    >
                                        <FaComputer className="me-1" />
                                        <span className="d-none d-lg-inline">Control IoT</span>
                                    </Button>

                                    <Dropdown align="end">
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="d-flex align-items-center text-white"
                                            style={{
                                                textDecoration: "none",
                                                background: "rgba(122, 92, 251, 0.2)",
                                                borderRadius: "20px",
                                                padding: "0.5rem 1rem"
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    borderRadius: "50%",
                                                    background: "linear-gradient(135deg, #7A5CFB, #00FF9D)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: "0.5rem",
                                                    color: "white",
                                                    fontWeight: "bold"
                                                }}>
                                                    {user.nombre.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="d-none d-lg-inline">{user.nombre}</span>
                                                <FiChevronDown className="ms-1" />
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{
                                            backgroundColor: "#2B2347",
                                            border: "1px solid rgba(122, 92, 251, 0.5)",
                                            borderRadius: "8px",
                                            minWidth: "200px"
                                        }}>
                                            <Dropdown.Item
                                                as={Link}
                                                to="/perfil"
                                                className="py-2 px-3"
                                                style={{ color: "#FFFFFF" }}
                                            >
                                                <FaUser className="me-2" /> Mi perfil
                                            </Dropdown.Item>
                                            {user?.rol === "Admin" && (
                                                <>
                                                    <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
                                                    <Dropdown.Header className="text-white-50">Administración</Dropdown.Header>
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/admin-usuarios"
                                                        className="py-2 px-3"
                                                        style={{ color: "#FFFFFF" }}
                                                    >
                                                        <FaCogs className="me-2" /> Usuarios
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/editar-productos"
                                                        className="py-2 px-3"
                                                        style={{ color: "#FFFFFF" }}
                                                    >
                                                        <FaCogs className="me-2" /> Productos
                                                    </Dropdown.Item>
                                                    
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/admin-politicas"
                                                        className="py-2 px-3"
                                                        style={{ color: "#FFFFFF" }}
                                                    >
                                                        <FaCogs className="me-2" /> Politicas
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/admin/quienes-somos"
                                                        className="py-2 px-3"
                                                        style={{ color: "#FFFFFF" }}
                                                    >
                                                        <FaCogs className="me-2" /> Quienes somos
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to="/admin-preguntas"
                                                        className="py-2 px-3"
                                                        style={{ color: "#FFFFFF" }}
                                                    >
                                                        <FaCogs className="me-2" /> Preguntas
                                                    </Dropdown.Item>
                                                </>
                                            )}
                                            <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
                                            <Dropdown.Item
                                                onClick={handleLogout}
                                                className="py-2 px-3"
                                                style={{ color: "#FF6B6B" }}
                                            >
                                                <FaSignOutAlt className="me-2" /> Cerrar sesión
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Button
                                        as={Link}
                                        to="/login"
                                        variant="outline-light"
                                        className="mx-2"
                                        style={{
                                            borderColor: "#7A5CFB",
                                            color: "#7A5CFB",
                                            borderRadius: "20px"
                                        }}
                                    >
                                        Iniciar sesión
                                    </Button>
                                    <Button
                                        as={Link}
                                        to="/registro"
                                        className="mx-2 d-none d-md-inline-block"
                                        style={{
                                            background: "linear-gradient(90deg, #7A5CFB, #00FF9D)",
                                            border: "none",
                                            borderRadius: "20px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Registrarse
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                    {/* Botón de menú para móviles (derecha) */}
                    <div className="d-flex align-items-center d-lg-none">
                        {user && (
                            <>
                                <Button
                                    variant="link"
                                    className="text-white mx-1 p-0 position-relative"
                                    onClick={() => navigate("/notificaciones")}
                                >
                                    <FaBell style={{ fontSize: "1.2rem" }} />
                                    {notifications > 0 && (
                                        <Badge
                                            pill
                                            bg="danger"
                                            className="position-absolute top-0 start-100 translate-middle"
                                            style={{ fontSize: "0.6rem" }}
                                        >
                                            {notifications}
                                        </Badge>
                                    )}
                                </Button>
                                <Button
                                    variant="link"
                                    className="text-white mx-1 p-0"
                                    onClick={() => navigate("/carrito")}
                                >
                                    <FaShoppingCart style={{ fontSize: "1.2rem" }} />
                                </Button>
                            </>
                        )}
                        <Navbar.Toggle 
                            aria-controls="basic-navbar-nav" 
                            style={{ border: "none", color: "white" }} 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>
                </Container>
            </Navbar>

            {/* Menú lateral (Offcanvas) */}
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;