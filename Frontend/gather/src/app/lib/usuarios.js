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
  const dato = {
    id: id
  }
  const response = await fetch(`${API_URL}/gather/usuario`,{
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

export const fetchUsuarioByUsername = async (username) => {
  const response = await fetch(`${API_URL}/gather/mostrarUsuario`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(username),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchUsuariosByUsername = async (username) => {
  const dato = {
    username: username
  }
  const response = await fetch(`${API_URL}/gather/buscarUsuarios`,{
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

export const createUsuarios = async (usuario) => {
  const response = await fetch(`${API_URL}/gather/postUsuario`, {
    method: 'POST',
    body: usuario,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
};

export const loggear = async (usuario) => {
  const response = await fetch(`${API_URL}/gather/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`${errorDetails.message || response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const verificarId = async (token) =>{
    sessionStorage.setItem("token",token)
    const response = await fetch(`${API_URL}/gather/protected`, {
      headers: {
        'Authorization': token
      }
    })
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Network response was not ok: ${errorDetails.message || response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const seguir = async (seguido, seguidor, dejarSeguir) => {
  const datos = {
    seguido: seguido,
    seguidor: seguidor,
    dejarSeguir: dejarSeguir
}
  const response = await fetch(`${API_URL}/gather/seguir`, {
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

export const deleteUsuario = async (id) => {
  const response = await fetch(`${API_URL}/gather/deleteUsuario/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const actualizarFotoUsuario = async (datos) => {
  const response = await fetch(`${API_URL}/gather/actualizarFotoUsuario`, {
    method: 'POST',
    body: datos,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
};

export const olvidadaPassword = async (correo) => {
  const datos = {
    correo: correo
}
  const response = await fetch(`${API_URL}/gather/olvidadaPassword`, {
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

export const olvidadaPasswordToken = async (token,password) => {
  const datos = {
    password: password
}
  const response = await fetch(`${API_URL}/gather/olvidadaPassword/${token}`, {
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

export const cambiarPassword = async (datos) => {
  
  const response = await fetch(`${API_URL}/gather/cambiarPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || response.statusText)
  }
  const data = await response.json();
  return data;
};