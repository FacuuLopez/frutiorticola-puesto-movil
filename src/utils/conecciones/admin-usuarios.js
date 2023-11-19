import { rutaUsuarios } from ".";

const _getParams = (object) => new URLSearchParams(object);

export const apiGetUsers = async (api) => {
    try {
        const response = await api.get(`${rutaUsuarios}/obtener-usuarios`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const apiCrearUsuario = async (api, usuario) => {
    const response = await api.post(`${rutaUsuarios}/crear-usuario`, usuario);
    return response.data
}

export const apiModificarUsuario = async (api, usuario) => {
    const response = await api.put(`${rutaUsuarios}/actualizar-usuario`, usuario);
    return response.data
}

export const apiEliminarUsuario = async (api, username) => {
    const queryParams = _getParams({ username })
    const response = await api.delete(`${rutaUsuarios}/eliminar-usuario?${queryParams}`);
    return response.data
}
