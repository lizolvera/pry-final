import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../screens/UserContext/UserContext'; // Ajusta la ruta según tu estructura
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Producto en uso (Puerta Sentinel)
  const productoEnUso = {
    nombre: 'Puerta Sentinel',
    descripcion: 'Puerta de seguridad avanzada',
    estado: 'Activo',
  };

  // Al montar el componente, si hay un user logeado, 
  // llama al backend para obtener sus datos completos
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPerfil = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/usuarios/${user._id}`);
          setPerfil(response.data);
      } catch (error) {
          console.error('Error al obtener perfil:', error);
          setError('No se pudo cargar el perfil. Intenta nuevamente.');
      } finally {
          setLoading(false);
      }
  };  

    fetchPerfil();
  }, [user]);

  // Si no hay usuario logeado, muestra un mensaje
  if (!user) {
    return (
      <Container className="mt-4">
        <h4>No has iniciado sesión.</h4>
      </Container>
    );
  }

  // Mientras cargan los datos, muestra un spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" style={{ color: "#7A5CFB" }}>
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p style={{ color: "#2B2347", marginTop: "10px" }}>Cargando perfil...</p>
      </div>
    );
  }

  // Si hay un error, muestra un mensaje
  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        {error}
      </Alert>
    );
  }

  // Maneja el clic en "Editar Perfil"
  const handleEditarPerfil = () => {
    navigate('/EditarPerfil');
  };

  return (
    <Container style={{ maxWidth: '800px', backgroundColor: '#1A1137', padding: '20px', borderRadius: '15px' }} className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#00FFBF" }}>Perfil de Usuario</h2>

      {/* Sección de Información Personal */}
      <Card className="mb-4" style={{ backgroundColor: '#2A1A5E', borderRadius: '15px', border: '1px solid #00FFBF' }}>
        <Card.Body>
          <h4 style={{ color: "#00FFBF", marginBottom: '20px' }}>Información Personal</h4>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={perfil.nombre || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                value={perfil.apellidoP || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                value={perfil.apellidoM || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={perfil.telefono || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={perfil.email || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Sexo</Form.Label>
              <Form.Control
                type="text"
                value={perfil.sexo || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#CCCCCC" }}>Edad</Form.Label>
              <Form.Control
                type="number"
                value={perfil.edad || ''}
                readOnly
                style={{ backgroundColor: '#1A1137', color: '#FFFFFF', border: '1px solid #00FFBF' }}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              onClick={handleEditarPerfil}
              style={{ backgroundColor: '#00FFBF', border: 'none', color: '#000', fontWeight: 'bold' }}
            >
              Editar Perfil
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Sección de Producto en Uso */}
      <Card className="mb-4" style={{ backgroundColor: '#2A1A5E', borderRadius: '15px', border: '1px solid #00FFBF' }}>
        <Card.Body>
          <h4 style={{ color: "#00FFBF", marginBottom: '20px' }}>Producto en Uso</h4>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img
              src="../../imgs/gratis-png-puerta.png" // Cambia por la URL de la imagen del producto
              alt={productoEnUso.nombre}
              style={{ width: '100px', height: '100px', borderRadius: '10px', marginRight: '20px' }}
            />
            <div>
              <h5 style={{ color: "#FFFFFF" }}>{productoEnUso.nombre}</h5>
              <p style={{ color: "#CCCCCC" }}>{productoEnUso.descripcion}</p>
              <p style={{ color: "#00FFBF", fontWeight: 'bold' }}>Estado: {productoEnUso.estado}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Sección de Seguridad */}
      <Card style={{ backgroundColor: '#2A1A5E', borderRadius: '15px', border: '1px solid #00FFBF' }}>
        <Card.Body>
          <h4 style={{ color: "#00FFBF", marginBottom: '20px' }}>Seguridad</h4>

          <Button
            variant="danger"
            className="w-100"
            style={{ backgroundColor: '#FF4444', border: 'none', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil;