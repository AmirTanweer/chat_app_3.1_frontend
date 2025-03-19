import React, { useContext, useState, useEffect, useRef ,useLayoutEffect } from 'react';
import SocketContext from '../context/Socket/SocketContext';
import AuthContext from '../context/Auth/AuthContext';
import MessageContext from '../context/Message/MessageContext';
import ChatContext from '../context/Chat/ChatContext';

const Chat = () => {
  const { getAllChats } = useContext(ChatContext);
  const { sendMessage, messages ,selectedChatId} = useContext(SocketContext);
  const { loggedInUserInformation } = useContext(AuthContext);
  const loggedInUserId = loggedInUserInformation?._id;
  const [input, setInput] = useState('');
  const { sendMessageToDatabase } = useContext(MessageContext);
   const [isGroup, setIsGroup] = useState(false);
  // ✅ Ref for auto-scrolling
  const messagesEndRef = useRef(null);
  

  useEffect(() => {
    getAllChats(sessionStorage.getItem('token'));
  
     
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  }, [messages]);

//   useLayoutEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const res = await sendMessageToDatabase(input);
    console.log('response -> ', res);
    sendMessage(res);
    setInput('');
  };

  return (
     <div style={{height:'100vh'}}>
      {/* chat window */}
     <div className="flex-grow-1 overflow-auto p-3" style={{height:'90vh'}}>
       
      {
        !selectedChatId ?  (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p className="text-muted">Select a chat to start messaging</p>
          </div>
        ):
        messages.map((msg,index)=>(
          
          msg?.sender?._id !== loggedInUserId ?
          (
              // {/* left side */}
             
      <div key={msg._id} style={{maxWidth:'40%',display:'flex',alignItems:'center' }}>
      <p style={{backgroundColor: '#e3f2fd', borderRadius: '10px' ,padding:'5px'}} className='my-2 mx-2 '>{msg?.content}</p>
      {
        msg.chat.isGroupChat && <>
        <img
          src='/user.png'
          alt="User Image"
          style={{ borderRadius: '50%', width: '40px', marginRight: '8px' }}
          />
        <p className='fw-bold m-0 p-0' >{msg?.sender?.name}</p>
        </>
      }
          
         
     
    </div>
          )
          :
          (
              // {/* right side */}
      <div key={msg._id} style={{maxWidth:'40%',display:'flex', justifySelf:'flex-end',alignItems:'center'}}>
    {
      msg.chat.isGroupChat && <>
      <p className='fw-bold my-3 mx-2 p-0' >{msg?.sender?.name}</p>
      <img
                src="/user.png"
                alt="User Image"
                style={{ borderRadius: '50%', width: '40px', marginRight: '8px' }}
              />
      </>
    }
          
       
      
      <p style={{backgroundColor: '#d1e7dd', borderRadius: '10px', padding:'5px'}} className='my-2 '>{msg?.content}</p>
      </div>
          )
        ))
      }
    

     


     
       <div ref={messagesEndRef} />
     </div>
          {/* Invisible div for scrolling reference */}
     



        
     {/* send message input  */}
     <div style={{height:'10vh',display:'flex',alignItems:'flex-end'}}>

     <div className="d-flex p-2 bg-white border-top w-100" style={{ gap: '0.5rem' }}>
        <input 
          type="text"
          className="form-control flex-grow-1"
          placeholder="Type your message..."
          aria-label="Message input field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!selectedChatId}
        />
        <button onClick={handleSendMessage} type="button" className="btn btn-primary">
          Send
        </button>
      </div>


     </div>

     </div>



);
};

export default Chat;












    // <div className="d-flex flex-column vh-100">
    //   {/* Chat window */}
    //   <div className="flex-grow-1 overflow-auto p-3" 
    //     style={{ backgroundColor: '#f0f2f5', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>

    //     {/* Example chat messages */}
    //     {messages.map((msg) => (
    //       <div 
    //         key={msg?._id} 
    //         className={`p-0 m-0 d-flex ${msg?.sender?._id !== loggedInUserId ? 'justify-content-start' : 'justify-content-end'}`}
    //       >
    //         {/* Sender's Content */}
    //         {msg?.sender?._id === loggedInUserId ? (
    //           <div className='d-flex align-items-center'>
    //             <p className='mx-2 fw-bold'>{msg?.sender?.name || 'You'}</p>
    //             <img
    //               src="/user.png"
    //               alt="User Image"
    //               style={{ borderRadius: '50%', width: '40px', marginRight: '8px' }}
    //             />
    //             <div
    //               style={{
    //                 alignSelf:'end',
    //                 backgroundColor: '#d1e7dd',
    //                 padding: '8px 12px',
    //                 borderRadius: '10px',
    //                 maxWidth: '70%',      // ✅ Prevents content from stretching too far
    //                 minWidth: '100px',    // ✅ Ensures a reasonable minimum width
    //                 wordWrap: 'break-word',  
    //                 overflowWrap: 'break-word',
    //                 whiteSpace: 'pre-wrap',  // ✅ Maintains proper formatting for long messages
    //                 display: 'inline-block', // ✅ Ensures the message bubble stays aligned
    //                 textAlign: 'left',  
    //                 boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    //               }}
    //             >
    //               {msg?.content}
    //             </div>
    //           </div>
    //         ) : (
    //           <div className='d-flex align-items-center'>
    //             <div 
    //               style={{
    //                 backgroundColor: '#e3f2fd',
    //                 padding: '8px 12px',
    //                 borderRadius: '10px',
    //                 maxWidth: '70%',
    //                 wordWrap: 'break-word',
    //                 overflowWrap: 'break-word',
    //                 boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    //               }}
    //             >
    //               {msg?.content}
    //             </div>
    //             <img
    //               src="/user.png"
    //               alt="User Image"
    //               style={{ borderRadius: '50%', width: '40px', marginLeft: '8px' }}
    //             />
    //             <p className='mx-2 fw-bold'>{msg?.sender?.name || 'Unknown'}</p>
    //           </div>
    //         )}
    //       </div>
    //     ))}

    //     {/* Invisible div for scrolling reference */}
    //     <div ref={messagesEndRef} />
    //   </div>

    //   {/* Message Input */}
    //   <div className="d-flex p-2 bg-white border-top w-100" style={{ gap: '0.5rem' }}>
    //     <input 
    //       type="text"
    //       className="form-control flex-grow-1"
    //       placeholder="Type your message..."
    //       aria-label="Message input field"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
    //     />
    //     <button onClick={handleSendMessage} type="button" className="btn btn-primary">
    //       Send
    //     </button>
    //   </div>
    // </div>
  