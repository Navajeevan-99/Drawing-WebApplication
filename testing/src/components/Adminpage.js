import { useEffect,useState } from "react"
import React from 'react'
import './AdminPage.css'
import { MdEdit } from "react-icons/md";

const Adminpage = (props) => {
  const [users,setusers]=useState([])
  const [isediting,setisediting]=useState(null)
  const [newname,setnewname]=useState('');
  const [newuser,setnewuser]=useState({name:'',email:'',password:''})
  const [isadduser,setisadduser]=useState(false)
  useEffect(()=>{
    fetch('http://localhost:3003/api/admin',{method:'GET',headers:{
                        'Content-Type': 'application/json'
                    }})
    .then(res=> res.json())
    .then(json=>{
      setusers(json);
    
    })
  }
  )
  const deleteuser= async(e,name)=>{
    await fetch('http://localhost:3003/api/admin',{method: 'PATCH',headers:{
                        'Content-Type': 'application/json'
                    },body : JSON.stringify({name})})
  }
  const changeusername=async (e,name,i)=>{
    if (isediting==null){
    setisediting(i)
    console.log(i)}
    else if(isediting===i){
      setisediting(null);
    }
    else{
      setisediting(i)
    }

  }
  const update=(e)=>{
    setnewname(e.target.value)
  }
  const changename=async (e,name)=>{
    await fetch('http://localhost:3003/api/user',{method: 'PUT',headers:{
                        'Content-Type': 'application/json'
                    }, body:JSON.stringify({name: name,newname: newname})})
      setisediting(null);
   

  }
  
  return (
    <div className="adminpage">
      <div className="admin">
        <h1>
          Admin
        </h1>
        <table className="atable">
          <thead>
            <tr>
              <td className="cn">S.No</td>
              <td className="cn">Name</td><td className="cn">Email</td><td className="cn">Operations</td>
              <td className="cn">Update</td>
            </tr>
          </thead>
          <tbody>
            {
          users.map((user,i)=>(
            <tr key={i}>
              <td className="cn">{i+1}</td>
              <td className="cn">{user.name}</td><td className="cn">{user.email}</td><td className="cn"><button onClick={(e)=>{
                deleteuser(e,user.name)
              }}>-</button><button onClick={(e)=>{
                changeusername(e,user.name,i);
              }}><MdEdit/></button>
              </td>
              <td className="cn">{isediting===i?(<div><input type="text" onChange={update}></input>
              <button onClick={(e)=>{
                changename(e,user.name);
              }}>change</button>
              </div>):(<p></p>)}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div>
          <button onClick={(e)=>{
            setisadduser(true);
                
              }}>Add user</button>
          {isadduser && 
          <table className="newusertable">
            <tbody>
              <tr>
                <td>Name</td><td>:</td><td><input value={newuser.name} onChange={(e)=>{
                  setnewuser({...newuser,name: e.target.value})
                }}></input></td>
              </tr>
              
              <tr>
                <td>Email</td><td>:</td><td><input type='email' value={newuser.email} onChange={(e)=>{
                  setnewuser({...newuser,email: e.target.value})
                }}></input></td>
              </tr>
              <tr>
                <td>Password</td><td>:</td><td><input type='password' value={newuser.password} onChange={(e)=>{
                  setnewuser({...newuser,password: e.target.value})
                }}></input></td>
              </tr>
              <tr>
                <td></td><td></td><td><button onClick={ async ()=>{
                const res=await fetch('http://localhost:3003/api/user',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: newuser.name,email: newuser.email,password: newuser.password})
                })
                const data=await res.json();
            if (data.err){
                alert(data.err);
                
            }
            else{
                alert(data.user+' is created')
                setisadduser(false)
            }
            
            }}>Add</button></td>
              </tr>
            </tbody>
          </table>
          }
        </div>

      </div>

    </div>
  )
}

export default Adminpage