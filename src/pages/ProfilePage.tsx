import Layout from "../components/Layout"
import clienteAxios from "../libs/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const ProfilePage = () => {

  type UserProfile =  {
    ID: string;
    Username: string;
    Email: string;
    Image: string;
    ImageBg: string;
    Description: string;
    
  }

  const [user, setUser] = useState<UserProfile>()
    const { ID } = useParams() || {}; 




  const getUser = async () => {

   
    try {
      
       const res = await clienteAxios.get<UserProfile>(`/user/${ID}`)
    setUser(res.data)
    } catch (error) {
      console.log("Error del fetch del perfil by id: ", error)
    }
   
  }
  

  useEffect(() => {
      getUser();
  }, []);
  return (
    <Layout>
      <Link to='/auth' className="bg-white px-3 py-2 text-black rounded-md absolute top-5 left-10">Volver</Link>
          <div >
            {
              user ? 
             
                <div key={user.ID} className="flex justify-center items-center flex-col py-24">
               
                  <img src={user.Image} alt="perfi" className="w-64 h-40 rounded-md" />
                     <p className="text-3xl font-semibold ">{user.Username}</p>
                </div>
          
              :
              null
            }
          </div>
    </Layout>

  )
}

export default ProfilePage