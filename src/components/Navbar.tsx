import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"


const Navbar = () => {

    const logout = useAuthStore(state => state.logout)
    const profile = useAuthStore(state => state.profile)
   
  return (
    <div className="bg-blue-800 w-3/12 mt-6   rounded-full m-auto  py-3 px-6 flex text-white justify-between">

        {
            profile ? <p className="flex items-center font-bold">MEC Social</p>
            :
            <div>
                <p>No</p>
            </div>

        }


<div className="flex gap-10 justify-center">
    
      <Link to="/profile"> <p className="font-semibold mt-1">{profile.username}</p> </Link>
                <button className="bg-white px-3 py-1 text-blue-700 rounded-md" onClick={() => {
            logout()
        }}>Salir</button>
</div>
      
    </div>
  )
}

export default Navbar