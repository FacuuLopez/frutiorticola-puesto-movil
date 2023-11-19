import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { PuestoContext } from '../../../context/PuestoProvider'
import { s } from 'react-native-size-matters'

const BarraEstadoPuesto = () => {

    const {estado, isLoading, color} = useContext(PuestoContext);

    return (
        <View style={styles.contenedorBarraEstado}>
            <Text style={styles.textoBarraEstado}>
                {estado}
            </Text>
            {!isLoading && <View style={{ ...styles.circuloEstado, backgroundColor: color }} />}
        </View>
    )
}

export default BarraEstadoPuesto

const styles = StyleSheet.create({
    contenedorBarraEstado: {
        marginBottom: s(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: s(20)
    },
    textoBarraEstado: {
        fontSize: s(16),
        fontWeight: 'bold',
        marginEnd: s(6),
        textTransform: 'capitalize'
    },
    circuloEstado: {
        height: s(12),
        width: s(12),
        borderWidth: s(2),
        borderRadius: 50,

    },
})