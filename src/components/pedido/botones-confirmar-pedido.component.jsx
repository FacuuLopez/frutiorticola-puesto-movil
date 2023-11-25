import { TouchableOpacity, View, Text } from "react-native"
import BotonesConfirmarPedidoStyles from "./botones-confirmar-pedido.styles";
import { apiIntentoPedidoCancelar, apiIntentoPedidoConfirmar } from "../../utils/conecciones/intento-pedido";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";
import { PedidoContext } from "../../context/PedidoProvider";
import { s } from "react-native-size-matters";
import { ToastContenxt } from "../../context/ToastProvider";

const BotonesConfirmarPedido = ({ Keyboard, compradorDefinido }) => {
    const { generarToast, generarAlerta } = useContext(ToastContenxt)
    const { apiRef } = useContext(UserContext)
    const { buscarPedidos, modificandoPedido, mostrarPedido, setIndex, id, itemsPedido, total, cargandoPedido } = useContext(PedidoContext)

    const alertaConfirmarPedido = (mensaje, cantidadArticulos, total) => {
        const titulo = `${cantidadArticulos} Articulos x un total de ${total}`;
        const botones = [
            {
                text: 'Confirmar Pedido',
                onPress: () => confirmarPedido(),
                style: 'yes'
            },
            {
                text: 'No',
                onPress: () => { },
                style: 'no',
            }
        ]
        generarAlerta(titulo, mensaje, botones);
    }

    const alertaNoHayItems = () => {
        const titulo = 'Especifique al menos un item';
        const mensaje = `No se ha definido ninguna cantidad en ningun articulo que no sea 0`;
        const botones = [
            {
                text: 'Ok',
                onPress: () => { },
                style: 'yes'
            },
        ]
        generarAlerta(titulo, mensaje, botones);
    }

    const pedirConfirmacionPedido = () => {
        if (compradorDefinido()) {
            const articulosFiltrados = itemsPedido.filter(item => item.cantidad > 0);
            const articulos = articulosFiltrados.map(item => { return { cantidad: item.cantidad, precio: item.precio, NOMBRE: item.Producto.NOMBRE, NOM2: item.Producto.NOM2 } })
            const cantidadArticulos = articulosFiltrados.length
            const mensaje = `${articulos.map(item => {
                const { cantidad, precio, NOMBRE, NOM2 } = item;
                const total = cantidad * precio;
                return `${NOMBRE.slice(0, 5)}${NOM2 ? `-${NOM2.slice(0, 5)}: ` : `: `}${cantidad} x $${precio} = ${total} \n`
            })}`;
            cantidadArticulos ? alertaConfirmarPedido(mensaje.replace(/,/g, ''), cantidadArticulos, total) : alertaNoHayItems();
        }
    }

    const pedirCancelacionPedido = () => {
        const titulo = 'Cancelar Pedido';
        const mensaje = '¿Desea cancelar el pedido?';
        const botones = [
            {
                text: 'Si',
                onPress: () => cancelarPedido(),
                style: 'yes'
            },
            {
                text: 'No',
                onPress: () => { },
                style: 'no',
            }
        ]
        generarAlerta(titulo, mensaje, botones)
    }//p

    const notificarErrorConfirmoCancel = (accion) => {
        const titulo = `No se pudo ${accion} el pedido`;
        const mensaje = `No se pudo ${accion} el pedido`;
        const botones = [
            {
                text: 'Ok',
                onPress: () => { },
                style: 'yes'
            },
        ]
        generarAlerta(titulo, mensaje, botones)
    }

    const confirmarPedido = async () => {
        try {
            await apiIntentoPedidoConfirmar(apiRef.current, id);
            await buscarPedidos();
            generarToast({
                tipo: 'success',
                titulo: 'Pedido confirmado',
                mensaje: 'el pedido fue confirmado de manera exitosa',
            });
        }
        catch (error) {
            notificarErrorConfirmoCancel('confirmar');
            try {
                buscarPedidos();
            } catch {

            }
        }
    }//p

    const cancelarPedido = async () => {
        try {
            await apiIntentoPedidoCancelar(apiRef.current, id);
            await buscarPedidos();
            setIndex(prev => prev > 0 ? prev - 1 : 0);
            generarToast({
                tipo: 'success',
                titulo: 'Pedido cancelado',
                mensaje: 'el pedido fue cancelado de manera exitosa',

            });
        } catch (error) {
            notificarErrorConfirmoCancel('cancelar');
            try {
                buscarPedidos();
            } catch (error) {

            }
        }
    }//p

    return (
        <View style={{ ...BotonesConfirmarPedidoStyles.contenedorEnvio, marginTop: !mostrarPedido ? s(30) : 0 }}>
            {mostrarPedido || modificandoPedido ?
                <TouchableOpacity
                    style={BotonesConfirmarPedidoStyles.botonEnvio}
                    onPress={modificandoPedido ? () => Keyboard.dismiss() : cargandoPedido ? () => { } : () => pedirConfirmacionPedido()}
                    disabled={cargandoPedido}
                    activeOpacity={0.6}>
                    <Text style={BotonesConfirmarPedidoStyles.botonEnvioTexto}>
                        {modificandoPedido ? 'OK' : cargandoPedido ? 'Cargando...' : 'Realizar Pedido'}
                    </Text>
                </TouchableOpacity> :
                <></>
            }
            <TouchableOpacity style={BotonesConfirmarPedidoStyles.botonCancelar} onPress={() => pedirCancelacionPedido()} activeOpacity={0.6}>
                <Text style={BotonesConfirmarPedidoStyles.botonEnvioTexto}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BotonesConfirmarPedido;