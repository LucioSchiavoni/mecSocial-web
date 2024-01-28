import { useEffect, useState } from "react"
import clienteAxios from "../libs/axios"
import NotificationButton from "./NotificationButton";


const Friends = () => {

  type DataUser = {
    ID: string;
    Username: string;
    Image: string;
    Description: string;
  };


  const [user, setUser] = useState<DataUser[]>()

  const getUsers = async () : Promise<any> => {
    try {
      const res = await clienteAxios.get<DataUser[]>("/allUser")
      setUser(res.data)
      console.log(res.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <div className=" p-4 w-5/12 flex flex-col mt-5  font-semibold gap-10">
      <NotificationButton/>
      <p className="text-2xl leading-3 py-2">Amigos : </p>
      {
        user ?
    (
     user.map((item) => (


      <div className="flex gap-5 " key={item.ID}>
        <div className="flex gap-5" >
 <img src={item.Image} alt="image-user" className="w-12 h-12 rounded-full object-cover"/>
     </div>
<div className="text-gray-300 flex-col flex gap-3">
       
        <p className="text-white text-xl">{item.Username}</p>
        
   
          <p>{item.Description}</p>
        </div>
     
        </div> 
     ))
    
   
     
    )
        :
        <div>Sin amigos...</div>
      }
    </div>
  )
}

export default Friends