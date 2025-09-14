import { useState } from 'react';
import './Signup.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup=()=>{
    let re='red';
    let navigate=useNavigate();
    let [name,setname]=useState('');
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    const changeName=(e)=>{
        setname(e.target.value);
    }
    const changeEmail=(e)=>{
        setemail(e.target.value);
    }
    const changePassword=(e)=>{
        setpassword(e.target.value);
    }
    const Loginclick=()=>{
        axios.post('http://http://localhost:7000/form')
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err))
        navigate(`/Landing/${name}`);
        alert('Login successfully');

    }
return(
    <>
    <div className="loginborder">
        <form className='centerparentcolumn form'>
            <table className='table'>
                <tbody>
                    <tr>
                        <td style={{backgroundColor:re,color:'white'}}>Name</td><td>:</td><td><input type='text' value={name} onChange={changeName}/></td>
                    </tr>
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
        <button onClick={Loginclick}>Signup</button>
        </div>
    </div>
    </>
)

}
export default Signup;