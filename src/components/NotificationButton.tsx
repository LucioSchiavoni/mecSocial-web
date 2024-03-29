import { useEffect, useState } from "react"
import { useAuthStore } from "../store/auth"
import clienteAxios from "../libs/axios"




const NotificationButton = () => {


  const [notifications, setNotifications] = useState<userData[]>([])
  const userId  = useAuthStore((state) => state.profile)


  type userData = {
    ID: string;
    UserID: string;
    CreatedAt: string;
    Creator: {
      ID: string;
      Username: string;
      Image: string;
    }
    Post: {
      Description: string;
    }
    Type: string;
  }

  const getNotification = async () => {
    

    try {
      const res = await clienteAxios.get<userData[]>(`/notificationByUser/${userId.id}`)
      setNotifications(res.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getNotification()
  },[])


  return (
    <details className="dropdown z-10">
  <summary className="m-1 w-12 btn bg-white dark:bg-slate-800 flex p-3 rounded-md border ">
       <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z" fill="currentColor"></path>
        </svg>
  </summary>
  <div className="py-2 w-9/12 shadow-xl">
      {
        notifications.map((item) => (
             <a href="#" key={item.ID} className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b  glass text  rounded-md">
                <img className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full" src={item.Creator.Image} alt="avatar" />
                <p className="mx-2 text-sm text-black dark:text-white"><span className="font-bold capitalize" >{item.Creator.Username}</span> comento tu publicación <span className="text-blue-500 hover:underline " >"{item.Post.Description}"</span> {item.CreatedAt.slice(0,10)} </p>
            </a>
    
        ))
      
  }
           
          
        </div>



      <a href="#" className="block py-2  w-9/12 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline">Ver todas las notificaciones</a >
   
</details>
  )
}

export default NotificationButton