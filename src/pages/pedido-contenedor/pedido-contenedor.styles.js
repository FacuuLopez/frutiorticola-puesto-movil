import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

const pedidoStyles = (porcentajeMargen = 5) => StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingHorizontal: `${porcentajeMargen}%`,
    },
    contenedorLogout:{
        marginTop:s(5),
        marginBottom:s(10),
    },
    noHayPedidoContenedor:{
        marginTop: s(25),
        padding: s(15),
    },
    noHayPedidoTexto:{
        fontSize: s(17),
        textAlign:'center',
    }
})

export default pedidoStyles;