import './App.css';
import Konvafirst from './components/Konvafirst';
import LandingPage from './components/LandingPage';
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter as Br,Routes as Rs,Route as R} from 'react-router-dom'
import Test from './components/Test';
import Adminpage from './components/Adminpage';
function App() {
  return (
    <>
    <Br>
    <Rs>
    <R path='/' element={<Konvafirst/>}/>
    <R path='/admin' element={<Adminpage/>}/>
    <R path='/login' element={<Login/>}/>
    <R path='/signup' element={<Signup/>}/>
    <R path='/land/:email' element={<LandingPage/>}/>
    </Rs>
    </Br>
    </>
  );
}

export default App;
