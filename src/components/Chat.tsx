import { useAuthStore } from '@/store/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { FaBackspace } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { BsIncognito } from "react-icons/bs";

const client = new W3CWebSocket('ws://localhost:8080/ws');


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
   const [isTyping, setIsTyping] = useState<boolean>(false);
  const profile = useAuthStore((state) => state.profile)



  useEffect(() => {
    client.onmessage = (message) => {
     const newMessage = JSON.parse(message.data.toString());
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  }, []);

    const sendMessage = () => {
    const message = {
      email: profile.email,
      username: profile.username,
      message: inputValue,
      image: profile.image
    }
    client.send(JSON.stringify(message));
    setInputValue('');
  };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.trim() !== ''); 
  };

  return (
    <div className="dark:bg-gray-800 bg-white min-h-screen">
      <div className="p-2">
        <aside className='justify-center flex items-center gap-2'>
            <span className='text-gray-400 text-xl'> <BsIncognito /></span>
        <p className='text-center text-gray-400'>Los mensajes se eliminarán al refrescar la página.</p>
        </aside>
     
<Link to='/auth' className='absolute left-0 top-0 bg-blue-800 text-white rounded-md text-4xl w-28  hover:bg-sky-700 justify-center flex    m-1 '><FaBackspace /></Link>
        {messages.map((message, index) => (
          <div key={index} className='flex px-4 pt-2 items-center gap-2 mt-2'>
            <img src={message.image} alt="" className='w-14 h-14 rounded-full object-cover' />
            <div className='mt-10 rounded-md  shadow-xl border dark:border-none dark:text-white dark:bg-slate-900 p-2 w-5/12'>
              <p className='font-semibold'>{message.username}</p>
              <p className='text-xl'>{message.message}</p>
          
            </div>
             {
  // isTyping && ( <div className='absolute bottom-16 text-white font-semibold '>
  //   {message.username} esta
  //   Escribiendo...</div> )
}
          </div>   
        ))}
      </div>
      <div className="w-full absolute  bottom-0 text-black">

          <form onSubmit={handleSubmit} className=''>
           <input
          type="text"
          className="w-full px-4  m-auto h-12  focus:outline-none  focus:ring-2 focus:ring-sky-500 bg-gray-200 "
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Type a message'
        />

{
  isTyping && (
       <button type='submit'
       
          className="w-24 h-10   hover:bg-blue-500 bg-blue-700 absolute right-1 bottom-1 text-center flex justify-center items-center text-4xl text-white rounded-md "
    
        >
          <IoSendSharp />
        </button>
  )
}
     
    </form>
      </div>
    </div>
  );
};

export default Chat;
