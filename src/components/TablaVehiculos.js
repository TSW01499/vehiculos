import React from 'react';

const TablaVehiculos = ({ vehicles, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Lista de Vehículos</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Número de Chasis</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Potencia (CV)</th>
            <th>Fecha de Fabricación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="7">No hay vehículos registrados.</td>
            </tr>
          ) : (
            vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.numChasis}</td>
                <td>{vehicle.marca}</td>
                <td>{vehicle.modelo}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.potencia}</td>
                <td>{vehicle.fechaFabricacion}</td>
                <td>
                  <button onClick={() => onEdit(vehicle)}>Editar</button>
                  <button onClick={() => onDelete(vehicle.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaVehiculos;