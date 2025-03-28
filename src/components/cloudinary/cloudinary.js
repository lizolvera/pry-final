import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryUpload = () => {
  const preset_name = "v8oot77t"; // Nombre del preset de Cloudinary
  const cloud_name = "dfvn4nqbl"; // Nombre de tu Cloudinary

  const [image, setImage] = useState(null); // Estado para almacenar la URL de la imagen
  const [loading, setLoading] = useState(false); // Estado para el loading de la imagen

  // Función para manejar la carga de la imagen
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true); // Indicamos que estamos cargando la imagen

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const file = await response.json();
      
      if (file.secure_url) {
        setImage(file.secure_url); // Guardamos la URL de la imagen subida
        setLoading(false); // Termina el estado de carga
      } else {
        throw new Error('No se pudo obtener la URL de la imagen');
      }

    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setLoading(false); // Termina el estado de carga
    }
  };

  // Si se sube una imagen, la mostramos en el frontend con Cloudinary
  const cld = new Cloudinary({ cloud: { cloudName: cloud_name } });

  return (
    <div>
      <h1>Subir Imagen</h1>
      
      {/* Input para cargar la imagen */}
      <input type="file" name="file" onChange={uploadImage} />
      
      {/* Mostrar el estado de carga */}
      {loading && <h3>Cargando...</h3>}
      
      {/* Mostrar la imagen subida */}
      {image && !loading && (
        <div>
          <h4>Imagen subida:</h4>
          <AdvancedImage cldImg={cld.image(image)} />
          <InputGroup className="mb-3">
            <FormControl
              value={image}
              readOnly
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => navigator.clipboard.writeText(image)}
            >
              Copiar URL
            </Button>
          </InputGroup>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
