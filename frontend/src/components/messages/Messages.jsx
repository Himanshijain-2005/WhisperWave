import React, { useEffect,useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkelton from '../skeltons/MessageSkelton';

const Messages = () => {
   const {messages,loading}=useGetMessages();
  console.log("messages:",messages);
  const lastMessageRef=useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.curent?.scrollIntoView({behavoiur:"smooth"});

    },100);
  },[messages]);
  return (
    <div className='px-4 flex-1 overflow-auto h-64'>
        {
          !loading && messages.length>0 && messages.map((message)=>(
            (
              <div key={message._id} ref={lastMessageRef}>

                <Message message={message} />
                </div>
            )
          ))
        }
           {loading && [...Array(3)].map((_,idx) => <MessageSkelton key={idx} />)}
           {
            !loading && messages.length ===0 && (
              <p className='text-center'>send a message to start conversation</p>
            )
           }

      
    </div>
  );
}

export default Messages
