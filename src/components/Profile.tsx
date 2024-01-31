import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { GrConfigure } from "react-icons/gr";
import DarkMode from "./DarkMode";
import { SlLogout } from "react-icons/sl";


const Profile = () => {

    const profile = useAuthStore((state) => state.profile)
    const logout = useAuthStore((state) => state.logout)

  return (
    <div className="flex flex-col items-center w-5/12   rounded-md ">
       <img src={profile.image_bg} alt="portada" className=" w-full h-64 border rounded-md border-gray-700 relative " />

    <img className="object-cover aspect-square w-48  rounded-xl  absolute top-14 z-10 border border-white" src={profile.image} alt=""/>
   
   <div className="flex justify-between mt-5 gap-x-16">  
      <DarkMode/>
    <h1 className=" text-3xl font-semibold dark:text-white capitalize text-black " >{profile.username}</h1>

<button onClick={() => logout()} className="text-3xl hover:bg-slate-600 text-center px-2 rounded-md "><SlLogout /></button>
   </div>
    

    <p className="mt-2 text-gray-400 ">{profile.description}</p>
    <ul className="p-8 grid grid-cols-1 text-2xl gap-10 ">
    <Link to='/config' className="px-3 py-1 rounded-md hover:bg-slate-700  items-center flex justify-center gap-2">Configuración<GrConfigure /></Link>


     
    </ul>
   
    </div>

  )
}

export default Profile