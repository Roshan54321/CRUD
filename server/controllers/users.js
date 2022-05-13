const usersModel = require('../DataModel/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const addUser = async (req, res) => {
    let newUser = req.body
    const user = await usersModel.findOne({username : newUser.username})
    try{
        if(user)
        {
            res.status(200).json({status:"failed", message : "An user already exists with that username"})
        }else{
            const hashed = await bcrypt.hash(newUser.password, 10)
            const registeredUser = new usersModel({...newUser, password: hashed})
            await registeredUser.save()
            res.status(201).json({status:"success", message : "User created"})
        }
    }catch(e){
        res.status(400).json({status:"failed", message : e.message})
    }
}

const loginUser = async (req, res) => {
    const user = req.body
    const getUser = await usersModel.findOne({username : user.username})
    try{
        if(getUser){
            bcrypt.compare(user.password, getUser.password, (err, result) => {
                if(result){
                    const token = jwt.sign({id: getUser.id}, process.env.jwtSecret, {
                        expiresIn: 300
                    })
                    res.status(200).json({auth:true, message: "Login Successful", token: token, result: {username: getUser.username, avatar: getUser.avatar}})
                }else{
                    res.status(200).json({auth:false, message: "Invalid Username or Password"})
                }
            })
        }else{
            res.status(200).json({auth:false, message: "Invalid Username or Password"})
        }
    }catch(e){
        res.status(400).json({auth:false, message: "Cannot authorize due to some error"})
    }
}

const authUser = (req, res) => {
    const token = req.headers["x-access-token"]
    try{
        if(token){
            jwt.verify(token, process.env.jwtSecret, (e, decoded) => {
                if(e){
                    res.json({auth:false, message:"Token is expired"})
                }else{
                    const user = usersModel.findOne({id: decoded.id})
                    const result = {username: user.username, avatar: user.avatar} 
                    res.json({auth:true, result})
                }
            })
        }else{
            res.json({auth:false, message:"You failed to authenticate"})
        }
    }catch(e){
        const user = usersModel.findOne({id: decoded.id})
        res.json({auth:false, message:"Authentication could not be done successfully"})
    }
}

module.exports = { addUser, loginUser, authUser }