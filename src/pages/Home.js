import React, { useEffect, useContext } from 'react';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';
import SocketContext from '../context/Socket/SocketContext';
import AuthContext from '../context/Auth/AuthContext';
import ChatContext from '../context/Chat/ChatContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { connectSocket, setUserData } = useContext(SocketContext);
    const { token, getUserDetails, setToken } = useContext(AuthContext);
    const { getAllChats } = useContext(ChatContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');

        if (storedToken) {
            if (!token) {
                setToken(storedToken); // ✅ Update context token if missing
            }

            const autoLogin = async () => {
                try {
                    const userDetails = await getUserDetails();
                    await setUserData(userDetails);
                    await getAllChats(storedToken);
                    connectSocket(); // ✅ Connect socket after token and user data are set
                } catch (error) {
                    console.error('❌ Auto-login failed:', error);
                    navigate('/login');
                }
            };

            autoLogin();
        } else {
            navigate('/login'); // 🔒 Redirect if no token found
        }
    }, []); // ✅ Only runs once on initial render

    return (
        <div className="row">
            <div className="col-md-4 " style={{ minHeight: '600px' }}>
                <SideBar />
            </div>
            <div className="col-md-8" style={{ minHeight: '600px' }}>
                <Chat />
            </div>
        </div>
    );
};

export default Home;
