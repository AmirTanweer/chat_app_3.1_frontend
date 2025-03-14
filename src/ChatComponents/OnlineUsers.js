import React, { useContext } from 'react';
import SocketContext from '../context/Socket/SocketContext';

const OnlineUsers = () => {
  const { onlineUsers } = useContext(SocketContext);
  console.log("onlineUsers in sidebar: ",onlineUsers)
  return (
    <>
      {onlineUsers.map((user, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                width: '10px',
                height: '10px',
                backgroundColor: 'green',
                borderRadius: '50%',
                border: '2px solid white' 
              }}
            ></span>
          </div>
          <div>
            <p style={{ margin: 0 }}>{user.name}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default OnlineUsers;
