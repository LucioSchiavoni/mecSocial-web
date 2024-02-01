import { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode} ) => {
  return (
    <div className="dark:bg-[url(https://tailwindcss.ru/_next/static/media/blog-post-form-dark@90.5b274bea.jpg)] bg-gray-100 text-black dark:text-white min-h-screen ">
 
    {children}
    </div>
  )
}

export default Layout