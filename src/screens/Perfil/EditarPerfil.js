// EditarPerfil.js
import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../screens/UserContext/UserContext';

const EditarPerfil = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    email: '',
    sexo: '',
    edad: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Obtener datos actuales del usuario al cargar el componente
  useEffect(() => {
    if (!user) return;
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/usuarios/${user._id}`);
        setPerfil({
          nombre: response.data.nombre || '',
          apellidoP: response.data.apellidoP || '',
          apellidoM: response.data.apellidoM || '',
          telefono: response.data.telefono || '',
          email: response.data.email || '',
          sexo: response.data.sexo || '',
          edad: response.data.edad || ''
        });
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del perfil.');
      }
    };

    fetchPerfil();
  }, [user]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    });
  };

  // Envío del formulario para actualizar el perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.put(`http://localhost:5000/usuarios/${user._id}`, perfil);
      if (response.data && response.data.mensaje) {
        setSuccess(response.data.mensaje);
      } else {
        setSuccess('Perfil actualizado exitosamente.');
      }
      // Actualizar el contexto con la nueva info (opcional)
      setUser(response.data.usuario || { ...user, ...perfil });
      setTimeout(() => {
        navigate('/perfil');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el perfil.');
    }
  };

  // Si no hay usuario logueado, se muestra un mensaje
  if (!user) {
    return (
      <Container className="mt-4">
        <h4>No has iniciado sesión.</h4>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: '600px' }} className="mt-4">
      <h2 className="text-center mb-4">Editar Perfil</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formApellidoP">
          <Form.Label>Apellido Paterno</Form.Label>
          <Form.Control
            type="text"
            name="apellidoP"
            value={perfil.apellidoP}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formApellidoM">
          <Form.Label>Apellido Materno</Form.Label>
          <Form.Control
            type="text"
            name="apellidoM"
            value={perfil.apellidoM}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={perfil.telefono}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSexo">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            name="sexo"
            value={perfil.sexo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEdad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="edad"
            value={perfil.edad}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarPerfil;
