import React, { useContext,useState } from 'react';
import SocketContext from '../context/Socket/SocketContext';
import AuthContext from '../context/Auth/AuthContext';
import ChatContext from '../context/Chat/ChatContext';
import MessageContext from '../context/Message/MessageContext';
const Friends = ({ friend,isSelected,setSelectedFrndId ,searchQuery}) => {
  const {fetchAllMessages}=useContext(MessageContext);
  const {fetchOrCreateChat} = useContext(ChatContext);
  const { onlineUsers ,setMessages,setSelectedChatId} = useContext(SocketContext);
  const { loggedInUserInformation } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false); // ✅ New state for hover effect
  const loggedInUserId = loggedInUserInformation?._id;
  const otherUser = friend?.users?.find((user) => user._id !== loggedInUserId);
   
  // Check if `otherUser` is online
  const isOnline = onlineUsers.includes(otherUser?._id);
  
  const isMatch = otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  if (!isMatch) return null; // ❗ Prevent rendering non-matching friends
  // console.log('otheruser -> ', otherUser?.name);
 const handleSelectChat = async() => {
  
  const chatId=await fetchOrCreateChat(otherUser?._id)
  setSelectedFrndId(friend._id); // Highlight this friend
  console.log('chatId -> ', chatId);
  const messagesFromServer= await fetchAllMessages(chatId)
  console.log("messages From Server -> ", messagesFromServer);
  setSelectedChatId(chatId)
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
          src="/user.png"
          alt="User Image"
          style={{ borderRadius: '50%', width: '40px' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '1px',
            right: '0px',
            width: '11px',
            height: '11px',
            backgroundColor: isOnline ? 'green' : 'red', // ✅ Dynamic online status
            borderRadius: '100%',
            border: '2px solid white',
          }}
        ></span>
      </div>
      <div>
        <p style={{ margin: 0 ,fontWeight:'bold'}}>{otherUser?.name || 'Unknown User'}</p>
        <p style={{ margin: 0 }}>{friend?.latestMessage?.content || 'Empty'}</p>
        
      </div>
    </div>
  );
};

export default Friends;
