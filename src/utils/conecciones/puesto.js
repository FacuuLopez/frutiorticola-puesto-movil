import { rutaPuesto } from "."

export const apiPuestoGetEstado = async (api) => {
    const response = await api.get(`${rutaPuesto}`);
    return response.data
}

export const apiPuestoAbrir = async (api) => {
    const response = await api.put(`${rutaPuesto}/abrir-puesto`);
    return response.data
}

export const apiPuestoCerrando = async (api) => {
    const response = await api.put(`${rutaPuesto}/comenzar-cierre-puesto`);
    return response.data
}

export const apiPuestoForzarCierre = async (api) => {
    const response = await api.put(`${rutaPuesto}/forzar-cierre-puesto`);
    return response.data
}