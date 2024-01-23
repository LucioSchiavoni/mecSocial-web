import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import HomeAuth from './pages/HomeAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'
import Profile from './pages/Profile'

function App() {

  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<RegisterPage/>} />
      

<Route element={<ProtectedRoute isAllowed={isAuth} />} >
  <Route path='/auth' element={<HomeAuth/>}/>
  <Route path='/profile' element={<Profile/>}/>

</Route>
     


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
 