import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { apiEliminarUsuario } from '../../utils/conecciones/admin-usuarios'
import { s } from 'react-native-size-matters'
import { ToastContenxt } from '../../context/ToastProvider'

const ItemUsuario = ({ username, roleName, apiRef, modificarUsuario, setCargandoUsuaios }) => {

    const {generarToast, generarAlerta} = useContext(ToastContenxt)

    const alertaEliminarUsuario = () => {
        const titulo = 'Eliminar Usuario';
            const mensaje = `¿Desea eliminar el usuario ${username}?`;
            const botones = [
                {
                    text: 'Si',
                    onPress: () => eliminarUsuario(),
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
    const eliminarUsuario = async() => {
        try {
            const respuesta = await apiEliminarUsuario(apiRef.current, username)
            generarToast({
                tipo: 'success',
                titulo: 'usuario eliminado',
                mensaje: 'el usuario fue eliminado de manera exitosa',
            })
            setCargandoUsuaios(true);
            return
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'error al eliminar usuario',
                mensaje: error.response.data.result == 'El usuario tiene ventas en curso no se puede eliminar' ?
                'El usuario tiene ventas en curso' : 'no se pudo eliminar al usuario'
            })
        }
    }
    return (
        <View style={styles.contenedor}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.roleName}>{roleName}</Text>
            <TouchableOpacity
             style={styles.botonModificarUsuario}
             onPress={()=>modificarUsuario(username)}
            >
                <Text style={styles.botonModificarUsuarioTexto}>
                    Modif.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCancelarUsuario} onPress={alertaEliminarUsuario}>
                <Text style={styles.botonCancelarUsuarioTexto}>
                    Eliminar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemUsuario

const styles = StyleSheet.create({
    contenedor: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:s(8)
    },
    username:{
        fontSize: s(17),
        
    },
    roleName:{
        fontSize: s(15),
        backgroundColor:'#2f2f2f',
        color: '#fff',
        paddingVertical: s(2),
        width: s(70),
        textAlign:'center',
        borderRadius: s(5),
        borderWidth: s(2)
    },
    botonModificarUsuario: {
        backgroundColor:'#3498DB',
        paddingVertical: s(2),
        paddingHorizontal: s(5),
        borderRadius: s(5),
        borderWidth: s(2)
    },
    botonModificarUsuarioTexto: {
        fontSize: s(15),
        color:'white'
    },
    botonCancelarUsuario: {
        backgroundColor:'#F43',
        paddingVertical: s(2),
        paddingHorizontal: s(5),
        borderRadius: s(5),
        borderWidth: s(2)
    },
    botonCancelarUsuarioTexto: {
        fontSize: s(15),
        color:'white'
    },
})