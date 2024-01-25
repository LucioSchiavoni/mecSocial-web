

import { useAuthStore } from "../store/auth"
import { useRef } from "react"


const CreatePost = () => {

  const createPost = useAuthStore((state) => state.createPost)
  const userData = useAuthStore((state) => state.profile)
  const imageRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault()
    console.log(userData.id)

    const description = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const imageFile = (imageRef.current?.files)?.[0];
   
try {
  const response = await createPost({ description, imagePost: imageFile || null, user_id: userData.id }) as any;
  console.log(response.data);
} catch (error) {
  console.error("Error en la solicitud:", error);
 
}
  }


  return (
    <div className="w-full mt-4 p-6 space-y-2">
        
        <form onSubmit={handleSubmit} className="flex space-y-2 flex-col">
          
    <input className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Que estas pensando.."/>
  <input type="file" ref={imageRef}  />
    <button className="bg-blue-800 rounded-md hover:bg-blue-700 text-white px-3 py-1 shadow-xl">Publicar</button>

        </form>
        
        
</div>
  )
}

export default CreatePost