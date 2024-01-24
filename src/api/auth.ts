import { createPost } from "../interface/post";
import { createUser } from "../interface/user";
import clienteAxios from "../libs/axios";


export const loginRequest = async (email: string, password: string) => 
{
    
   return await clienteAxios.post("/login", {
    email, 
    password,
})}

export const loginData = async() => {   
    try {
    const res = await clienteAxios.get("/auth")
    return res.data;    
    } catch (error) {
        console.log("Error al capturar el token: ", error)
    }
     }

export const registerRequest = async (data: createUser) => {
    clienteAxios.post("/user", data)

}

export const createPostRequest = async (data: createPost) => {
    clienteAxios.post("/post", data)
}