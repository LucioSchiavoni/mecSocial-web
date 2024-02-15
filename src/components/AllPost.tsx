import { useEffect, useState } from "react";
import clienteAxios from "../libs/axios";
import CreatePost from "./CreatePost";
import { useAuthStore } from "../store/auth";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";


const AllPost = () => {

    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const profile = useAuthStore((state) => state.profile)
    const createComment = useAuthStore((state) => state.createComments)
   

    type PostData = {
        ID: number;
        Description: string;
        ImagePost: string;
        CreatedAt: string;
        User: {
            ID: number;
            Username: string;
            Image: string;
        };
        Likes: {
            ID: number;
            User: {
                ID: number;
                Username: string;
                Image: string;
            };
        }[];
        Comments: {
            ID: number;
            Content: string;
            CreatedAt: string;
            User: {
                ID: number;
                Username: string;
                Image: string;
            };
        }[];
    };
    

    
    const getPosts = async () => {
        try {
            const res = await clienteAxios.get<PostData[]>("/AllPost");
            setPosts(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getPosts();
    }, []);

    const handleSubmitComments = async (e: React.FormEvent<HTMLFormElement>, userID: number, postID: number) => {
        e.preventDefault()
        const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const idCreator: string = userID.toString()
        const userIDStr: string = profile.id.toString()
        const postIDStr: string = postID.toString()
        
        try {
            await createComment({ userID: userIDStr  , postID: postIDStr , content , creatorID: idCreator})
            window.location.reload()
        } catch (error) {
            console.log("Error en handleSubmit :", error)
        }
    }

  return (
 
<div className="w-full min-h-screen  ">
        <CreatePost/>


     
       <div className="grid grid-cols-1 gap-5  mb-5">
        <div className="overscroll-contain">

     
              {
             loading ?
             <section className="bg-white dark:bg-gray-900">
             <div className="container px-6 py-10 mx-auto animate-pulse">
                <div className="flex gap-5">
                          <p className="w-16 h-16 bg-gray-200 rounded-md dark:bg-gray-700 ring-2 ring-gray-300 dark:ring-gray-600"></p>
              <h1 className="w-52 h-3 mt-2 bg-gray-200  rounded-lg dark:bg-gray-700"></h1>
                        
         
                </div>
        <p className="w-52 h-2 ml-24 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <div className=" mt-5 gap-8   flex justify-center xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                    </div>
                </div>
            </div>
        </section>
            :
                
            posts.map((post) => (
        <div key={post.ID} className="flex dark:glass mb-10  dark:bg-transparent bg-slate-100  justify-between flex-col shadow-xl  border dark:border-slate-800  h-auto rounded-md "> 
        <div>
            <div className="flex p-4 gap-2 ">
                {
                    post.User.Image ?  
                (
                <img src={post.User.Image} alt="usuario" className="object-cover w-16   rounded-md aspect-square " />
                )
                :
                null
                }
          
            <div className="flex flex-col ">
           <Link to={`/profilePage/${post.User.ID}`} className="font-semibold py-1 text-2xl capitalize hover:underline">{post.User.Username}</Link>
            <span className="dark:text-gray-200 text-gray-600  text-sm">{post.CreatedAt.slice(0,10)}</span>
            </div>
           </div>
          
           { 
           post.Description !== "" ? (
<p className="px-20 p-7 text-2xl">{post.Description}</p>
            
           )
           :
           null
           }
            {
                post.ImagePost !== "" ? (
                     <div className="border-t border-slate-600 border-b">
                 <img src={post.ImagePost} alt={post.Description} className="object-cover w-7/12   rounded-sm m-auto "/>
            </div>
                )
                : 
                null
            }
           
          </div>

               <div className="dark:border-slate-800  p-2 w-full border-t m-auto">
                   <div className=" ml-2 w-full mt-5">
                    <form onSubmit={(e) => handleSubmitComments(e, post.User.ID, post.ID)} className="flex w-full gap-4">
                    <img src={profile.image} alt="perfil" className="w-12 rounded-full h-12 object-cover" />
                            <input type="text" className="px-3 rounded-md focus:outline-none focus:border-sky-900 focus:border focus:ring-2 mb-2 py-4 w-10/12 dark:bg-slate-800 dark:border-none dark:text-white border text-black" placeholder="Escribe un comentario.." />
                          <button type="submit" className="bg-blue-900 hover:bg-blue-700 rounded-md text-white text-center text-3xl font-bold px-3 py-1  w-auto h-[39px]  mt-2"><IoSend /></button>
                          </form>
                           </div>


              
                 {post.Comments.map((comment) => (
                <div key={comment.ID} className="flex border-b   border-gray-300 dark:border-gray-800 dark:bg-black text-black bg-white  white flex-col    dark:text-white">
                        <div className=" p-2 border-gray-800">
                            <div className=" flex items-center p-1 gap-2 ">
                               <img src={comment.User.Image} alt="img-user"  className="rounded-full  w-10 h-10 "/>
                    <Link to={`/profilePage/${comment.User.ID}`} className="font-semibold hover:underline text-xl capitalize"> {comment.User.Username}</Link> 
                    <p className="dark:text-gray-400 text-gray-700  ml-4">{comment.CreatedAt.slice(0, 10)}</p>
                            </div>
                    <p className="ml-12 p-2 text-xl">{comment.Content}</p>
                        </div>
                            
                    
                          
                  
                       </div>
                   ))} 
                   </div>
  

   </div>
       ))}
   </div>
   </div>
       </div>
  )
}

export default AllPost