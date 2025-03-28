import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const API_URL = 'http://localhost:5000/dispositivos/estado';

const ControlIoT = () => {
  const { user } = useContext(UserContext);
  const [dispositivo, setDispositivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!user) return;
    
    axios.get(`${API_URL}?email=${user.email}`)
      .then(response => {
        setDispositivo(response.data);
      })
      .catch(error => {
        setMensaje('Error al cargar datos del dispositivo');
        console.error(error);
      });
  }, [user]);

  const enviarComando = (comando) => {
    if (!dispositivo) return;
    
    axios.post('http://localhost:5000/dispositivos/comando', {
      email: user.email,
      comando
    })
    .then(() => {
      setMensaje(`Comando enviado: ${comando}`);
    })
    .catch(error => {
      setMensaje('Error al enviar el comando');
      console.error(error);
    });
  };

  if (!dispositivo) {
    return <p>Cargando datos del dispositivo...</p>;
  }

  return (
    <div className="container">
      <h2>Control del Dispositivo IoT</h2>
      <p>{mensaje}</p>
      <div>
        <h3>Modo de Operación</h3>
        <p>Estado: {dispositivo.automatico ? 'Automático' : 'Manual'}</p>
        <button onClick={() => enviarComando(dispositivo.automatico ? 'modo_manual' : 'modo_auto')}>
          Cambiar Modo
        </button>
      </div>
      <div>
        <h3>Ventilador</h3>
        <p>Estado: {dispositivo.ventilador ? 'Encendido' : 'Apagado'}</p>
        <button onClick={() => enviarComando(dispositivo.ventilador ? 'ventilador_off' : 'ventilador_on')}>
          Cambiar
        </button>
      </div>
      <div>
        <h3>Bomba</h3>
        <p>Estado: {dispositivo.bomba ? 'Encendida' : 'Apagada'}</p>
        <button onClick={() => enviarComando(dispositivo.bomba ? 'bomba_off' : 'bomba_on')}>
          Cambiar
        </button>
      </div>
      <div>
        <h3>Foco</h3>
        <p>Estado: {dispositivo.foco ? 'Encendido' : 'Apagado'}</p>
        <button onClick={() => enviarComando(dispositivo.foco ? 'foco_off' : 'foco_on')}>
          Cambiar
        </button>
      </div>
    </div>
  );
};

export default ControlIoT;
