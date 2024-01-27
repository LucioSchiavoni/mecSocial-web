import { useEffect, useState } from "react"
import clienteAxios from "../libs/axios"


const Friends = () => {

  type DataUser = {
    Username: string,
    Image: string
  }

  const [user, setUser] = useState<DataUser>()

  const getUsers = async () : Promise<any> => {
    try {
      const res = await clienteAxios.get<DataUser>("/allUser")
      setUser(res.data)
      console.log(res.data)
      console.log(res.data.Username)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  },[])
  return (
    <div className=" p-4 w-5/12 flex mt-5  font-semibold">
      {
        user ?
    (
     
        <div >
        <img src={user.Image} alt="image-user" className="w-12 rounded-full "/>
        <p className="text-white">{user.Username}</p>
      </div> 
   
     
    )
        :
        <div>Sin amigos...</div>
      }
    </div>
  )
}

export default Friends