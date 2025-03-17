import React, { useContext,useState } from 'react';
import SocketContext from '../context/Socket/SocketContext';

const OnlineUsers = ({user,isSelected,setSelectedUserId,searchQuery}) => {
  console.log('user ->',user)
  const [isHovered, setIsHovered] = useState(false);
  const isMatch = user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  if (!isMatch) return null; // ❗ Prevent rendering non-matching friends

  const handleSelectUser = async() => {
     
     setSelectedUserId(user?._id);
     
   }
  return (
    
      
    <div  onClick={handleSelectUser } 
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
       
      </div>
      <div>
        <p style={{ margin: 0 ,fontWeight:'bold'}}>{user?.name || 'Unknown User'}</p>
       
        
      </div>
    </div>
      
    
  );
}

export default OnlineUsers;
