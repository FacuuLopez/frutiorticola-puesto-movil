import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { s } from "react-native-size-matters";
import { ActivityIndicator } from 'react-native';
import BotonAbrirPuesto from './BotonAbrirPuesto';
import BotonEmepezarCierre from './BotonEmpezarCierre';
import BotonForzarCierre from './BotonForzarCierre';
import { PuestoContext } from '../../../context/PuestoProvider';
import BarraEstadoPuesto from './BarraEstadoPuesto';
import { ToastContenxt } from '../../../context/ToastProvider';

const Puesto = () => {
    const { estado, isLoading, apiRef, consultarEstado, actualizarEstado } = useContext(PuestoContext)

    const {generarToast, generarAlerta} = useContext(ToastContenxt)

    useEffect(() => {
        const interval = setInterval(() => {
            consultarEstado();
            return
        }, 2500);
        // Devolvemos una función de limpieza para detener el intervalo cuando el componente se desmonte.
        return () => clearInterval(interval);
    }, [apiRef])

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>
                Puesto
            </Text>
            <BarraEstadoPuesto />
            {isLoading ?
                <View style={styles.contenedorTextoCargando}>
                    <Text style={styles.textoCargando}>
                        Cargando
                    </Text>
                    <ActivityIndicator style={styles.loadingEstado} color={'#0cc'} size={'large'} />
                </View >
                :
                <View style={styles.contenedorBotones}>
                    <>
                        {estado != 'abierto' && <BotonAbrirPuesto actualizarEstado={actualizarEstado} />}
                        {estado == 'abierto' && <BotonEmepezarCierre actualizarEstado={actualizarEstado} />}
                        {estado == 'cerrando' && <BotonForzarCierre actualizarEstado={actualizarEstado} />}
                    </>
                </View >
            }
        </View>
    )
}

export default Puesto

const styles = StyleSheet.create({
    contenedor: {
        marginTop: s(15),
        marginBottom: s(10),
        backgroundColor: '#888',
        paddingBottom: s(20),
        paddingTop: s(10),
    },
    titulo: {
        fontSize: s(18),
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
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
    loadingEstado: {
        height: s(14),
        width: s(14),
    },
    contenedorBotones: {
        flexDirection: 'row',
    },
    contenedorTextoCargando: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoCargando: {
        marginEnd: s(16),
        fontSize: s(20),
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fc0',
    },
})

