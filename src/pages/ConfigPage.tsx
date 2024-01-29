import { Link } from "react-router-dom"
import Layout from "../components/Layout"


const ConfigPage = () => {
  return (
    <Layout>
        <div className="flex justify-center items-center">
            <Link to='/auth' className="absolute left-10 bg-white text-xl px-3 rounded-md py-1 text-sky-800 hover:bg-gray-200">Atras</Link>
            <div className="mt-24">
             <p>Editar perfil (proximamente)</p>
            </div>
        </div>
    </Layout>
    
  )
}

export default ConfigPage