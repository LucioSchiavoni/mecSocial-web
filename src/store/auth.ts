import {create} from "zustand";
import { persist } from "zustand/middleware";
import { createUser } from "../interface/user";
import { createCommentsRequest, registerRequest } from "../api/auth";
import { createPost } from "../interface/post";
import { createPostRequest } from "../api/auth";
import { createComments } from "../interface/comments";

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
}


//es como un useState se guarda un valor y una funcion en este caso se quiere guardar un estado que 
//lo declaramos por defecto de esta manera 
export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
        token: "",
        profile: null,
        isAuth: false,

        setToken: (token: string) => set((state) => ({
            token,
            isAuth: true
        })),

        setProfile: (profile: any) => set(state => ({
            profile
        })),

        register: async (user: createUser) => {
            try {
                const res = await registerRequest(user)
             
            } catch (error) {
                console.log("Error del estado del registro: ", error)
            }
        },

        createPost: async (post: createPost) => {
            try{
                const res = await createPostRequest(post)
                
            }catch(error){
                console.log(error)
            }
        },
        
        createComments: async (comments: createComments) => {
            try {
                const res = await createCommentsRequest(comments)

            } catch (error) {
                console.log("Error en el state: ",error)
            }
        },

        logout: () => set(state => ({
            token: '',
            isAuth: false,
            profile: null
        }))

    }) , {
        name: 'auth',
        
    }
))