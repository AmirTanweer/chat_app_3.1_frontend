import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import User from './pages/User';
import CreateGroup from './pages/CreateGroup';
const App = () => {
  return (
   
    <Router>
      <NavBar/>
     <Routes>
     <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
       <Route path='/user' element={<User/>}/>
       <Route path='/creategroup' element={<CreateGroup/>}/>
     </Routes>
    </Router>
  )
}

export default App