import { useEffect } from "react";
import { useAuthStore } from "../store/auth"
import { Link, useNavigate } from "react-router-dom";

const RegisterPage =  () => {

  const register = useAuthStore((state) => state.register)
  const isAuth = useAuthStore((state) => state.isAuth)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
  const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
  const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
  const image = (e.currentTarget.elements[3] as HTMLInputElement).value;
  const imageBg = (e.currentTarget.elements[4] as HTMLInputElement).value;
  const description = (e.currentTarget.elements[5] as HTMLInputElement).value;

  await register({username, email, password, image, imageBg, description})
  }

  useEffect(() => {
    if (isAuth){
      navigate("/auth")
    }
  },[isAuth])

  return (
    <div className="m-5">
      <Link to="/" className="bg-blue-600 px-3 py-1 rounded-md text-white w-64 hover:bg-blue-500">
      Atras
      </Link>
      <form onSubmit={handleSubmit} className="space-y-10 p-2 rounded-md shadow-xl w-4/12 m-auto mt-24">
        <div className="flex flex-col ">
          <label htmlFor="">Nombre</label>
          <input type="text" className="border border-blue-600 ring-2 ring-blue-700 outline-none px-3 py-1 rounded-md" />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Email</label>
          <input type="email" className="border border-blue-600 ring-2 outline-none px-3 py-1 rounded-md" />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Contraseña</label>
          <input type="password" className="border border-blue-600 ring-2 outline-none px-3 py-1 rounded-md"/>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Imagen</label>
          <input type="file" />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Imagen de portada</label>
          <input type="file" />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Descripcion</label>
          <input type="text" className="border border-blue-600 ring-2 outline-none px-3 py-1 rounded-md h-24 " />
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md w-full hover:bg-blue-500 transition-all duration-300 delay-150 "> Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterPage