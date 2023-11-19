import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { apiIntentoPedidoActualizarComprador, apiIntentoPedidoGet } from '../utils/conecciones/intento-pedido';
import { UserContext } from './UserProvider';
import { apiGetKeys, apiGetProductos } from '../utils/conecciones/productos';
import { CompradorContext } from './CompradorProvider';
import { ToastContenxt } from './ToastProvider';
import { BusquedaContext } from './BusquedaProvider';
import { ItemContext } from './ItemProvider';
import { apiCrearItemIntentoPedido } from '../utils/conecciones/item-intento-pedido';

export const PedidoContext = createContext();

let ultimoNombreBuscado = '';
let ultimaBusquedaSecundaria = '';

const PedidoProvider = ({ children }) => {

    const [arrayPedidos, setArrayPedidos] = useState([]);
    const [numeroPedidos, setNumeroPedidos] = useState(0);
    const [hayPedido, setHayPedido] = useState(false);
    const [pedido, setPedido] = useState({});
    const [index, setIndex] = useState('0');
    const [respuestaComprador, setRespuestaComprador] = useState({});
    const [itemsPedido, setItemsPedido] = useState([]);
    const [keys, setKeys] = useState([]);
    const [id, setId] = useState(0);
    const [total, setTotal] = useState(0);
    const [cargandoPedido, setCargandoPedido] = useState(false);
    const [modificandoPedido, setModificandoPedido] = useState(false);
    const [mostrarPedido, setMostrarPedido] = useState(false)
    const [cambiandoPedido, setCambiandoPedido] = useState(false);
    const [valoresPedidoIsLoading, setValoresPedidoIsLoading] = useState(false);
    const { apiRef } = useContext(UserContext);
    const { generarToast } = useContext(ToastContenxt)
    const { cargandoComprador, nuevoComprador, setComprador, setCargandoComprador, modificandoComprador } = useContext(CompradorContext);
    const { modificandoItems, cargandoItems, setEstadosCargaItems, estadosCargaItems } = useContext(ItemContext)
    const { noHayBusqueda, limpiarBusqueda, setRegistros, nombre, busquedaSecundaria } = useContext(BusquedaContext);

    // busqueda -- Se Pone aca para evitar re-ciclos de contextos

    const agregarItemPedido = async (IT1, IT2) => {
        try {
            limpiarBusqueda();
            const item = await apiCrearItemIntentoPedido(apiRef.current, IT1, IT2, id);
            agregarItem(item);
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'no se pudo agregar el item',
                mensaje: 'Hubo un error al agregar el item'
            })
        }
    }

    const _encontrarRegistros = async () => {
        try {
            const registrosEncontrados = await apiGetProductos(apiRef.current, nombre, busquedaSecundaria, id);
            const { nombreBusqueda, busquedaSecundariaBusqueda, productos } = registrosEncontrados
            ultimoNombreBuscado == nombreBusqueda && ultimaBusquedaSecundaria == busquedaSecundariaBusqueda && setRegistros(productos);
        } catch (error) {

        }
    }

    useEffect(() => {
        ultimoNombreBuscado = nombre;
        ultimaBusquedaSecundaria = busquedaSecundaria;
        (nombre || busquedaSecundaria) ? _encontrarRegistros() : setRegistros([]);
    }, [nombre, busquedaSecundaria]);

    // comprador

    useEffect(() => {
        respuestaComprador.index == index && setComprador(respuestaComprador.comprador);
    }, [respuestaComprador]); // sirve para comparar el index actual con el usado al momento de usar la funcion act. compr.

    useEffect(() => {
        cargandoComprador && actualizarComprador();
    }, [cargandoComprador]);

    const actualizarComprador = async () => {
        try {
            const comprador = await apiIntentoPedidoActualizarComprador(apiRef.current, nuevoComprador, id);
            setArrayPedidos(prevArray => {
                const newArray = [...prevArray];
                newArray[index]['COMPRADOR'] = comprador
                return newArray
            });
            setRespuestaComprador({index, comprador})
            setCargandoComprador(false);
        } catch (error) {
            setCargandoComprador(false)
            generarToast({
                tipo: 'error',
                titulo: 'No se pudo actualizar el comprador',
                mensaje: 'Hubo un error actualizando el comprador',
            });
        }
    }

    // Total

    const _calcularTotalPedido = () => {
        if (arrayPedidos[index]) {
            const items = arrayPedidos[index].ItemIntentoPedidos
            const precioTotal = items ? items.reduce((total, item) => {
                const { cantidad, precio } = item
                // Multiplica la cantidad por el precio y suma al total acumulado
                return (total + cantidad * precio);
            }, 0) :
                0; // 0 es el valor inicial del total acumulado
            return parseFloat(precioTotal).toFixed(2);
        } else return 0
    };

    useEffect(() => {
        setTotal(_calcularTotalPedido());
    }, [arrayPedidos, index])


    useEffect(() => {
        setTotal(_calcularTotalPedido());
    }, [])

    // keys

    const obtenerKeys = async () => {
        try {
            const keys = await apiGetKeys(apiRef.current);
            setKeys(keys);
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'Error al conectar el servidor',
                mensaje: 'Hay un error para establecer comunicacion con el servidor'
            });
            setTimeout(() => generarToast(), 1000);
        }
    }

    useEffect(() => {
        obtenerKeys()
    }, []);

    // Pedido

    useEffect(() => {
        setCargandoPedido(cargandoItems || cargandoComprador ? true : false);
    }, [cargandoItems, cargandoComprador])

    useEffect(() => {
        noHayBusqueda && itemsPedido && itemsPedido.length > 0 ? setMostrarPedido(true) : setMostrarPedido(false);
    }, [itemsPedido, noHayBusqueda])

    useEffect(() => {
        noHayBusqueda && itemsPedido && itemsPedido.length > 0 ? setMostrarPedido(true) : setMostrarPedido(false);
    }, [])

    useEffect(() => {
        setModificandoPedido(modificandoComprador || modificandoItems ? true : false)
    }, [modificandoComprador, modificandoItems])

    useEffect(() => {
        cargandoComprador || cargandoItems || valoresPedidoIsLoading ?
            setCargandoPedido(true) :
            setCargandoPedido(false);
    }, [cargandoComprador, cargandoItems, valoresPedidoIsLoading]);

    const buscarPedidos = async () => {
        try {
            setValoresPedidoIsLoading(true)
            const arrayPedidos = await apiIntentoPedidoGet(apiRef.current);
            setArrayPedidos(arrayPedidos)
            _actualizarPedido(arrayPedidos)
            setValoresPedidoIsLoading(false)
        } catch (error) {
            setValoresPedidoIsLoading(false)
        }
    }

    const _actualizarPedido = (arrayPedidos) => {
        if (arrayPedidos && arrayPedidos[index]) {
            setPedido(arrayPedidos[index]);
            setNumeroPedidos(arrayPedidos.length)
            arrayPedidos.length > 0 ? setHayPedido(true) : setHayPedido(false)
            setComprador(arrayPedidos[index].COMPRADOR);
            setItemsPedido(arrayPedidos[index].ItemIntentoPedidos);
            setId(arrayPedidos[index].id)
        } else if (index == 0) {
            setPedido(null);
            setNumeroPedidos(0);
            setHayPedido(false);
            setComprador('');
            setItemsPedido([]);
            setId(0);
        }
        else {
            index !== 0 && setIndex('0');
        }
    }

    // Actualiza el array de items en el componente padre
    const setCantidad = (cantidad, itemIndex) => {
        setArrayPedidos(prevArray => {
            const newArray = [...prevArray];
            newArray[index].ItemIntentoPedidos[itemIndex].cantidad = cantidad
            return newArray
        });
    }
    const setPrecio = (precio, itemIndex) => {
        setArrayPedidos(prevArray => {
            const newArray = [...prevArray];
            newArray[index].ItemIntentoPedidos[itemIndex].precio = precio
            return newArray
        });
    }

    const agregarItem = (item) => {
        setItemsPedido(prev => [...prev, item]);
        setArrayPedidos(prevArray => {
            const newArray = [...prevArray];
            newArray[index].ItemIntentoPedidos.push(item);
            return newArray
        });
    }

    useEffect(() => {
        buscarPedidos();
    }, []);

    useEffect(() => {
        setCambiandoPedido(true);
        setModificandoPedido(false)
        setEstadosCargaItems([]);
    }, [index]);

    useEffect(() => {
        cambiandoPedido && (setCambiandoPedido(false), _actualizarPedido(arrayPedidos));
    }, [estadosCargaItems])


    return (
        <PedidoContext.Provider value={{
            agregarItem, numeroPedidos, hayPedido, buscarPedidos, total, setCantidad, setPrecio,
            keys, pedido, itemsPedido, index, setIndex, id, valoresPedidoIsLoading,
            agregarItemPedido,
            modificandoPedido, cargandoPedido, mostrarPedido
        }}>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoProvider