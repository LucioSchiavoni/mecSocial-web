

const CreatePost = () => {

    


  return (
    <div className="w-full mt-4 p-6 space-y-2">

    <textarea className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Que estas pensando.."></textarea>
    
    <button className="bg-blue-600 rounded-md text-white px-3 py-1 shadow-xl">Publicar</button>
</div>
  )
}

export default CreatePost