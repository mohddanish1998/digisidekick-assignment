import React, { useEffect } from 'react'
import { useState } from 'react'
import UserList from "../userList/UserList"
import "./user.css"

const User = () => {
    const [userData, setUserData]=useState([]);
    useEffect(() => {
        if(sessionStorage.getItem("Token")){
            const fetchAllUser=async()=>{
                console.log("first")
                const token=sessionStorage.getItem('Token');
                console.log(token)
                try {
                    const response = await fetch('http://localhost:8800/api/user/all', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjRlYmI3YzVkYWYxNzM1N2ZiZWJlMyIsImlhdCI6MTY4OTU4NzM4OCwiZXhwIjoxNjg5ODQ2NTg4fQ.XLAekrW6-fvIe7-YAcd2Qyms_xkKCeJzlVkLmfu_2Sc',
                        },
                    })
                    if (response.ok) {
                        // Handle successful login
                        const data = await response.json();
                        console.log(data);
                        setUserData(data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchAllUser()
        }
        },[])

        async function deleteUser(id){
            const token=sessionStorage.getItem('Token');
                console.log(token)
            try {
                const response = await fetch('http://localhost:8800/api/user/delete/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    // Handle successful login
                    const data = await response.json();
                    console.log(data);
                    }
            } catch (error) {
                    console.log(error)
                }
            }

            async function updateUser(id,body){
                console.log(id,body)
                try {
                    const user= {
                        id:id,
                        username:body.username,
                        email:body.email,
                        password:body.password
                      };
                    const response = await fetch('http://localhost:8800/api/user/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    })
                    if (response.ok) {
                        // Handle successful login
                        const data = await response.json();
                        console.log(data);
                        window.location.reload();
                        }
                } catch (error) {
                        console.log(error)
                    }
                }
  return (
    <div className='main-container'>
        {
            userData.map((item,)=>{
                return <UserList key={item._id} updateUser={updateUser} deleteUser={deleteUser} id={item._id} name={item.username} email={item.email}/>
            })
        }
    </div>
  )
}

export default User