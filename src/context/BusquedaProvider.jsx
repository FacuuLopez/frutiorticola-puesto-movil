import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider';
import { apiGetBusquedaSecundaria } from '../utils/conecciones/productos';

export const BusquedaContext = createContext();

const BusquedaProvider = ({ children }) => {

    const { apiRef } = useContext(UserContext)
    const [registros, setRegistros] = useState([]);
    const [hayRegistros, setHayRegistros] = useState(false);
    const [noHayBusqueda, setNoHayBusqueda] = useState(true);
    const [nombre, setNombre] = useState('');
    const [busquedaSecundaria, setBusquedaSecundaria] = useState('');
    const [busquedaSecundariaIsLoading, setBusquedaSequndariaisLoading] = useState(false);
    const [busquedaSecundariaParametro, setBusquedaSequndariaParametro] = useState('');


    useEffect(() => {
        registros.length > 0 ? setHayRegistros(true) : setHayRegistros(false)
    }, [registros])

    const limpiarBusqueda = () => {
        setNombre('');
        setBusquedaSecundaria('');
    }

    const definirBusquedaSecundaria = async () => {
        setBusquedaSequndariaisLoading(true)
        for (let i = 0; i < 4; i++) {
            try {
                const busqueda = await apiGetBusquedaSecundaria(apiRef.current);
                setBusquedaSequndariaisLoading(false);
                setBusquedaSequndariaParametro(busqueda);
                return
            } catch (error) {
                i++
            }
        }
        return
    }


    useEffect(() => {
        definirBusquedaSecundaria();
    }, []);

    useEffect(() => {
        registros.length > 0 ? setNoHayBusqueda(false) : setNoHayBusqueda(true);
    }, [registros])

    return (
        <BusquedaContext.Provider value={{
            registros, hayRegistros, noHayBusqueda,
            nombre, setNombre, busquedaSecundaria, setBusquedaSecundaria,
            busquedaSecundariaIsLoading, busquedaSecundariaParametro, 
            setRegistros, limpiarBusqueda
        }} >
            {children}
        </BusquedaContext.Provider>
    )
}

export default BusquedaProvider