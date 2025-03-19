import React, { useContext,useEffect,useState } from 'react';
import OnlineUsers from '../ChatComponents/OnlineUsers';
import Groups from '../ChatComponents/Groups';
import Friends from '../ChatComponents/Friends';
import SocketContext from '../context/Socket/SocketContext';
import ChatContext from '../context/Chat/ChatContext';
import CreateGroup from '../pages/CreateGroup';
import AuthContext from '../context/Auth/AuthContext';

const SideBar = () => {
  const {getUsersWithoutChats,loggedInUserInformation}=useContext(AuthContext)
  const { allChatsOfUser } = useContext(ChatContext);
  const selectedChatIdInSocket = useContext(SocketContext).selectedChatId;
  const [searchQuery, setSearchQuery] = useState('');
  const [usersWithoutChats, setUsersWithoutChats] = useState([]);
  const friends = allChatsOfUser.filter((chat) => !chat.isGroupChat);
  const groups = allChatsOfUser.filter((chat) => chat.isGroupChat);
  

 
 

  const [selectedChatId, setSelectedChatId] = useState(null || selectedChatIdInSocket);
  
 // Corrected logic: Filter out logged-in user from the list
 const filteredUsersWithoutChats = usersWithoutChats.filter(
  (user) => user._id !== loggedInUserInformation._id
);
console.log('filteredUsersWithoutChats -> ',filteredUsersWithoutChats)
  console.log('selectedChatIdInSocket -> ',selectedChatIdInSocket);
useEffect(()=>{
  const getData=async()=>{
    const temp= await getUsersWithoutChats();
    setUsersWithoutChats(temp)
  }
  getData();
 
},[])
console.log('online users without chat with names in sidebar componenet -> ',usersWithoutChats);
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
      <div className='p-3'>
        <h3 >Users</h3>
        {
          filteredUsersWithoutChats.map((user,index) => (
            <OnlineUsers key={user?._id || index} user={user} isSelected={selectedChatId === user._id} setSelectedUserId={setSelectedChatId} searchQuery={searchQuery} />
          ))}
      </div>

      <div className="p-3">
       
            <h3>Friends</h3>
        {friends.map((friend) => (
          <Friends key={friend._id} searchQuery={searchQuery} friend={friend} isSelected={selectedChatId === friend._id} setSelectedFrndId={setSelectedChatId} />
        
        ))}
      </div>

      <div className="p-3">
        <h3>Groups</h3>
        {
          groups.map((group) => (
            <Groups key={group._id} searchQuery={searchQuery} group={group} isSelected={selectedChatId === group._id} setSelectedGroupId={setSelectedChatId} />
          ))
        }
        
      </div>
    </div>
  );
};

export default SideBar;
