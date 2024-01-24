import { loginData, loginRequest } from "../api/auth"
import { useAuthStore } from "../store/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const setToken = useAuthStore(state => state.setToken)

    const setProfile =  useAuthStore(state => state.setProfile)

    const navigate = useNavigate()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        

        try {
         
        const res = await loginRequest(email, password)
        setToken(res.data)
     

        const data = await loginData()

        setProfile(data)
       
        navigate("/auth")
        } catch (error) {
            console.log("Error del try del Login: " ,error)
        }
    }

  return (

    <div className="bg-[#003D5A] dark:bg-gray-900">
    <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3  bg-[url(https://imagenes.montevideo.com.uy/imgnoticias/202306/_W933_80/847187.jpg)]">
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div className=" p-5  rounded-md ">
                    <h2 className="text-5xl font-bold text-white sm:text-3xl">Mec Social</h2>

                    <p className="text-3xl mt-3 font-semibold text-white">
                      Red Social para la banda del MEC
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="#" alt="img-logo"/>
                    </div>

                    <p className="mt-3 text-3xl font-semibold text-white dark:text-gray-300">Inicia sesion </p>
                </div>

                <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-white dark:text-gray-200">Correo</label>
                            <input type="email" name="email" id="email"  className="block w-full px-4 py-2 mt-2  text-gray-700 placeholder-gray-400 bg-gray-100 border-blue-700 border  rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-white dark:text-gray-200">Contraseña</label>
                                <a href="#" className="text-sm text-gray-300 focus:text-blue-500 hover:text-blue-500 hover:underline">Olvidaste tu contraseña?</a>
                            </div>

                            <input type="password" name="password" id="password" className="block w-full px-4 py-2 mt-2 text-gray-700  placeholder-gray-400 bg-gray-100 border border-blue-700 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Ingresar
                            </button>
                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-300">No tienes cuenta aun? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Registrate</a>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login