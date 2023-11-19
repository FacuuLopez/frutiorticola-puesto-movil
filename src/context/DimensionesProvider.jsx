import React, { createContext, useState, useEffect } from "react";
import { Dimensions, Keyboard } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DimensionesContext = createContext();

export const DimensionesProvider = ({ children }) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [isPortrait, setIsPortrait] = useState(Dimensions.get('window').height > 500);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const insets = useSafeAreaInsets();
    const unsafeViewAreaHeight = insets.top + insets.bottom;
    const unsafeViewAreaWidth = insets.right + insets.left;
    
    const _setearDimensiones = () => {
        const height = Dimensions.get("window").height
        const width = Dimensions.get("window").width
        setHeight(height);
        setWidth(width);
    }

    useEffect(()=>{
        _setearDimensiones();
    },[])

    useEffect(() => {
        //establecer estado del teclado
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setIsKeyboardOpen(true);
            setKeyboardHeight(event.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidShowListener && keyboardDidShowListener.remove();
            keyboardDidHideListener && keyboardDidHideListener.remove();
        };
    }, []);

    //ajustar dimensiones
    const updateOrientation = () => {
        _setearDimensiones();
        setIsPortrait(Dimensions.get('window').height > 500);
    };

    useEffect(() => {
        Dimensions.addEventListener('change', updateOrientation);
        return () => {
            if (Dimensions.removeEventListener) {
                Dimensions.removeEventListener('change', updateOrientation);
            }
        };
    }, []);

    return (
        <DimensionesContext.Provider value={{ height, width, isKeyboardOpen, isPortrait, keyboardHeight, unsafeViewAreaHeight, unsafeViewAreaWidth }}>
            {children}
        </DimensionesContext.Provider>
    );
};