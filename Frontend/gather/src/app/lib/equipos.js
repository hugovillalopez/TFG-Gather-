// lib/api.js
const API_URL = 'http://localhost:3000';

export const fetchEquipos = async () => {
  const response = await fetch(`${API_URL}/gather/equipos`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchEquiposUsuarios = async () => {
  const response = await fetch(`${API_URL}/gather/equiposUsuarios`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
};

export const fetchEquipoById = async (id) => {
  const dato = {
    id: id
  }
  const response = await fetch(`${API_URL}/gather/equipo`,{
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

export const fetchEquiposByNombre = async (nombre) => {
  const dato = {
    nombre: nombre
}
  const response = await fetch(`${API_URL}/gather/buscarEquipos`,{
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

export const fetchEquipoByNombre = async (nombre) => {
  const datos = {
    nombre: nombre
  }
  const response = await fetch(`${API_URL}/gather/mostrarEquipo`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const createEquipo = async (equipo) => {
  const response = await fetch(`${API_URL}/gather/postEquipo`, {
    method: 'POST',
    body: equipo,
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const solicitarEquipo = async (idUsuario ,idEquipo ,solicitar) => {
  const datos = {
    idUsuario: idUsuario,
    idEquipo: idEquipo,
    solicitar: solicitar
  }
  const response = await fetch(`${API_URL}/gather/solicitarEquipo`, {
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

export const apuntarseEquipo = async (idUsuario ,idEquipo ,desapuntarse) => {
  const datos = {
    idUsuario: idUsuario,
    idEquipo: idEquipo,
    desapuntarse: desapuntarse
  }
  const response = await fetch(`${API_URL}/gather/apuntarseEquipo`, {
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

export const adminsEquipo = async (idUsuario ,idEquipo ,quitar) => {
  const datos = {
    idUsuario: idUsuario,
    idEquipo: idEquipo,
    quitar: quitar
  }
  const response = await fetch(`${API_URL}/gather/adminsEquipo`, {
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

export const updateEquipo = async (id, equipo) => {
  const response = await fetch(`${API_URL}/gather/putEquipo/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipo),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const deleteEquipo = async (idEquipo,idUsuario) => {
  const response = await fetch(`${API_URL}/gather/deleteEquipo/${idEquipo}/${idUsuario}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
