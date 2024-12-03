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

export const fetchQuedadaById = async (id) => {
  const response = await fetch(`${API_URL}/gather/quedada/${id}`);
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
