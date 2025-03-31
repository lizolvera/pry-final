import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RestablecerContrasena = () => {
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaPassword !== confirmarPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/usuarios/restablecer-contrasena", {
        token,
        nuevaPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: response.data.mensaje,
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 100%)",
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
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#2B2347",
            fontWeight: "bold",
            fontSize: "28px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Restablecer Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="nuevaPassword"
              className="form-label"
              style={{
                color: "#2B2347",
                fontWeight: "500",
              }}
            >
              Nueva Contraseña
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="nuevaPassword"
                className="form-control"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
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
          <div className="mb-3">
            <label
              htmlFor="confirmarPassword"
              className="form-label"
              style={{
                color: "#2B2347",
                fontWeight: "500",
              }}
            >
              Confirmar Contraseña
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmarPassword"
                className="form-control"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid #7A5CFB",
                  padding: "10px",
                }}
              />
              <span
                className="input-group-text"
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
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#00B875"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#00D283"}
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestablecerContrasena;