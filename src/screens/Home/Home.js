import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import logo from "./logo.jpg";
import ProductList from "../../components/cartproductos/productoslist";

const Home = () => {
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #1A103D 0%, #0A061F 100%)",
        minHeight: "100vh",
        paddingTop: "60px",
        fontFamily: "'Montserrat', sans-serif",
        color: "#FFFFFF",
        overflowX: "hidden"
      }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="order-md-1 order-2">
              <h1 className="display-4 fw-bold mb-3" style={{ color: "#00FF9D" }}>
                Innovación en <span style={{ color: "#7A5CFB" }}>Seguridad Tecnológica</span>
              </h1>
              <p className="lead mb-4" style={{ color: "#E0E0E0" }}>
                Soluciones inteligentes para proteger lo que más valoras. 
                Tecnología avanzada y seguridad confiable en un solo lugar.
              </p>
            </Col>
            <Col md={6} className="order-md-2 order-1 mb-4 mb-md-0">
              <div className="hero-image-container">
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid rounded-3"
                  style={{
                    boxShadow: "0 10px 30px rgba(122, 92, 251, 0.4)",
                    border: "2px solid rgba(122, 92, 251, 0.3)"
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 my-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ color: "#00FF9D" }}>
            ¿Por qué elegir Nexus.ITC?
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-shield-lock" style={{ fontSize: "2rem", color: "#7A5CFB" }}></i>
                  </div>
                  <h3 style={{ color: "#00FF9D" }}>Seguridad Avanzada</h3>
                  <p className="text-muted">
                    Sistemas de protección con tecnología de punta y actualizaciones constantes.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-cpu" style={{ fontSize: "2rem", color: "#7A5CFB" }}></i>
                  </div>
                  <h3 style={{ color: "#00FF9D" }}>Innovación Constante</h3>
                  <p className="text-muted">
                    Desarrollamos soluciones adaptadas a las necesidades del futuro.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-headset" style={{ fontSize: "2rem", color: "#7A5CFB" }}></i>
                  </div>
                  <h3 style={{ color: "#00FF9D" }}>Soporte 24/7</h3>
                  <p className="text-muted">
                    Nuestro equipo de expertos está disponible para ayudarte en cualquier momento.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-5" style={{ backgroundColor: "rgba(122, 92, 251, 0.1)" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img 
                src={logo} 
                alt="Logo" 
                className="img-fluid rounded-3 shadow-lg" 
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-4" style={{ color: "#00FF9D" }}>Sobre Nosotros</h2>
              <p className="mb-4">
                En <strong>Nexus.ITC</strong> fusionamos la última tecnología con soluciones de seguridad 
                robustas para ofrecerte protección inteligente y confiable.
              </p>
              <p className="mb-4">
                Nuestro equipo de ingenieros y especialistas en ciberseguridad trabajan 
                incansablemente para anticiparse a las amenazas del mañana.
              </p>
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-light me-3 rounded-pill">
                  Conoce al equipo
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-5 my-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ color: "#00FF9D" }}>
            Nuestras Soluciones
          </h2>
          <ProductList />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: "rgba(0, 255, 157, 0.1)" }}>
        <Container className="text-center py-4">
          <h2 className="fw-bold mb-4" style={{ color: "#00FF9D" }}>
            ¿Listo para llevar tu seguridad al siguiente nivel?
          </h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Contáctanos hoy mismo y descubre cómo podemos proteger lo que más te importa.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default Home;