import { StyleSheet, Platform } from "react-native"
import { s } from "react-native-size-matters"

const pedidoStyles = StyleSheet.create({
    pedidoContenedor: {
        borderRadius: 5,
        marginBottom: s(10),
        flexShrink: 1,
    },
    titulo: {
        backgroundColor: '#27eeff',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: s(17),
        paddingVertical: s(2),
        textAlign: 'center',
    },
    contenedorComprador: {
        marginTop: s(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: "center",
        backgroundColor: '#4d2a2a',
        marginEnd: s(1),
    },
    compradorTexto: {
        fontSize: s(16),
        color: 'white',
        paddingHorizontal: s(10),
    },
    inputComprador: {
        backgroundColor: 'white',
        flexGrow: 1,
        maxWidth: '60%',
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 3,
        padding: Platform.OS === 'ios' ? s(3) : s(1),
        fontSize: s(18),
        paddingVertical: Platform.OS === 'ios' ? s(3) : s(2),
    },//p
})

export default pedidoStyles
