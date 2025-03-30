import React from 'react';

const ControlIoT = () => {
  // Estilos modernos con efecto neón
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 100%)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif",
      color: '#e0e0e0',
    },
    card: {
      backgroundColor: 'rgba(30, 30, 60, 0.7)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      width: '90%',
      maxWidth: '600px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    },
    cardGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)',
      animation: 'rotate 20s linear infinite',
    },
    heading: {
      textAlign: 'center',
      fontSize: '28px',
      marginBottom: '25px',
      color: '#00f0ff',
      fontWeight: '600',
      textShadow: '0 0 10px rgba(0, 240, 255, 0.7)',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      padding: '10px',
      borderRadius: '10px',
      background: 'rgba(0, 0, 0, 0.3)',
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
    },
    statusIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '8px',
    },
    connected: {
      backgroundColor: '#00f0ff',
      boxShadow: '0 0 10px #00f0ff',
    },
    disconnected: {
      backgroundColor: '#ff3a3a',
      boxShadow: '0 0 10px #ff3a3a',
    },
    controlPanel: {
      margin: '20px 0',
    },
    panelTitle: {
      fontSize: '18px',
      marginBottom: '15px',
      color: '#00f0ff',
      display: 'flex',
      alignItems: 'center',
    },
    panelIcon: {
      marginRight: '10px',
      fontSize: '20px',
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '15px',
    },
    button: {
      flex: '1 1 45%',
      minWidth: '120px',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      background: 'linear-gradient(45deg, #00f0ff, #0088ff)',
      color: '#fff',
      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
    },
    secondaryButton: {
      background: 'linear-gradient(45deg, #ff3a3a, #ff7b00)',
      color: '#fff',
      boxShadow: '0 0 15px rgba(255, 58, 58, 0.5)',
    },
    disabledButton: {
      background: 'rgba(100, 100, 100, 0.5)',
      color: '#aaa',
      cursor: 'not-allowed',
    },
    statusDisplay: {
      padding: '15px',
      borderRadius: '10px',
      margin: '10px 0',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    doorOpen: {
      background: 'rgba(0, 240, 255, 0.1)',
      color: '#00f0ff',
      border: '1px solid #00f0ff',
      boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
    },
    doorClosed: {
      background: 'rgba(255, 58, 58, 0.1)',
      color: '#ff3a3a',
      border: '1px solid #ff3a3a',
      boxShadow: '0 0 20px rgba(255, 58, 58, 0.2)',
    },
    alarmOn: {
      background: 'rgba(255, 58, 58, 0.2)',
      color: '#ff3a3a',
      border: '1px solid #ff3a3a',
      boxShadow: '0 0 20px rgba(255, 58, 58, 0.3)',
      animation: 'pulse 1.5s infinite',
    },
    alarmOff: {
      background: 'rgba(0, 240, 255, 0.1)',
      color: '#00f0ff',
      border: '1px solid #00f0ff',
    },
    message: {
      textAlign: 'center',
      margin: '15px 0',
      color: '#ffcc00',
      fontSize: '14px',
      minHeight: '20px',
    },
    '@keyframes rotate': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    '@keyframes pulse': {
      '0%': { boxShadow: '0 0 0 0 rgba(255, 58, 58, 0.7)' },
      '70%': { boxShadow: '0 0 0 10px rgba(255, 58, 58, 0)' },
      '100%': { boxShadow: '0 0 0 0 rgba(255, 58, 58, 0)' },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardGlow} />
        <h2 style={styles.heading}>CONTROL IOT - SEGURIDAD</h2>
        
        {/* Barra de estado */}
        <div style={styles.statusBar}>
          <div style={styles.statusItem}>
            <div style={{...styles.statusIndicator, ...styles.connected}} />
            <span>Conectado</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{...styles.statusIndicator, ...styles.disconnected}} />
            <span>Alarma: Apagada</span>
          </div>
        </div>

        {/* Mensaje del sistema */}
        <p style={styles.message}>Sistema listo</p>

        {/* Estado de la puerta */}
        <div style={{...styles.statusDisplay, ...styles.doorClosed}}>
          PUERTA: CERRADA | DESBLOQUEADA
        </div>

        {/* Panel de control de alarma */}
        <div style={styles.controlPanel}>
          <h3 style={styles.panelTitle}>
            <span style={styles.panelIcon}>🚨</span> CONTROL DE ALARMA
          </h3>
          <div style={styles.buttonGroup}>
            <button style={{...styles.button, ...styles.primaryButton}}>
              ACTIVAR ALARMA
            </button>
            <button style={{...styles.button, ...styles.disabledButton}}>
              DESACTIVAR ALARMA
            </button>
          </div>
          <div style={{...styles.statusDisplay, ...styles.alarmOff}}>
            ALARMA: APAGADA
          </div>
        </div>

        {/* Panel de control de puerta */}
        <div style={styles.controlPanel}>
          <h3 style={styles.panelTitle}>
            <span style={styles.panelIcon}>🚪</span> CONTROL DE PUERTA
          </h3>
          
          <div style={styles.buttonGroup}>
            <button style={{...styles.button, ...styles.primaryButton}}>
              BLOQUEAR PUERTA
            </button>
            <button style={{...styles.button, ...styles.disabledButton}}>
              DESBLOQUEAR PUERTA
            </button>
          </div>
          
          <div style={styles.buttonGroup}>
            <button style={{...styles.button, ...styles.primaryButton}}>
              ABRIR PUERTA
            </button>
            <button style={{...styles.button, ...styles.disabledButton}}>
              CERRAR PUERTA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlIoT; 