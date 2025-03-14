import React, { useContext,useState } from 'react';
import OnlineUsers from '../ChatComponents/OnlineUsers';
import Groups from '../ChatComponents/Groups';
import Friends from '../ChatComponents/Friends';
import SocketContext from '../context/Socket/SocketContext';
import ChatContext from '../context/Chat/ChatContext';

const SideBar = () => {
  const { allChatsOfUser } = useContext(ChatContext);
  const { onlineUsers } = useContext(SocketContext);
  const [searchQuery, setSearchQuery] = useState('');

  const friends = allChatsOfUser.filter((chat) => !chat.isGroupChat);
  const groups = allChatsOfUser.filter((chat) => chat.isGroupChat);
  
  const [selectedChatId, setSelectedChatId] = useState(null);
  return (
    <div 
      className="sidebar-container" 
      style={{
        maxHeight: '100vh', // Full viewport height
        overflowY: 'auto',  // Enables vertical scrolling
        borderRight: '2px solid #ddd', // Optional: for better visual separation
        padding: '10px'    // Add spacing
      }}
    >
      <div className="p-3">
      <div className="input-group mb-3">
  <input onChange={(e) => setSearchQuery(e.target.value)} type="text" value={searchQuery} className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
 
</div>
      </div>

      <div className="p-3">
        <h3>Friends</h3>
        {friends.map((friend) => (
          <Friends key={friend._id} searchQuery={searchQuery} friend={friend} isSelected={selectedChatId === friend._id} setSelectedFrndId={setSelectedChatId} />
        ))}
      </div>

      <div className="p-3">
        <h3>Groups</h3>
        <Groups />
      </div>
    </div>
  );
};

export default SideBar;
