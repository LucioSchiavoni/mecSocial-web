import axios from 'axios'
import { useAuthStore } from '../store/auth'

const URL = import.meta.env.VITE_URL


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