import React from 'react';
import {useContext,useState,useEffect, useRef} from 'react';
import SocketContext  from '../context/Socket/SocketContext';
import AuthContext from '../context/Auth/AuthContext';
import MessageContext from '../context/Message/MessageContext';
import ChatContext from '../context/Chat/ChatContext';
const Chat = () => {
  const {getAllChats}=useContext(ChatContext);
  const{sendMessage,messages}=useContext(SocketContext);
  const{loggedInUserInformation}=useContext(AuthContext);
  const loggedInUserId = loggedInUserInformation?._id;
  const [input, setInput] = useState('');
  const {sendMessageToDatabase} =useContext(MessageContext);
  console.log('chat messages ->',messages)

   // ✅ Ref for auto-scrolling
   const messagesEndRef = useRef(null);

  useEffect(()=>{
    getAllChats(sessionStorage.getItem('token'))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[messages])
  const handleSendMessage=async()=>{
   const res= await sendMessageToDatabase(input)
   console.log('response -> ',res)
    sendMessage(res)
    setInput('')
  }
  return (
    <div className="d-flex flex-column vh-100" >
      {/* Chat window */}
      <div className="flex-grow-1 overflow-auto p-3" 
     style={{ backgroundColor: '#f0f2f5', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>

  {/* Example chat messages */}
  {messages.map((msg, index) => (
    <div 
      key={msg?._id} 
      className={`mb-2 d-flex ${msg?.sender?._id !== loggedInUserId ? 'justify-content-start' : 'justify-content-end'}`}
    >
      <div
        style={{
          backgroundColor: msg?.sender?._id !== loggedInUserId ? '#e3f2fd' : '#d1e7dd',
          padding: '8px 12px',
          borderRadius: '10px',
          maxWidth: '70%',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        }}
      >
        {msg?.content}
      </div>
    </div>
  ))}

   {/* Invisible div for scrolling reference */}
   <div ref={messagesEndRef} />
</div>


      {/* Message Input */}
      <div 
        className="d-flex p-2 bg-white border-top w-100" 
        style={{ gap: '0.5rem' }}
      >
        <input 
          type="text" 
          className="form-control flex-grow-1"  
          id="exampleFormControlInput1" 
          placeholder="Type your message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          
        />
        <button onClick={handleSendMessage} type="button" className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
