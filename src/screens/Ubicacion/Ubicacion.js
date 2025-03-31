import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const Ubicacion = () => {
  const API_URL = "http://localhost:5000";
  const [ubicacion, setUbicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUbicacion = async () => {
      try {
        const response = await axios.get(`${API_URL}/ubicaciones/ver`);
        if (response.data.length > 0) {
          setUbicacion(response.data[0]); // Asumiendo que solo se mostrará la primera ubicación
        }
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la ubicación.");
        setLoading(false);
      }
    };

    fetchUbicacion();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando ubicación...</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!ubicacion) {
    return <p className="text-center">No hay ubicaciones disponibles.</p>;
  }

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.5176834901734!2d${ubicacion.coordenadas.longitud}!3d${ubicacion.coordenadas.latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${ubicacion.nombre.replace(/ /g, "+")}!5e0!3m2!1ses-419!2smx!4v1690746913768!5m2!1ses-419!2smx`;

  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        style={{
          background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 60%, #2B2347 100%)",
          flexGrow: 1,
          padding: "40px 0",
        }}
      >
        <Container className="text-center">
          <h2 style={{ color: "#00D283", fontWeight: "bold", marginBottom: "20px" }}>
            Nuestra Ubicación
          </h2>
          <p style={{ color: "#FFFFFF", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 30px" }}>
            {ubicacion.descripcion}
          </p>
          <div
            style={{
              width: "90%",
              maxWidth: "600px",
              height: "400px",
              margin: "0 auto",
              borderRadius: "12px",
              overflow: "hidden",
              
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              background: "white",
            }}
          >
            <iframe
              title="Ubicación"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Container>
      </div>
      <footer
        className="mt-auto text-center text-white py-3"
        style={{
          background: "linear-gradient(135deg, #2B2347, #7A5CFB)",
        }}
      >
        <h5 className="m-0" style={{ color: "#00D283" }}>NEXUS.ITC</h5>
        <p className="m-0" style={{ color: "#FFFFFF" }}>
          Donde la seguridad y la tecnología van de la mano.
        </p>
      </footer>
    </div>
  );
};

export default Ubicacion;