import { useContext } from "react";
import { ActivityIndicator, TextInput, View } from "react-native"
import busquedaStyles from "./busqueda.styles";
import { BusquedaContext } from "../../context/BusquedaProvider";

const Busqueda = () => {

    const{nombre, setNombre, busquedaSecundaria, setBusquedaSecundaria, busquedaSecundariaIsLoading, busquedaSecundariaParametro} = useContext(BusquedaContext)
    const handleChangeNombre = (nombre) => setNombre(nombre);
    const handleChangeBusquedaSecundaria = (busquedaSecundaria) => setBusquedaSecundaria(busquedaSecundaria);

    return (
        <View style={busquedaStyles.contenedor}>
            <TextInput
                disableFullscreenUI={true}
                style={busquedaStyles.input}
                placeholder="Nombre"
                onChangeText={handleChangeNombre}
                value={nombre}
            />
            {busquedaSecundariaIsLoading ?
                <ActivityIndicator /> : busquedaSecundariaParametro &&
                <TextInput
                    disableFullscreenUI={true}
                    style={busquedaStyles.input}
                    placeholder={busquedaSecundariaParametro}
                    onChangeText={handleChangeBusquedaSecundaria}
                    value={busquedaSecundaria}
                />
            }
        </View>
    );
};

export default Busqueda;