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
            await bcrypt.compare(user.password, getUser.password, (err, result) => {
                if(result){
                    const token = jwt.sign({id: getUser.id}, process.env.jwtSecret, {
                        expiresIn: 300
                    })
                    res.status(200).json({status:"success", message: "Login Successful", token: token, result: {username: getUser.username, avatar: getUser.avatar}})
                }else{
                    res.status(200).json({status:"failed", message: "Wrong Username or Password"})
                }
            })
        }else{
            res.status(200).json({status:"failed", message: "Wrong Username or Password"})
        }
    }catch(e){
        res.status(400).json({status:"failed", message: "Cannot authorize"})
    }
}

module.exports = { addUser, loginUser }