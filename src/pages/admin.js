import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CrearUsuario from '../components/admin/crear-usuario'
import ListaUsuarios from '../components/admin/lista-usuarios'
import BotonCerrarSesion from '../components/admin/boton-cerrar-sesion.component'
import ModificarUsuario from '../components/admin/modificar-usuario'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { apiGetUsers } from '../utils/conecciones/admin-usuarios'
import { UserContext } from '../context/UserProvider'
import Puesto from '../components/admin/puesto/Puesto'
import { ToastContenxt } from '../context/ToastProvider'

const Admin = () => {
  const {generarToast, generarAlerta} = useContext(ToastContenxt)
  const [modificandoUsuario, setModificandoUsuario] = useState('')
  const { apiRef } = useContext(UserContext);
  const modificarUsuario = (username) => setModificandoUsuario(username);
  const cancelarModificarUsuario = () => setModificandoUsuario('');
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuaios] = useState(true);

  const recuperarUsuarios = async () => {
      try {
          const users = await apiGetUsers(apiRef.current);
          setUsuarios(users);
          setCargandoUsuaios(false);
      } catch (error) {
        setCargandoUsuaios(false);
      }
  }
  useEffect(() => {
      cargandoUsuarios && recuperarUsuarios();
  }, [cargandoUsuarios]);

  useEffect(() => {
      recuperarUsuarios();
  }, []);

  return (
    <View style={styles.contenedor}>
      <BotonCerrarSesion />
      <Puesto />
      {!modificandoUsuario ?
        <>
          <CrearUsuario setCargandoUsuaios={setCargandoUsuaios}/>
          <ListaUsuarios usuarios={usuarios} cargandoUsuarios={cargandoUsuarios} setCargandoUsuaios={setCargandoUsuaios}
          modificarUsuario={modificarUsuario} />
        </> :
        <ModificarUsuario setCargandoUsuaios={setCargandoUsuaios} username={modificandoUsuario} cancelarModificarUsuario={cancelarModificarUsuario}/>
      }
      <Toast autoHide={true} visibilityTime={2000} position="bottom" bottomOffset={40} />
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  }
})