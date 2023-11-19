import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters"


const logginStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: '13%',
        paddingVertical: s(10),
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: s(10),
    },
    campoFormularioUsuario: {
        marginBottom: s(5),
    },
    campoFormularioPassword: {
        marginBottom: s(10)
    },
    label: {
        fontSize: s(22),
        marginBottom: s(5)
    },
    inputCampo: {
        width: '100%',
        fontSize: s(18),
        paddingVertical: s(8),
        paddingHorizontal: s(10),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: s(5),
        backgroundColor: 'white',
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: s(10),
        borderRadius: 5,
        width: '100%',
    },
    textoBoton: {
        fontSize: s(20),
        color: 'white',
    },
    usernameToolkitContenedor: {
        position: 'relative',
        top: s(-5),
        backgroundColor: '#F9EB75',
        borderWidth: s(1),
        borderBottomWidth: s(0),
    },
    usernameToolkit: {
        paddingHorizontal: s(10),
        paddingVertical: s(5),
        borderBottomWidth: s(1),
    },
    usernameToolkitText: {
        fontSize: s(16),
    },
    switchContenedor: {
        flexDirection: 'row',
        alignItems: "center",
    },
    switchLabel: {
        textTransform: 'uppercase',
        fontSize: s(12),
        paddingHorizontal: s(5),
        fontWeight: 'bold',
        color: '#678'
    },
    borrarUsuarios: {
        marginTop: s(10),
        alignSelf: 'center'
    },
    borrarUsuariosTexto: {
        textTransform: 'uppercase',
        fontSize: s(14),
        paddingHorizontal: s(5),
        fontWeight: 'bold',
        color: '#d33'
    },
    rutaServidor: {
        marginTop: s(10),
        alignSelf: 'center',
    },
    rutaServidorTexto: {
        textTransform: 'uppercase',
        fontSize: s(14),
        paddingHorizontal: s(5),
        fontWeight: 'bold',
        color: '#eeaa07',
        marginBottom: s(5),
    },
})

export default logginStyles;