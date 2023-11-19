import { RefreshControl, ScrollView, StyleSheet, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ItemUsuario from './item-usuario';
import { UserContext } from '../../context/UserProvider';
import { s } from 'react-native-size-matters';
import { ToastContenxt } from '../../context/ToastProvider';

const ListaUsuarios = ({ modificarUsuario, 
    usuarios, cargandoUsuarios, setCargandoUsuaios }) => {
    const { apiRef } = useContext(UserContext);
    const {generarAlerta} = useContext(ToastContenxt);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

    useEffect(() => {
        setUsuariosFiltrados(usuarios)
    }, [usuarios])

    useEffect(() => {

    }, [usuariosFiltrados])

    return (
        <ScrollView style={styles.contenedor}
            refreshControl={
                <RefreshControl
                    refreshing={cargandoUsuarios}
                    onRefresh={() => setCargandoUsuaios(true)}
                />
            }
        >
            {usuariosFiltrados.map((usuario) => {
                const { username, roleName } = usuario;
                return (<ItemUsuario setCargandoUsuaios={setCargandoUsuaios} key={username}
                    modificarUsuario={modificarUsuario} apiRef={apiRef}
                    username={username} roleName={roleName}
                    />)
            })}
        </ScrollView>
    )
}

export default ListaUsuarios

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#eee',
        padding: s(5),
        borderWidth: 2,
        borderRadius: 5,
    }
})