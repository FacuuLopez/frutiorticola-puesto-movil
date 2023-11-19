import axios from 'axios';

const baseURL = 'http://192.168.0.8:8080';
const rutaUsuarios = '/usuarios';
const rutaIntentoPedido = '/intento-pedido';
const rutaItemIntentoPedido = '/item-intento-pedido';
const rutaProductos = '/productos';
const rutaPuesto = '/puesto'

export const crearApi = (baseURL) => axios.create({
  baseURL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = axios.create({
  baseURL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addTokenUsuarioCookie = (tokenUsuario) => {
  api.interceptors.request.use((config) => {
    if (!config.url.includes(`${rutaUsuarios}/login`)) {
      // Agregar la cookie al encabezado de la solicitud
      config.headers['Cookie'] = `tokenUsuario=${tokenUsuario}`;
    }
    return config;
  });
};

export default api;

export {
  addTokenUsuarioCookie, rutaUsuarios,
  rutaIntentoPedido, rutaItemIntentoPedido, rutaProductos, rutaPuesto
};
