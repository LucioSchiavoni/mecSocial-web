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

export const registerRequest = async (data: createUser): Promise<any> => {
    const formData = new FormData();

    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('description', data.description || '') 
    
    if(data.image){
        formData.append('image', data.image, data.image.name)
    }
    
    if(data.image_Bg){
        formData.append('image_bg', data.image_Bg, data.image_Bg.name)
    }
    try {
        const res = await clienteAxios.post("/user", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }

}

export const createPostRequest = async (data: createPost)=> {

    const formData = new FormData()
       if(data.description){
        formData.append('description', data.description)
    }
    if(data.imagePost){
        formData.append('image_post', data.imagePost, data.imagePost.name)
    }

    formData.append("id", data.userID)

    try {
        const res = await clienteAxios.post("/post", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res.data;
    } catch (error) {
        console.log("Error aqui en axios:", error)
    }
    return clienteAxios.post("/post", data)
}