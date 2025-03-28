import React from "react";
import { Offcanvas, Nav, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaBell, FaShoppingCart, FaList, FaKey, FaSignOutAlt, FaTools, FaHome } from "react-icons/fa";

const Menu = ({ isOpen, onClose }) => {
    return (
        <Offcanvas show={isOpen} onHide={onClose} className="bg-dark text-white">
            <Offcanvas.Header closeButton className="border-bottom" style={{ borderColor: "#7A5CFB" }}>
                <Offcanvas.Title className="fw-bold fs-4" style={{ color: "#00D283" }}>Menú</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
                <ListGroup variant="flush">
                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaHome style={{ color: "#00D283" }} /> Inicio
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/perfil" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaUser style={{ color: "#00D283" }} /> Perfil
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/productos" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaShoppingCart style={{ color: "#00D283" }} /> Productos
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/configuracion" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaCog style={{ color: "#00D283" }} /> Configuración
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/notificaciones" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaBell style={{ color: "#00D283" }} /> Notificaciones
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/herramientas" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaTools style={{ color: "#00D283" }} /> Herramientas
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-dark border-0">
                        <Nav.Link as={Link} to="/cerrar-sesion" className="d-flex align-items-center gap-3 text-white fw-bold fs-5">
                            <FaSignOutAlt style={{ color: "#00D283" }} /> Cerrar Sesión
                        </Nav.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Menu;
