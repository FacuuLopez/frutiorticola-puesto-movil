import React, { createContext, useContext, useEffect, useState } from 'react'
import { validarComprador } from "../utils/validadores/validadores-componentes";
import { BusquedaContext } from './BusquedaProvider';

export const CompradorContext = createContext();

const CompradorProvider = ({ children }) => {
  const [comprador, setComprador] = useState('');
  const [nuevoComprador, setNuevoComprador] = useState('');
  const [cargandoComprador, setCargandoComprador] = useState(false);
  const [modificandoComprador, setModificandoComprador] = useState(false);
  const [mostrarComprador, setMostrarComprador] = useState(true)
  const { noHayBusqueda } = useContext(BusquedaContext);

  useEffect(() => {
    setNuevoComprador(comprador ? comprador : '');
  }, [comprador]);

  useEffect(() => {
    setMostrarComprador(noHayBusqueda ? true : false)
  }, [noHayBusqueda])

  useEffect(() => {
    setModificandoComprador(nuevoComprador != comprador ? true : false)
  }, [nuevoComprador])

  const handleChangeComprador = nuevoComprador => {
    try {
      validarComprador(nuevoComprador) && setNuevoComprador(nuevoComprador)
    } catch (error) {
      generarToast({
        tipo: 'error',
        titulo: 'parametros comprador incorrectos',
        mensaje: error.message
      })
    }
  }

  const handleBlurComprador = () => {
    modificandoComprador && (setModificandoComprador(false), setCargandoComprador(true));
  }


  return (
    <CompradorContext.Provider value={{
      comprador, setComprador, nuevoComprador, setNuevoComprador,
      cargandoComprador, setCargandoComprador, modificandoComprador, mostrarComprador,
      handleChangeComprador, handleBlurComprador
    }}>
      {children}
    </CompradorContext.Provider>
  )
}

export default CompradorProvider