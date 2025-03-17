import React,{useState} from 'react'
import ChatContext from '../context/Chat/ChatContext';
import {useContext} from 'react';
import MessageContext from '../context/Message/MessageContext';
import SocketContext from '../context/Socket/SocketContext';
const Groups = ({searchQuery ,group,isSelected,setSelectedGroupId}) => {
  const [isHovered, setIsHovered] = useState(false); // ✅ New state for hover effect
   const {fetchGroupChat}=useContext(ChatContext);
   const {fetchAllMessages}=useContext(MessageContext);
   const {setSelectedChatId,setMessages}=useContext(SocketContext);

  

  const isMatch = group?.chatName?.toLowerCase().includes(searchQuery.toLowerCase());
  if (!isMatch) return null; // ❗ Prevent rendering non-matching friends

  const handleSelectChat = async() => {
    setSelectedGroupId(group?._id)
   fetchGroupChat(group?._id);
   const messagesFromServer= await fetchAllMessages(group?._id)
  console.log("messages From Server -> ", messagesFromServer);
  setSelectedChatId(group?._id)
  setMessages(messagesFromServer)
  }
  return (
    <div  onClick={handleSelectChat } 
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="my-3 p-2"
      style={{
        backgroundColor: isSelected || isHovered ? '#e3f2fd' : 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        borderRadius: '8px', // For better UI
        transition: 'background-color 0.3s ease-in-out' // Smooth hover effect
      }}  >
      <div style={{ position: 'relative' }}>
        <img
          src="/group_icon.png"
          alt="User Image"
          style={{  width: '40px' }}
        />
       
      </div>
      <div>
        <p style={{ margin: 0 ,fontWeight:'bold'}}>{group?.chatName || 'Unknown Group'}</p>
       
        
      </div>
    </div>
  )
}

export default Groups