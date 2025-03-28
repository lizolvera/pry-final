import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { FiShield } from "react-icons/fi";

const Footer = () => {
  return (
    <footer style={{
      background: "linear-gradient(135deg, #1A103D 0%, #2B2347 100%)",
      color: "white",
      padding: "4rem 0 2rem",
      borderTop: "1px solid rgba(122, 92, 251, 0.3)"
    }}>
      <Container>
        <Row className="g-4">
          {/* Logo y descripción */}
          <Col lg={3} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FiShield style={{ 
                fontSize: "2rem", 
                color: "#7A5CFB",
                marginRight: "10px"
              }}/>
              <h3 style={{
                background: "linear-gradient(90deg, #00FF9D, #7A5CFB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
                margin: 0
              }}>
                NEXUS.ITC
              </h3>
            </div>
            <p style={{ 
              color: "#CCCCCC",
              lineHeight: "1.6",
              fontSize: "0.9rem"
            }}>
              Líderes en soluciones tecnológicas de seguridad, ofreciendo protección 
              inteligente y confiable para tu hogar y negocio.
            </p>
            
            {/* Redes sociales */}
            <div className="d-flex mt-4" style={{ gap: "1rem" }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon"
                style={{ color: "#7A5CFB" }}>
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon"
                style={{ color: "#7A5CFB" }}>
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon"
                style={{ color: "#7A5CFB" }}>
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon"
                style={{ color: "#7A5CFB" }}>
                <FaLinkedin size={18} />
              </a>
            </div>
          </Col>

          {/* Quiénes Somos (nueva columna) */}
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              color: "#00FF9D",
              fontWeight: "600",
              marginBottom: "1.5rem",
              fontSize: "1.1rem"
            }}>Quiénes Somos</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2" }}>
              <li>
                <Link to="/quienes-somos" className="footer-link">
                  Misión y Visión
                </Link>
              </li>
              <li>
                <Link to="/Historia-Antecedentes" className="footer-link">
                  Historia y Antecedentes
                </Link>
              </li>
              <li>
                <Link to="/Politicas" className="footer-link">
                  Políticas
                </Link>
              </li>
            </ul>
          </Col>

          {/* Enlaces de contacto */}
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              color: "#00FF9D",
              fontWeight: "600",
              marginBottom: "1.5rem",
              fontSize: "1.1rem"
            }}>Contacto</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2" }}>
              <li>
                <Link to="/Contactos" className="footer-link">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="footer-link">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/ubicacion" className="footer-link">
                  Ubicación
                </Link>
              </li>
            </ul>
          </Col>

          {/* Información de contacto detallada */}
          <Col lg={3} md={6} className="mb-4">
            <h5 style={{
              color: "#00FF9D",
              fontWeight: "600",
              marginBottom: "1.5rem",
              fontSize: "1.1rem"
            }}>Datos de Contacto</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2" }}>
              <li className="d-flex align-items-start mb-3">
                <FaMapMarkerAlt className="me-3 mt-1" style={{ color: "#7A5CFB" }} />
                <span style={{ color: "#CCCCCC" }}>
                  Av. Tecnología 1234, Distrito Innovación, Ciudad Digital
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaPhoneAlt className="me-3 mt-1" style={{ color: "#7A5CFB" }} />
                <span style={{ color: "#CCCCCC" }}>
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaEnvelope className="me-3 mt-1" style={{ color: "#7A5CFB" }} />
                <span style={{ color: "#CCCCCC" }}>
                  info@nexusitc.com
                </span>
              </li>
              <li className="d-flex align-items-start">
                <FaClock className="me-3 mt-1" style={{ color: "#7A5CFB" }} />
                <span style={{ color: "#CCCCCC" }}>
                  Lunes a Viernes: 9:00 - 18:00
                </span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Derechos de autor */}
        <Row className="mt-5">
          <Col className="text-center">
            <div style={{ 
              borderTop: "1px solid rgba(122, 92, 251, 0.2)",
              paddingTop: "1.5rem"
            }}>
              <p style={{ 
                color: "#999999",
                fontSize: "0.8rem",
                margin: 0
              }}>
                © {new Date().getFullYear()} NEXUS.ITC. Todos los derechos reservados.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;