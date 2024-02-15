import { loginData, loginRequest } from "../api/auth"
import { useAuthStore } from "../store/auth"
import { Link, useNavigate } from "react-router-dom"
import img from '../assets/logo-mec.jpg'
import { useState } from "react"
import { Spinner } from "@chakra-ui/react"

const Login = () => {

    const setToken = useAuthStore(state => state.setToken)

    const setProfile =  useAuthStore(state => state.setProfile)

    const navigate = useNavigate()
    const [message, setMessage] = useState<Boolean>(false)
    const [button, setButton] = useState<Boolean>(false)
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        
       
        try {
            const res = await loginRequest(email, password);
             
            if (res.data.status === 401) {
                setMessage(true);
               
            } else {
                setToken(res.data);
                const data = await loginData();
                setProfile(data);
                navigate("/auth");
            }
        } catch (error) {
            console.log("Error en el bloque try de Login:", error);
            setMessage(true)
            setTimeout(() =>{
                setMessage(false)
            } ,3000)
        
            
        }
        setButton(false)
    }

  return (

<section className="bg-slate-900">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">


        <form onSubmit={handleSubmit} className="w-full max-w-md">

                <img className="rounded-full w-64 m-auto" src={img} alt="logo"/>
         <h1 className="mt-3 text-4xl font-semibold text-white capitalize text-center dark:text-white">Inicia sesión</h1>
         {
    message && (
<div className="flex w-full max-w-sm overflow-hidden absolute top-10  ml-10  bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-center w-12 bg-red-500">
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>
    </div>

    <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
            <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
            <p className="text-sm text-gray-600 dark:text-gray-200">
                Datos incorrectos!
            </p>
        </div>
    </div>
</div>
)}
            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input type="email" name="email" autoComplete="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" name="password" autoComplete="current-password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="******"/>
            </div>

            <div className="mt-6">
                <button onClick={() => setButton(true)} type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    {
                        button ?
                        <Spinner/>
                        :
                        <span className="text-xl ">Ingresar</span>
                    }
                    
                    
                </button>

           
                <div className="mt-6 text-center ">
                    <Link to='/register' className="text-3xl text-blue-500 hover:underline dark:text-blue-400">
                        No tienes cuenta? registrate
                    </Link>
                </div>
            </div>
        </form>
    </div>
</section>
  )
}

export default Login