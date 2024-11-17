import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessagge = async (req, res) => {
    //  console.log("message sent",req.params.id);
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id; // because added in protectroute middleware
        let conversation = await Conversation.findOne(
            {
                participants: { $all: [senderId, recieverId] },
            }
        )
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],

            })
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        //  await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).send(newMessage);
    }
    catch (error) {
        console.log("error in message controller", error.message)
        res.status(500).json({ error: "internal server error" });
    }
}
export const getMessagge = async (req, res) => {
    try {
        const { id: userToChatid } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne(
            {
                participants: { $all: [senderId, userToChatid] },
            }
        ).populate("messages");
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);



    }
    catch (error) {
        onsole.log("error in getmessage controller", error.message)
        res.status(500).json({ error: "internal server error" });
    }
}