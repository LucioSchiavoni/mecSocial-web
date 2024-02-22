import DarkMode from "../components/DarkMode"
import Layout from "../components/Layout"
import clienteAxios from "../libs/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaBackspace } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useAuthStore } from "../store/auth"
import { MdDeleteOutline } from "react-icons/md";
import { Spinner } from "@chakra-ui/react"
import { FcLike } from "react-icons/fc";
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
    Description: string;
    ImagePost: string;
    UserID: string;
    User: {
      Image: string;
      ImageBg:string;
      Username: string
    }
    Likes:{
      CreatedAt: string;
      User:{
        Username: string;
        Image: string;
      }
    }[]
    Comments:{
      CreatedAt: string;
      Content: string;
      User:{
        Username: string;
        Image: string;
      }
    }[]
  }

  const profile = useAuthStore((state) => state.profile)
  const userId = profile.id
  const [user, setUser] = useState<UserProfile>()
  const [post, setPost] = useState<UserPost[]>()
  const [loading, setLoading] = useState<Boolean>(true)

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
      const res = await clienteAxios.get<UserPost[]>(`/post/${ID}`)
      setLoading(false)
      setPost(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (ID: string) => {
    try {
      const res = await clienteAxios.delete(`/post/${ID}`)
      console.log(res)
      window.location.reload()
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
     {
      loading ?
      (
        <>
      <div className="flex flex-col justify-center items-center animate-pulse w-4/12 m-auto">
        <aside className="bg-gray-200 w-full h-12 border"></aside>
        <div className="bg-gray-400 animate-pulse h-96 w-full border">
             <span className="rounded-full h-52 w-52 absolute top-80 ml-4 bg-gray-100"></span>
        </div>
        <div className="mt-64 ">
          <Spinner/>
        </div>
      
      </div>
     
       
     
           
    </> ) :
          <div className="flex flex-col justify-center items-center w-4/12 m-auto" >
            <div className="flex gap-5 w-full px-4 text-3xl font-semibold p-2 ">
                <Link to='/auth' className="text-4xl text-blue-800 hover:text-blue-500"><FaBackspace/></Link>
             <h2 className="capitalize"> {user?.Username}</h2>
                 
            </div>
            {
              user ? 
             
                <div key={user.ID} className=" w-full border  rounded-md dark:border-slate-800 ">
                    
                                                 {
            user.ImageBg ? (
                     <img className=" w-full h-96 object-cover " src={user.ImageBg} alt="avatar"/>
            ) 
            :
            (
                <div className=" w-full h-96 object-cover bg-gray-400 "></div>
            )
        }
                             {
            user.Image ? (
                     <img className="w-52 h-52 rounded-full absolute ml-4 object-cover  top-80" src={user.Image} alt="avatar"/>
            ) 
            :
            (
                <div className="w-52 h-52 rounded-full bg-gray-700 absolute ml-4 object-cover  top-80"></div>
            )
        }
             
                  
                     <p className="text-3xl font-semibold abolsute mt-24 px-10 py-2 capitalize">{user.Username}</p>

                     <div className="flex justify-between items-center  px-12 py-2  dark:text-gray-300 ">
                      
                     <p className="italic text-xl">{user.Description}</p>
                             {
                        
                        <div> <p className="italic text-xl  ">Post creados: {post?.length}</p></div>
                        
                       }
                     <article className="flex gap-2 text-xl mb-2">
                     <span className="text-2xl mt-1"><MdOutlineEmail />
                      </span>
                       {user.Email}
                       </article>
               
                     </div>
                      
                </div>
         
              :
              null
            }
          {
  post ?
  post.map((post) => (
      <div key={post.ID} className="mb-2 mt-1 border dark:border-slate-900  rounded-md w-full">
        <aside className="flex gap-5 justify-between"> 
          <div className="flex gap-3 p-4">
            <img src={user?.Image} alt="" className="w-10 h-10 rounded-full" />
            <p className="items-center font-semibold capitalize mt-2 text-xl">{user?.Username}</p>
           
          </div>
          {
            userId == ID ?  
            <button onClick={() => deletePost(post.ID)} className="text-3xl text-red-700 hover:text-red-800"><MdDeleteOutline /></button>
          
            :
            null
          } 
        </aside>
        <article>
          {
             post && (
              <>
              { post.Description ?  <p className="text-xl p-4 px-12">{post.Description}</p> : null}
                
                { post.ImagePost ? <img src={post.ImagePost} alt="image-post" className="h-auto m-auto mt-3 rounded-md w-96 object-cover" /> : null }
              </>
            ) 
         
          }
        </article>
                <div className=" mt-4 w-full">

        
          {
            post.Likes.length > 0 ? (
          
              <p className="px-10 flex gap-1 items-center py-2 p-4 text-xl italic font-semibold">
                <span className="text-3xl "><FcLike /> </span>  {post.Likes.length} 
              </p>
      
              )
              :
              null
          }
           {
            post.Comments && (
            post.Comments.map((comment) => (
              <div key={comment.CreatedAt} className="flex gap-3 border p-4 dark:border-slate-900">
                <img src={comment.User.Image} alt="" className="w-10 h-10 rounded-full" />
                <p className="items-center font-semibold capitalize mt-2 text-xl">{comment.User.Username}</p>
                 <p className="items-center   mt-2 ">{comment.Content}</p>
              </div>
            ))
            )
          }  
          </div>
      </div> 
    
  ))
  :
<div className=" text-2xl text-center dark:text-gray-300 mt-24 3xl">
      <p>Sin publicaciones por el momento.</p>
    </div>
}


          </div>
}
    </Layout>

  )
}

export default ProfilePage