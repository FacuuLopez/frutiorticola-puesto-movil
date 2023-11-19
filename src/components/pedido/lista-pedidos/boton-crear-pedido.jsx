import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { s } from 'react-native-size-matters'
import { UserContext } from '../../../context/UserProvider';
import { PedidoContext } from '../../../context/PedidoProvider';
import { apiCrearIntentoPedido } from '../../../utils/conecciones/intento-pedido';

const BotonCrearPedido = () => {

    const { apiRef } = useContext(UserContext);
    const { buscarPedidos, numeroPedidos, setIndex } = useContext(PedidoContext)

    const crearPedido = async () => {
        try {
            const response = await apiCrearIntentoPedido(apiRef.current);
            await buscarPedidos();
            setIndex(numeroPedidos)
        } catch (error) {

        }
    }

    return (
        <TouchableOpacity style={styles.boton} onPress={() => { crearPedido() }}>
            <Text style={styles.text}>
                +
            </Text>
        </TouchableOpacity>
    )
}

export default BotonCrearPedido

const styles = StyleSheet.create({
    boton: {
        width: s(36),
        height: s(36),
        backgroundColor: '#28a745',
        borderRadius: s(3),
        borderWidth: s(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: s(32),
        lineHeight: s(35),
        color: 'white',
        fontWeight: 'bold',
    }

})