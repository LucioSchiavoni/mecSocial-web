import { useEffect, useState } from "react";
import clienteAxios from "../libs/axios";
import CreatePost from "./CreatePost";

const AllPost = () => {

    const [posts, setPosts] = useState<PostData[]>([]);

    type PostData = {
        ID: number;
        Description: string;
        ImagePost: string;
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
           
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);



  return (
 
<div className=" mt-9 w-5/12 m-auto ">
        <CreatePost/>
       <div className="grid grid-cols-1 gap-10">
              {
              !posts ? 
          
                <p className="text-white text-4xl font-bold text-center">Cargando...</p>
            
              :
              posts.map((post) => (
           <div key={post.ID} className="p-6  shadow-xl  h-auto rounded-md ">
               <img src={post.ImagePost} alt={post.Description} className="bg-gray-400 p-8 rounded-md w-11/12 m-auto shadow-xl h-80"/>
              <div className="flex gap-2 p-2 ml-5">
               <img src={post.User.Image} alt="usuario userimage" className="bg-gray-700 rounded-full w-8 h-8" />
                          <p className="font-bold py-1 text-xl ">{post.User.Username}</p>
                           <p className="py-1 text-xl">{post.Description}</p>
              </div>
                
                <div>
                    <button className="bg-white  mt-2 hover:bg-gray-400 transition-all delay-150 duration-300 rounded-md text-black ml-8 py-1 px-3">Me gusta</button>
                </div>

               <div className="p-6">
                
                   {post.Comments.map((comment) => (
                       <div key={comment.ID} className="flex flex-col w-full  shadow-xl p-2 rounded-md">
                        <div className=" p-2 border-b-2 border-gray-800">
                            <div className=" flex items-center p-1 gap-2 ">
                               <img src={post.User.Image} alt="img-user"  className="rounded-full  w-8 h-8"/>
 <p className="font-bold "> {comment.User.Username}</p> <p className="">{comment.Content}</p>
 
                            </div>
<p className="text-gray-600 ml-4">{comment.CreatedAt}</p>
                        </div>
                            
                    
                           <div className=" p-2 flex justify-between gap-2 mt-5">
                                       <input type="text" className="px-3 rounded-md border mb-2 py-3 w-full text-black" placeholder="Escribe un comentario.." />
                          <button className="bg-blue-600 rounded-md text-white px-3 py-1 w-24 h-8  mt-2">Enviar</button>
                           </div>
                  
                       </div>
                   ))}
               </div>
           </div>
       ))}
   </div>
       </div>

  )
}

export default AllPost