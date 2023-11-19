import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { s } from "react-native-size-matters";
import BotonCrearPedido from './boton-crear-pedido';
import { PedidoContext } from '../../../context/PedidoProvider';
import BotonListaPedidos from './boton-lista-pedidos';
import { PuestoContext } from '../../../context/PuestoProvider';
import BarraEstadoPuesto from '../../admin/puesto/BarraEstadoPuesto';

const ContenedorListaPedidos = () => {

  const { numeroPedidos } = useContext(PedidoContext);
  const { consultarEstado, apiRef, estado } = useContext(PuestoContext);

  useEffect(() => {
    const interval = setInterval(() => {
      consultarEstado();
      return
    }, 1000);
    // Devolvemos una función de limpieza para detener el intervalo cuando el componente se desmonte.
    return () => clearInterval(interval);
  }, [apiRef])

  return (
    <View style={styles.contenedor}>
      <>
        <ScrollView horizontal style={styles.scrollview}>
          {numeroPedidos > 0 && (() => {
            const pedidos = [];
            for (let i = 0; i < numeroPedidos; i++) {
              pedidos.push(
                <BotonListaPedidos key={`botonPedido${i}`} indice={i} />
              );
            }
            return pedidos;
          })()}
        </ScrollView>
        {
          estado == 'abierto' ? <BotonCrearPedido /> : <BarraEstadoPuesto />
        }
      </>
    </View>
  )
}

export default ContenedorListaPedidos

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: s(10),
    marginEnd: s(15),
  },
  scrollview: {
    marginEnd: s(10)
  }
})