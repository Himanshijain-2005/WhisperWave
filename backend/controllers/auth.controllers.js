
import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from '../utils/generateToken.js';
export const signup = async (req, res) => {
    console.log("signupuser");
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }
        //hash password here
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password: hashedpassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
        });
        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id,res);



            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ error: "invalid user data" });
        }
    }
    catch (error) {
        console.log("error in sigup", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}

export const login = async (req, res) => {
   // console.log("loginuser");
   try{
           const {username,password}=req.body;
           const user=await User.findOne({username});
           const isPasswordCorrect=await bcryptjs.compare(password,user?.password || "");

           if(!user || !isPasswordCorrect)
           {
            return res.status(400).json({error:"invalid username or password"});
           }

           generateTokenAndSetCookie(user._id,res);
           res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
           

   }
   catch(error)
   {
    console.log("error in login", error.message)
        res.status(500).json({ error:"internal server error" })
   }

}
export const logout = (req, res) => {
   // console.log("logout");
   try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: "logged out sucessfully" })


   }
   catch(error)
   {
    console.log("error in logout", error.message)
        res.status(500).json({ error: "internal server error" })

   }
}
