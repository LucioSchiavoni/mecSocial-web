
import { CiImageOn } from "react-icons/ci";
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

    const description = (e.currentTarget.elements[0] as HTMLTextAreaElement).value;
    const imageFile = (imageRef.current?.files)?.[0];
   
try {
  const response = await createPost({ description, imagePost: imageFile || null, userID: idStr }) as any;
  console.log(response)
  window.location.reload()
} catch (error) {
  console.error("Error al crear post:", error);
 
}
  }



  return (
    <div className="w-full   py-7 space-y-2  rounded-md ">     
        <form onSubmit={handleSubmit} className="flex space-y-2 flex-col border rounded-md border-double dark:border-slate-700 p-2">
<div className=" ">
  <div className="flex gap-1">
      <img src={userData.image} alt="" className="w-12 h-12 rounded-full object-cover aspect-square" />
         <textarea className="w-full  h-24 px-6 py-4 rounded-md  resize-none text-black dark:text-white dark:bg-slate-700 bg-slate-100   text-xl focus:outline-double focus:border  focus:border-double focus:border-sky-700  " placeholder="Que estas pensando..">
            </textarea>
  </div>

            <div className="ml-12 flex justify-between  p-2  ">
          <div className="flex gap-5 ">
            <span className="text-3xl text-sky-400">
               <CiImageOn  /> 
            </span>
          <input type="file" ref={imageRef} className="" />
          </div>
      
          <button className="bg-blue-900 w-64  rounded-md font-semibold hover:bg-blue-800 text-white px-3 py-1 shadow-xl">Publicar</button>
            </div>
        
</div>    
        </form>      
  </div>
  )
}

export default CreatePost