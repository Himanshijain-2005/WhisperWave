import { set } from 'mongoose';
import React from 'react';
import { useState } from 'react';
import {IoSearchSharp} from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch]=useState("");
  const {setSelectedConversation}= useConversation();  
  const {conversations}=useGetConversations();
  const handleSubmit=(e)=> {
        e.preventDefault();
        if(!search)
        {
          return;
        }
        if(search.length<3)
        {
          toast.error("search muat be 3 characters long")
        }

        const conversation=conversations.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));
        if(conversation)
        {
          setSelectedConversation(conversation);
          setSearch('');
        }
        else{
          toast.error("no such user found");
        }
  }
  return (
    <form  onSubmit={handleSubmit} className="flex items-center gap-2">
       <input type="text" placeholder="search.." className='input input-bordered rounded-full'
        value={search} onChange={(e)=> setSearch(e.target.value)} /> 
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none' />

        </button>
    </form>
  )
}

export default SearchInput


//import React from 'react';
//import {IoSearchSharp} from "react-icons/io5";
//onSubmit=(handleSubmit)
//const SearchInput = () => {
 /* return (
    <form class>
        <input type="text" placeholder="search.." className='input input-bordered rounded-full' /> 
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none' />

        </button>
    </form>
  )
}

export default SearchInput*/