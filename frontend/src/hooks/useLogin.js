import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser} =useAuthContext();

   const login=async(username, password)=>{
    const success= handleInputErrors({username,password});
    if(!success)
        {
         return;
        }
   setLoading(true);
   try {
        const res=await fetch("https://whisperwave-kvja.onrender.com/api/auth/login",{
          method:"POST",
          headers:{"Content-Type" :"application/json"},
          credentials: "include", // ✅ THIS IS THE FIX

          body:JSON.stringify({username,password})
        })
        const data=await res.json();
        if(data.error)
        {
          throw new Error(data.error)
        }
        //local stprage
        //context
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);

   }
   catch(error)
   {
        toast.error(error.message)
   }
   finally{
    setLoading(false);
   }


  };
    
  return {loading,login};
}

export default useLogin;


function handleInputErrors({username,password})
{
  if( !username || !password )
  {
    toast.error('please fill in all fields')
    return false;
  }
  
  return true;
}
