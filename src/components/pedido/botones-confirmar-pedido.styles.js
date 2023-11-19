import { StyleSheet } from "react-native"
import { s } from "react-native-size-matters";

const marcoBotones = {
    flex:1,
    marginHorizontal: s(10),
    paddingVertical: s(10),
    borderRadius: 10,
    alignItems:'center',

}

const BotonesConfirmarPedidoStyles = StyleSheet.create({
    contenedorEnvio:{
        flexDirection:'row',
        marginBottom:s(10),
    },
    botonEnvio: {
        ...marcoBotones,
        backgroundColor: '#28a745',
    },
    botonCancelar: {
        ...marcoBotones,
        backgroundColor: '#dc3545',
    },
    botonEnvioTexto: {
        color: 'white',
        fontSize: s(15), 
        textAlign: 'center',
    },
});

export default BotonesConfirmarPedidoStyles;
