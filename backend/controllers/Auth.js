import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    const match = await argon2.verify(user.password, req.body.password);
    if(user.status == "2") return res.status(400).json({msg: "User account locked!"})
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.role = user.role;
    req.session.userId = user.uuid;
    res.status(200).json(req.session.userId);
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please login to your account!"});
    }
    const user = await User.findOne({
        attributes:['uuid','firstname','lastname','username','password','email','role','status'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Can't logout"});
        res.status(200).json({msg: "Logout Success!"});
    });
}