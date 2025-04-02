import { useState, useEffect } from "react";
import mqtt from 'mqtt';

const ControlIoT = () => {
  const [estadoPuerta, setEstadoPuerta] = useState(false);
  const [estadoAlarma, setEstadoAlarma] = useState(false);
  const [estadoPuertaAbierta, setEstadoPuertaAbierta] = useState(false);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Conectando...");
  const [activityHistory, setActivityHistory] = useState([]);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const options = {
      protocol: 'wss',
      host: 'kfa70af4.ala.eu-central-1.emqxsl.com',
      path: '/mqtt',
      port: 8084,
      username: 'danohx',
      password: '270105Dt',
      clientId: 'react_client_' + Math.random().toString(16).substring(2, 8),
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30000,
    };

    const mqttClient = mqtt.connect(options);

    mqttClient.on('connect', () => {
      setIsConnected(true);
      setIsLoading(false);
      setConnectionStatus("Conectado");
      console.log('Conexión establecida con EMQX');

      mqttClient.subscribe('sentinel/estadoPuerta', (err) => {
        if (!err) {
          console.log('Suscrito a sentinel/estadoPuerta');
        } else {
          console.error('Error al suscribirse:', err);
          setConnectionStatus("Error de suscripción");
        }
      });

      mqttClient.subscribe('sentinel/estadoAlarma', (err) => {
        if (!err) {
          console.log('Suscrito a sentinel/estadoAlarma');
        } else {
          console.error('Error al suscribirse:', err);
          setConnectionStatus("Error de suscripción");
        }
      });

      mqttClient.subscribe('sentinel/estadoPuertaAbierta', (err) => {
        if (!err) {
          console.log('Suscrito a sentinel/estadoPuertaAbierta');
        } else {
          console.error('Error al suscribirse:', err);
          setConnectionStatus("Error de suscripción");
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      const msg = message.toString();
      console.log(`Mensaje recibido en ${topic}: ${msg}`);

      if (topic === 'sentinel/estadoPuerta') {
        if (msg === 'BLOQUEADO') {
          setEstadoPuerta(true);
          addToHistory("Puerta bloqueada");
        } else if (msg === 'DESBLOQUEADO') {
          setEstadoPuerta(false);
          addToHistory("Puerta desbloqueada");
        }
      } else if (topic === 'sentinel/estadoAlarma') {
        if (msg === 'ENCENDIDO') {
          setEstadoAlarma(true);
          addToHistory("Alarma activada");
        } else if (msg === 'APAGADO') {
          setEstadoAlarma(false);
          addToHistory("Alarma desactivada");
        }
      } else if (topic === 'sentinel/estadoPuertaAbierta') {
        if (msg === 'ABIERTO') {
          setEstadoPuertaAbierta(true);
          addToHistory("Puerta abierta");
        } else if (msg === 'CERRADO') {
          setEstadoPuertaAbierta(false);
          addToHistory("Puerta cerrada");
        }
      }
      setLastUpdate(new Date().toLocaleTimeString());
    });

    mqttClient.on('error', (err) => {
      console.error('Error de conexión:', err);
      setIsConnected(false);
      setIsLoading(false);
      setConnectionStatus("Error de conexión");
    });

    mqttClient.on('close', () => {
      setIsConnected(false);
      setIsLoading(false);
      setConnectionStatus("Desconectado");
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  // Simulación de descarga de batería
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        setBatteryLevel(prev => (prev > 0 ? prev - 0.1 : 0));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const addToHistory = (action) => {
    const time = new Date().toLocaleTimeString();
    setActivityHistory(prev => [{time, action}, ...prev.slice(0, 9)]);
  };

  const handlePublish = (topic, message) => {
    if (client && isConnected) {
      client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error('Error al publicar:', error);
        } else {
          console.log(`Mensaje publicado en ${topic}:`, message);
        }
      });
    }
  };

  const toggleSwitch = (state, setState, topic, messageTrue, messageFalse) => {
    const newState = !state;
    setState(newState);
    handlePublish(topic, newState ? messageTrue : messageFalse);
  };

  const reconnect = () => {
    setIsLoading(true);
    setConnectionStatus("Reconectando...");
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      setConnectionStatus("Conectado");
    }, 2000);
  };

  const simulateAlert = () => {
    addToHistory("⚠️ Alerta de movimiento detectado");
  };

  return (
    <div className="iot-container">
      <div className="iot-card">
        <div className="iot-header">
          <h2 className="iot-title">Panel de Control</h2>
          <div className={`iot-connection-status ${isConnected ? "connected" : "disconnected"}`}>
            {connectionStatus}
          </div>
        </div>

        {isLoading ? (
          <div className="iot-loading">
            <div className="iot-spinner"></div>
            <p>Estableciendo conexión...</p>
          </div>
        ) : (
          <>
            {/* Widget de resumen del sistema */}
            <div className="iot-system-overview">
              <div className="iot-system-status">
                <div className="iot-system-icon">
                  <div className={`iot-security-status ${estadoAlarma ? "active" : "inactive"}`}></div>
                </div>
                <div className="iot-system-info">
                  <h3>Estado del Sistema</h3>
                  <p className={estadoAlarma ? "status-active" : "status-inactive"}>
                    {estadoAlarma ? "Protegido" : "Desprotegido"}
                  </p>
                </div>
              </div>
              
            </div>

            <div className="iot-control-group">
              <div className="iot-switch-container">
                <label className="iot-switch-label">Estado de la Puerta</label>
                <div className="iot-switch-wrapper">
                  <label className="iot-switch">
                    <input
                      type="checkbox"
                      checked={estadoPuerta}
                      onChange={() => toggleSwitch(estadoPuerta, setEstadoPuerta, 'sentinel/estadoPuerta', 'BLOQUEADO', 'DESBLOQUEADO')}
                      disabled={!isConnected}
                    />
                    <span className="iot-slider"></span>
                  </label>
                  <span className={`iot-state ${estadoPuerta ? "on" : "off"}`}>
                    {estadoPuerta ? "BLOQUEADO" : "DESBLOQUEADO"}
                  </span>
                </div>
              </div>

              <div className="iot-switch-container">
                <label className="iot-switch-label">Estado de la Alarma</label>
                <div className="iot-switch-wrapper">
                  <label className="iot-switch">
                    <input
                      type="checkbox"
                      checked={estadoAlarma}
                      onChange={() => toggleSwitch(estadoAlarma, setEstadoAlarma, 'sentinel/estadoAlarma', 'ENCENDIDO', 'APAGADO')}
                      disabled={!isConnected}
                    />
                    <span className="iot-slider"></span>
                  </label>
                  <span className={`iot-state ${estadoAlarma ? "on" : "off"}`}>
                    {estadoAlarma ? "ENCENDIDO" : "APAGADO"}
                  </span>
                </div>
              </div>

              <div className="iot-switch-container">
                <label className="iot-switch-label">Estado de la Puerta (Abierto/Cerrado)</label>
                <div className="iot-switch-wrapper">
                  <label className="iot-switch">
                    <input
                      type="checkbox"
                      checked={estadoPuertaAbierta}
                      onChange={() => toggleSwitch(estadoPuertaAbierta, setEstadoPuertaAbierta, 'sentinel/estadoPuertaAbierta', 'ABIERTO', 'CERRADO')}
                      disabled={!isConnected}
                    />
                    <span className="iot-slider"></span>
                  </label>
                  <span className={`iot-state ${estadoPuertaAbierta ? "on" : "off"}`}>
                    {estadoPuertaAbierta ? "ABIERTO" : "CERRADO"}
                  </span>
                </div>
              </div>

              {/* Widget de estado de la puerta */}
              <div className="iot-door-status-widget">
                <div className="iot-door-visual">
                  <div className={`iot-door ${estadoPuertaAbierta ? "door-open" : "door-closed"}`}></div>
                  <div className={`iot-lock ${estadoPuerta ? "lock-active" : "lock-inactive"}`}></div>
                </div>
                <div className="iot-door-info">
                  <p className="iot-door-status">
                    {estadoPuertaAbierta ? "Puerta Abierta" : "Puerta Cerrada"}
                  </p>
                  <p className="iot-lock-status">
                    {estadoPuerta ? "Cerradura Activada" : "Cerradura Desactivada"}
                  </p>
                </div>
              </div>

              <div className="iot-info-group">
                <div className="iot-info-item">
                  <span className="iot-info-label">Conexión:</span>
                  <span className={`iot-info-value ${isConnected ? "connected" : "disconnected"}`}>
                    {isConnected ? "Estable" : "Inestable"}
                  </span>
                </div>

                {lastUpdate && (
                  <div className="iot-info-item">
                    <span className="iot-info-label">Última actualización:</span>
                    <span className="iot-info-value">{lastUpdate}</span>
                  </div>
                )}
              </div>

              {/* Widget de historial de actividad */}
              <div className="iot-activity-widget">
                <div className="iot-widget-header" onClick={() => setShowStats(!showStats)}>
                  <h3>Historial de Actividad</h3>
                  <span className="iot-toggle-icon">{showStats ? '▲' : '▼'}</span>
                </div>
                {showStats && (
                  <div className="iot-activity-list">
                    {activityHistory.length > 0 ? (
                      activityHistory.map((item, index) => (
                        <div key={index} className="iot-activity-item">
                          <span className="iot-activity-time">{item.time}</span>
                          <span className="iot-activity-action">{item.action}</span>
                        </div>
                      ))
                    ) : (
                      <p className="iot-no-activity">No hay actividad reciente</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {!isConnected && (
              <button
                className="iot-reconnect-btn"
                onClick={reconnect}
                disabled={isLoading}
              >
                {isLoading ? "Conectando..." : "Reconectar"}
              </button>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Century+Gothic&display=swap');

        .iot-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          font-family: 'Century Gothic', sans-serif;
        }

        .iot-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 420px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .iot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid #eee;
          padding-bottom: 16px;
          background: #2B2347;
          border-radius: 12px;
          padding: 16px;
          margin: -15px -15px 20px -15px;
        }

        .iot-title {
          color: #FFFFFF;
          margin: 0;
          font-size: 1.25rem;
        }

        .iot-connection-status {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .iot-connection-status.connected {
          background-color: #e3f9e5;
          color: #1b9a3f;
        }

        .iot-connection-status.disconnected {
          background-color: #ffebee;
          color: #c62828;
        }

        .iot-control-group {
          margin: 20px 0;
        }

        .iot-switch-container {
          margin-bottom: 24px;
        }

        .iot-switch-label {
          display: block;
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .iot-switch-wrapper {
          display: flex;
          align-items: center;
        }

        .iot-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 32px;
          margin-right: 12px;
        }

        .iot-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .iot-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #e0e0e0;
          transition: .4s;
          border-radius: 34px;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
        }

        .iot-slider:before {
          position: absolute;
          content: "";
          height: 24px;
          width: 24px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        input:checked + .iot-slider {
          background-color: #00D283;
        }

        input:checked + .iot-slider:before {
          transform: translateX(28px);
        }

        input:disabled + .iot-slider {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .iot-state {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .iot-state.on {
          color: #00D283;
        }

        .iot-state.off {
          color: #757575;
        }

        .iot-info-group {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 16px;
        }

        .iot-info-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .iot-info-item:last-child {
          margin-bottom: 0;
        }

        .iot-info-label {
          font-size: 0.8125rem;
          color: #666;
        }

        .iot-info-value {
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .iot-info-value.connected {
          color: #00D283;
        }

        .iot-info-value.disconnected {
          color: #F44336;
        }

        .iot-reconnect-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #2B2347 0%, #7A5CFB 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .iot-reconnect-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .iot-reconnect-btn:disabled {
          background: #e0e0e0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .iot-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 0;
        }

        .iot-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #00D283;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Nuevos estilos para los widgets */

        .iot-system-overview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f5f7fa;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .iot-system-status {
          display: flex;
          align-items: center;
        }

        .iot-system-icon {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .iot-security-status {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .iot-security-status.active {
          background-color: #00D283;
          box-shadow: 0 0 10px #00D283;
          animation: pulse 2s infinite;
        }

        .iot-security-status.inactive {
          background-color: #ff5252;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 210, 131, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(0, 210, 131, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 210, 131, 0); }
        }

        .iot-system-info h3 {
          margin: 0;
          font-size: 0.875rem;
          color: #666;
        }

        .iot-system-info p {
          margin: 4px 0 0;
          font-weight: 600;
        }

        .status-active {
          color: #00D283;
        }

        .status-inactive {
          color: #ff5252;
        }

        .iot-battery-widget {
          display: flex;
          align-items: center;
        }

        .iot-battery-icon {
          width: 40px;
          height: 20px;
          border: 2px solid #666;
          border-radius: 3px;
          position: relative;
          margin-right: 8px;
        }

        .iot-battery-icon:after {
          content: '';
          position: absolute;
          right: -5px;
          top: 4px;
          height: 12px;
          width: 3px;
          background: #666;
          border-radius: 0 2px 2px 0;
        }

        .iot-battery-level {
          height: 100%;
          background: #00D283;
          transition: width 0.3s ease;
        }

        .iot-battery-percentage {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .iot-door-status-widget {
          display: flex;
          align-items: center;
          background: #f5f7fa;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .iot-door-visual {
          position: relative;
          width: 60px;
          height: 80px;
          margin-right: 16px;
        }

        .iot-door {
          width: 50px;
          height: 80px;
          background: #7A5CFB;
          position: absolute;
          transition: all 0.5s ease;
          transform-origin: left;
          left: 10px;
          border-radius: 0 4px 4px 0;
        }

        .iot-door.door-open {
          transform: perspective(400px) rotateY(-45deg);
        }

        .iot-door.door-closed {
          transform: perspective(400px) rotateY(0deg);
        }

        .iot-lock {
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          top: 40px;
          right: 10px;
          transition: all 0.3s ease;
        }

        .iot-lock.lock-active {
          background: #00D283;
          box-shadow: 0 0 5px #00D283;
        }

        .iot-lock.lock-inactive {
          background: #ff5252;
        }

        .iot-door-info {
          flex-grow: 1;
        }

        .iot-door-info p {
          margin: 5px 0;
          font-size: 0.875rem;
        }

        .iot-door-status {
          font-weight: 600;
        }

        .iot-lock-status {
          color: #666;
        }

        .iot-quick-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 24px;
        }

        .iot-action-button {
          padding: 12px;
          background: #2B2347;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .iot-action-button:hover {
          background: #7A5CFB;
        }

        .iot-alert-btn {
          grid-column: span 2;
          background: #ff5252;
        }

        .iot-alert-btn:hover {
          background: #ff1744;
        }

        .iot-activity-widget {
          margin-top: 24px;
          background: #f5f7fa;
          border-radius: 12px;
          overflow: hidden;
        }

        .iot-widget-header {
          padding: 12px 16px;
          background: #2B2347;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .iot-widget-header h3 {
          margin: 0;
          font-size: 1rem;
        }

        .iot-toggle-icon {
          font-size: 0.75rem;
        }

        .iot-activity-list {
          max-height: 200px;
          overflow-y: auto;
          padding: 12px;
        }

        .iot-activity-item {
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
        }

        .iot-activity-item:last-child {
          border-bottom: none;
        }

        .iot-activity-time {
          font-size: 0.75rem;
          color: #666;
        }

        .iot-activity-action {
          font-size: 0.875rem;
        }

        .iot-no-activity {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default ControlIoT;