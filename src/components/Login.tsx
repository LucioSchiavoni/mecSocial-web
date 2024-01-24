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

    <form onSubmit={handleSubmit} className="flex  flex-col m-auto w-40 gap-10 " >
        <input type="email" placeholder="email@email.com" className="border px-3 rounded-md border-black" required/>
        <input type="password" placeholder="*********" className="border px-3 rounded-md border-black" required/>
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded-md ">Ingresar</button>
    </form>
  )
}

export default Login