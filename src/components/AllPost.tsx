import { useEffect, useState } from "react";
import clienteAxios from "../libs/axios";
import CreatePost from "./CreatePost";
import { useAuthStore } from "../store/auth";



const AllPost = () => {

    const [posts, setPosts] = useState<PostData[]>([]);

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
           console.log(res.data)
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

//    const handleLike = async (userID: number, postID: number) => {

//     const idCreator: string = profile.id.toString()
//       const postIDStr: string = postID.toString()
//             const idStr: string = userID.toString()
            

//       try {
//         await createLike({userID: idStr, postID: postIDStr, creatorID: idCreator})
     
//       } catch (error) {
//         console.log("Error del handleLike: ", error)
//       }

  
//    }

//     const LikeCounter = async (userID: number, postID: number) => {
//     const postIDStr: string = postID.toString();
//     const userIDStr: string = userID.toString();

//     try {
//       const res = await getLikeCount(userIDStr, postIDStr);
//      if (res !== undefined && res.data !== undefined) {
//     setLikes(res.data);
//     setLiked(true)
//     console.log(res);
//       }else {
//         console.log("Likes null")
//       }
    
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {

//     posts.forEach((post) => {
//         const {User, ID} = post;
//         LikeCounter(User.ID, ID)
//     })
//   },[posts])




  return (
 
<div className="w-full min-h-screen  shadow-xl">
        <CreatePost/>
       <div className="grid grid-cols-1 gap-5 overscroll-contain divide-white">
              {
              !posts == null ? 
          
                <p className="text-white text-4xl font-bold text-center">Cargando...</p>
            
              :

              posts.map((post) => (
           <div key={post.ID} className="flex justify-between flex-col shadow-xl    h-auto rounded-sm "> 
          <div>
              <div className="flex p-4 gap-2 ">
                {
                    post.User.Image ?  
                (
                <img src={post.User.Image} alt="usuario" className="object-cover w-16  rounded-md aspect-square " />
                )
                :
                null
                }
          
            <div className="flex ">
           <p className="font-semibold py-1 text-xl capitalize">{post.User.Username}</p>
            <span className="text-gray-200 p-1.5 px-4 ml-2">{post.CreatedAt.slice(0,10)}</span>
            </div>
           </div>
          
           { 
           post.Description !== "" ? (
<p className="ml-28 py-3 text-xl">{post.Description}</p>
            
           )
           :
           null
           }
            {
                post.ImagePost !== "" ? (
                     <div className="">
                 <img src={post.ImagePost} alt={post.Description} className="object-cover w-7/12   rounded-sm m-auto "/>
            </div>
                )
                : 
                null
            }
           
          </div>

               <div className="p-4">
                   <div className=" p-2 flex  gap-2 mt-5">
                    <form onSubmit={(e) => handleSubmitComments(e, post.User.ID, post.ID)} className="flex  w-full gap-2">
                    <img src={profile.image} alt="perfil" className="w-12 rounded-full h-12" />
                            <input type="text" className="px-3 rounded-md focus:outline-none focus:border-sky-900 focus:border focus:ring-2 mb-2 py-3 w-6/12 bg-slate-700 text-white" placeholder="Escribe un comentario.." />
                          <button type="submit" className="bg-blue-800 hover:bg-blue-700 rounded-md text-white px-3 py-1 w-24 h-8  mt-2">Enviar</button>
                          </form>
                           </div>
               </div>
                 {post.Comments.map((comment) => (
                <div key={comment.ID} className="flex ml-16 border border-gray-700 rounded-md mb-1  bg-slate-900  white flex-col w-7/12  shadow-xl p-2  text-white">
                        <div className=" p-2 border-gray-800">
                            <div className=" flex items-center p-1 gap-2 ">
                               <img src={post.User.Image} alt="img-user"  className="rounded-full  w-8 h-8"/>
                    <p className="font-bold capitalize"> {comment.User.Username}</p> 
                    <p className="text-gray-400 ml-4">{comment.CreatedAt.slice(0, 10)}</p>
                            </div>
                    <p className="ml-12 p-2 text-xl">{comment.Content}</p>
                        </div>
                            
                    
                          
                  
                       </div>
                   ))} 
           </div>
       ))}
   </div>
       </div>

  )
}

export default AllPost