
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import User from './pages/user/User';

function App() {
  const token=sessionStorage.getItem("Token")
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/User' element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
