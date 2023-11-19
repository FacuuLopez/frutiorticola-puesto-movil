import { Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import botonPuestoStyles from './botonesPuesto.styles'
import { apiPuestoCerrando } from '../../../utils/conecciones/puesto'
import { ToastContenxt } from '../../../context/ToastProvider'



const BotonEmepezarCierre = ({ actualizarEstado,}) => {
  const {generarAlerta} = useContext(ToastContenxt)
  
  const empezarCiere = () => {
    const accion = apiPuestoCerrando;
    actualizarEstado(accion);
  }

  const alertaComenzarCierre = () => {
    const titulo = '¿Desea comenzar el cierre del Puesto?';
    const mensaje = 'Comenzara el proceso de cierre el cual finalizara automaticamente cuando ya no queden ventas en curso';
    const botones = [
      {
        text: 'Si',
        onPress: () => empezarCiere(),
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
    <TouchableOpacity style={{ ...botonPuestoStyles.contenedor, backgroundColor: '#fc1' }} onPress={alertaComenzarCierre}>
      <Text style={botonPuestoStyles.texto}>
        Empezar Cierre
      </Text>
    </TouchableOpacity>
  )
}

export default BotonEmepezarCierre