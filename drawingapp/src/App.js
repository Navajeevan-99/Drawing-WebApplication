import logo from './logo.svg';
import './App.css';

import Landingpage from './components/Landingpage'
import { BrowserRouter as BR,Routes as RS,Route as R} from 'react-router-dom';
import { useState } from 'react';
import Draw from './components/Draw';
import Paint from './components/Paint';
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  
  return (
    
      <BR>
      <RS>
        <R path='/' element={<div className='pbackground'><Draw/></div>}/>
        <R path='/paint' element={<Paint/>}/>
        <R path='/signup' element={<Signup/>}/>
        <R path='/login' element={<Login/>}/>
        
        
      </RS> 
      </BR>
      
  );
}

export default App;
