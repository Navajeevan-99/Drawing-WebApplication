import React, { useState } from 'react'
import './Signup.css'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    let [emailarray,setemailarray]=useState([])
    let [passwordarray,setpasswordarray]=useState([])
    let navigate=useNavigate();
    let [name,setname]=useState('');
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    const changename=(e)=>{
        setname(e.target.value);
    }
    const changeemail=(e)=>{
        setemail(e.target.value);
    } 
    const changepassword=(e)=>{
        setpassword(e.target.value);
    }
    const gotologin=()=>{
        navigate('/login');
    }
    
  return (
    <div className='center co'>
    <form className='signupform center'>
    <table>
        <tbody>
        <tr>
            <td>Name</td><td>:</td><td><input type='text' value={name} className='input' placeholder='Enter your name' onChange={changename}/></td>
        </tr>
        <tr>
            <td>DOB</td><td>:</td><td><input type='date' className='input'/></td>
        </tr>
        <tr>
            <td>Email</td><td>:</td><td><input type='email' value={email} className='input' placeholder='Enter your email' onChange={changeemail}/></td>
        </tr>
        <tr>
            <td>Password</td><td>:</td><td ><input type='password' value={password} className='input' placeholder='Enter your password' onChange={changepassword}/></td>
        </tr>
        <tr>
            <td colSpan={3}><button className='signupbutton' onClick={()=>{
                gotologin();

            }}>Sign Up</button></td><td></td><td></td>
        </tr>
        <tr>
            <td><div className='line'></div></td><td><div style={{marginTop:'50px',marginLeft:'10px',marginRight:'10px'}}>OR</div></td><td><div className='line'></div></td>
        </tr>
        <tr>
            <td colSpan={3}><button className='signupbutton' onClick={gotologin}>Login</button></td><td></td><td></td>
        </tr>
        </tbody>
    </table>
    </form>
    </div>
  )
}

export default Signup