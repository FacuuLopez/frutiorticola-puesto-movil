import { Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import botonPuestoStyles from './botonesPuesto.styles'
import { apiPuestoForzarCierre } from '../../../utils/conecciones/puesto'
import { ToastContenxt } from '../../../context/ToastProvider'



const BotonForzarCierre = ({ actualizarEstado }) => {
  const { generarAlerta } = useContext(ToastContenxt)

  const forzarCierre = () => {
    const accion = apiPuestoForzarCierre
    actualizarEstado(accion)
  }

  const alertaForzarCierre = () => {
    const titulo = '¿Desea forzar el cierre del Puesto?';
    const mensaje = 'Esto cancelara todas las ventas en curso y forzara el cierre del puesto';
    const botones = [
      {
        text: 'Si',
        onPress: () => alertaConfirmarCierre(),
        style: 'yes'
      },
      {
        text: 'No',
        onPress: () => { },
        style: 'no',
      }
    ]
    generarAlerta(titulo, mensaje, botones)
  }

  const alertaConfirmarCierre = () => {
    const titulo = '¿Esta seguro?';
    const mensaje = 'Forzar el cierre borrara definitvamente las ventas en curso';
    const botones = [
      {
        text: 'Borrar Ventas',
        onPress: () => forzarCierre(),
        style: 'yes',
      },
      {
        text: 'Cancelar',
        onPress: () => forzarCierre(),
        style: 'no',
      }
    ]
    generarAlerta(titulo, mensaje, botones)
  }

  return (
    <TouchableOpacity style={{ ...botonPuestoStyles.contenedor, backgroundColor: '#f21' }} onPress={alertaForzarCierre}>
      <Text style={botonPuestoStyles.texto}>
        Forzar Cierre
      </Text>
    </TouchableOpacity>
  )
}

export default BotonForzarCierre