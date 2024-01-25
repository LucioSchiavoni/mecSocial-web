import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import { HomeAuth } from './pages/HomeAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'

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


</Route>
     


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
 