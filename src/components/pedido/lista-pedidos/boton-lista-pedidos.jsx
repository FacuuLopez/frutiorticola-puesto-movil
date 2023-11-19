import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { s } from 'react-native-size-matters'
import { PedidoContext } from '../../../context/PedidoProvider'

const BotonListaPedidos = ({ indice }) => {

    const { index, setIndex } = useContext(PedidoContext);
    const activo = indice == index ? true : false

    const styles = StyleSheet.create({
        boton: {
            minWidth: s(36),
            height: s(36),
            backgroundColor: activo ? '#036' : '#55ccEE',
            borderRadius: s(3),
            borderWidth: activo ? s(3) : s(2),
            borderColor: activo ? '#000' : '#222',
            padding: activo ? 0 : s(1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginEnd: s(20),
        },
        text: {
            fontSize: s(22),
            lineHeight: s(28),
            color: 'white',
            fontWeight: 'bold',
            textAlignVertical: 'center',
        }

    })

    return (
        <TouchableOpacity style={styles.boton} onPress={() => { setIndex(indice) }}>
            <Text style={styles.text}>
                {indice + 1}
            </Text>
        </TouchableOpacity>
    )
}

export default BotonListaPedidos

