import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import FormularioUsuario from './formulario-usuario';
import { UserContext } from '../../context/UserProvider';
import { apiCrearUsuario } from '../../utils/conecciones/admin-usuarios';
import { s } from 'react-native-size-matters';
import { ToastContenxt } from '../../context/ToastProvider';

const CrearUsuario = ({ setCargandoUsuaios }) => {
    const { generarToast, generarAlerta } = useContext(ToastContenxt)
    const [username, setUsename] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [roleName, setRoleName] = useState('user');
    const { apiRef } = useContext(UserContext);

    const alertaCrearUsuario = () => {
        if (username && password && roleName && password === repeatPassword) {
            const titulo = 'Crear Usuario';
            const mensaje = `¿Desea crear el usuario ${username}?`;
            const botones = [
                {
                    text: 'Si',
                    onPress: () => crearUsuario(),
                    style: 'yes'
                },
                {
                    text: 'No',
                    onPress: () => { },
                    style: 'no',
                }
            ]
            generarAlerta(titulo, mensaje, botones)
        } else {
            const titulo = 'Crear usuario';
            const mensaje = 'Todos los campos son obligatorios y las contraseñas deben coincidir';
            const botones = [
                {
                    text: 'Ok',
                    onPress: () => { },
                    style: 'yes'
                },
            ]
            generarAlerta(titulo, mensaje, botones)
        }
    }

    const crearUsuario = async () => {
        try {
            if (username && password && roleName && password === repeatPassword) {
                const respuesta = await apiCrearUsuario(apiRef.current, { username, password, roleName })
                setUsename('');
                setPassword('');
                setRepeatPassword('');
                setRoleName('user');
                generarToast({
                    tipo: 'success',
                    titulo: 'usuario creado',
                    mensaje: 'el usuario fue creado de manera exitosa',
                })
            }
            setCargandoUsuaios(true)
            return
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'error al crear usuario',
                mensaje: 'no se pudo crear el usuario',
            })
            return
        }
    }

    return (
        <View style={styles.contenedor}>
            <FormularioUsuario
                username={username}
                setUsername={setUsename}
                password={password}
                setPassword={setPassword}
                repeatPassword={repeatPassword}
                setRepeatPassword={setRepeatPassword}
                roleName={roleName}
                setRoleName={setRoleName}
            />
            <TouchableOpacity style={styles.botonCrearUsuario} onPress={alertaCrearUsuario}>
                <Text style={styles.botonCrearUsuarioTexto}>
                    Crear
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CrearUsuario

const styles = StyleSheet.create({
    contenedor: {

    },
    botonCrearUsuario: {
        backgroundColor: '#34DB66',
        paddingVertical: s(2),
        paddingHorizontal: s(5),
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: s(5),
        paddingVertical: s(2),
        marginTop: s(7),
        marginBottom: s(12),
        width: s(100),
        alignSelf: 'center',
        marginHorizontal: '2%',
    },
    botonCrearUsuarioTexto: {
        fontSize: s(16),
        textAlign: 'center'
    }
})