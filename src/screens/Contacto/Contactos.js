import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contactos = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center fw-bold">Contáctanos</h2>
      <p className="text-center text-muted">Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.</p>
      
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col md={4}>
          <h5>Teléfono</h5>
          <p>+52 55 1234 5678</p>
        </Col>
        <Col md={4}>
          <h5>Email</h5>
          <p>contacto@nexusitc.com</p>
        </Col>
        <Col md={4}>
          <h5>Dirección</h5>
          <p>Av. Tecnología Verde #123, CDMX, México</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contactos;