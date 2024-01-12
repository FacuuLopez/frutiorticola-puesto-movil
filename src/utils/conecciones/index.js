import axios from 'axios';

const rutaUsuarios = '/usuarios';
const rutaIntentoPedido = '/intento-pedido';
const rutaItemIntentoPedido = '/item-intento-pedido';
const rutaProductos = '/productos';
const rutaPuesto = '/puesto'

export const crearApi = (baseURL) => axios.create({
  baseURL: `http://${baseURL}`,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {
  rutaUsuarios,
  rutaIntentoPedido, rutaItemIntentoPedido, rutaProductos, rutaPuesto
};
