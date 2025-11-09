import { useState } from 'react';
import './Login.css'
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    navigate=useNavigate()
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    let re='red';
    const changeEmail=(e)=>{
        setemail(e.target.value);
    }
    const changePassword=(e)=>{
        setpassword(e.target.value);
    }
    const Loginclick=()=>{
       
        navigate(`/Landing/`);
        alert('Login successfully');

    }
return(
    <>
    <div className="loginborder">
        <form className='centerparentcolumn form'>
            <table className='table' style={{color:{re}}}>
                <tbody>
                   
                    <tr>
                        <td>Email</td><td>:</td><td><input type='email' value={email} onChange={changeEmail}/></td>
                    </tr>
                    <tr>
                        <td>password</td><td>:</td><td><input type='password' value={password} onChange={changePassword}/></td>
                    </tr>
                    <tr>
                        <td></td><td></td><td className='buttoncolumn'></td>
                    </tr>
                </tbody>
            </table>
        </form>
        <div className='centerparentrow'>
        <button onClick={Loginclick}>Login</button>
        </div>
    </div>
    </>
)

}
export default Login;