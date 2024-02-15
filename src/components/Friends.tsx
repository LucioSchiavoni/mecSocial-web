import { useEffect, useState } from "react"
import clienteAxios from "../libs/axios"
import NotificationButton from "./NotificationButton";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Friends = () => {

  type DataUser = {
    ID: string;
    Username: string;
    Image: string;
    Description: string;
    Email:string;
  };



  const [user, setUser] = useState<DataUser[]>()

  const getUsers = async () : Promise<any> => {
    try {
      const res = await clienteAxios.get<DataUser[]>("/allUser")
      setUser(res.data)
      
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <div className=" p-4 w-5/12 flex flex-col mt-5   font-semibold gap-10">
      
      <div className="flex gap-10">
          <NotificationButton/>

    
      </div>
    
      <p className="text-2xl flex items-center gap-2 leading-3 py-2 "><FaUserFriends />Usuarios en Mec </p>
      {
        user ?
    
     user.map((item) => (


      <div className="flex gap-5 " key={item.ID}>
        <div className="flex gap-5" >
 <img src={item.Image} alt="image-user" className="w-12 h-12 rounded-full object-cover"/>
     </div>
<div className="text-gray-300 flex-col flex gap-3">
       
        <Link to={`/profilePage/${item.ID}`} className="text-black dark:text-white text-xl capitalize hover:underline">{item.Username}</Link>
        
      
          <p className="text-gray-600">{item.Email}</p>
        </div>
     
        </div> 
     ))
        :
<Box padding='6' boxShadow='md' bg='slate-800'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='2' noOfLines={2} spacing='4' skeletonHeight='2' />
</Box>
      }
    </div>
  )
}

export default Friends