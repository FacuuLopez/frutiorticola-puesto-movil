import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider';
import { apiGetBusqueda, apiGetBusquedaPrimaria, apiGetBusquedaSecundaria } from '../utils/conecciones/productos';

export const BusquedaContext = createContext();

const BusquedaProvider = ({ children }) => {

    const { apiRef } = useContext(UserContext)
    const [registros, setRegistros] = useState([]);
    const [hayRegistros, setHayRegistros] = useState(false);
    const [noHayBusqueda, setNoHayBusqueda] = useState(true);
    const [nombre, setNombre] = useState('');
    const [busquedaPrimaria, setBusquedaPrimaria] = useState('')
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

    const definirBusquedaPrimaria = async () => {
        for (let i = 0; i < 4; i++) {
            try {
                const busqueda = await apiGetBusquedaPrimaria(apiRef.current);
                setBusquedaPrimaria(busqueda);
                return
            } catch (error) {
                i++
            }
        }
        return
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

    const definirBusqueda = async () => {
        setBusquedaSequndariaisLoading(true)
        for (let i = 0; i < 4; i++) {
            try {
                const {busquedaPrimaria, busquedaSecundaria} = await apiGetBusqueda(apiRef.current);
                setBusquedaPrimaria(busquedaPrimaria)
                setBusquedaSequndariaisLoading(false);
                setBusquedaSequndariaParametro(busquedaSecundaria);
                return
            } catch (error) {
                i++
            }
        }
        return
    }


    useEffect(() => {
        definirBusqueda();
    }, []);

    useEffect(() => {
        registros.length > 0 ? setNoHayBusqueda(false) : setNoHayBusqueda(true);
    }, [registros])

    return (
        <BusquedaContext.Provider value={{
            registros, hayRegistros, noHayBusqueda,
            nombre, setNombre, busquedaPrimaria, busquedaSecundaria, setBusquedaSecundaria,
            busquedaSecundariaIsLoading, busquedaSecundariaParametro, 
            setRegistros, limpiarBusqueda
        }} >
            {children}
        </BusquedaContext.Provider>
    )
}

export default BusquedaProvider