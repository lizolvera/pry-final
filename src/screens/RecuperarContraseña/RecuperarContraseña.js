import React, { useState } from 'react';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RecuperarContrasena = () => {
  const API_URL = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [pre_id, setPreId] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Preguntas de recuperación locales
  const preguntas = [
    { _id: "1", pregunta: "¿Cuál es el nombre de tu mascota?" },
    { _id: "2", pregunta: "¿Cuál es tu comida favorita?" },
  ];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/usuarios/enviar-pregunta`, { email });
      setSuccess(response.data.mensaje);
      setPreId(response.data.pregunta.pre_id); // Guarda el ID de la pregunta

      // Busca y guarda la pregunta secreta usando el ID
      const preguntaEncontrada = preguntas.find(p => p._id === response.data.pregunta.pre_id.toString());
      if (preguntaEncontrada) {
        setPreguntaSecreta(preguntaEncontrada.pregunta);
      } else {
        setError("Pregunta no encontrada.");
        return;
      }

      setStep(2);
      setError(null);
    } catch (err) {
      console.error("Error al enviar la pregunta:", err); // Verifica el error
      setError(err.response?.data?.mensaje || "Error al enviar la pregunta.");
      setSuccess(null);
    }
  };

  const handleRespuestaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/usuarios/verificar-respuesta`, { email, respuesta });
      if (response.data && response.data.mensaje === 'Respuesta verificada exitosamente') {
        setStep(3);
        setError(null);
      } else {
        setError(response.data.mensaje || "Respuesta incorrecta.");
      }
    } catch (err) {
      setError("Error al verificar la respuesta secreta.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      console.log("Enviando datos para cambiar contraseña:", { email, nuevaContrasena }); // Verifica los datos que se están enviando
      const response = await axios.post(`${API_URL}/usuarios/cambiar-contrasena`, { email, nuevaContrasena });
      console.log("Respuesta del backend:", response.data); // Verifica la respuesta del backend
      if (response.data && response.data.mensaje === 'Contraseña actualizada exitosamente') {
        setSuccess("Contraseña actualizada exitosamente. Redirigiendo al login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.mensaje || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      console.error("Error al cambiar la contraseña:", err); // Verifica el error
      setError("Error al cambiar la contraseña.");
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }} className="mt-5">
      <h2 className="text-center mb-4">Recuperar Contraseña</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {step === 1 && (
        <Form onSubmit={handleEmailSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleRespuestaSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Pregunta Secreta</Form.Label>
            <Form.Control type="text" value={preguntaSecreta} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Respuesta</Form.Label>
            <Form.Control type="text" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Verificar Respuesta
          </Button>
        </Form>
      )}

      {step === 3 && (
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
              />
              <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                required
              />
              <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Cambiar Contraseña
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default RecuperarContrasena;