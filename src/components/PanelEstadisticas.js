import React, { useState } from 'react';

const PanelEstadisticas = ({ vehicles }) => {
  // Estadísticas generales.
  const potencyValues = vehicles.map(v => Number(v.potencia));
  const average = potencyValues.length > 0 
                    ? (potencyValues.reduce((sum, val) => sum + val, 0) / potencyValues.length).toFixed(2) 
                    : 0;
  const min = potencyValues.length > 0 ? Math.min(...potencyValues) : 0;
  const max = potencyValues.length > 0 ? Math.max(...potencyValues) : 0;

  // Lista única de marcas para filtrar.
  const marcas = [...new Set(vehicles.map(v => v.marca))];
  const [selectedMarca, setSelectedMarca] = useState('');

  const filteredVehicles = selectedMarca ? vehicles.filter(v => v.marca === selectedMarca) : [];
  const filteredPotency = filteredVehicles.map(v => Number(v.potencia));
  const averageFiltered = filteredPotency.length > 0 
                            ? (filteredPotency.reduce((sum, val) => sum + val, 0) / filteredPotency.length).toFixed(2) 
                            : 0;
  const minFiltered = filteredPotency.length > 0 ? Math.min(...filteredPotency) : 0;
  const maxFiltered = filteredPotency.length > 0 ? Math.max(...filteredPotency) : 0;

  return (
    <div>
      <h2>Estadísticas Generales</h2>
      <p>Potencia media: {average} CV</p>
      <p>Potencia mínima: {min} CV</p>
      <p>Potencia máxima: {max} CV</p>
      
      <h3>Estadísticas filtradas por marca</h3>
      <div>
        <label>Seleccione marca: </label>
        <select value={selectedMarca} onChange={(e) => setSelectedMarca(e.target.value)}>
          <option value="">--Seleccione--</option>
          {marcas.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </select>
      </div>
      {selectedMarca && (
        <div>
          <p>Potencia media: {averageFiltered} CV</p>
          <p>Potencia mínima: {minFiltered} CV</p>
          <p>Potencia máxima: {maxFiltered} CV</p>
        </div>
      )}
    </div>
  );
};

export default PanelEstadisticas;