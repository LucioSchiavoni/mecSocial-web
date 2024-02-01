import { createComments } from "../interface/comments";
import { createLike } from "../interface/likes";
import { createPost } from "../interface/post";
import { updateUser } from "../interface/updateUser";
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
        formData.append('image', data.image, data.image.name || '')
    }
    
    if(data.image_Bg){
        formData.append('image_bg', data.image_Bg, data.image_Bg.name || '')
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
  
}

export const createCommentsRequest = async (data: createComments) => {
    
    const dataComments = {
        'userID': parseInt(data.userID, 10),          
        'postID': parseInt(data.postID, 10),          
        'content': data.content,
        'creatorID': parseInt(data.creatorID, 10)    
    };
    console.log(dataComments)
console.log("userID enviado desde el frontend:", data.userID);
    try {
        const res = await clienteAxios.post("/comments", dataComments, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log("Error en el fetch: ", error);
    }
};


export const createLikeRequest = async (data: createLike) => {
   
    const dataLike = {
    "userID": parseInt(data.userID, 10),  //usuario que creo el post
    "postID": parseInt(data.postID, 10) ,  // id del post
    "creatorID": parseInt(data.creatorID, 10) //usuario que da el like
    }
    try {
        const res = await clienteAxios.post("/like", dataLike, {
            headers: {
                'Content-Type':'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.log("error en el fetch del like: ", error)
    }
}

export const updateUserRequest = async (data: updateUser): Promise<any> => {

    const formData = new FormData()

    if(data.username) {
        formData.append('username', data.username)
    }
    if(data.description) {
        formData.append('description', data.description)
    }

    if(data.password){
        formData.append('password', data.password)
    }

    if(data.image){
        formData.append('image', data.image, data.image.name)
    }
    
    if(data.image_Bg){
        formData.append('image_bg', data.image_Bg, data.image_Bg.name)
    }

    try {
        const res = await clienteAxios.put(`/user/${data.id}`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res.data
    } catch (error) {
        console.log("Error en el fetch del update: ", error)
    }
}