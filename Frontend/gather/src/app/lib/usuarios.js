const API_URL = 'http://localhost:3000';

export const fetchUsuarios = async () => {
  const response = await fetch(`${API_URL}/gather/usuarios`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchUsuarioById = async (id) => {
  const response = await fetch(`${API_URL}/gather/usuario/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const createUsuarios = async (usuario) => {
  const response = await fetch(`${API_URL}/gather/postUsuario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateUsuario = async (id, Usuario) => {
  const response = await fetch(`${API_URL}/gather/putUsuarios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Usuario),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const deleteQuedada = async (id) => {
  const response = await fetch(`${API_URL}/gather/deleteQuedada/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
