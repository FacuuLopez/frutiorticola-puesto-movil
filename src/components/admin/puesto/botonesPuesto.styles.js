import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

const botonPuestoStyles = StyleSheet.create({
    contenedor:{
        flex:1,
        marginHorizontal: s(8),
        paddingVertical: s(10),
        paddingHorizontal: s(10),
        borderRadius: 10,
        alignItems:'center',
        justifyContent: 'center',
    },
    texto:{
        color: 'white',
        fontSize: s(16), 
        textAlign: 'center',
        textTransform: 'uppercase'
    },
});

export default botonPuestoStyles;