import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../screens/UserContext/UserContext"; // Ajusta la ruta según tu estructura
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
          // Actualizamos el contexto con el usuario
          setUser(data.usuario);
          // Opcional: guardar en localStorage para persistencia
          localStorage.setItem("user", JSON.stringify(data.usuario));
          navigate("/");
      } else {
          setError(data.mensaje || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor. Intenta nuevamente.");
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
          Iniciar Sesión
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
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{
                color: "#2B2347",
                fontWeight: "500",
              }}
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #7A5CFB",
                padding: "10px",
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{
                color: "#2B2347",
                fontWeight: "500",
              }}
            >
              Contraseña
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid #7A5CFB",
                  padding: "10px",
                }}
              />
              <span
                className="input-group-text"
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
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100"
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
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link text-decoration-none"
            style={{
              color: "#7A5CFB",
              fontWeight: "500",
              transition: "color 0.3s ease", // Transición suave
            }}
            onClick={() => navigate("/recuperar-contraseña")}
            onMouseEnter={(e) => e.target.style.color = "#5A4FCF"} // Efecto hover
            onMouseLeave={(e) => e.target.style.color = "#7A5CFB"}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
