import { useContext } from "react";
import { TouchableHighlight, View, Text, } from "react-native"
import { PedidoContext } from "../../context/PedidoProvider";

const Registro = ({ registro, listaStyles }) => {
    const { IT1, IT2, } = registro;
    const { agregarItemPedido } = useContext(PedidoContext);
    return (
        <TouchableHighlight activeOpacity={0.9} onPress={() => agregarItemPedido(IT1, IT2)}>
            <View style={listaStyles.listaContenedor}>
                {registro && Object.entries(registro).map(([key, value], index) => {
                    if (key === 'IT1' || key === 'IT2') return;
                    return (
                        <View style={listaStyles.listaContenedorColumna} key={`${key}`}>
                            <Text style={index % 2 ? listaStyles.listaHelp1 : listaStyles.listaHelp2} >
                                {`${value.slice(0, 5)}`}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </TouchableHighlight >
    )
}

export default Registro;