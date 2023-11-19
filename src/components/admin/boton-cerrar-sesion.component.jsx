import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { TouchableOpacity, Text, } from "react-native";
import botonCerrarSesionStyles from "./boton-cerrar-sesion.styles";
import { ToastContenxt } from "../../context/ToastProvider";

const BotonCerrarSesion = () => {

    const { setTokenUsuario } = useContext(UserContext);
    const { generarAlerta } = useContext(ToastContenxt)

    const cerrarSesion = () => {
        const titulo = 'Cerrar sesión';
        const mensaje = '¿Desea cerrar la sesión?';
        const botones = [
            {
                text: 'Si',
                onPress: () => setTokenUsuario(''),
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
        <TouchableOpacity style={botonCerrarSesionStyles.botonLogout} onPress={() => cerrarSesion('')} activeOpacity={0.6}>
            <Text style={botonCerrarSesionStyles.botonLogoutTexto}>
                Cerrar Sesión <Text style={{ color: '#f11' }}>✖</Text>
            </Text>
        </TouchableOpacity>
    )
}

export default BotonCerrarSesion