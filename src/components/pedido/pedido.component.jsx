import { useContext, useEffect, useRef, useState } from "react";
import ItemPedido from "./item-pedido.component";
import { Keyboard, Text, TextInput, View, ScrollView, ActivityIndicator, RefreshControl, } from "react-native";
import BotonesConfirmarPedido from "./botones-confirmar-pedido.component";
import { DimensionesContext } from "../../context/DimensionesProvider";
import pedidoStyles from "./pedido.styles";
import { PedidoContext } from "../../context/PedidoProvider";
import { ToastContenxt } from "../../context/ToastProvider";
import { BusquedaContext } from "../../context/BusquedaProvider";
import { CompradorContext } from "../../context/CompradorProvider";
import { ItemContext } from "../../context/ItemProvider";

const Pedido = ({ listaStyles }) => {
    const { generarToast } = useContext(ToastContenxt)
    const compradorRef = useRef(null);
    const { isKeyBoardOpen, isPortrait } = useContext(DimensionesContext);
    const { noHayBusqueda } = useContext(BusquedaContext)
    const { keys, total, itemsPedido, valoresPedidoIsLoading, buscarPedidos, mostrarPedido, } = useContext(PedidoContext)
    const { cargandoComprador, nuevoComprador, handleBlurComprador, handleChangeComprador, mostrarComprador } = useContext(CompradorContext);
    const { cargandoItems } = useContext(ItemContext)

    //determina si algun valor del pedido esta cargando


    const compradorDefinido = () => {
        if (nuevoComprador) return true
        generarToast({
            tipo: 'error',
            titulo: 'Debe especificar un comprador',
            mensaje: 'Debe especificar un comprador antes de confirmar el pedido',
        });
        if (compradorRef.current) compradorRef.current.focus()
        return false;
    }

    return (
        <>
            {(valoresPedidoIsLoading && !mostrarPedido && noHayBusqueda) &&
                <View>
                    <ActivityIndicator style={{ marginVertical: 20 }} size={"large"} />
                </View>
            }
            <View style={{ flex: 1 }}>
                <View style={{ ...pedidoStyles.contenedorComprador, opacity: mostrarComprador ? 1 : 0 }}>
                    <Text style={pedidoStyles.compradorTexto}>COMPRADOR</Text>
                    <TextInput
                        disableFullscreenUI={isPortrait}
                        placeholder="comprador"
                        style={pedidoStyles.inputComprador}
                        onChangeText={handleChangeComprador}
                        onBlur={handleBlurComprador}
                        ref={compradorRef}
                        value={nuevoComprador}
                        editable={!cargandoComprador}
                    />
                </View>
                {mostrarPedido && <View style={listaStyles.listaContenedorTitulo} >
                    <View style={listaStyles.listaContenedor} >
                        {keys.map((key, index) =>
                            <View style={listaStyles.listaContenedorColumnaPedido} key={`${key}`}>
                                <Text style={index % 2 ? listaStyles.listaTitulo1Pedido : listaStyles.listaTitulo2Pedido}
                                >
                                    {key.slice(0, 5)}
                                </Text>
                            </View>
                        )}
                        <View style={listaStyles.listaContenedorColumnaPedido}>
                            <Text style={listaStyles.listaInput}>
                                CANT.
                            </Text>
                        </View>
                        <View style={listaStyles.listaContenedorColumnaPedido}>
                            <Text style={listaStyles.listaInput}>
                                PRCIO
                            </Text>
                        </View>
                    </View>
                </View>}
                <View style={{ ...pedidoStyles.pedidoContenedor, opacity: mostrarPedido ? 1 : 0 }}>
                    {valoresPedidoIsLoading ?
                        <View><ActivityIndicator /></View> :
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={valoresPedidoIsLoading}
                                    onRefresh={buscarPedidos}
                                />
                            }
                        >
                            {itemsPedido && itemsPedido.map((item, itemIndex) => {
                                return (
                                    <ItemPedido
                                        itemIndex={itemIndex}
                                        key={item.id}
                                        item={item}
                                        listaStyles={listaStyles}
                                    />
                                )
                            })}
                        </ScrollView>
                    }
                    <View style={{ flexDirection: 'row', backgroundColor: '#27eeff', justifyContent: 'center' }}>
                        <Text style={pedidoStyles.titulo}>
                            {`Total $ `}{cargandoItems || valoresPedidoIsLoading ?
                               'Cargando...'  : `${total}`}
                        </Text>
                    </View>

                </View>
                {!isKeyBoardOpen && <BotonesConfirmarPedido
                    compradorDefinido={compradorDefinido}
                    Keyboard={Keyboard}
                />}
            </View >
        </>
    );
};

export default Pedido;