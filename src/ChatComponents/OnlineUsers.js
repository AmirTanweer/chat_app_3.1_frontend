import React, { useContext, useState } from 'react';
import SocketContext from '../context/Socket/SocketContext';
import ChatContext from '../context/Chat/ChatContext';
const OnlineUsers = ({ user, isSelected, setSelectedUserId, searchQuery,usersWithoutChats, setUsersWithoutChats ,setSelectedChatInOnlineUsers }) => {
  const {fetchOrCreateChat}=useContext(ChatContext);
  const [isHovered, setIsHovered] = useState(false);
  const isMatch = user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  const modalId = `userModal-${user?._id}`; // Ensures unique modal IDs

  if (!isMatch) return null;

  
  const handleStartChat=()=>{
   
    usersWithoutChats.filter((u)=>u._id===user._id).map((u)=>setUsersWithoutChats(usersWithoutChats.filter((u1)=>u1._id!==u._id)))
    
    fetchOrCreateChat(user?._id)
    

    console.log('start chat clicked');
  }

  return (
    <>
      <div
        
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="my-3 p-2"
        style={{
          backgroundColor: isSelected || isHovered ? '#e3f2fd' : 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease-in-out',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src="/user.png"
            alt="User"
            style={{ borderRadius: '50%', width: '40px' }}
          />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {user?.name || 'Unknown User'}
          </p>
        </div>

        {/* Modal Trigger Button */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
          style={{ marginLeft: 'auto' }} // Align button to the right
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`${modalId}-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`${modalId}-label`}
              >
                User Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Username:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Status:</strong> {user?.status || 'Offline'}</p>
              <p>Are you sure you want to start a chat with this user?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={handleStartChat}>
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineUsers;
