import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { apiPuestoGetEstado } from "../utils/conecciones/puesto";

export const PuestoContext = createContext();

export const PuestoProvider = ({ children }) => {
    const [estado, setEstado] = useState('conectando');
    const [color, setColor] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { apiRef, tokenUsuario } = useContext(UserContext)

    const consultarEstado = async () => {
        try {
            const response = await apiPuestoGetEstado(apiRef.current)
            const { estado, color } = response;
            setEstado(estado);
            setColor(color);
            setIsLoading(false)
        } catch (error) {
            setEstado('conectando')
            setIsLoading(true)
        }
    }

    const actualizarEstado = async (accion) => {
        setIsLoading(true);
        setEstado('conectando');
        try {
            const response = await accion(apiRef.current);
            const { estado, color } = response;
            setEstado(estado);
            setColor(color);
            setIsLoading(false)
        } catch (error) {

        }
    }

    return (
        <PuestoContext.Provider value={{ estado, color, isLoading, apiRef, consultarEstado, actualizarEstado }}>
            {children}
        </PuestoContext.Provider>
    )
}
