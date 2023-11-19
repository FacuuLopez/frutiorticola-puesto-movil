import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";

const ListaStyles = (width, porcentajeMargen, numeroColumnas, unsafeViewAreaWidth) => {
    const minimoColumnas = s(63) // width < 400 ? s(62) : s(70);
    const cantColumnasMaximo = Math.floor(((width - unsafeViewAreaWidth) * (1 - porcentajeMargen * 0.02)) / minimoColumnas);
    const maxPorcentajeColumna = cantColumnasMaximo < numeroColumnas ? 100 / cantColumnasMaximo : 100 / numeroColumnas;
    const maxPorcentajeColumnaPedido = cantColumnasMaximo < (numeroColumnas + 2) ? 100 / cantColumnasMaximo : 100 / (numeroColumnas + 2);
    const backgroundColor1 = '#36b'
    const backgroundColor2 = '#138'
    const backgroundColor3 = '#a35'
    const backgroundColor4 = '#614'
    const backgroundColorTitulo1 = '#5a5a5a'
    const backgroundColorTitulo2 = '#2a2a2a'

    const lista = {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: s(16),
        textAlignVertical: 'center',
        paddingVertical: vs(2),
        textAlign: 'center',
        borderWidth: 1,
        flexGrow: 1,
    };
    const listaTituloClaro = {
        ...lista,
        backgroundColor: backgroundColorTitulo1,
        color: 'white',
    };
    const listaTituloObscuro = {
        ...lista,
        backgroundColor: backgroundColorTitulo2,
        color: 'white',
    };
    const listaRegistroClaro = {
        ...lista,
        color: 'white',
    };
    const listaRegistroObscuro = {
        ...lista,
        color: 'white',
    }

    return StyleSheet.create({
        contenedor: {
            marginBottom: s(20),
            marginTop: s(15),
        },
        listaContenedor: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: s(5),
            flexShrink: 1,
        },
        listaContenedorTitulo: {

        },
        listaContenedorColumna: {
            width: `${maxPorcentajeColumna - 0.05}%`, //evita pasar 100% X mal redondeo, evita falta espacio
        },
        listaContenedorColumnaPedido: {
            width: `${maxPorcentajeColumnaPedido - 0.05}%`,
        },
        listaTitulo1: {
            ...listaTituloClaro,
        },
        listaTitulo2: {
            ...listaTituloObscuro,
        },
        listaTitulo1Pedido: {
            ...listaTituloClaro,
        },
        listaTitulo2Pedido: {
            ...listaTituloObscuro,
        },
        listaHelp1: {
            ...listaRegistroClaro,
            backgroundColor: backgroundColor3,
        },
        listaHelp2: {
            ...listaRegistroObscuro,
            backgroundColor: backgroundColor4,
        },
        listaRegistro1Pedido: {
            ...listaRegistroClaro,
            backgroundColor: backgroundColor1,
        },
        listaRegistro2Pedido: {
            ...listaRegistroObscuro,
            backgroundColor: backgroundColor2,
        },
        listaInput: {
            ...lista,
            backgroundColor: 'white',
            paddingVertical: Platform.OS === 'ios' ? s(3) : vs(2),
        },
    });
}

export default ListaStyles;