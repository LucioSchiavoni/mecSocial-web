import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import logo from '../assets/logo-mec.jpg'

const Navbar = () => {

    const logout = useAuthStore(state => state.logout)
    const profile = useAuthStore(state => state.profile)
   
  return (
    <div className="bg-blue-800 w-3/12 mt-6   rounded-full m-auto  py-3 px-6 flex text-white justify-between">

        {
            profile ? <img src={logo} alt="logo" className="rounded-full w-10" />
            :
            <div>
                <p>No</p>
            </div>

        }


<div className="flex gap-10 justify-center">
    
      <Link to="/profilePage"> <p className="font-semibold mt-2">{profile.username}</p> </Link>
                <button className="bg-white px-3 py-1 text-blue-700 rounded-md" onClick={() => {
            logout()
        }}>Salir</button>
</div>
      
    </div>
  )
}

export default Navbar