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

    const imageFile = imageRef.current?.files?.[0];
    const imageBgFile = imageBgRef.current?.files?.[0];

  const description = (e.currentTarget.elements[5] as HTMLInputElement).value;

  await register({username, email, password, image: imageFile || null , image_Bg: imageBgFile || null, description})
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
      <h2 className="text-4xl font-semibold text-blue-700 text-center">Registrate</h2>
      <form onSubmit={handleSubmit} className="space-y-10 p-2 rounded-md shadow-xl w-4/12 m-auto mt-24">
        <div className="flex flex-col ">
          <label htmlFor="">Nombre</label>
          <input type="text" className="border border-blue-600 ring-2 ring-blue-700 outline-none px-3 py-1 rounded-md" required/>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Email</label>
          <input type="email" className="border border-blue-600 ring-2 outline-none px-3 py-1 rounded-md" required/>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Contraseña</label>
          <input type="password" className="border border-blue-600 ring-2 outline-none px-3 py-1 rounded-md" required/>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Imagen</label>
          <input type="file" ref={imageRef} />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Imagen de portada</label>
          <input type="file" ref={imageBgRef} />
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