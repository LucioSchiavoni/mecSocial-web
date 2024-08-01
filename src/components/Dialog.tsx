import { useAuthStore } from "../store/auth"
// import { useRef } from "react"
import { updateUser } from "../interface/updateUser"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { MdModeEditOutline } from "react-icons/md";
const DialogDemo = () =>{

      const update = useAuthStore((state) => state.updateUser)
  const profile = useAuthStore((state) => state.profile)
  const [message, setMessage] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null);
  const imageBgRef = useRef<HTMLInputElement>(null);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault()
      const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
      const description = (e.currentTarget.elements[2] as HTMLInputElement).value;
      const imageFile = imageRef.current?.files?.[0];
      const imageBgFile = imageBgRef.current?.files?.[0];

      const userId: string = profile.id.toString()
  
      const updateData: updateUser = {id: userId};

      // Actualizar el objeto solo si se proporciona un valor
      if (username.trim() !== '') {
          updateData.username = username;
      }
      
      if (password.trim() !== '') {
          updateData.password = password;
      }
  
      if (description.trim() !== '') {
          updateData.description = description;
      }

          if (imageFile !== undefined) {
          updateData.image = imageFile;
      }else{
        updateData.image = profile.image;
      }

          if (imageBgFile !== undefined) {
          updateData.image_Bg = imageBgFile;
      }else{
        updateData.image_Bg = profile.image_Bg
      }

      try {
          await update(updateData)
          setMessage(true)
          setTimeout(()=> (
            setMessage(false)
          ), 3000)
      } catch (error) {
        console.log("Error en el handleSubmit del update: ", error)
    
      }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark:bg-[#121314] dark:border shadow-xl dark:border-slate-700"><span className="text-xl items-center"><MdModeEditOutline /></span>Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#121314] dark:text-white">
        <DialogHeader>
          <DialogTitle className="">Editar perfil</DialogTitle>
          <DialogDescription>
            {
                message && (
                    <div>
                        <p className="italic text-xl font-semibold text-green-600">Datos cambiados con exito!</p>
                    </div>
                )
            }
            <p className="dark:text-white">Cambia cualquier dato que tu quieras.</p>
            
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="dark:text-black">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right dark:text-white">
              Nombre
            </Label>
            <input
              id="username"
              className="col-span-3 px-3 py-2 border rounded-md shadow-xl ring-1 ring-blue-900"
              autoComplete="name"
              type="text"
            />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right dark:text-white">
              Contraseña
            </Label>
            <input
            type="password"
              id="email"
              className="col-span-3 px-3 py-2 border rounded-md shadow-xl ring-1 ring-blue-900"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right dark:text-white">
              Descripción
            </Label>
            <input
              id="description"
              className="col-span-3 px-3 py-4 border rounded-md shadow-xl ring-1 ring-blue-900"
            />
          </div>
               <div className="flex justify-center  gap-2">
            <Label htmlFor="image" className="mt-2 text-center  dark:text-white w-5/12">
              Foto de perfil
            </Label>
            <input
             ref={imageRef}
           type="file"
           className="w-full"
            />
          </div>
                    <div className="flex justify-center  gap-2">
            <Label htmlFor="image_bg" className="mt-2 text-center  dark:text-white w-5/12">
              Foto de portada
            </Label>
            <input
           ref={imageBgRef}
           type="file"
           className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo;