import {  useRef, useState } from "react";
import { useAuthStore } from "../store/auth"
import { Link} from "react-router-dom";
import { Spinner } from '@chakra-ui/react'

const RegisterPage =  () => {

  const register = useAuthStore((state) => state.register)

  const imageRef = useRef<HTMLInputElement>(null);
  const imageBgRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [button, setButton] = useState<boolean>(false)
  const [errorPassowrd, setErrorPassword] = useState<boolean>(false)



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
    const Confirmpassword = (e.currentTarget.elements[3] as HTMLInputElement).value;
    const description = (e.currentTarget.elements[4] as HTMLInputElement).value;
    const imageFile = imageRef.current?.files?.[0];
    const imageBgFile = imageBgRef.current?.files?.[0];

    if (password !== Confirmpassword){
        setErrorPassword(true)
            setTimeout(() => {
        setErrorPassword(false)
    }, 3000)
        return;
    }



    try {
         const res = await register({username, email, password, description,  image: imageFile || null , image_Bg: imageBgFile || null})
            setButton(false)
            if(typeof res === "string"){
                setErrorMessage(res)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                return
            }
            
            setMessage(true)
            setTimeout(() => {
                setMessage(false)
            },3000)
            console.log(res)
    } catch (error) { 
               console.log(error)
        }
     
    }
 
  return (

 <>
 <section className="bg-slate-900">

    <div className="flex justify-center min-h-screen">  

 <Link to='/' className="absolute top-10 left-10 bg-blue-700 text-white font-semibold px-3 py-1 rounded-md text-xl hover:bg-blue-600">
 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
 </Link>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
                <h1 className="text-5xl font-bold tracking-wider text-white capitalize dark:text-white">
                    Registrate.
                </h1>

                <p className="mt-4 text-white text-xl font-semibold">
                    Ingresa tus datos para crear una cuenta gratis.
                </p>

              
                   {
                        message && (
<div className="flex w-full max-w-sm absolute top-10 ml-28 overflow-hidden bg-white animate-bounce rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-center w-12 bg-emerald-500">
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
    </div>

    <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">Exito!</span>
            <p className="text-sm text-gray-600 dark:text-gray-200">Tu cuenta fue registrada!</p>
        </div>
    </div>
</div>



                        )
                    }

{
                        errorPassowrd && (
                            <div className="flex w-full max-w-sm absolute top-10 ml-28 overflow-hidden bg-white  rounded-lg shadow-md dark:bg-gray-800">
                        
                            <div className="px-4 py-2 -mx-3">
                                <div className="mx-3">
                                    <span className="font-semibold text-red-800 text-xl dark:text-red-800">Error</span>
                                    <p className="text-xl  text-red-700 font-semibold dark:text-gray-200">Las contraseñas no coinciden</p>
                                </div>
                            </div>
                        </div>



                        )
                    }


                    {
                        errorMessage && (
                            <div className="flex w-full max-w-sm absolute top-10 ml-28 overflow-hidden bg-white  rounded-lg shadow-md dark:bg-gray-800">
                            <div className="flex items-center justify-center w-12 bg-red-700">
                                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                </svg>
                            </div>
                        
                            <div className="px-4 py-2 -mx-3">
                                <div className="mx-3">
                                    <span className="font-semibold text-red-800 dark:text-red-800">Error</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-200">Ya existe una cuenta con este email</p>
                                </div>
                            </div>
                        </div>
                        )
                    }

               

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm  text-white dark:text-gray-200">Nombres</label>
                        <input type="text" id="name" name="name" autoComplete="name" placeholder="Ej: Manolo Lamas" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm  text-white dark:text-gray-200">Correo </label>
                        <input type="email" id="email" name="email" autoComplete="email" placeholder="ejemplo@correo.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                    </div>


                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm  text-white dark:text-gray-200">Contraseña</label>
                        <input type="password" id="password"  name="password" placeholder="Ingresa tu contraseña" autoComplete="current-password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm  text-white dark:text-gray-200">Confirmar contraseña</label>
                        <input type="password" id="confirmPassword"  name="confirmPassword" autoComplete="new-password" placeholder="Ingresa tu contraseña" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm  text-white dark:text-gray-200">Descripcion </label>
                        <input type="text" id="description" name="description" placeholder="Cuenta sobre ti.." className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
    <label htmlFor="image" className="block text-sm text-white dark:text-gray-300">Foto de perfil</label>

    <input type="file" name="image"  id="image" ref={imageRef}  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" required />
</div>
                    
            <div>
    <label htmlFor="image_bg" className="block text-sm text-white dark:text-gray-300">Foto de portada</label>

    <input type="file" name="image_bg" id="image_bg"  ref={imageBgRef} className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" required />
</div>

                    <button onClick={() => setButton(true)} type="submit"
                        className="flex items-center text-center justify-between w-full m-auto mt-7  px-6 py-3.5 text-sm tracking-wide text-white capitalize transition-colors duration-300 transhtmlForm bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                       {

                        button ? 
                        <Spinner />
                        :
                        <span className="text-center"> Guardar </span>
                       }
                        

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
</>


  )
}

export default RegisterPage