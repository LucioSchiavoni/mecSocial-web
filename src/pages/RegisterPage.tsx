import {  useRef, useState } from "react";
import { useAuthStore } from "../store/auth"
import { Link} from "react-router-dom";

const RegisterPage =  () => {

  const register = useAuthStore((state) => state.register)
//   const isAuth = useAuthStore((state) => state.isAuth)
  const imageRef = useRef<HTMLInputElement>(null);
  const imageBgRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate()
  const [message, setMessage] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
  const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
  const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
  const description = (e.currentTarget.elements[3] as HTMLInputElement).value;
    const imageFile = imageRef.current?.files?.[0];
    const imageBgFile = imageBgRef.current?.files?.[0];

    try {
          await register({username, email, password, description,  image: imageFile || null , image_Bg: imageBgFile || null})
          setMessage(true)
          setTimeout(() => {
            setMessage(false)
          },3000)
    } catch (error) { 
        console.log(error)
    }
  }



  return (

 <>
 <section className="bg-slate-900">

    <div className="flex justify-center min-h-screen">  
    
        <div className="hidden bg-cover lg:block lg:w-2/5 bg-[url(https://cdn.elobservador.com.uy/032021/1614904377786/_LCM2004.JPG)]" >
        </div>
 <Link to='/' className="absolute top-10 left-10 bg-blue-700 text-white font-semibold px-3 py-1 rounded-md text-xl hover:bg-blue-600">
 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
 </Link>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
                <h1 className="text-2xl font-semibold tracking-wider text-white capitalize dark:text-white">
                    Registrate.
                </h1>

                <p className="mt-4 text-white ">
                    Ingresa tus datos para crear una cuenta gratis.
                </p>

                <div className="mt-6">
                    <h1 className="text-white dark:text-gray-300">Selecciona el tipo</h1>

                    <div className="mt-3 md:flex md:items-center md:-mx-2">
                        <button className="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>

                            <span className="mx-2">
                                becario
                            </span>
                        </button>

                        <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span className="mx-2">
                                chambeador
                            </span>
                        </button>
                    </div>
                </div>    {
                        message && (
<div>
    <p>Hola</p>
</div>


                        )
                    }

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">

                
                    <div>
                        <label className="block mb-2 text-sm  text-white dark:text-gray-200">Nombres</label>
                        <input type="text" placeholder="Ej: Manolo Lamas" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm  text-white dark:text-gray-200">Correo </label>
                        <input type="email" placeholder="ejemplo@correo.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>


                    <div>
                        <label className="block mb-2 text-sm  text-white dark:text-gray-200">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm  text-white dark:text-gray-200">Descripcion </label>
                        <input type="text" placeholder="Cuenta sobre ti.." className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
    <label htmlFor="image" className="block text-sm text-white dark:text-gray-300">Foto de perfil</label>

    <input type="file" ref={imageRef} required className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
</div>
                    
            <div>
    <label htmlFor="image" className="block text-sm text-white dark:text-gray-300">Foto de portada</label>

    <input type="file" required ref={imageBgRef} className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
</div>
                    <button type="submit"
                        className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transhtmlForm bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Guardar </span>

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