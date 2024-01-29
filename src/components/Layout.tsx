import { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode} ) => {
  return (
    <div className="dark:bg-slate-900 text-black dark:text-white min-h-screen ">
 
    {children}
    </div>
  )
}

export default Layout