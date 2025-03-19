import SocketContext from "./SocketContext";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import AuthContext from "../Auth/AuthContext";
import {useContext} from 'react'
const BASE_URL = "http://localhost:5000";

const SocketState = ({ children }) => {
  const {loggedInUserInformation}=useContext(AuthContext)
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  console.log('loggedInUserInformation -> ', loggedInUserInformation);
  const loggedInUserId = loggedInUserInformation?._id;
  const connectSocket = () => {
    console.log("userData -> ", userData);
    if (!userData._id || socket?.connected) return;
     console.log('userData inside connecSocket',userData)
    const newSocket = io(BASE_URL, {
      query: { userId: userData._id },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    newSocket.connect();
    setSocket(newSocket);
     
    // ✅ Join room when selectedChatId is set
    if (selectedChatId) {
      newSocket.emit("joinRoom", selectedChatId);
    }

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  //   newSocket.on("newMessage", (newMessage) => {
  //     console.log("newMessage -> ", newMessage);
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    
  // });
  newSocket.on("newMessage", (newMessage) => {
    const formattedMessage = {
      ...newMessage,
      sender: typeof newMessage.sender === 'object' 
        ? newMessage.sender 
        : { _id: newMessage.sender }  // Fallback for socket-emitted messages
    };
    setMessages((prevMessages) => [...prevMessages, formattedMessage]);
  });
  
  };
console.log('messages array ->',messages)
  const disconnectSocket = () => {
      if (socket?.connected) socket.disconnect();
    };
    console.log('onlineUsers -> ',onlineUsers)


  const sendMessage = (msg) => {
    console.log('msg -> ',msg)
    if (socket?.connected) {
      socket.emit("message", msg,loggedInUserId, selectedChatId);
    } else {
      console.error("Socket is not connected. Cannot send message.");
    }
  };
  
  useEffect(() => {
    if (userData._id) connectSocket();
    
  }, [userData]);

  useEffect(() => {
    return () => {
      if (socket?.connected) socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket?.connected && selectedChatId) {
        socket.emit("joinRoom", selectedChatId);
    }
}, [socket, selectedChatId]);

  return (
    <SocketContext.Provider
      value={{ connectSocket, setUserData, onlineUsers, sendMessage,disconnectSocket,messages,setMessages ,setSelectedChatId,selectedChatId}}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketState;
