import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Foother/Foother";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/login";
import QuienesSomos from "./screens/AcercaDe/quienes-somos";
import Contacto from "./screens/Contacto/Contactos";
import Registro from "./screens/Registro/Registro";
import PreguntasFrecuentes from "./screens/PreguntasFrecuentes/PreguntasFrecuentes";
import Politicas from "./screens/Politicas/Politicas";
import CloudinaryUpload from "./components/cloudinary/cloudinary";
import ProductosCat from "./screens/TiendaProductos/ProductosCat";
import DetalleProducto from "./screens/DetalleProducto/detalleProducto";
import EditProductos from "./screens/AdminProductos/EditProductos";
import HistoriaAntecedentes from "./screens/Historia-Antecedentes/Historia-Antecedentes";
import EditarProductos from "./screens/AdminProductos/EditarProductos";
import AdmUsuarios from "./screens/AdminUsuarios/AdmUsuarios";
import AdmQuienesSomos from "./screens/AdminQuines-Somos/AdmQuienes-Somos";
import EditarQuienesSomos from "./screens/AdminQuines-Somos/EditarQuienes-Somos"; 
import CrearQuienesSomos from "./screens/AdminQuines-Somos/CrearQuienesSomos"; 
import { UserProvider } from "./screens/UserContext/UserContext";
import AdminPoliticas from "./screens/AdmPoliticas/AdminPoliticas";
//
import AdmPreguntas from "./screens/AdminPreguntas/AdmPreguntas";

import Ubicacion from "./screens/Ubicacion/Ubicacion";
import RecuperarContraseña from "./screens/RecuperarContraseña/RecuperarContraseña";
import Perfil from "./screens/Perfil/Perfil";
import EditarPerfil from "./screens/Perfil/EditarPerfil";
import IoTManager from "./screens/DispositivoIoT/IoTManager";
import ControlIoT from "./screens/DispositivoIoT/ControlIoT";
import AggProductos from "./screens/AdminProductos/AggProductos";
import VincularIoT from "./screens/DispositivoIoT/VincularIoT";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contactos" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/upload" element={<CloudinaryUpload />} />
          <Route path="/ProductosCat" element={<ProductosCat />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/editar-productos" element={<EditProductos />} />
          <Route path="/historia-antecedentes" element={<HistoriaAntecedentes />} />
          <Route path="/editar-producto/:id" element={<EditarProductos />} />
          <Route path="/admin-usuarios" element={<AdmUsuarios />} />
          <Route path="/admin/quienes-somos" element={<AdmQuienesSomos />} />
          <Route path="/editar-quienes-somos/:section/:id" element={<EditarQuienesSomos />} />
          <Route path="/crear-quienes-somos/:section/" element={<CrearQuienesSomos />} />
          <Route path="/admin-politicas" element={<AdminPoliticas />} />
          <Route path="/admin-preguntas" element={<AdmPreguntas />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/control" element={<IoTManager />} />
          <Route path="/control-iot" element={<ControlIoT />} />
          <Route path="/agg-productos" element={<AggProductos />} />
          <Route path="/vincular-iot" element={<VincularIoT />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
