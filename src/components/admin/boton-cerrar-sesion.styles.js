import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

const botonCerrarSesionStyles = StyleSheet.create({
    botonLogout: {
        alignSelf: 'flex-end'
    },
    botonLogoutTexto: {
        color: '#6f6f6f',
        fontWeight: 'bold',
        fontSize: s(16),
    },
})

export default botonCerrarSesionStyles;