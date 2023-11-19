import { FlatList, View, Text, } from "react-native"
import Registro from "./registro.component"
import { useContext } from "react";
import { BusquedaContext } from "../../context/BusquedaProvider";
import { PedidoContext } from "../../context/PedidoProvider";

const Registros = ({ listaStyles }) => {

    const { registros } = useContext(BusquedaContext);
    const { keys } = useContext(PedidoContext)

    const renderTitulo = () => {
        return (
            <View style={listaStyles.listaContenedorTitulo}>
                <View style={listaStyles.listaContenedor} >
                    {keys.map((item, index) =>
                        <View style={listaStyles.listaContenedorColumna} key={`${item}`}>
                            <Text style={index % 2 ? listaStyles.listaTitulo1 : listaStyles.listaTitulo2}>
                                {item.slice(0, 5)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

        )
    };

    return (

        <View style={{ ...listaStyles.contenedor, flexShrink: 1 }}>
            {renderTitulo()}
            {/* <Text style={RegistrosStyles.tituloRegistro}>Resultados</Text> */}
            <FlatList
                data={registros}
                renderItem={({ item }) =>
                    <Registro
                        registro={item}
                        listaStyles={listaStyles}
                    />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default Registros