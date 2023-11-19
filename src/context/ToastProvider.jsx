import React, { createContext } from 'react'
import { Alert } from 'react-native';
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const ToastContenxt = createContext();

const ToastProvider = ({ children }) => {

    const generarToast = ({ tipo, titulo, mensaje }) => {
        try {
            Toast.show({
                type: tipo,
                text1: titulo,
                text2: mensaje,
            })
        } catch (error) {
            console.error(error);
        }

    }

    const generarAlerta = (titulo, mensaje, botones) => {
        Alert.alert(titulo, mensaje, botones, {
            messageStyle: { fontSize: 20 }
        })
    }

    return (
        <ToastContenxt.Provider value={{ generarToast, generarAlerta }}>
            {children}
            <Toast autoHide={true} visibilityTime={2000} position="bottom" bottomOffset={40} />
        </ToastContenxt.Provider>
    )
}

export default ToastProvider