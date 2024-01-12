import React, { createContext, useState, useEffect, useRef } from "react";
import { crearApi } from "../utils/conecciones";
import { getUrlServidor, storeUrlServidor, storeUserToken } from "../utils/storage/storage";
import { parse } from "cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [tokenUsuario, setTokenUsuario] = useState('');
  const [sesionExpirada, setSesionExpirada] = useState(false);
  const [cargandoUrl, setCargandoUrl] = useState(true);
  const [baseURL, setBaseURL] = useState('');
  const [rol, setRol] = useState('');
  const apiRef = useRef(null);

  useEffect(() => {
    !tokenUsuario && setRol('')
  }, [tokenUsuario])

  const setearUrl = async () => {
    try {
      await storeUrlServidor(baseURL);
    } catch (error) {

    }
  }
  const recuperarUrl = async () => {
    try {
      const url = await getUrlServidor();
      url && setBaseURL(url);
    } catch (error) {

    }
  }

  useEffect(() => {
    recuperarUrl()
  }, [])

  useEffect(() => {
    apiRef.current = crearApi(baseURL);
    apiRef.current.interceptors.response.handlers = [];
    apiRef.current.interceptors.request.handlers.length = [];
    setTokenUsuarioRes();
    addTokenUsuarioCookieReq();
  }, [baseURL]);

  useEffect(() => {
    !cargandoUrl ? setearUrl() : setCargandoUrl(false)
  }, [baseURL])

  //actualiza el token de usuario segun respuesta del servidor
  const setTokenUsuarioRes = () => {
    apiRef.current.interceptors.response.use(
      (response) => {
        // Agregar el campo cookies al objeto response
        const cookies = response.headers['set-cookie'];
        if (cookies) {
          const parsedCookies = parse(cookies[0]);
          const { tokenUsuario } = parsedCookies;
          if (tokenUsuario && tokenUsuario !== '') {
            response.tokenUsuario = tokenUsuario;
            setTokenUsuario(tokenUsuario);
          }
        }
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Si la respuesta tiene un status 401, el token es inválido o ha expirado
            setSesionExpirada(true);
            setTokenUsuario('');
        }
        return Promise.reject(error);
      }
    );
  }

  const setearRequest = (config) => {
    config.headers['Cookie'] = `tokenUsuario=${tokenUsuario}`;
    return config;
  }

  const addTokenUsuarioCookieReq = () => apiRef.current.interceptors.request.use((config) => setearRequest(config))

  useEffect(() => {
    apiRef.current.interceptors.request.handlers.length = [];
    addTokenUsuarioCookieReq();
    if (tokenUsuario) setSesionExpirada(false);
  }, [tokenUsuario])

  useEffect(() => {
    // evita que se almacene cuando inicia
    const almacenarTokenUsuario = async () => {
      try {
        if (tokenUsuario !== 'cargando') {
          tokenUsuario ? await storeUserToken(tokenUsuario) : await storeUserToken('');
        }
      } catch (error) {
        //  console.error(error);
      }
    };
    almacenarTokenUsuario();
  }, [tokenUsuario]);

  return (
    <UserContext.Provider value={{ tokenUsuario, setTokenUsuario, sesionExpirada, apiRef, setBaseURL, baseURL, rol, setRol }}>
      {children}
    </UserContext.Provider>
  );
};

