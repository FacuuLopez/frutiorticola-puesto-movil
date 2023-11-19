import EncryptedStorage from 'react-native-encrypted-storage';

const storeUrlServidor = async (url) => {
  await EncryptedStorage.setItem('urlServidor', url);
}

const getUrlServidor = async () => await EncryptedStorage.getItem('urlServidor');

const storeUserToken = async (token) => {
  await EncryptedStorage.setItem('tokenUsuario', token);
}

const getUserToken = async () => {
  try {
    const tokenUsuario = await EncryptedStorage.getItem('tokenUsuario');
    return tokenUsuario;
  } catch (error) {
    return null;
  }
}

const storeUser = async (username, password) => {
  const storedUsersString = await EncryptedStorage.getItem('users');
  const storedUsers = JSON.parse(storedUsersString) || {};
  storedUsers[username] = password;
  await EncryptedStorage.setItem('users', JSON.stringify(storedUsers));
};

const getStoredUserNames = async () => {
  const storedUsersString = await EncryptedStorage.getItem('users');
  const storedUsers = JSON.parse(storedUsersString);
  const userNames = storedUsers ? Object.keys(storedUsers) : [];
  return userNames;
}

const getUserPassword = async (username) => {
  const storedUsersString = await EncryptedStorage.getItem('users');
  const storedUsers = JSON.parse(storedUsersString) || {};
  const password = storedUsers[username];
  return password;
};

const BorrarUsuariosGuardados = async () => {
  try {
    await EncryptedStorage.removeItem('users');
    return ('Todos los usuarios han sido eliminados.');
  } catch (error) {
    throw new Error('Error al eliminar los usuarios');
  }
};

export {
  storeUserToken, getUserToken, storeUser, storeUrlServidor,
  getUrlServidor, getStoredUserNames, getUserPassword, BorrarUsuariosGuardados
};
