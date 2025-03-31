import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SolicitarRestablecimiento = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/usuarios/solicitar-restablecimiento", { email });
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
          Solicitar Restablecimiento de Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{
                color: "#2B2347",
                fontWeight: "500",
              }}
            >
              Correo Electrónico
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
            Solicitar Restablecimiento
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarRestablecimiento;
