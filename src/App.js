import React, { useState, useEffect } from 'react';
import TablaVehiculos from './components/TablaVehiculos';
import FormVehiculos from './components/FormVehiculos';
import PanelEstadisticas from './components/PanelEstadisticas';
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle } from './vehiculosServer';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const loadVehicles = async () => {
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleCreate = async (vehicleData) => {
    try {
      const newVehicle = await createVehicle(vehicleData);
      setVehicles([...vehicles, newVehicle]);
    } catch (error) {
      console.error('Error al crear vehículo:', error);
    }
  };

  const handleUpdate = async (vehicleData) => {
    try {
      const updatedVehicle = await updateVehicle(vehicleData);
      setVehicles(vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
      setEditingVehicle(null);
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  return (
    <div>
      <h1>Gestión de Vehículos del Concesionario</h1>
      
      <TablaVehiculos vehicles={vehicles} onDelete={handleDelete} onEdit={handleEdit} />

      <hr />

      {/* Si se está editando, el formulario actúa en modo actualización; de lo contrario se crea un nuevo vehículo */}
      <FormVehiculos
        onSubmit={editingVehicle ? handleUpdate : handleCreate}
        initialVehicle={editingVehicle}
        vehicles={vehicles}
      />
      
      <hr />

      <PanelEstadisticas vehicles={vehicles} />
    </div>
  );
}

export default App;