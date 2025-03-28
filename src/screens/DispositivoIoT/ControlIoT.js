import React, { useEffect, useState } from 'react';

// Cambia la IP a la del ESP32 y puerto 8080
const WEBSOCKET_URL = 'ws://192.168.252.128:8080';

const ControlIoT = () => {
  const [ws, setWs] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [estadoPuerta, setEstadoPuerta] = useState('Cerrada');
  const [nipActual, setNipActual] = useState('');
  const [nuevoNip, setNuevoNip] = useState('');
  const [mostrarFormularioNip, setMostrarFormularioNip] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('Conectado al ESP32 vía WebSocket');
    };

    socket.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
      setMensaje(event.data);
      // Aquí podrías parsear si el ESP32 envía datos en JSON
      if (event.data.includes("puerta_abierta")) {
        setEstadoPuerta("Abierta");
      } else if (event.data.includes("puerta_cerrada")) {
        setEstadoPuerta("Cerrada");
      }
    };

    socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setMensaje('Error en conexión WebSocket');
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const enviarComando = (comando) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(comando);
    } else {
      setMensaje('WebSocket no está conectado');
    }
  };

  const abrirPuerta = () => {
    enviarComando('abrir_puerta');
  };

  const cerrarPuerta = () => {
    enviarComando('cerrar_puerta');
  };

  const cambiarNip = () => {
    if (nuevoNip.length === 4) {
      enviarComando(`cambiar_nip:${nuevoNip}`);
      setNipActual(nuevoNip);
      setNuevoNip('');
      setMostrarFormularioNip(false);
    } else {
      setMensaje('El NIP debe tener 4 dígitos.');
    }
  };

  const verificarNip = () => {
    if (nipActual.length === 4) {
      enviarComando(`verificar_nip:${nipActual}`);
    } else {
      setMensaje('El NIP debe tener 4 dígitos.');
    }
  };

  // Estilos CSS inline
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#2B2347',
      padding: '20px',
      fontFamily: "'Century Gothic', sans-serif",
      color: '#FFFFFF',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '600px',
      boxSizing: 'border-box',
      backdropFilter: 'blur(10px)',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#00D283',
    },
    widget: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
    },
    widgetTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#FFFFFF',
    },
    widgetState: {
      fontSize: '16px',
      marginBottom: '5px',
      color: '#FFFFFF',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#00D283',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '5px',
      transition: 'background-color 0.3s ease',
    },
    buttonSecondary: {
      padding: '10px 20px',
      backgroundColor: '#7A5CFB',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '5px',
      transition: 'background-color 0.3s ease',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      width: '100%',
      marginBottom: '10px',
    },
    message: {
      color: '#FF6B6B',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Control de Puerta Inteligente</h2>
        <p style={styles.message}>{mensaje}</p>

        {/* Estado de la Puerta */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Estado de la Puerta</h3>
          <p style={styles.widgetState}>Estado actual: {estadoPuerta}</p>
          <button style={styles.button} onClick={abrirPuerta}>Abrir Puerta</button>
          <button style={styles.button} onClick={cerrarPuerta}>Cerrar Puerta</button>
        </div>

        {/* Verificar NIP */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Verificar NIP</h3>
          <input
            type="text"
            placeholder="Ingrese su NIP"
            value={nipActual}
            onChange={(e) => setNipActual(e.target.value)}
            style={styles.input}
            maxLength={4}
          />
          <button style={styles.button} onClick={verificarNip}>Verificar NIP</button>
        </div>

        {/* Cambiar NIP */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Cambiar NIP</h3>
          {mostrarFormularioNip ? (
            <>
              <input
                type="text"
                placeholder="Nuevo NIP (4 dígitos)"
                value={nuevoNip}
                onChange={(e) => setNuevoNip(e.target.value)}
                style={styles.input}
                maxLength={4}
              />
              <button style={styles.button} onClick={cambiarNip}>Guardar NIP</button>
              <button style={styles.buttonSecondary} onClick={() => setMostrarFormularioNip(false)}>Cancelar</button>
            </>
          ) : (
            <button style={styles.button} onClick={() => setMostrarFormularioNip(true)}>Cambiar NIP</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlIoT;