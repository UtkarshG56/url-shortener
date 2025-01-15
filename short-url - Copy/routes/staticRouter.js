const express = require("express");
const router = express.Router();
const URL = require("../models/url")

router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allURL = await URL.find({createdByUser : req.user._id})
    return res.render("home",{
        urls : allURL
    })
})

router.get("/signup",async (req,res)=>{
    return res.render("signup")
})

router.get("/login", async(req,res)=>{
    return res.render("login")
})

module.exports = router;