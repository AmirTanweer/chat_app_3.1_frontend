import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";
import ChatContext from "./ChatContext";

const BASE_URL = 'http://localhost:5000/';

const ChatState = ({ children }) => {
    
    
    const [allChatsOfUser, setAllChatsOffUser] = useState([]);
    const [authToken, setAuthToken] = useState('' || sessionStorage.getItem('token'));  // ✅ Ensure token is always available
    

    

    const getAllChats = async (token) => {
        console.log('authToken -> ',authToken)
        if (!token) {
            console.error('❌ Token not found. Unable to fetch chats.');
            return;
        }
        setAuthToken(token);
        try {
            console.log("🟢 Fetching user chats with token:", token); // Debugging
            const response = await axios.get(`${BASE_URL}api/chat`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ Correctly sending token
                },
            });
            console.log('✅ All chats -> ', response.data);
            setAllChatsOffUser(response.data);
        } catch (error) {
            console.error("❌ Error fetching chat details:", error.response?.data || error.message);
        }
    };

    const fetchOrCreateChat=async(otheruserId)=>{
        if (!authToken) {
            console.error('❌ authToken not found. Unable to fetch chats.');
            return;
        }
        
        try {
            console.log("🟢 Fetch single chats with token:", authToken); // Debugging
            const bodyRequest={
                'userId':otheruserId
            }
            const response = await axios.post(`${BASE_URL}api/chat`,bodyRequest, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // ✅ Correctly sending token
                },
            });

            console.log('✅ chat between two user -> ', response.data);
            return response.data._id
            
           
        } catch (error) {
            console.error("❌ Error fetching chat details:", error.response?.data || error.message);
        }
    }

    

    return (
        <ChatContext.Provider value={{ getAllChats,setAuthToken ,allChatsOfUser,fetchOrCreateChat}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatState;
