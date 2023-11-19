import { View, Text } from 'react-native'
import React from 'react'
import PedidoProvider from '../../context/PedidoProvider'
import PedidoContenedor from './pedido-contenedor.component'
import BusquedaProvider from '../../context/BusquedaProvider'
import CompradorProvider from '../../context/CompradorProvider'
import ItemProvider from '../../context/ItemProvider'

const PedidoPage = () => {
  return (
    <BusquedaProvider>
      <CompradorProvider>
        <ItemProvider>
          <PedidoProvider>
            <PedidoContenedor />
          </PedidoProvider>
        </ItemProvider>
      </CompradorProvider>
    </BusquedaProvider>
  )
}

export default PedidoPage