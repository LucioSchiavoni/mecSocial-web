import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import clienteAxios from "../libs/axios";

export const HomeAuth = () => {
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
       <>
            <Navbar />
 <div className="w-80 mt-2 m-auto ">
            <p className="text-center mt-24 font-semibold text-4xl">Hola Usuario!!!</p>

            <div className="grid grid-cols-1 gap-10">
                   {posts.map((post) => (
                <div key={post.ID} className="p-6 border shadow-xl w-80 h-80 rounded-md">
                    <img src={post.ImagePost} alt={post.Description} className="bg-gray-400 p-8 rounded-md shadow-xl h-28"/>
                   <div className="flex gap-2 p-2">
                    <img src={post.User.Image} alt="usuario userimage" className="bg-gray-700 rounded-full p-4" />
                               <p className="font-bold ">{post.User.Username}</p>
                                <p>{post.Description}</p>
                   </div>
         
                    <div className="bg-gray-200 rounded-md shadow-xl h-32 p-4">
                        Comentarios:
                        {post.Comments.map((comment) => (
                            <div key={comment.ID} className="flex w-full border shadow-xl p-2 rounded-md">
                                <p className="font-bold "> {comment.User.Username}</p> <p>{comment.Content}</p>
                               
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
            </div>
            
         </>
    );
};

export default HomeAuth;
