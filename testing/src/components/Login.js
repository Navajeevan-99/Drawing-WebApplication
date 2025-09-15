import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate=useNavigate();
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
   const changeemail=(e)=>{
        setemail(e.target.value);
    } 
    const changepassword=(e)=>{
        setpassword(e.target.value);
    }
    const gotosignup=()=>{
      navigate('/signup');
    }
    const gotostore=()=>{
      navigate(`/store/${email}`);
    }
  return (
    
    <div>
       <div className='center co'>
    <form className='loginform center'>
    <table>
        <tbody>
          <tr>
            <td>Email</td><td>:</td><td><input type='email' value={email} className='input' placeholder='Enter your email' onChange={changeemail}/></td>
        </tr>
        <tr>
            <td>Password</td><td>:</td><td ><input type='password' value={password} className='input' placeholder='Enter your password' onChange={changepassword}/></td>
        </tr>
        <tr>
            <td colSpan={3}><button className='signupbutton' onClick={gotostore}>Login</button></td><td></td><td></td>
        </tr>
        <tr>
            <td><div className='line'></div></td><td><div style={{marginTop:'50px',marginLeft:'10px',marginRight:'10px'}}>OR</div></td><td><div className='line'></div></td>
        </tr>
        <tr>
            <td colSpan={3}><button className='signupbutton' onClick={gotosignup}>Sign Up</button></td><td></td><td></td>
        </tr>
        </tbody>
    </table>
    </form>
    </div>
    
    </div>
  )
}

export default Login