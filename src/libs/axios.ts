import axios from 'axios'
import { useAuthStore } from '../store/auth'

const URL = "http://localhost:8080"


const clienteAxios = axios.create({
    baseURL: URL,
    withCredentials: true
})

clienteAxios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  


export default clienteAxios;