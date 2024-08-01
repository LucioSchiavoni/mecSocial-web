import { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode} ) => {
  return (
    <div className="dark:bg-[#121314] flex bg-gray-100 text-black  dark:text-white min-h-screen ">
 
    {children}
    </div>
  )
}

export default Layout