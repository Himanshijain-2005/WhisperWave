import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading,setLoading]=useState(false);
  const  {setAuthUser}=useAuthContext();
  const signup=async({fullname, username , password ,confirmPassword ,gender} )=>{
   const success= handleInputErrors({fullname,username,password,confirmPassword,gender})
   if(!success)
   {
    return;
   }
   setLoading(true);
   try {
        const res=await fetch("https://whisperwave-kvja.onrender.com/api/auth/signup",{
          method:"POST",
          headers:{"Content-Type" :"application/json"},
          credentials: "include", // ✅ Required for auth

          body: JSON.stringify({fullname,username,password,confirmPassword,gender})
        })
        const data=await res.json();
        console.log(data);
        if(data.error)
        {
          throw new Error(data.error)
        }
        //local stprage
        localStorage.setItem("chat-user",JSON.stringify(data))
        //context
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
    
  return {loading,signup};
}
export default useSignup
function handleInputErrors({fullname,username,password,confirmPassword,gender})
{
  if(!fullname || !username || !password || !confirmPassword || !gender)
  {
    toast.error('please fill in all fields')
    return false;
  }
  if(password!=confirmPassword)
  {
    toast.error("password not correct")
    return false;
  }
  if(password.length<6)
  {
    toast.error('password must be atleast 6 charcters long')
    return false;
  }
  return true;
}
