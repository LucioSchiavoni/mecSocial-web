import DarkMode from "./DarkMode"
import { useAuthStore } from "../store/auth"
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import DialogDemo from "./Dialog";




const ProfileSm = () => {


    const profile = useAuthStore((state)=> state.profile)
    const logout = useAuthStore((state) => state.logout)
  return (

    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-[#121314] dark:border-gray-700">
<div className="mx-auto">
           <DarkMode/> 
</div>

    <div className="flex flex-col items-center mt-6 -mx-2">
        
        <img className="object-cover w-24 h-24 mx-2 rounded-full z-20 shadow-xl ring-blue-500 ring-2" src={profile.image} alt="avatar"/>
        <Link to={`/profilePage/${profile.id}`} className="hover:underline mx-2font-medium text-gray-800 dark:text-gray-200 mt-10">{profile.username}</Link>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{profile.email}</p>
        <p className="mt-2 p-2 text-gray-400 italic text-center">{profile.description}</p>
    </div>

    <div className="flex flex-col justify-between flex-1 mt-6">
   
    
        <nav>
                
            <a className="flex items-center px-4 py-2  text-gray-700  hover:bg-gray-200 dark:hover:bg-slate-800 border shadow-xl rounded-lg dark:dark:bg-[#121314]
            dark:text-gray-200" href="#">
                <Link to={`/profilePage/${profile.id}`} className="flex items-center"> 
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

        <span className="ml-2 font-semibold ">Mi perfil</span>
         </Link>  
          </a>
   
        <div className="p-4">
            <DialogDemo/>
        </div>
        <div className="p-4">
            <Link to='/chat' className="bg-white text-black px-3 py-1 rounded-md">Chat</Link>
        </div>
        </nav>
<button onClick={() => logout()} className="text-4xl hover:text-gray-700 "><SlLogout /></button>
    </div>
</aside>
  )
}

export default ProfileSm