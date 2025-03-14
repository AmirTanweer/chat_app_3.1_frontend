import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthState from './context/Auth/AuthState';
import SocketState from './context/Socket/SocketState';
import ChatState from './context/Chat/ChatState';
import MessageState from './context/Message/MessageState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthState>
<SocketState>
<ChatState>
  <MessageState>


  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </MessageState>
</ChatState>
</SocketState>
  </AuthState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
