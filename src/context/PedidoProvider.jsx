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
    const [index, setIndex] = useState(0);
    const [respuestaComprador, setRespuestaComprador] = useState({});
    const [itemsPedido, setItemsPedido] = useState([]);
    const [keys, setKeys] = useState([]);
    const [id, setId] = useState(0);
    const [totalSenias, setTotalSenias] = useState(0);
    const [totalVacios, setTotalVacios] = useState(0);
    const [total, setTotal] = useState(0);
    const [cargandoPedido, setCargandoPedido] = useState(false);
    const [modificandoPedido, setModificandoPedido] = useState(false);
    const [mostrarPedido, setMostrarPedido] = useState(false)
    const [cambiandoPedido, setCambiandoPedido] = useState(false);
    const [recargarPedido, setRecargarPedido] = useState(false);
    const [valoresPedidoIsLoading, setValoresPedidoIsLoading] = useState(false);
    const { apiRef } = useContext(UserContext);
    const { generarToast } = useContext(ToastContenxt)
    const { cargandoComprador, nuevoComprador, setComprador, setCargandoComprador, modificandoComprador, setModificandoComprador, setNuevoComprador } = useContext(CompradorContext);
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
        respuestaComprador.indice && respuestaComprador.indice == index && setComprador(respuestaComprador.comprador);
    }, [respuestaComprador]); // sirve para comparar el index actual con el usado al momento de usar la funcion act. compr.

    useEffect(() => {
        cargandoComprador && actualizarComprador();
    }, [cargandoComprador]);

    const actualizarComprador = async () => {
        try {
            const comprador = await apiIntentoPedidoActualizarComprador(apiRef.current, nuevoComprador, id);
            let indice = -1
            setArrayPedidos(prevArray => {
                const foundPedido = prevArray.find(pedido => pedido.id === id);
                if (foundPedido) {
                    indice = prevArray.indexOf(foundPedido);
                    const newArray = [...prevArray];
                    newArray[indice]['COMPRADOR'] = comprador;
                    return newArray;
                } else {
                    // Manejar el caso en el que no se encuentre ningún pedido con el ID dado
                    return prevArray;
                }
            });
            setRespuestaComprador({ indice, comprador })
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

    const _calcularTotalesPedido = () => {
        let total = 0, totalSenias = 0, totalVacios = 0
        if (arrayPedidos[index]) {
            const items = arrayPedidos[index].ItemIntentoPedidos
            const precioTotal = items ? items.reduce(({ total, totalSenias, totalVacios }, item) => {
                const { cantidad, precio, Producto } = item
                const { SENIA } = Producto
                // Multiplica la cantidad por el precio y suma al total acumulado
                totalSenias += cantidad * SENIA;
                totalVacios += cantidad * precio;
                total = totalSenias + totalVacios
                return ({ total, totalSenias, totalVacios });
            }, { total, totalSenias, totalVacios }) :
                { total, totalSenias, totalVacios }; // 0 es el valor inicial del total acumulado
            total = precioTotal.total;
            totalSenias = precioTotal.totalSenias;
            totalVacios = precioTotal.totalVacios
        }
        setTotal(total);
        setTotalSenias(totalSenias);
        setTotalVacios(totalVacios);
    };

    useEffect(() => {
        _calcularTotalesPedido();
    }, [arrayPedidos, index])


    useEffect(() => {
        _calcularTotalesPedido();
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
            generarToast({
                tipo: 'error',
                titulo: 'actualize los pedidos',
                mensaje: 'Hubo un error actualizando los pedidos',
            })
        }
    }

    const _actualizarPedido = (arrayPedidos) => {
        if (arrayPedidos && arrayPedidos[index]) {
            setPedido(arrayPedidos[index]);
            setNumeroPedidos(arrayPedidos.length)
            arrayPedidos.length > 0 ? setHayPedido(true) : setHayPedido(false)
            setComprador(arrayPedidos[index].COMPRADOR ? arrayPedidos[index].COMPRADOR : '');
            setNuevoComprador(arrayPedidos[index].COMPRADOR ? arrayPedidos[index].COMPRADOR : '')
            setItemsPedido(arrayPedidos[index].ItemIntentoPedidos);
            setId(arrayPedidos[index].id)
        } else if (index == 0) {
            setPedido(null);
            setNumeroPedidos(0);
            setHayPedido(false);
            setComprador('');
            setNuevoComprador('')
            setItemsPedido([]);
            setId(0);
        }
        else {
            index !== 0 && setIndex(0);
        }
    }

    // Actualiza el array de items en el componente padre
    const setCantidad = (cantidad, itemIndex) => {
        setArrayPedidos(prevArray => {
            const newArray = [...prevArray];
            if (newArray[index].ItemIntentoPedidos[itemIndex]) {
                newArray[index].ItemIntentoPedidos[itemIndex].cantidad = cantidad;
            }
            return newArray
        });
    }
    const setPrecio = (precio, itemIndex) => {
        setArrayPedidos(prevArray => {
            const newArray = [...prevArray];
            if (newArray[index].ItemIntentoPedidos[itemIndex]) {
                newArray[index].ItemIntentoPedidos[itemIndex].precio = precio
            }
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
        setModificandoComprador(false);
        setModificandoPedido(false);
        setCambiandoPedido(true);
    }, [index]);

    useEffect(() => {
        cambiandoPedido && setEstadosCargaItems([]);
    }, [cambiandoPedido])

    useEffect(() => {
        cambiandoPedido && (_actualizarPedido(arrayPedidos), setCambiandoPedido(false));
    }, [estadosCargaItems])


    return (
        <PedidoContext.Provider value={{
            agregarItem, numeroPedidos, hayPedido, buscarPedidos,
            totalSenias, totalVacios, total,
            setCantidad, setPrecio,
            keys, pedido, itemsPedido, index, setIndex, id, valoresPedidoIsLoading,
            agregarItemPedido, modificandoPedido, cargandoPedido, mostrarPedido,
            setRecargarPedido, recargarPedido
        }}>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoProvider