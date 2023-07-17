import React from 'react'
import { useState } from 'react'
import "./userList.css"
const UserList = ({name, email,id, deleteUser,updateUser}) => {
const [toggle, setToggle]=useState("")
const [body,setBody]=useState({
    username:"",
    email:"",
    password:""
})
  return (
    <div className='userList-container'>
        <div className='user'>
            <h1 className='name'>Name :{name}</h1>
            <h1 className='email'>Email :{email}</h1>
            <div className='btn'>
                <a href={'?id='+id} onClick={()=>deleteUser(id)}><button className='btn1'>Delete</button></a>
                <button onClick={()=>setToggle(!toggle)} className="btn2">Update</button>
            </div>
            {toggle && <div className='updateInput'>
                <input className='input1' onChange={(e)=>setBody({...body, username:e.target.value})} type="input" placeholder='change Name'/><br/>
                <input className='input2' onChange={(e)=>setBody({...body, email:e.target.value})} type="input" placeholder='change email'/><br/>
                <input className='input3' onChange={(e)=>setBody({...body, password:e.target.value})}type="input" placeholder='write password'/><br/>
                <button onClick={()=>updateUser(id, body)} className='updateBtn'>Update</button>
            </div>}
        </div>
    </div>
  )
}

export default UserList