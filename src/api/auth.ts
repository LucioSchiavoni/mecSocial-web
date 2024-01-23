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

