
import React, { useRef } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [userCred,setUserCred]=useState({
    username:"",
    email:"",
    Password:"",
    PasswordAgain:""
  })
  const navigate = useNavigate();

  const handleClick = async(e)=>{
    console.log(userCred.username)
    console.log(userCred.email)
    console.log(userCred.Password)
    console.log(userCred.PasswordAgain)
    e.preventDefault();
    if(userCred.Password !== userCred.PasswordAgain){
      userCred.PasswordAgain.setCustomValidity("Password didn't match");
    }else{
      const user= {
        username:userCred.username,
        email:userCred.email,
        password:userCred.Password,
      };
      try {
        const res=await axios.post("http://localhost:8800/api/auth/register",user);
        navigate('/login');
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DanishSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on DanishSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" required onChange={(e)=>setUserCred({...userCred, username:e.target.value})} />
            <input placeholder="Email" className="loginInput" required onChange={(e)=>setUserCred({...userCred, email:e.target.value})} type="email"/>
            <input placeholder="Password" className="loginInput" required onChange={(e)=>setUserCred({...userCred, Password:e.target.value})} type="password"/>
            <input placeholder="Password Again" className="loginInput" required onChange={(e)=>setUserCred({...userCred, PasswordAgain:e.target.value})} type="password"/>
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login"><button className="loginRegisterButton">
              Log into Account
            </button></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register