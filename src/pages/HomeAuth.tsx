import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import clienteAxios from "../libs/axios";

export const HomeAuth = () => {

    const [post, setPost] = useState<PostData[]>();


    type PostData = {
        Description: string;
        ImagePost: string;

    };

    const getPost = async () => {
        try {
            const res = await clienteAxios.get<PostData[]>("/AllPost");
            setPost(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getPost();

    }, []);

    return (
        <div>
            <Navbar />

            <p className="text-center mt-24 font-semibold text-4xl">Hola Usuario!!!</p>
        </div>
    );
};


export default HomeAuth;