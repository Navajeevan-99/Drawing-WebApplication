import logo from './logo.svg';
import './App.css';

import Landingpage from './components/Landingpage'
import { BrowserRouter as BR,Routes as RS,Route as R} from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/Signup';
import Draw from './components/Draw';

function App() {
  
  return (
    
      <BR>
      <RS>
        <R path='/' element={<div className='pbackground'><Draw/></div>}/>
        <R path='/Signup' element={<div className='center'><Signup/></div>}/>
        <R path='/Landing/:name' element={<div className='center'><Landingpage/></div>}/>
      </RS>
      </BR>
      
  );
}

export default App;
