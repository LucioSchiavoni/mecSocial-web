import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuthStore } from "../store/auth"
import { useRef } from "react"
import { updateUser } from "../interface/updateUser"
import { useState } from "react"
import { FaBackspace } from "react-icons/fa";

const ConfigPage = () => {

  const update = useAuthStore((state) => state.updateUser)
  const profile = useAuthStore((state) => state.profile)
  const [message, setMessage] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null);
  const imageBgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault()
      const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
      const description = (e.currentTarget.elements[2] as HTMLInputElement).value;
      const imageFile = imageRef.current?.files?.[0];
      const imageBgFile = imageBgRef.current?.files?.[0];

      const userId: string = profile.id.toString()
  
      const updateData: updateUser = {id: userId};

      // Actualizar el objeto solo si se proporciona un valor
      if (username.trim() !== '') {
          updateData.username = username;
      }
  
      if (password.trim() !== '') {
          updateData.password = password;
      }
  
      if (description.trim() !== '') {
          updateData.description = description;
      }
  
      if (imageFile) {
          updateData.image = imageFile;
      }
  
      if (imageBgFile) {
          updateData.image_Bg = imageBgFile;
      }
  

      try {
          await update(updateData)
          setMessage(true)
          setTimeout(()=> (
            setMessage(false)
          ), 3000)
      } catch (error) {
        console.log("Error en el handleSubmit del update: ", error)
    
      }
  }



  return (
    <Layout>
        <div className="flex justify-center items-center">
            <Link to='/auth' className="absolute top-10 text-3xl left-10 bg-white  px-3 rounded-md py-1 text-sky-800 hover:bg-gray-200"><FaBackspace /></Link>
            <div className="mt-24">
             <form onSubmit={handleSubmit} className="text-black flex flex-col gap-3 shadow-xl bg-white p-4 rounded-md">

              {
                message && (
                  <div className="p-3 bg-sky-700 text-white font-semibold text-2xl">
                    <p>Datos cambiados con exito!</p>
                  </div>
                )
              }
               <p className="text-center text-3xl text-blue-500 font-semibold  ">Editar perfil</p>
              <label htmlFor="" className="text-black font-semibold text-xl text-center">Nombres</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " />
                <label htmlFor="" className="text-black font-semibold text-xl text-center">Contraseña</label>
                <input type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                <label htmlFor="" className="text-black font-semibold text-xl text-center">Descripcion</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700  border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring "/>
                <label htmlFor="" className="text-black font-semibold text-xl text-center">Foto de perfil</label>
                <input type="file" ref={imageRef} className="" />
                <label htmlFor="" className="text-black font-semibold text-xl text-center">Fondo de pantalla</label>
                <input type="file" ref={imageBgRef} className=" "/>

              <button type="submit" className="bg-blue-800 py-1 mt-5 text-xl font-semibold rounded-md text-white hover:bg-blue-600">Guardar</button>
             </form>
            </div>
        </div>
    </Layout>
    
  )
}

export default ConfigPage