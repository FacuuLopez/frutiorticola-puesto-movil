import { View, Platform, Text } from "react-native";
import pedidoEstilos from "./pedido-contenedor.styles";
import { useEffect, useState, useContext, useMemo } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Busqueda from "../../components/pedido/busqueda.component";
import Pedido from "../../components/pedido/pedido.component";
import BotonCerrarSesion from "../../components/pedido/boton-cerrar-sesion.component";
import Registros from "../../components/pedido/registros.component";
import { DimensionesContext } from "../../context/DimensionesProvider";
import ListaStyles from "../../components/pedido/lista.styles";
import { s } from "react-native-size-matters";
import ContenedorListaPedidos from "../../components/pedido/lista-pedidos/contenedor-lista-pedidos";
import { PedidoContext } from "../../context/PedidoProvider";
import { BusquedaContext } from "../../context/BusquedaProvider";

const PedidoContenedor = () => {
    const { hayRegistros } = useContext(BusquedaContext);
    const { width, height, keyboardHeight, isPortrait, unsafeViewAreaHeight, unsafeViewAreaWidth } = useContext(DimensionesContext);
    const porcentajeMargen = 5;
    const [pedidoStyles, setPedidoStyles] = useState({});
    const [listaStyles, setListaStyles] = useState({});
    const [maxHeight, setMaxHeight] = useState(height);
    const { keys, hayPedido, } = useContext(PedidoContext);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            isPortrait ? setMaxHeight(height - keyboardHeight - unsafeViewAreaHeight + s(10)) : setMaxHeight(height);
        }
    }, [height, keyboardHeight]);

    const definirEstilosLista = useMemo(
        () => ListaStyles(width, porcentajeMargen, keys.length, unsafeViewAreaWidth), [width, porcentajeMargen, keys.length, unsafeViewAreaWidth]
    );

    useEffect(() => {
        setPedidoStyles(pedidoEstilos(porcentajeMargen));
    }, [])

    useEffect(() => {
        setListaStyles(definirEstilosLista);
    }, [])

    useEffect(() => {
        setListaStyles(definirEstilosLista);
    }, [width, keys, unsafeViewAreaWidth]);

    return (
        <View style={{ ...pedidoStyles.contenedor, maxHeight }}>
            <View>
                <View style={pedidoStyles.contenedorLogout}>
                    <BotonCerrarSesion />
                </View>
                {hayPedido && <Busqueda />}
            </View>
            {hayRegistros && (
                <Registros
                    listaStyles={listaStyles}
                    porcentajeMargen={porcentajeMargen}
                />
            )}
            {!hayRegistros && <ContenedorListaPedidos />}
            {hayPedido ? <Pedido
                listaStyles={listaStyles}
            /> :
                <View style={pedidoStyles.noHayPedidoContenedor}>
                    <Text style={pedidoStyles.noHayPedidoTexto}>
                        Actualmente no tiene ningun pedido en curso.
                    </Text>
                </View>
            }
            <Toast autoHide={true} visibilityTime={2000} position="bottom" bottomOffset={40} />
        </View>
    )
}

export default PedidoContenedor;