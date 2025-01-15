const {getUser} = require("../serives/auth")
const express = require("express")
const app = express()


async function restictToLoginUsersOnly(req,res,next){
    const userUid = req.cookies?.uid
    if(!userUid){return res.redirect("/login")}
    
    const user = getUser(userUid)
    if(!user){return res.redirect("/login")}

    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid
    const user = getUser(userUid)
    req.user = user;
    next();
}

module.exports = {restictToLoginUsersOnly,checkAuth}