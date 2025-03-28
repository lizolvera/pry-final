import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const API_URL = "http://localhost:5000/dispositivos";

const VincularIoT = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!user) return;

    axios.get(`${API_URL}/estado?email=${user.email}`)
      .then(response => {
        if (response.data) {
          navigate('/control-iot'); // Si ya está vinculado, redirigir
        }
      })
      .catch(error => {
        if (error.response && error.response.status !== 404) {
          setMensaje('Error al verificar el dispositivo');
        }
      });
  }, [user, navigate]);

  const handleVincular = async () => {
    if (!nombre || !ip) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/vincular`, {
        nombre,
        ip,
        email: user.email,
      });

      if (response.status === 200) {
        navigate('/control-iot');
      } else {
        setMensaje(response.data.mensaje || 'Error al vincular dispositivo');
      }
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Vincular Dispositivo IoT</h2>
        <input
          type="text"
          placeholder="Nombre del dispositivo"
          className="w-full p-2 mb-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección IP"
          className="w-full p-2 mb-2 border rounded"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        {mensaje && <p className="text-red-500 text-sm mb-2">{mensaje}</p>}
        <button
          onClick={handleVincular}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Vincular
        </button>
      </div>
    </div>
  );
};

export default VincularIoT;