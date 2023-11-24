import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { s } from 'react-native-size-matters';

let modificar = false

const FormularioUsuario = ({ username, setUsername, password,
    setPassword, repeatPassword, setRepeatPassword, roleName, setRoleName }) => {

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorUsernameRoleName} >
                <View style={styles.contenedorUsername}>
                    <Text style={styles.label}>Nombre Usuario</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => setUsername(username)}
                        value={username}
                        placeholder='username'
                    />
                </View>
                <Picker
                    selectedValue={roleName}
                    onValueChange={(itemValue, itemIndex) => setRoleName(itemValue)}
                    style={styles.roleName}
                >
                    <Picker.Item style={{ fontSize: s(15) }} label="user" value="user" />
                    <Picker.Item style={{ fontSize: s(15) }} label="admin" value="admin" />
                </Picker>
            </View>
            <View style={styles.contenedorUsernameRoleName}>
                <View style={styles.contenedorUsername}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry
                    />
                </View>
                <View style={styles.contenedorUsername}>
                    <Text style={styles.label}>Repetir Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                        value={repeatPassword}
                        secureTextEntry
                    />
                </View>
            </View>
        </View>
    )
}

export default FormularioUsuario

const styles = StyleSheet.create({
    contenedor: {

    },
    contenedorUsernameRoleName: {
        flexDirection: 'row',
        marginTop: s(15),
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    label: {
        fontSize: s(16)
    },
    input: {
        backgroundColor: 'white',
        fontSize: s(17),
        borderRadius: s(2),
        borderWidth: s(2),
        paddingHorizontal: s(5),
        paddingVertical: s(2),
        width: '100%',
    },
    contenedorUsername: {
        width: '45%',
    },
    roleName: {
        fontSize: s(14),
        backgroundColor: '#eee',
        paddingHorizontal: s(5),
        paddingVertical: s(2),
        width: '40%',
    },
})