import { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode} ) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen ">
 
    {children}
    </div>
  )
}

export default Layout