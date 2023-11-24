import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native"
import { apiActualizarItemIntentoPedidoCantidad, apiActualizarItemIntentoPedidoPrecio, apiActualizarProductosNegativo, apiDevolverStockItem } from "../../utils/conecciones/item-intento-pedido";
import { validarValorItemsPedido } from "../../utils/validadores/validadores-componentes";
import { DimensionesContext } from "../../context/DimensionesProvider";
import { UserContext } from "../../context/UserProvider";
import { PedidoContext } from "../../context/PedidoProvider";
import { ToastContenxt } from "../../context/ToastProvider";
import { ItemContext } from "../../context/ItemProvider";


const ItemPedido = ({ item, itemIndex, listaStyles }) => {
    const { generarToast, generarAlerta } = useContext(ToastContenxt)
    const [cantidadIsLoading, setCantidadIsLoading] = useState(false);
    const [precioIsLoading, setPrecioIsLoading] = useState(false);
    const [cantidadCambioValor, setCantidadCambioValor] = useState(false);
    const [precioCambioValor, setPrecioCambioValor] = useState(false);
    const { id, cantidad, precio, Producto } = item;
    const cantidadRef = useRef(null);
    const precioRef = useRef(null);
    const { isPortrait } = useContext(DimensionesContext);
    const { apiRef } = useContext(UserContext);
    const { setPrecio, setCantidad, buscarPedidos } = useContext(PedidoContext)
    const { setModificandoItems, actualizarEstadoItem } = useContext(ItemContext)
    const [itemPrecio, setItemPrecio] = useState('');
    const [itemCantidad, setItemCantidad] = useState('')

    useEffect(() => {
        return () => {
            cantidadCambioValor && actualizarCantidad();
            precioCambioValor && actualizarPrecio();
        }
    }, [])

    useEffect(() => {
        Number(cantidad) != 0 ? setItemCantidad(cantidad) : setItemCantidad('')
        Number(precio) != 0 ? setItemPrecio(precio) : setItemPrecio('')
    }, [])

    //actualiza el array para que el componente padre sepa si esta cargando el item

    useEffect(() => {
        actualizarEstadoItem(itemIndex, false);
    }, []);

    // le comunica al componente padre si la cant o el precio estan cargando
    useEffect(() => {
        (precioIsLoading || cantidadIsLoading) ?
            actualizarEstadoItem(itemIndex, true) :
            actualizarEstadoItem(itemIndex, false);
    }, [precioIsLoading, cantidadIsLoading]);

    const colocarFoco = (propiedad) => {
        propiedad.current && propiedad.current.focus();
    }

    const handleChangePrecio = (nuevoPrecio) => {
        try {
            const valorParseado = validarValorItemsPedido(nuevoPrecio);
            setItemPrecio(valorParseado);
            setPrecio(valorParseado, itemIndex)
            const cambio = valorParseado != precio ? true : false
            setPrecioCambioValor(cambio);
            setModificandoItems(cambio);

        } catch (error) {
            generarToast({ titulo: 'Número invalido', tipo: 'error', mensaje: error });
        }

    }

    const handleChangeCantidad = (nuevaCantidad) => {
        try {
            const valorParseado = validarValorItemsPedido(nuevaCantidad);
            setItemCantidad(valorParseado);
            setCantidad(valorParseado, itemIndex);
            const cambio = valorParseado != cantidad ? true : false
            setCantidadCambioValor(cambio);
            setModificandoItems(cambio);
        } catch (error) {
            generarToast({ titulo: 'Número invalido', tipo: 'error', mensaje: error });
        }
    }


    const actualizarCantidad = async () => {
        try {
            const nuevaCantidad = await apiActualizarItemIntentoPedidoCantidad(apiRef.current, id, itemCantidad);
            setCantidad(nuevaCantidad.toString(), itemIndex);
            setCantidadIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status == 409) {
                const { stock, nuevoStock } = error.response.data
                generarAlertaSinStock(stock, nuevoStock)
                // El status code es 409 (conflicto) por lo que el stock fue insuficiente se  devuelve 0
            } else {
                setCantidadIsLoading(false);
                try {
                    await buscarPedidos() // actualizarItemsPedido();
                } catch (error) {

                }

            }
        }

    }

    const actualizarCantidadNegativa = async () => {
        try {
            const nuevaCantidad = await apiActualizarProductosNegativo(apiRef.current, id, itemCantidad);
            setCantidad(nuevaCantidad.toString(), itemIndex);
            setCantidadIsLoading(false);
        } catch (error) {
            generarToast({ titulo: 'Algo salio mal no se pudo actualizar el stock', tipo: 'error', mensaje: error });
            setCantidadIsLoading(false);
            try {
                await buscarPedidos()
            } catch (error) {

            }

        }
    }

    const devolverStock = async () => {
        try {
            await apiDevolverStockItem(apiRef.current, id);
            setItemCantidad('');
            setCantidad('', itemIndex);
            setCantidadIsLoading(false);
        } catch (error) {
            generarToast({
                titulo: 'Algo salio mal no se pudo devolver el stock',
                tipo: 'error',
                mensaje: 'Hubo un error devolviendo el stock',
            });
            setCantidadIsLoading(false);
        }
    }

    const actualizarPrecio = async () => {
        try {
            const nuevoPrecio = await apiActualizarItemIntentoPedidoPrecio(apiRef.current, id, itemPrecio);
            setPrecio(nuevoPrecio.toString(), itemIndex);
            setPrecioIsLoading(false);
        } catch (error) {
            setPrecioIsLoading(false);
            try {
                await buscarPedidos() // actualizarItemsPedido();
            } catch (error) {

            }
        }
    }

    const generarAlertaSinStock = (stock, nuevoStock) => {
        const titulo = 'Stock insuficiente';
        const mensaje = `Stock disponible: ${stock} \n 
        Cantidad del pedido \n 
        Nuevo Stock: ${nuevoStock} \n 
        ¿Desea actualizar el stock de todos modos?`;
        const botones = [
            {
                text: 'Si',
                onPress: () => actualizarCantidadNegativa(),
                style: 'yes'
            },
            {
                text: 'No',
                onPress: () => devolverStock(),
                style: 'no'
            }
        ]
        generarAlerta(titulo, mensaje, botones);
    }

    const generarToastNumeroInvalido = (propiedad) => {
        generarToast({
            tipo: 'error',
            titulo: `${propiedad} no es un número`,
            mensaje: 'El valor ingresado es invalido',
        })
    }

    //dispara comienzo de actualizacion de la nueva cantidad o precio al cambiar estado a cargando
    const handleBlurCantidad = () => {
        setModificandoItems(false)
        Number(cantidad) != 0 ? setItemCantidad(cantidad) : setItemCantidad('')
        if (isNaN(Number(itemCantidad))) {
            generarToastNumeroInvalido('cantidad');
            colocarFoco(cantidadRef);
            return
        }
        cantidadCambioValor && setCantidadIsLoading(true);
        setCantidadCambioValor(false)
    }
    const handleBlurPrecio = () => {
        setModificandoItems(false)
        Number(precio) != 0 ? setItemPrecio(precio) : setItemPrecio('')
        if (isNaN(Number(precio))) {
            generarToastNumeroInvalido('precio');
            colocarFoco(precioRef);
            return
        }
        precioCambioValor && setPrecioIsLoading(itemPrecio);
        setPrecioCambioValor(false);
    }

    //luego de setear cant o precio is loading empieza la actualizacion del valor
    useEffect(() => {
        cantidadIsLoading && (actualizarCantidad());
    }, [cantidadIsLoading]);
    useEffect(() => {
        precioIsLoading && (actualizarPrecio());
    }, [precioIsLoading]);

    return (
        <View style={listaStyles.listaContenedor}>
            {Producto && Object.entries(Producto).map(([key, value], index) => {
                if (key === 'IT1' || key === 'IT2') return;
                return (
                    <View style={listaStyles.listaContenedorColumnaPedido} key={`${key}`}>
                        <Text style={index % 2 ? listaStyles.listaRegistro1Pedido : listaStyles.listaRegistro2Pedido} >
                            {`${value.slice(0, 5)}`}
                        </Text>
                    </View>

                );
            })}
            <View style={listaStyles.listaContenedorColumnaPedido}>
                <TextInput
                    style={listaStyles.listaInput}
                    placeholder="cant."
                    ref={cantidadRef}
                    keyboardType="decimal-pad"
                    disableFullscreenUI={isPortrait}
                    onChangeText={handleChangeCantidad}
                    onBlur={handleBlurCantidad}
                    value={itemCantidad}
                    editable={!cantidadIsLoading}
                />
            </View>
            <View style={listaStyles.listaContenedorColumnaPedido}>
                <TextInput
                    style={listaStyles.listaInput}
                    disableFullscreenUI={isPortrait}
                    ref={precioRef}
                    placeholder="precio"
                    keyboardType="decimal-pad"
                    onChangeText={handleChangePrecio}
                    onBlur={handleBlurPrecio}
                    value={itemPrecio}
                    editable={!precioIsLoading}
                />
            </View>
        </View>
    );
}
export default ItemPedido;