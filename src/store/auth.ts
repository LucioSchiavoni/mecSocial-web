import {create} from "zustand";
import { persist } from "zustand/middleware";
import { createUser } from "../interface/user";
import { createCommentsRequest, createLikeRequest, registerRequest, updateUserRequest } from "../api/auth";
import { createPost } from "../interface/post";
import { createPostRequest } from "../api/auth";
import { createComments } from "../interface/comments";
import { createLike } from "../interface/likes";
import { updateUser } from "../interface/updateUser";

type State = {
    token: string;
    profile: any;
    isAuth: boolean
    
}

type Actions = {
    setToken: (token: string) => void
    setProfile: (profile: any) => void
    logout: () => void
    register: (user: createUser) => void
    createPost: (post: createPost) => void
    createComments: (comments: createComments) => void
    createLike: (likes: createLike) => void
    updateUser: (updateUser: updateUser) => void
}


//es como un useState se guarda un valor y una funcion en este caso se quiere guardar un estado que 
//lo declaramos por defecto de esta manera 
export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
        token: "",
        profile: null,
        isAuth: false,

        setToken: (token: string) => set(() => ({
            token,
            isAuth: true
        })),

        setProfile: (profile: any) => set(() => ({
            profile
        })),

        register: async (user: createUser) => {
            try {
                const res = await registerRequest(user)
                
                if(res && res.status === 409){
                    return res.data.error;
                }
                return res
            } catch (error) {
                console.log("Error del estado del registro: ", error)
            }
        },

        createPost: async (post: createPost) => {
            try{
                const res = await createPostRequest(post)
                console.log(res)
            }catch(error){
                console.log(error)
            }
        },
        
        createComments: async (comments: createComments) => {
            try {
                const res = await createCommentsRequest(comments)
                console.log(res)
            } catch (error) {
                console.log("Error en el state: ",error)
            }
        },
        createLike: async (likes: createLike) => {
            try {
                const res = await createLikeRequest(likes)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        },
        updateUser: async (user: updateUser) => {
            try {
                const res = await updateUserRequest(user)
                console.log(res)      
            } catch (error) {
                console.log(error)
            }
        },
        logout: () => set(() => ({
            token: '',
            isAuth: false,
            profile: null
        }))

    }) , {
        name: 'auth',
        
    }
))