import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser} =useAuthContext()
   const logout=async()=>{
   setLoading(true);
   try {
        const res=await fetch("https://whisperwave-kvja.onrender.com/api/auth/logout",{
          method:"POST",
          credentials: "include", // ✅ Required for auth

           headers:{"Content-Type" :"application/json"},
        })
        const data=await res.json();
        if(data.error)
        {
          throw new Error(data.error)
        }
        //local stprage
        localStorage.removeItem("chat-user")
        //context
        setAuthUser(null)
   }
   catch(error)
   {
        toast.error(error.message)
   }
   finally{
    setLoading(false);
   }


  };
    
  return {loading,logout};
}

export default useLogout;
