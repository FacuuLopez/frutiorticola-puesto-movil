import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable, ActivityIndicator, Switch, Alert, Platform, } from "react-native";
import logginStyles from "./login.styles";
import { useContext, useEffect, useState } from "react";
import { BorrarUsuariosGuardados, getStoredUserNames, getUserPassword, storeUser, } from "../../utils/storage/storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { mostrartToast } from "../../utils/toast/toast";
import { apiUsuariosLogin } from "../../utils/conecciones/usuario";
import { UserContext } from "../../context/UserProvider";
import { DimensionesContext } from "../../context/DimensionesProvider";
import { useNavigate } from "react-router-native";
import { ToastContenxt } from "../../context/ToastProvider";

const Loggin = () => {
    const [username, setUsername] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [filteredUsername, setFilteredUsername] = useState('');
    const [guardarUsuario, setGuardarUsuario] = useState(false);
    const { sesionExpirada, apiRef, setRol } = useContext(UserContext);
    const { isPortrait } = useContext(DimensionesContext);
    const { generarAlerta, generarToast } = useContext(ToastContenxt)
    const navigate = useNavigate();

    const generarAlertaBorrarUsuarios = () => {
        const titulo = 'Borrar usuarios'
        const mensaje = '¿Desea borrar los usuarios?'
        const botones = [
            {
                text: 'Si',
                onPress: () => borrarUsuarios(),
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

    const borrarUsuarios = async () => {
        try {
            const respuesta = await BorrarUsuariosGuardados();
            setUsernames([]);
            mostrartToast({
                tipo: 'success',
                titulo: 'Usuarios borrados',
                mensaje: respuesta,
            }, Toast);
        } catch (error) {
            const mensaje = error.message
            mostrartToast({
                tipo: 'error',
                titulo: 'Error al borrar usuarios',
                mensaje,
            }, Toast)
        }
    }

    useEffect(() => {
        sesionExpirada &&
            mostrartToast({
                tipo: 'error',
                titulo: 'Sesión expirada',
                mensaje: 'Por favor inicie sesión nuevamente',

            }, Toast);
    }, []);

    const iniciarSesion = async () => {
        try {
            setIsLoadingLogin(true);
            const { roleName } = await apiUsuariosLogin(apiRef.current, { username, password });
            roleName ? setRol(roleName) : setRol('');
            if (guardarUsuario) { storeUser(username, password); }
            setIsLoadingLogin(false);
        } catch (error) {
            generarToast({
                tipo: 'error',
                titulo: 'error al iniciar sesion',
                mensaje: 'no se pudo iniciar sesion, asegurece de que las credenciales son correctas',
            })
            setIsLoadingLogin(false);
        }
    }
    //busca los usuarios guardados
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernames = await getStoredUserNames();
                setUsernames(usernames);
            } catch (error) {

            }
        };
        fetchData();
    }, []);

    //filtra usuario recordado 
    useEffect(() => {
        if (usernames.length > 0) {
            const filteredUsers = username ? usernames.filter(item => item.includes(username)) : usernames;
            if (filteredUsers.length > 0) {
                setFilteredUsername(filteredUsers.slice(0, 4));
            } else {
                setFilteredUsername('');
            }
        } else setFilteredUsername('');
    }, [username, usernames]);

    const handleUsuarioChange = (username) => {
        setUsername(username);
        username !== filteredUsername && setUsernameFocused(true);
    }
    const handlePasswordChange = (password) => setPassword(password);
    const handleUsuarioFocus = () => {
        username !== filteredUsername && setUsernameFocused(true);
    }
    const handleUsuarioLostFocus = () => {
        try {
            const desmontarUsernamesToolkit = async () => await setTimeout(() => {
                setUsernameFocused(false);
            }, 100);
            desmontarUsernamesToolkit();
        } catch (error) {

        }

    }
    const handleUsernameSelection = (username) => {
        const setPasswordandUsername = async () => {
            const password = await getUserPassword(username);
            setUsername(username);
            setPassword(password);
            setUsernameFocused(false);
        }
        setPasswordandUsername();
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <View style={logginStyles.contenedor}>
                <View style={logginStyles.body}>
                    <TouchableOpacity activeOpacity={0.6} style={logginStyles.rutaServidor} onPress={() => navigate('/direccion-servidor')}>
                        <Text style={logginStyles.rutaServidorTexto}> Cambiar ruta servidor </Text>
                    </TouchableOpacity>
                    <View style={logginStyles.campoFormularioUsuario}>
                        <Text style={logginStyles.label}>Usuario</Text>
                        <TextInput
                            disableFullscreenUI={isPortrait}
                            style={logginStyles.inputCampo}
                            placeholder="Usuario"
                            value={username}
                            onChangeText={handleUsuarioChange}
                            onFocus={handleUsuarioFocus}
                            onBlur={handleUsuarioLostFocus}
                        />
                        {usernameFocused && filteredUsername &&
                            <View style={logginStyles.usernameToolkitContenedor}>
                                {filteredUsername.map(username =>
                                    <Pressable key={username}
                                        style={logginStyles.usernameToolkit}
                                        onPress={() => handleUsernameSelection(username)}>
                                        <Text style={logginStyles.usernameToolkitText}>{username}</Text>
                                    </Pressable>
                                )}
                            </View>
                        }
                        < View style={logginStyles.switchContenedor}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#70b0ff' }}
                                thumbColor={guardarUsuario ? '#999' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                                onValueChange={(value) => setGuardarUsuario(value)}
                                value={guardarUsuario}
                            />
                            <Text style={logginStyles.switchLabel}>Recordar usuario</Text>
                        </View>
                    </View>
                    <View style={logginStyles.campoFormularioPassword}>
                        <Text style={logginStyles.label}>Password</Text>
                        <TextInput
                            disableFullscreenUI={isPortrait}
                            style={logginStyles.inputCampo}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={password}
                            onChangeText={handlePasswordChange}
                        />
                    </View>
                    {(isLoadingLogin ?
                        <ActivityIndicator size="large" color="#22f" /> :
                        <TouchableOpacity activeOpacity={0.6} style={logginStyles.boton} onPress={iniciarSesion}>
                            <Text style={logginStyles.textoBoton}> Iniciar sesion</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity activeOpacity={0.6} style={logginStyles.borrarUsuarios} onPress={generarAlertaBorrarUsuarios}>
                        <Text style={logginStyles.borrarUsuariosTexto}> Borrar usuarios guardados </Text>
                    </TouchableOpacity>
                </View>
                <Toast autoHide={true} visibilityTime={2000} position="bottom" bottomOffset={40} />
            </View>
        </KeyboardAvoidingView >
    )
}

export default Loggin;
