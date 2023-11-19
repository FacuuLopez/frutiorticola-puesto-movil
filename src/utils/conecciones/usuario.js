import {rutaUsuarios} from '.';

const apiUsuariosLogin = async (api, usuario) => {
  try {
    const { username, password } = usuario;
    const response = await api.post(`${rutaUsuarios}/login`, {
      username,
      password,
    });
    return response.data
  } catch (error) {
    throw error
  }
}

const apiUsuariosMe = async (api) => {
  try{
    const response = await api.get(`${rutaUsuarios}/me`);
    return response;
  }catch(error){
    if(error.response) throw new Error(error.response.data);
    throw error;
    
  }
}

export { apiUsuariosLogin, apiUsuariosMe, rutaUsuarios };