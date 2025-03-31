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
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 100%)", // Fondo degradado moderno
        padding: "20px",
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '15px',
          border: 'none',
          backgroundColor: "#FFFFFF",
          backdropFilter: "blur(10px)", // Efecto de desenfoque para un toque moderno
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#2B2347",
            fontWeight: "bold",
            fontSize: "28px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Sombra sutil para el texto
          }}
        >
          Recuperar Contraseña Por Correo
        </h2>
        {error && (
          <div
            className="alert alert-danger text-center"
            style={{
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: "#FF6B6B", // Rojo suave para errores
              color: "#FFFFFF",
              border: "none",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="alert alert-success text-center"
            style={{
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: "#00D283", // Verde suave para éxito
              color: "#FFFFFF",
              border: "none",
            }}
          >
            {success}
          </div>
        )}

        {step === 1 && (
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#2B2347",
                  fontWeight: "500",
                }}
              >
                Correo Electrónico
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid #7A5CFB",
                  padding: "10px",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#00D283",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil para el botón
                transition: "background-color 0.3s ease", // Transición suave
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#00B875"} // Efecto hover
              onMouseLeave={(e) => e.target.style.backgroundColor = "#00D283"}
            >
              Enviar
            </Button>
            <div className="text-center mt-3">
              <button
                className="btn btn-link text-decoration-none"
                style={{
                  color: "#7A5CFB",
                  fontWeight: "500",
                  transition: "color 0.3s ease", // Transición suave
                }}
                onClick={() => navigate("/solicitar-restablecimiento")}
                onMouseEnter={(e) => e.target.style.color = "#5A4FCF"} // Efecto hover
                onMouseLeave={(e) => e.target.style.color = "#7A5CFB"}
              >
                ¿Recuperar contraseña por token?
              </button>
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleRespuestaSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#2B2347",
                  fontWeight: "500",
                }}
              >
                Pregunta Secreta
              </Form.Label>
              <Form.Control
                type="text"
                value={preguntaSecreta}
                readOnly
                style={{
                  borderRadius: "10px",
                  border: "1px solid #7A5CFB",
                  padding: "10px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#2B2347",
                  fontWeight: "500",
                }}
              >
                Respuesta
              </Form.Label>
              <Form.Control
                type="text"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid #7A5CFB",
                  padding: "10px",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#00D283",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil para el botón
                transition: "background-color 0.3s ease", // Transición suave
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#00B875"} // Efecto hover
              onMouseLeave={(e) => e.target.style.backgroundColor = "#00D283"}
            >
              Verificar Respuesta
            </Button>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#2B2347",
                  fontWeight: "500",
                }}
              >
                Nueva Contraseña
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #7A5CFB",
                    padding: "10px",
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#7A5CFB",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    border: "none",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#2B2347",
                  fontWeight: "500",
                }}
              >
                Confirmar Nueva Contraseña
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #7A5CFB",
                    padding: "10px",
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#7A5CFB",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    border: "none",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#00D283",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil para el botón
                transition: "background-color 0.3s ease", // Transición suave
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#00B875"} // Efecto hover
              onMouseLeave={(e) => e.target.style.backgroundColor = "#00D283"}
            >
              Cambiar Contraseña
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RecuperarContrasena;