
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { s } from 'react-native-size-matters'
import { UserContext } from '../../context/UserProvider'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-native'

//setBaseURL('http://192.168.0.8:8080')
const DireccionServidor = () => {
    const {baseURL, setBaseURL} = useContext(UserContext)
    const [ruta, setRuta] = useState('');
    const navigate = useNavigate()

    const handleChangeRuta = (nuevaRuta) => {
        setRuta(nuevaRuta);
    }

    const confirmarRuta = () => {        
    ruta === baseURL ?
    navigate('/login') : 
    setBaseURL(ruta);
    }

    useEffect(()=>{
       setRuta(baseURL)
    },[baseURL]);



        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo} >Ruta Servidor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ruta"
                    disableFullscreenUI={true}
                    onChangeText={handleChangeRuta}
                    value={ruta}
                />
                <TouchableOpacity style={styles.boton} onPress={confirmarRuta} activeOpacity={0.6}>
                    <Text style={styles.botonTexto}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal:'13%',
        paddingVertical: s(10),
    },
    titulo: {
        fontSize: s(24),
        marginBottom: s(15),
        textTransform:'uppercase',
    },
    input: {
        fontSize:s(18),
        paddingVertical:s(8),
        paddingHorizontal:s(10),
        backgroundColor: 'white',
        width: '100%',
        marginBottom: s(30),
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: s(12),
        borderRadius: 5,
        width:'100%',
    },
    botonTexto:{
        fontSize: s(25),
        color: 'white',
    }
});

export default DireccionServidor;