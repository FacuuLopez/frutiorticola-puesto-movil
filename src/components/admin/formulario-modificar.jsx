import { StyleSheet, Text, TextInput, View } from 'react-native'
import { s } from 'react-native-size-matters';

const FormularioModificar = ({ username, setUsername, password,
    setPassword, repeatPassword, setRepeatPassword }) => {

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Nombre Usuario</Text>
            <TextInput
                style={styles.input}
                onChangeText={(username) => setUsername(username)}
                value={username}
                placeholder='username'
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={(password) => setPassword(password)}
                value={password}
                secureTextEntry
            />
            <Text style={styles.label}>Repetir Contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                value={repeatPassword}
                secureTextEntry
            />
        </View>
    )
}

export default FormularioModificar

const styles = StyleSheet.create({
    contenedor: {

    },
    label: {
        fontSize: s(16)
    },
    input: {
        backgroundColor: 'white',
        fontSize: s(17),
        borderRadius: 2,
        borderWidth: 2,
        paddingHorizontal: s(5),
        paddingVertical: s(2),
        width: '100%',
    },
})