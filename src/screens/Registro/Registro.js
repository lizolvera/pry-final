import React, { useState } from "react";
import { Container, Form, Button, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registro = () => {
  // =============================
  // Configuración inicial y estados
  // =============================
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000"; // Ajusta tu URL si es distinto

  const initialFormData = {
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    telefono: "",
    email: "",
    password: "",
    confirmarContraseña: "",
    sexo: "",
    edad: "",
    pregunta_recuperacion: "",
    respuesta_recuperacion: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Preguntas de recuperación locales
  const preguntas = [
    { _id: "1", pregunta: "¿Cuál es el nombre de tu mascota?" },
    { _id: "2", pregunta: "¿Cuál es tu comida favorita?" },
  ];

  // =============================
  // Manejo de inputs y cambios de estado
  // =============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectPregunta = (e) => {
    setFormData({ ...formData, pregunta_recuperacion: e.target.value });
  };

  // =============================
  // Validación por paso
  // =============================
  const validateStep = () => {
    if (step === 1) {
      // Datos personales
      if (!formData.nombre || !formData.apellidoP || !formData.telefono || !formData.email) {
        setError("Todos los campos del paso 1 son obligatorios.");
        return false;
      }
      if (!/^[A-Za-z\s]+$/.test(formData.nombre)) {
        setError("El nombre no debe contener números.");
        return false;
      }
      if (!/^[A-Za-z\s]+$/.test(formData.apellidoP)) {
        setError("El apellido paterno no debe contener números.");
        return false;
      }
      if (!/^[A-Za-z\s]+$/.test(formData.apellidoM)) {
        setError("El apellido materno no debe contener números.");
        return false;
      }
      if (!formData.email.includes("@")) {
        setError("Ingrese un correo electrónico válido.");
        return false;
      }
      if (!/^\d{10}$/.test(formData.telefono)) {
        setError("El teléfono debe tener 10 dígitos.");
        return false;
      }
    } else if (step === 2) {
      // Seguridad
      if (!formData.password || !formData.confirmarContraseña) {
        setError("Ambos campos de contraseña son obligatorios.");
        return false;
      }
      if (formData.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return false;
      }
      if (formData.password !== formData.confirmarContraseña) {
        setError("Las contraseñas no coinciden.");
        return false;
      }
    } else if (step === 3) {
      // Información adicional
      if (!formData.sexo || !formData.edad || !formData.pregunta_recuperacion || !formData.respuesta_recuperacion) {
        setError("Todos los campos del paso 3 son obligatorios.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  // =============================
  // Navegación entre pasos
  // =============================
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setError(null);
    setStep(step - 1);
  };

  // =============================
  // Envío del formulario (último paso)
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const datosAEnviar = {
      nombre: formData.nombre,
      apellidoP: formData.apellidoP,
      apellidoM: formData.apellidoM,
      telefono: formData.telefono,
      email: formData.email,
      password: formData.password,
      sexo: formData.sexo,
      edad: formData.edad,
      pregunta_recuperacion: formData.pregunta_recuperacion, // ID (string)
      respuesta_recuperacion: formData.respuesta_recuperacion,
    };

    try {
      const response = await axios.post(`${API_URL}/usuarios/registro`, datosAEnviar);
      if (response.status === 201) {
        setShowModal(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al registrar usuario.");
    }
  };

  // =============================
  // Renderizado de cada paso
  // =============================
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h4 className="mb-3" style={{ color: "#2B2347" }}>Datos Personales</h4>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Apellido Paterno</Form.Label>
              <Form.Control type="text" name="apellidoP" value={formData.apellidoP} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Apellido Materno</Form.Label>
              <Form.Control type="text" name="apellidoM" value={formData.apellidoM} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Teléfono</Form.Label>
              <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="mb-3" style={{ color: "#2B2347" }}>Seguridad</h4>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmarContraseña"
                  value={formData.confirmarContraseña}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="mb-3" style={{ color: "#2B2347" }}>Información Adicional</h4>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Sexo</Form.Label>
              <Form.Select name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Seleccione una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Edad</Form.Label>
              <Form.Control type="number" name="edad" value={formData.edad} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Pregunta de Recuperación</Form.Label>
              <Form.Select name="pregunta_recuperacion" value={formData.pregunta_recuperacion} onChange={handleSelectPregunta} required>
                <option value="">Seleccione una pregunta</option>
                {preguntas.map((pregunta) => (
                  <option key={pregunta._id} value={pregunta._id}>
                    {pregunta.pregunta}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2B2347" }}>Respuesta de Recuperación</Form.Label>
              <Form.Control type="text" name="respuesta_recuperacion" value={formData.respuesta_recuperacion} onChange={handleChange} required />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  // =============================
  // Renderizado final del componente
  // =============================
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 100%)", // Fondo degradado moderno
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="p-4 bg-white shadow-lg rounded" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center fw-bold mb-3" style={{ color: "#2B2347" }}>Regístrate</h2>
        {error && (
          <div className="alert alert-danger text-center" style={{ borderRadius: "10px" }}>
            {error}
          </div>
        )}
        <Form onSubmit={step === 3 ? handleSubmit : handleNext}>
          {renderStep()}
          <div className="d-flex justify-content-between">
            {step > 1 && (
              <Button variant="secondary" onClick={handlePrev}>
                Anterior
              </Button>
            )}
            {step < 3 && (
              <Button variant="primary" type="submit">
                Siguiente
              </Button>
            )}
            {step === 3 && (
              <Button variant="success" type="submit">
                Registrarse
              </Button>
            )}
          </div>
        </Form>

        {/* Modal de confirmación */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#2B2347" }}>Registro Exitoso</Modal.Title>
          </Modal.Header>
          <Modal.Body>¡Tu cuenta ha sido creada exitosamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => { setShowModal(false); navigate("/login"); }}>
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Registro;