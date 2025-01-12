// lib/api.js
const API_URL = 'http://localhost:3000';

export const fetchQuedadas = async () => {
  const response = await fetch(`${API_URL}/gather/quedadas`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchQuedadasUsuarios = async () => {
  const response = await fetch(`${API_URL}/gather/quedadasUsuarios`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
};

export const fetchQuedadaById = async (id) => {
  const dato = {
    id: id
  }
  const response = await fetch(`${API_URL}/gather/quedada`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dato),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchQuedadasPorEquipo = async (equipo) => {
  const dato = {
    equipo: equipo
  }
  const response = await fetch(`${API_URL}/gather/buscarQuedadasPorEquipo`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dato),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchQuedadasByNombre = async (nombre) => {
  const dato = {
    nombre: nombre
  }
  const response = await fetch(`${API_URL}/gather/buscarQuedadas`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dato),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const createQuedada = async (quedada) => {
  const response = await fetch(`${API_URL}/gather/postQuedada`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quedada),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const apuntarse = async (idUsuario ,idQuedada ,desapuntarse) => {
  const datos = {
    idUsuario: idUsuario,
    idQuedada: idQuedada,
    desapuntarse: desapuntarse
  }
  const response = await fetch(`${API_URL}/gather/apuntarse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`Network response was not ok: ${errorDetails.message || response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const updateQuedada = async (id, quedada) => {
  const response = await fetch(`${API_URL}/gather/putQuedadas/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quedada),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const deleteQuedada = async (idQuedada,idUsuario) => {
  const response = await fetch(`${API_URL}/gather/deleteQuedada/${idQuedada}/${idUsuario}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
