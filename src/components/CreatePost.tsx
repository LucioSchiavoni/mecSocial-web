

import { useAuthStore } from "../store/auth"
import { useRef } from "react"


const CreatePost = () => {

  const createPost = useAuthStore((state) => state.createPost)
  const userData = useAuthStore((state) => state.profile)
  const imageRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault()
    console.log(userData.id)
    // se parsea de int a string (se podria mejorar desde el back)
    const idStr: string = userData.id.toString()

    const description = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const imageFile = (imageRef.current?.files)?.[0];
   
try {
  const response = await createPost({ description, imagePost: imageFile || null, userID: idStr }) as any;

} catch (error) {
  console.error("Error al crear post:", error);
 
}
  }


  return (
    <div className="w-full  divide-slate-200 p-6 space-y-2  rounded-md ">     
        <form onSubmit={handleSubmit} className="flex space-y-2 flex-col">
          <input className="h-24 px-2 rounded-md  text-black" placeholder="Que estas pensando.."/>
          <input type="file" ref={imageRef}  />
          <button className="bg-blue-800  rounded-md hover:bg-blue-700 text-white px-3 py-1 shadow-xl">Publicar</button>
        </form>      
  </div>
  )
}

export default CreatePost