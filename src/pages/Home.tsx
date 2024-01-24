import Login from "../components/Login"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    
    <div className="p-2">
        <Login/>
        <div className="w-72 m-auto space-y-10 flex">
          <p className="">Eres nuevo?</p>
          <Link to="/register" className="bg-blue-600 px-3 py-1 rounded-md text-white">Crear cuenta</Link>
        </div>
    </div>
  )
}

export default Home