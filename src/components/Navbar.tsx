import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"


const Navbar = () => {

    const logout = useAuthStore(state => state.logout)
    const profile = useAuthStore(state => state.profile)
   
  return (
    <div className="bg-blue-800 w-full py-2 p-2 flex text-white gap-10">

        {
            profile ? <p>Hola {profile.username} {profile.email}</p>
            :
            <div>
                <p>No</p>
            </div>

        }
        <button className="bg-white px-3 py-1 text-blue-700 rounded-md" onClick={() => {
            logout()
        }}>Salir</button>


        <Link to="/profile">Perfil</Link>
    </div>
  )
}

export default Navbar