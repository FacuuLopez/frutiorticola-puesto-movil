import { StyleSheet } from 'react-native';
import Contenedor from './src/container/contenedor.component';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { UserProvider } from './src/context/UserProvider';
import Loggin from './src/pages/loggin/loggin.component';
import DireccionServidor from './src/components/pedido/direccion-servidor';
import Admin from './src/pages/admin';
import PedidoPage from './src/pages/pedido-contenedor/pedido-page.component';
import { PuestoProvider } from './src/context/PuestoProvider';
import ToastProvider from './src/context/ToastProvider';

export default function App() {

  return (
    <UserProvider>
      <PuestoProvider>
        <ToastProvider>
          <NativeRouter>
            <Routes>
              <Route path='/' element={<Contenedor />} >
                <Route path='login' element={<Loggin />} />
                <Route path='pedido' element={<PedidoPage />} />
                <Route path='direccion-servidor' element={<DireccionServidor />} />
                <Route path='admin' element={<Admin />} />
              </Route>
            </Routes>
          </NativeRouter>
        </ToastProvider>
      </PuestoProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
