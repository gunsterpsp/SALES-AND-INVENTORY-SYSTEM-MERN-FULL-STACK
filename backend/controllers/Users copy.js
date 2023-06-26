import User from "../models/UserModel.js";
import argon2 from "argon2";
import {Op} from "sequelize";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','firstname','lastname','username','password','email','role','status'],
            order: [
                ['id', 'DESC']
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','firstname','lastname','username','password','email','role','status'],
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUsersBySearch = async(req, res) =>{


    try {

        const search = req.params.search;
        let userSearch = [{ firstname: { [Op.substring]: `${search}`} }, 
        { lastname: { [Op.substring]: `${search}`} }, { username: { [Op.substring]: `${search}`} }, 
        { email: { [Op.substring]: `${search}`} }, { role: { [Op.substring]: `${search}`} }];
        const response = await User.findAll({
            attributes:['uuid','firstname','lastname','username','password','email','role','status'],
            where: {
                [Op.or]: userSearch
                // [Op.or]: { [Op.substring]: `${search}`},
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {firstname, lastname, username, password, confPassword, email, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password did not match!"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashPassword,
            email: email,
            role: role,
            status: "1"
        });
        res.status(201).json({msg: "Register Success!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.uuid
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    const {firstname, lastname, username, password, confPassword, email, role, status} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashPassword,
            email: email,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.uuid
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    try {
        await User.destroy({
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const activeUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.uuid
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    try {
        await User.update({
            status: 1
        },{
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "User Activate!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const lockUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.uuid
        }
    });
    if(!user) return res.status(404).json({msg: "User not found!"});
    try {
        await User.update({
            status: 0
        },{
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "User Locked!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}