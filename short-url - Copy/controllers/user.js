const User = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../serives/auth")

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    console.log(name,email,password)
    const result = await User.create({
        name,
        email,
        password
    })
    res.render("login",{
        msg : "new signup"
    })
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    let user = await User.findOne({email,password})
    if(!user){return res.render("login",{
        loginError : "Password or Email is Invalid"
    })}
    // const sessionId = uuidv4(); // used for stateful authentication
    const token = setUser(user)
    res.cookie("uid",token)
    res.redirect("/")
}

module.exports = {handleUserSignup,handleUserLogin};