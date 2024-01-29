import {MdOutlineDarkMode} from 'react-icons/md'
import {BsSun} from 'react-icons/bs'
import { useState, useEffect } from 'react'


const DarkMode = () => {

    const [theme, setTheme] = useState(() => {
        const saveTheme = localStorage.getItem('theme');
        if(saveTheme){
            return saveTheme;
        }
        if(window.matchMedia("(prefers-color-scheme: dark)").matches){
            return "dark";
        }
        return "light";
    })

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            if (theme === "dark") {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);
    
    
    const handleTheme = async () => {
        setTheme(prevTheme => prevTheme == 'light' ? 'dark' : 'light')
    }


  return (
    <button onClick={handleTheme} className='hover:bg-slate-800 rounded-full px-2 '>
        <span className='hidden dark:block text-2xl'><BsSun/></span>
        <span className='dark:hidden text-2xl'><MdOutlineDarkMode/></span>
    </button>
  )
}

export default DarkMode