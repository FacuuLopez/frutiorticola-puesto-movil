import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider';
import FormularioModificar from './formulario-modificar';
import { s } from 'react-native-size-matters';
import { apiModificarUsuario } from '../../utils/conecciones/admin-usuarios';
import { ToastContenxt } from '../../context/ToastProvider';

const ModificarUsuario = ({ username, cancelarModificarUsuario, setCargandoUsuaios }) => {
    const {generarToast, generarAlerta} = useContext(ToastContenxt)
    const [nuevoUsername, setNuevoUsename] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const { apiRef } = useContext(UserContext);
    const alertaModificarUsuaio = () => {
        const titulo = 'Modificar Usuario';
        const mensaje = `¿Desea modificar el usuario ${username}?`;
        const botones = [
            {
                text: 'Si',
                onPress: () => modificarUsuario(),
                style: 'yes'
            },
            {
                text: 'No',
                onPress: () => { },
                style: 'no',
            }
        ]
        generarAlerta(titulo, mensaje, botones)
    }

    const alertaCancelarModificarUsuario = () => {
        const titulo = 'Modificar Usuario';
        const mensaje = `¿Desea no modificar el usuario ${username}?`;
        const botones = [
            {
                text: 'Si',
                onPress: () => cancelarModificarUsuario(),
                style: 'yes'
            },
            {
                text: 'No',
                onPress: () => { },
                style: 'no',
            }
        ]
        generarAlerta(titulo, mensaje, botones)
    }

    const modificarUsuario = async () => {
        try {
            if (username && password && password === repeatPassword) {
                const respuesta = await apiModificarUsuario(apiRef.current, { username, password, nuevoUsername });
                generarToast({
                    tipo: 'success',
                    titulo: 'usuario modificado',
                    mensaje: 'el usuario fue modificado de manera exitosa',
                });
                setCargandoUsuaios(true)
                cancelarModificarUsuario();
            }
            return
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'error al modificar usuario',
                mensaje: 'no se pudo modificar el usuario',
            })
            return
        }
    }
    return (
        <View style={styles.contenedor}>
            <Text style={styles.usernameAnterior}>{`Modificar usuario ${username}`}</Text>
            <FormularioModificar
                username={nuevoUsername}
                setUsername={setNuevoUsename}
                password={password}
                setPassword={setPassword}
                repeatPassword={repeatPassword}
                setRepeatPassword={setRepeatPassword}
            />
            <View style={styles.contenedorBotones}>
                <TouchableOpacity
                    style={styles.botonModificarUsuario}
                    onPress={alertaModificarUsuaio}
                >
                    <Text style={styles.botonModificarUsuarioTexto}>
                        Modificar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonCancelarUsuario} onPress={alertaCancelarModificarUsuario}>
                    <Text style={styles.botonCancelarUsuarioTexto}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ModificarUsuario

const styles = StyleSheet.create({
    contenedor: {

    },
    usernameAnterior: {
        fontSize: s(15),
        marginVertical: s(10),
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },
    botonModificarUsuario: {
        backgroundColor: '#3498DB',
        paddingVertical: s(2),
        paddingHorizontal: s(5),
        borderRadius: 5,
        borderWidth: 2
    },
    botonModificarUsuarioTexto: {
        fontSize: s(15),
        color: 'white'
    },
    botonCancelarUsuario: {
        backgroundColor: '#F43',
        paddingVertical: s(2),
        paddingHorizontal: s(5),
        borderRadius: 5,
        borderWidth: 2
    },
    botonCancelarUsuarioTexto: {
        fontSize: s(18),
        color: 'white'
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: s(15),
    }
})