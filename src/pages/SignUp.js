import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import SocketContext from '../context/Socket/SocketContext';
import AuthContext from '../context/Auth/AuthContext';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const {SignUp}=useContext(AuthContext);
  const {setUserData}=useContext(SocketContext)
  const navigate=useNavigate();
  const [input,setInput]=useState({name:'',email:'',password:''})
  const handleChange=(e)=>{
    setInput((prevInput)=>({
      ...prevInput,[e.target.name]:e.target.value
    }))
    
  }
  const handleSignUp=async(e)=>{
    e.preventDefault()
      const res=await SignUp(input)
      if(res?.success){
        navigate('/login')
        console.log('SingedUp Successfully')
      }
        else {console.log('Signup Failed')}
       
  }
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">SignUp</p>

                   

                    <form className="mx-1 mx-md-4" onSubmit={handleSignUp}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            onChange={handleChange}
                            value={input.name}
                            name="name"
                            required
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            onChange={handleChange}
                            value={input.email}
                            name="email"
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            value={input.password}
                            name="password"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label">
                          Already have a Account? <Link to="/login">Login</Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" >
                          SignUp
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp