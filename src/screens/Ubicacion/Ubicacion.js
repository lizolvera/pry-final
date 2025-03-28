import React from "react";
import { Container } from "react-bootstrap";

const Ubicacion = () => {
  // URL de embed de Google Maps para la UTHH de la Huasteca Hidalguense
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.5176834901734!2d-98.3836778!3d21.1559357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d72419f5e20d89%3A0x8c724b6d4181f3c8!2sUniversidad%20Tecnol%C3%B3gica%20de%20la%20Huasteca%20Hidalguense!5e0!3m2!1ses-419!2smx!4v1690746913768!5m2!1ses-419!2smx";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Sección principal con degradado */}
      <div
        style={{
          background: "linear-gradient(135deg, #2B2347 0%, #7A5CFB 60%, #2B2347 100%)", // Degradado morado
          flexGrow: 1,
          padding: "40px 0",
        }}
      >
        <Container className="text-center">
          <h2 style={{ color: "#00D283", fontWeight: "bold", marginBottom: "20px" }}>
            Nuestra Ubicación
          </h2>
          <p style={{ color: "#FFFFFF", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 30px" }}>
            Visítanos en el corazón de la Huasteca Hidalguense, para conocer nuestras modernas instalaciones y programas innovadores.
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
              title="Ubicación UTHH Huasteca Hidalguense"
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

      {/* Footer Fijo */}
      <footer
        className="mt-auto text-center text-white py-3"
        style={{
          background: "linear-gradient(135deg, #2B2347, #7A5CFB)", // Degradado morado
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