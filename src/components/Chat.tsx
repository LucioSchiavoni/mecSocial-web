import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8080/ws');

client.onopen = () => {
  console.log('WebSocket Client Connected');
};
client.onmessage = (message) => {
  console.log('Received:', message.data);
};
client.onerror = (error) => {
  console.error('WebSocket Error:', error);
};
client.onclose = () => {
  console.log('WebSocket Connection Closed');
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const sendMessage = () => {
    client.send(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket conectado!');
    };
    client.onmessage = (message) => {
      const newMessage = [...messages, message.data.toString()];
      setMessages(newMessage);
      console.log(message.data.toString());
    };
  }, []);

  return (
    <div className="">
      <div className="bg-gray-200 text-black h-64 w-6/12 m-auto">
        {messages.map((message, index) => (
          <div key={index} className="font-semibold">
            {message}
          </div>
        ))}
      </div>
      <div className="w-full absolute bottom-0 text-black">
        <input
          type="text"
          className="w-96 m-auto mr-10 px-4 py-2 rounded-md border border-blue-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-white text-black rounded-sm w-24 h-10 hover:bg-gray-200 botder border-sky-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
