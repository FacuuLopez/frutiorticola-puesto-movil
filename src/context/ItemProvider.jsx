import React, { createContext, useEffect, useState } from 'react'

export const ItemContext = createContext()

const ItemProvider = ({ children }) => {

    const [estadosCargaItems, setEstadosCargaItems] = useState([]);
    const [modificandoItems, setModificandoItems] = useState(false);
    const [cargandoItems, setCargandoItems] = useState(false)

    //determina si algun item del pedido esta cargando
    useEffect(() => {
       setCargandoItems(estadosCargaItems.some(itemCargando => itemCargando) ? true : false) 
    }, [estadosCargaItems]);

    const actualizarEstadoItem = (index, booleano) => {
        setEstadosCargaItems((prevState) => {
            const nuevoItemsIsLoading = [...prevState];
            nuevoItemsIsLoading[index] = booleano;
            return nuevoItemsIsLoading;
        });
    }

    return (
        <ItemContext.Provider value={{ actualizarEstadoItem, modificandoItems, setModificandoItems, cargandoItems, estadosCargaItems, setEstadosCargaItems }}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemProvider