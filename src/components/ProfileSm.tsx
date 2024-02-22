import DarkMode from "./DarkMode"
import { useAuthStore } from "../store/auth"
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import DialogDemo from "./Dialog";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoGameControllerOutline } from "react-icons/io5";

const ProfileSm = () => {


    const profile = useAuthStore((state)=> state.profile)
    const logout = useAuthStore((state) => state.logout)
  return (

    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-[#121314] dark:border-gray-700">
<div className="mx-auto ">
           <DarkMode/> 
</div>

    <div className="flex flex-col items-center mt-6 -mx-2">
        
        {
            profile.image ? (
                     <img className="object-cover w-24 h-24 mx-2 rounded-full z-20 shadow-xl ring-blue-500 ring-2" src={profile.image} alt="avatar"/>
            ) 
            :
            (
                <div className="object-cover w-24 h-24 mx-2 rounded-full z-20 shadow-xl bg-gray-600 ring-blue-500 ring-2"></div>
            )
        }
    
        <Link to={`/profilePage/${profile.id}`} className="hover:underline mx-2font-medium text-gray-800 dark:text-gray-200 mt-10">{profile.username}</Link>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{profile.email}</p>
        <p className="mt-2 p-2 text-gray-400 italic text-center">{profile.description}</p>
    </div>

    <div className="flex flex-col justify-between flex-1 mt-6">
   
    
        <nav>
                
           
                <Link to={`/profilePage/${profile.id}`} className="flex items-center px-4 py-2 hover:scale-125 transition duration-300 delay-150  text-gray-700  hover:bg-gray-200 dark:hover:bg-slate-800 border dark:border-slate-800 shadow-xl rounded-lg dark:dark:bg-[#121314]
            dark:text-gray-200"> 
          <span className="text-2xl"><CgProfile />
            </span>  

        <span className="ml-2 font-semibold ">Mi perfil</span>
         </Link>  
        
 
        <div className="mt-2  hover:scale-125 transition-all duration-300 delay-150">
            <DialogDemo/>
        </div>
        <div className=" mt-2">
            <Link to='/chat' className="bg-white dark:bg-[#121314] dark:text-white dark:border-slate-800 text-black shadow-xl hover:scale-125 transition-all duration-300 delay-150 gap-2 px-3 text-center items-center flex border p-1 w-32  rounded-md  "><span className="text-3xl"><IoChatbubbleEllipsesOutline /></span> <p className="text-xl font-semibold">Chat
                </p> </Link>
        </div>
        <a href="https://flagsquiz-chi.vercel.app/" hrefLang="" target="_blank">
               <div className="p-2 rounded-md shadow-xl text-center gap-2 items-center font-semibold hover:scale-110 transition-all duration-300 delay-150 border dark:border-slate-800 mt-10 flex justify-center text-3xl">
            <IoGameControllerOutline /> <p className="text-sm">Juegos </p>
        </div>
        </a>
     
    
        </nav>
<button onClick={() => logout()} className="text-4xl hover:text-gray-700 "><SlLogout /></button>
    </div>
</aside>
  )
}

export default ProfileSm