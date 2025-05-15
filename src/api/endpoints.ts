export const API_ENDPOINTS = {
  GET_ALL: 'http://localhost:5173/api/reservoirs', 
  CREATE: 'http://localhost:5173/api/reservoirs',
  UPDATE: (id: number) => `http://localhost:5173/api/reservoirs${id}`,
  DELETE: (id: number) => `http://localhost:5173/api/reservoirs${id}`,
};
