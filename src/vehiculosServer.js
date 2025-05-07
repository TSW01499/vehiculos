const url = 'http://localhost:8000/vehiculos.php';

export const fetchVehicles = async () => {
  const response = await fetch(url);
  return response.json();
};

export const createVehicle = async (vehicle) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle)
  });
  return response.json();
};

export const updateVehicle = async (vehicle) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle)
  });
  return response.json();
};

export const deleteVehicle = async (id) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  return response.json();
};