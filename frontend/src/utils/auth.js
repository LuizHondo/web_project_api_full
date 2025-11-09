// Prefer env var; fallback to '/api' for production behind Nginx
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  });
};
