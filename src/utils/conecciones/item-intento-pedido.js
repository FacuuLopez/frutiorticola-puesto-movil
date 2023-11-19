import api, { rutaItemIntentoPedido } from ".";

const apiItemsIntentoPedidoGet = async (api, id) => {
    try {
        const response = await api.get(`${rutaItemIntentoPedido}`);
        const itemsIntentoPedido = response.data;
        const pedidoParseado = itemsIntentoPedido.map(item => {
            const { precio, cantidad, Producto } = item
            const {NOMBRE, NOM2} = Producto
            const cantidadParseada = (cantidad * 1).toString();
            return { ...item, cantidad: cantidadParseada }
        })
        return pedidoParseado;
    } catch (error) {
        throw error;
    }
}

const apiCrearItemIntentoPedido = async (api, IT1, IT2, id) => {
    const response = await api.post(`${rutaItemIntentoPedido}`, { IT1, IT2, id });
    return response.data
}

const apiActualizarItemIntentoPedidoPrecio = async (api, id, precio) => {
    try {
        const precioNumerico = precio !== '' ? Number(precio) : 0;

        const nuevoItemNumerico = {
            id,
            precio: precioNumerico
        };
        const response = await api.put(`${rutaItemIntentoPedido}/precio`, nuevoItemNumerico);
        const result = response.data
        return result
    } catch (error) {
        throw new Error('no se pudo actualizar la cantidad')
    }
};

const apiActualizarItemIntentoPedidoCantidad = async (api, id, cantidad) => {
    try {
        const cantidadNumerico = cantidad !== '' ? Number(cantidad) : 0;

        const nuevoItemNumerico = {
            id,
            cantidad: cantidadNumerico
        };

        const response = await api.put(`${rutaItemIntentoPedido}/cantidad`, nuevoItemNumerico);
        const result = response.data
        return result
    } catch (error) {
        throw error
    }
};

const apiActualizarProductosNegativo = async (api, id, cantidad) => {
    const cantidadNumerico = Number(cantidad);
    const nuevoItemNumerico = {
        id,
        cantidad: cantidadNumerico
    };
    const response = await api.put(`${rutaItemIntentoPedido}/cantidad-negativa`, nuevoItemNumerico);
    const result = response.data
    return result
}

const apiDevolverStockItem = async (api, id) => {
    const response = await api.put(`${rutaItemIntentoPedido}/devolver-stock`, { id });
    const result = response.data
    return result
}

export {
    apiCrearItemIntentoPedido,
    apiItemsIntentoPedidoGet,
    apiActualizarItemIntentoPedidoPrecio,
    apiActualizarItemIntentoPedidoCantidad,
    apiActualizarProductosNegativo,
    apiDevolverStockItem,
}