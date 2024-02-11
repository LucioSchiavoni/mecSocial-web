import DarkMode from "../components/DarkMode"
import Layout from "../components/Layout"
import clienteAxios from "../libs/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaBackspace } from "react-icons/fa";

const ProfilePage = () => {

  type UserProfile =  {
    ID: string;
    Username: string;
    Email: string;
    Image: string;
    ImageBg: string;
    Description: string;
    
  }
  
  type UserPost = {
    ID: string;
    User: {
      Image: string;
      ImageBg:string;
      Username: string
    }
    Post: {
      ID: string;
      Description:string;
      ImagePost:string;
      CreatedAt:string;
    }
  
  }

  const [user, setUser] = useState<UserProfile>()
  const [post, setPost] = useState<UserPost[]>()
    const { ID } = useParams() || {}; 




  const getUser = async () => {

   
    try {
      
       const res = await clienteAxios.get<UserProfile>(`/user/${ID}`)
    setUser(res.data)
    } catch (error) {
      console.log("Error del fetch del perfil by id: ", error)
    }
   
  }

  const getPostByUser = async () => {

    try {
      const res = await clienteAxios.get<UserPost[]>(`/notificationByUser/${ID}`)
      setPost(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
      getUser();
      getPostByUser();
  }, []);


  return (
    <Layout>
 
      <div className="absolute  top-6 left-64">
         <DarkMode/>
      </div>
     
          <div className="flex flex-col justify-center items-center w-4/12 m-auto" >
            <div className="flex gap-5 w-full px-4 text-3xl font-semibold p-2 ">
                <Link to='/auth' className="text-4xl text-blue-800 hover:text-blue-500"><FaBackspace/></Link>
             <h2 className="capitalize"> {user?.Username}</h2>
                 
            </div>
            {
              user ? 
             
                <div key={user.ID} className=" w-full border rounded-md dark:border-slate-800 ">
                       <img src={user.ImageBg} alt="perfil" className="w-full h-96 " />  
                  <img src={user.Image} alt="perfi" className="w-52 h-52 rounded-full absolute ml-4  top-80" />
                  
                     <p className="text-3xl font-semibold abolsute mt-24 px-10 py-2 capitalize">{user.Username}</p>
                      <p className=" dark:text-gray-300 text-xl px-10 p-6">{user.Description}</p>
              
                     
                </div>
         
              :
              null
            }
            {
              post ? 
              post.map((post) => (
                    <div key={post.Post.ID} className="space-y-3 mt-5 mb-10">
                      <aside className="flex gap-5">
                        <img src={post.User.Image} alt="" className="w-10 h-10 rounded-full" />
                        <p className="items-center font-semibold mt-2 text-xl">{post.User?.Username}</p>
                      </aside>

                      <article>
              

                {
                  post.Post.ImagePost ? (
                  <>
                 

                    <img src={post?.Post?.ImagePost} alt="image-post" className="h-auto rounded-md w-96 object-cover" />
                  
                  </> 
                   )
                    :
                     <p className=" mr-28 text-2xl ">{post?.Post?.Description}</p>
                    
                }
              
                </article>
              </div>
              ))
              :
              <div className="text-white text-center font-semibold mt-24 3xl">
                Sin post
              </div>
            }

          </div>
    </Layout>

  )
}

export default ProfilePage