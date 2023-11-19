import { rutaIntentoPedido } from '.';

const _getParams = (object) => new URLSearchParams(object);

const apiIntentoPedidoGet = async (api) => {
    try {
        const response = await api.get(`${rutaIntentoPedido}`);
        const { intentosPedido: arrayPedidos } = response.data
        return arrayPedidos
    } catch (error) {
        throw error;
    }
}

export const apiCrearIntentoPedido = async (api) => {
    try {
        const response = await api.post(`${rutaIntentoPedido}/crear-pedido`);
        return
    } catch (error) {
        throw error
    }
}

const apiIntentoPedidoConfirmar = async (api, id) => {
    try {
        const response = await api.post(`${rutaIntentoPedido}/confirmar`, { id });
        const intentoPedido = response.data;
        return intentoPedido;
    } catch (error) {
        throw error
    }
}

const apiIntentoPedidoActualizarComprador = async (api, comprador, id) => {
    try {
        const response = await api.post(`${rutaIntentoPedido}/actualizar-comprador`, { comprador, id });
        const { comprador: compradorActualizado } = response.data;
        return compradorActualizado;
    } catch (error) {
        throw new Error('No se pudo actualizar el comprador');
    }
};


const apiIntentoPedidoCancelar = async (api, id) => {
    try {
        const params = _getParams({ id })
        const url = `${rutaIntentoPedido}/cancelar/${id}`
        const response = await api.delete(url);
        const result = response.data;
        return result;
    } catch (error) {
        throw new Error('No se pudo cancelar el pedido');
    }

}

export {
    apiIntentoPedidoGet, apiIntentoPedidoConfirmar,
    apiIntentoPedidoCancelar, apiIntentoPedidoActualizarComprador
};