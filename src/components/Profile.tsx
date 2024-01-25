import { useAuthStore } from "../store/auth"

const Profile = () => {

    const profile = useAuthStore((state) => state.profile)


  return (
    <div className="flex flex-col items-center w-5/12 border p-4 rounded-md ">
    <img className="object-cover w-4/12 rounded-xl aspect-square" src={profile.image} alt=""/>

    <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">{profile.usename}</h1>

    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">{profile.description}</p>

   
    </div>

  )
}

export default Profile