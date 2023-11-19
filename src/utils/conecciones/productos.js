import { rutaProductos } from '.';

const _getParams = (object) => new URLSearchParams(object);

const apiGetBusquedaSecundaria = async (api) => {
  try {
    const url = `${rutaProductos}/busqueda-secundaria`;
    // Mostrar los middlewares en la consola
    const response = await api.get(url);
    const resultados = response.data;
    return resultados;
  } catch (error) {
    throw error
  }
}
const apiGetProductos = async (api, nombre, busquedaSecundaria, id) => {
  try {
    const queryParams = _getParams({ nombre, busquedaSecundaria, id })
    const url = `${rutaProductos}?${queryParams}`;
    // Mostrar los middlewares en la consola
    const response = await api.get(url);
    const resultados = response.data;
    return resultados;
  } catch (error) {
    throw error
  }
}

export const apiGetKeys = async (api) => {
  try {
    const url = `${rutaProductos}/keys`;
    const response = await api.get(url);
    return response.data
  } catch (error) {
    throw error
  }

}

export { apiGetProductos, apiGetBusquedaSecundaria };
