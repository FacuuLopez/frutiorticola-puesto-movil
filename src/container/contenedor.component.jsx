import { View, StatusBar, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-native'
import contenedorStyles from './contenedor.styles'
import { UserContext } from '../context/UserProvider'
import { apiUsuariosMe } from '../utils/conecciones/usuario'
import { DimensionesProvider } from '../context/DimensionesProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PuestoProvider } from '../context/PuestoProvider'

const Contenedor = () => {
  const { tokenUsuario, setTokenUsuario, baseURL, apiRef, rol, setRol } = useContext(UserContext);
  const [verificandoToken, setVerificandoToken] = useState(true);

  const navigate = useNavigate();
  const rutaPedido = `/pedido`;
  const rutaLogin = `/login`;
  const rutaDireccionServidor = `/direccion-servidor`
  const rutaAdmin = `/admin`

  const verificarToken = async () => {
    try {
      const { roleName } = await apiUsuariosMe(apiRef.current, tokenUsuario);
      setRol(roleName)
      setVerificandoToken(false);
    } catch (error) {
      setVerificandoToken(false)
    }
  }
  const recuperarToken = async () => {
    try {
      const tokenUsuario = await getUserToken();
      setTokenUsuario(tokenUsuario);
    } catch (error) {
      setTokenUsuario('');
      setVerificandoToken(false)
    }
  }

  // precargar usuario si existe
  useEffect(() => {
    recuperarToken()
  }, []);

  useEffect(() => {
    if (verificandoToken) {
      verificarToken();
    }
  }, [verificandoToken]);

  // Redirigir una vez que el token ha sido verificado
  useEffect(() => {
    if (tokenUsuario) {
      rol === 'user' ? navigate(rutaPedido) :
        rol === 'admin' ? navigate(rutaAdmin) :
          navigate(rutaLogin);
    } else
      navigate(rutaLogin);
  }, [rol, tokenUsuario]);

  useEffect(() => {
    !baseURL ? navigate(rutaDireccionServidor) : !rol && navigate(rutaLogin);
  }, [baseURL]);

  return (
    <SafeAreaProvider>
      <DimensionesProvider>
          <View style={contenedorStyles.contenedor}>
            <SafeAreaView style={contenedorStyles.contenedorSafe}>
              {verificandoToken && (
                <View style={contenedorStyles.loader}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
              <Outlet />
              <StatusBar style="auto" />
            </SafeAreaView>
          </View>
      </DimensionesProvider>
    </SafeAreaProvider>

  )
}

export default Contenedor;
