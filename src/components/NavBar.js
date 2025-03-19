import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
import SocketContext from '../context/Socket/SocketContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const {disconnectSocket,selectedChatId}= useContext(SocketContext);
 const {token,logOut}=useContext(AuthContext)
 console.log('selectedChatId in navbar-> ',selectedChatId)
 const handleLogOut=()=>{
    logOut()
    disconnectSocket()
 }
  return (
    
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/'}>Chat APP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {
          token?<>
              <li className="nav-item">
          <Link className="nav-link" to={'/user'}>User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/creategroup'>Create Group</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={handleLogOut} to='/login'>Logout</Link>
        </li>
          </>:
          <>
               <li className="nav-item">
          <Link className="nav-link" to={'/login'}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/signup'>Signup</Link>
        </li>
          </>
        }
        
       
        
      </ul>
    </div>
  </div>
</nav>
    
  )
}

export default NavBar