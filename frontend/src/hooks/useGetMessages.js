import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { sendMessagge } from '../../../backend/controllers/message.controller';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
               const res = await fetch(`https://whisperwave-kvja.onrender.com/api/message/get/${selectedConversation._id}`, {
               method: "GET",
               credentials: "include" // ✅ sends cookies like JWT
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data);

            }
            catch (error) {
                toast.error(error.message);

            }
            finally {
                setLoading(false);
            }

        }
        if (selectedConversation?._id )getMessages()
    }, [selectedConversation?._id, setMessages])
 return {messages,loading}
}

export default useGetMessages
