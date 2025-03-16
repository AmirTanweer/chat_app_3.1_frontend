import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageContext from './MessageContext';
const BASE_URL = 'http://localhost:5000/';
const MessageState = ({ children }) => {
  const [authToken, setAuthToken] = useState('' || sessionStorage.getItem('token'));  // ✅ Ensure token is always available
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
const fetchAllMessages=async(chatId)=>{
  console.log('group id ->',chatId)
  setSelectedChatId(chatId);
  if(!authToken){
    console.log('❌ Token not found. Unable to fetch messages.');
    
  }
  try {
    
    
    const response = await axios.get(`${BASE_URL}api/message/allmessages/${chatId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken || sessionStorage.getItem('token')}`, // ✅ Correctly sending token
        },
    });
    console.log('✅ All messages between two person -> ', response.data);
    return response.data
   
} catch (error) {
    console.error("❌ Error fetching Messages :", error.response?.data || error.message);
}
}
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get('/api/messages');
  //       setMessages(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchMessages();
  // }, []);
 const sendMessageToDatabase=async(content)=>{
  if(!authToken){
    console.log('❌ Token not found. Unable to Send messages.');
    
  }
  try {
    const bodyRequest=
      {
        "chatId":selectedChatId,
        "content":content
      
      }
    
    
    const response = await axios.post(`${BASE_URL}api/message/sendmessage`,bodyRequest ,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken || sessionStorage.getItem('token')}`, // ✅ Correctly sending token
        },
    });
    console.log('✅ Message Send to Database -> ', response.data);
    return response.data
  
   
} catch (error) {
    console.error("❌ Error fetching Messages :", error.response?.data || error.message);
}
 }
  

  

  return (
    <MessageContext.Provider value={{sendMessageToDatabase, messages, selectedMessage,fetchAllMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageState;