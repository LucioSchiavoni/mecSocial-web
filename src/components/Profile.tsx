import { useAuthStore } from "../store/auth"

const Profile = () => {

    const profile = useAuthStore((state) => state.profile)
const logout = useAuthStore(state => state.logout)

  return (
    <div className="flex flex-col items-center w-5/12   rounded-md ">
       <img src={profile.image_bg} alt="portada" className=" w-full  relative " />
    <img className="object-cover w-48  rounded-xl aspect-square absolute top-14 z-10 border border-white" src={profile.image} alt=""/>
   
    <h1 className=" text-3xl font-semibold text-gray-700 capitalize dark:text-white mt-5" >{profile.username}</h1>

    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 ">{profile.description}</p>
    <ul className="p-8 grid grid-cols-1 text-2xl ">
      <li className=" ">Home</li>
      <li>Configuracion</li>
      <li>Amigos</li>

      <li className="bg-white  items-center text-center w-24 py-2 rounded-md font-semibold text-blue-600"> <button onClick={() => logout()}>Salir</button></li>
    </ul>
   
    </div>

  )
}

export default Profile