import { Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import botonPuestoStyles from './botonesPuesto.styles'
import { apiPuestoAbrir } from '../../../utils/conecciones/puesto'
import { ToastContenxt } from '../../../context/ToastProvider'



const BotonAbrirPuesto = ({ actualizarEstado }) => {
  const { generarAlerta } = useContext(ToastContenxt)
  
  const abrirPuesto = () => {
    const accion = apiPuestoAbrir;
    actualizarEstado(accion)
  }

  const alertaAbrirPuesto = () => {
    const titulo = '¿Abrir Puesto?';
    const mensaje = 'Esto permitirá que se creen ventas nuevamente';
    const botones = [
      {
        text: 'Si',
        onPress: () => abrirPuesto(),
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

  return (
    <TouchableOpacity style={{ ...botonPuestoStyles.contenedor, backgroundColor: '#4d6' }} onPress={alertaAbrirPuesto} >
      <Text style={botonPuestoStyles.texto}>
        Abrir
      </Text>
    </TouchableOpacity>
  )
}

export default BotonAbrirPuesto