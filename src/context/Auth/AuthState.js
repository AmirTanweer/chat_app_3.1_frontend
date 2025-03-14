import AuthContext from "./AuthContext";
import { useState,useEffect } from "react";


import axios from 'axios'
const BASE_URL='http://localhost:5000/'
const AuthState=({children})=>{

const [token,setToken]=useState(sessionStorage.getItem('token') || '')
const [isUserLoggedIn,setIsUserLoggedIn]=useState(!!token)
const [loggedInUserInformation,setLoggedInUserInformation]=useState({})
    const Login=async(credentials)=>{
        try {
            const response = await axios.post(`${BASE_URL}api/auth/login`, {
              email: credentials.email,
              password: credentials.password,
            });
            console.log('token -> ',response.data.token)
            setIsUserLoggedIn(true);
            setToken(response.data.token)
            return {success:true,token:response.data.token}

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Login failed" };
            return null
          }
    }
    const SignUp=async(credentials)=>{
        try {
            const response = await axios.post(`${BASE_URL}api/auth/register`, {
                name:credentials.name,
              email: credentials.email,
              password: credentials.password,
            });
            console.log('response -> ',response.data)
        //    await getUserDetails()
            return {success:true}

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "SignUp failed" };
            return null;
          }
    }
    const getUserDetails=async()=>{
        let storedToken=sessionStorage.getItem('token');

        if (!storedToken) {
            console.warn("⚠️ No token found for fetching user details.");
            return null;
        }
        try {
            console.log("🟢 Fetching user details with token:", storedToken); // Debugging
            const response = await axios.get(`${BASE_URL}api/auth/getuserdetails`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            });
            
            console.log("✅ User details received:", response.data.user);
            setLoggedInUserInformation(response.data.user)
            return response.data.user
          } catch (error) {
            console.error("❌ Error fetching user details:", error.response?.data || error.message);
            return null;
          }
    }
    const logOut=async()=>{
        setIsUserLoggedIn(false);
        setToken('')
        sessionStorage.removeItem('token')
        
    }
  return(  <AuthContext.Provider value={{Login,SignUp,getUserDetails,token,logOut,loggedInUserInformation}}>
    {children}
    </AuthContext.Provider>
  )
}
export default AuthState