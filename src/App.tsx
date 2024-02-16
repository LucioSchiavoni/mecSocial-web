import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import { HomeAuth } from './pages/HomeAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'
import ForgetPassword from './pages/ForgetPassword'
import ProfilePage from './pages/ProfilePage'

import { ChakraProvider } from '@chakra-ui/react'

function App() {

  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <>
    <ChakraProvider>

   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/forget' element={<ForgetPassword/>}/>

<Route element={<ProtectedRoute isAllowed={isAuth} />} >
  <Route path='/auth' element={<HomeAuth/>}/>
 <Route path='/profilePage/:ID' element={<ProfilePage/>}/>

 
</Route>
    </Routes>
    </BrowserRouter>
     </ChakraProvider>
    </>
  )
}

export default App
 