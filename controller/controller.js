const express = require("express");
const User = require("../model/Users")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Posts = require("../model/Posts");

express().use(cookieParser())
const salt = bcrypt.genSaltSync(9);
const secret = "ghjft56ucvbkuyln8vcr6xsdtvygh";

const profile = async(req, res)=>{
    // res.json(req.cookie)
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info)
    })
}
const login = async(req, res)=>{
    const {username, password} = req.body;
    try {
        const userDoc = await User.findOne({username});
        if(!userDoc){
            return res.status(401).json({message: "No user with that email!"})
        }
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(!passOk){
            return res.status(401).json({message: "Password is invalid"})
        }
        
        jwt.sign({username, id : userDoc._id}, secret, {}, (err, token)=>{
            if(err)throw err;
            res.cookie('token', token).json("okay")
        })
        
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req, res)=>{
    res.cookie('token', '').json('ok')
}

const register = async(req, res)=>{
    const {username, password} = req.body;
    const existingUser = await User.findOne({username})
        if(existingUser){
            res.status(400).json({message: "username is already taken!"})
        }
   try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)});
        res.status(200).json(userDoc)
   } catch (error) {
        res.status(400).json(error)
   }
}
const dashboard = async(req, res)=>{
    const {username} = req.body
   try {
    const userDoc = await User.findOne({username : username});
    if(userDoc){
        res.status(200).json(userDoc)
    }else{
        alert("You don't have access to this page!!")
        res.redirect("/login")
    }
   } catch (error) {
    console.log(error);
   }
}



module.exports = {login,register,profile, dashboard}