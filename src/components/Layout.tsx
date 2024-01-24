import { ReactNode } from "react"
import Navbar from "./Navbar"


const Layout = ({children}: {children: ReactNode} ) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen p-2">
    <Navbar/>
    {children}
    </div>
  )
}

export default Layout