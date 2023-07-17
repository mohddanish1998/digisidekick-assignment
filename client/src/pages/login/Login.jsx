import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const [response,setResponse]=useState("")
    const [login,setLogin]=useState({
            Email:"",
            Password:"",
        })

    const handleClick = async(e)=>{
        // console.log(login.Email)
        // console.log(login.Password)
        e.preventDefault();
          const user= {
            email:login.Email,
            password:login.Password
          };
          try {
            const response = await fetch('http://localhost:8800/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                // Handle successful login
                const data = await response.json();
                console.log(data);
                sessionStorage.setItem("Token",data.accessToken)
                sessionStorage.setItem("id",data._id)
                setResponse(data)
                navigate('/User');
                }
          } catch (error) {
            console.log(error)
          }
      }
  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>Danish</h3>
                <span className='loginDesc'>
                    Login Assignmnet
                </span>
            </div>
            <div className='loginRight'>
                <form className='loginBox' onSubmit={handleClick}>
                    <input placeholder='Email' type="Email" required onChange={(e)=>setLogin({...login, Email:e.target.value})} className='loginInput'/>
                    <input placeholder='Password' required onChange={(e)=>setLogin({...login, Password:e.target.value})}  type="password"  minLength="6" className='loginInput'/>
                    <button className='loginButton' type='submit'>
                        Login
                    </button>
                    <span className='loginForgot'>Forgot Password</span>
                    <button type='submit' className='loginRegisterButton'>
                        Register Here
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login