import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth"
import { Link, useNavigate } from "react-router-dom";


const RegisterPage =  () => {

  const register = useAuthStore((state) => state.register)
  const isAuth = useAuthStore((state) => state.isAuth)
  const imageRef = useRef<HTMLInputElement>(null);
  const imageBgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
  const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
  const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
  const description = (e.currentTarget.elements[3] as HTMLInputElement).value;
    const imageFile = imageRef.current?.files?.[0];
    const imageBgFile = imageBgRef.current?.files?.[0];
  await register({username, email, password, description,  image: imageFile || null , image_Bg: imageBgFile || null})
  }

  useEffect(() => {
    if (isAuth){
      navigate("/")
    }
  },[isAuth])

  return (

 <>
    <div className="dark:bg-slate-900 min-h-screen">

    <section className="  flex justify-center items-center ">
  
  <Link to="/" className=" bg-blue-600 w-16  px-2 py-1 font-semibold ml-2 text-xl rounded-md text-white  hover:bg-blue-500 absolute top-4 left-4">
    Atras
    </Link>

    <form onSubmit={handleSubmit} className="bg-blue-900 mt-24 p-8 rounded-md">
        <div className="grid grid-cols-1 gap-6  sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Nombre</label>
                <input  type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Correo</label>
                <input  type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Contraseña</label>
                <input  type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
                <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="">Descripción</label>
                <input type="text" className="block w-full p-8 h-24 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
      
             
            </div>

<div>
    <label  className="block text-sm text-gray-500 dark:text-gray-300">Foto de perfil</label>

    <label  className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>

        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Subir</h2>

   

        <input  type="file" className="hidden" ref={imageRef}/>
       
    </label>
</div>
<div>
    <label htmlFor="file" className="block text-sm text-gray-500 dark:text-gray-300">Foto de portada</label>

    <label className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
      

        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Subir</h2>


        <input id="dropzone-file" type="file" className="hidden" ref={imageBgRef}/>
       
    </label>
</div>

        

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-700 hover:bg-blue-600 rounded-md focus:outline-none focus:bg-gray-600 font-semibold">Guardar</button>
     </div>
        </form>
      </section>
    </div>
</>


  )
}

export default RegisterPage