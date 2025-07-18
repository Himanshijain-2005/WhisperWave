

import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Routes, Route,Navigate } from 'react-router-dom';  // Import Routes and Route
import {Toaster} from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const{authUser} =useAuthContext();
  return <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>

      <Route path='/' element={ authUser ? <Home /> :<Navigate to= {"/login"} /> } />
      <Route path='/login' element={ authUser ? <Navigate to="/" /> : <Login />} />
      <Route path='/signup' element={ authUser ? <Navigate to="/" /> : <SignUp />} />

      </Routes>
      <Toaster />

  </div>;
}

export default App;



// to run frontend folder first change cd frontend folder and npm run dev 
// to run backend npm run server in root directory