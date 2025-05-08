import React, { useState, useContext, useEffect } from 'react';
import { ValidationContext } from '../ValidationContext';

const FormVehiculos = ({ onSubmit, initialVehicle = null, vehicles }) => {
  const { regexChasis, regexTexto } = useContext(ValidationContext);

  const [numChasis, setNumChasis] = useState(initialVehicle?.numChasis || '');
  const [marca, setMarca] = useState(initialVehicle?.marca || '');
  const [modelo, setModelo] = useState(initialVehicle?.modelo || '');
  const [color, setColor] = useState(initialVehicle?.color || '');
  const [potencia, setPotencia] = useState(initialVehicle?.potencia || '');
  const [fechaFabricacion, setFechaFabricacion] = useState(initialVehicle?.fechaFabricacion || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialVehicle) {
      setNumChasis(initialVehicle.numChasis);
      setMarca(initialVehicle.marca);
      setModelo(initialVehicle.modelo);
      setColor(initialVehicle.color);
      setPotencia(initialVehicle.potencia);
      setFechaFabricacion(initialVehicle.fechaFabricacion);
    }
  }, [initialVehicle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de campos obligatorios.
    if (!numChasis || !marca || !modelo || !color || !potencia || !fechaFabricacion) {
      setError('Todos los campos son requeridos.');
      return;
    }
    // Validar formato de número de chasis (8 dígitos).
    if (!regexChasis.test(numChasis)) {
      setError('El número de chasis debe contener exactamente 8 dígitos.');
      return;
    }
    // Validar que marca y color sean solo texto.
    if (!regexTexto.test(marca)) {
      setError('La marca solo puede contener texto.');
      return;
    }
    if (!regexTexto.test(color)) {
      setError('El color solo puede contener texto.');
      return;
    }
    // Validar que la potencia sea mayor que 50.
    const potenciaNum = Number(potencia);
    if (isNaN(potenciaNum) || potenciaNum <= 50) {
      setError('La potencia debe ser mayor que 50 CV.');
      return;
    }
    // Validar que la fecha de fabricación no sea posterior a hoy.
    const today = new Date().toISOString().split('T')[0];
    if (fechaFabricacion > today) {
      setError('La fecha de fabricación no puede ser posterior al día de hoy.');
      return;
    }
    // Validar que el número de chasis sea único.
    if (initialVehicle) {
      // Si se está actualizando y se ha modificado el número de chasis.
      if (numChasis !== initialVehicle.numChasis) {
        const exists = vehicles.some(v => v.numChasis === numChasis);
        if (exists) {
          setError('El número de chasis ya existe en otro vehículo.');
          return;
        }
      }
    } else {
      // Al crear, se debe comprobar que el chasis no exista.
      const exists = vehicles.some(v => v.numChasis === numChasis);
      if (exists) {
        setError('El número de chasis ya existe en el sistema.');
        return;
      }
    }

    // Preparar el objeto vehículo.
    const vehicleData = {
      numChasis,
      marca,
      modelo,
      color,
      potencia: potenciaNum,
      fechaFabricacion,
    };

    // Incluir el ID en caso de actualización.
    if (initialVehicle) {
      vehicleData.id = initialVehicle.id;
    }
    
    onSubmit(vehicleData);
    // Reiniciar el formulario si es creación.
    if (!initialVehicle) {
      setNumChasis('');
      setMarca('');
      setModelo('');
      setColor('');
      setPotencia('');
      setFechaFabricacion('');
    }
    setError('');
  };

  return (
    <div>
      <h2>{initialVehicle ? 'Actualizar Vehículo' : 'Nuevo Vehículo'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de Chasis:</label>
          <input 
            type="text"
            value={numChasis}
            onChange={(e) => setNumChasis(e.target.value)}
          />
        </div>
        <div>
          <label>Marca:</label>
          <input 
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div>
          <label>Modelo:</label>
          <input 
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div>
          <label>Color:</label>
          <input 
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label>Potencia (CV):</label>
          <input 
            type="number"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de Fabricación:</label>
          <input 
            type="date"
            value={fechaFabricacion}
            onChange={(e) => setFechaFabricacion(e.target.value)}
          />
        </div>
        <button type="submit">{initialVehicle ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default FormVehiculos;