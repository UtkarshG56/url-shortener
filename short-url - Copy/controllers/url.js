const shortid = require("shortid")
const URL = require("../models/url")


async function handleGenerateNewShortURL(req,res){
    const body = req.body
    if(!body) {res.status(400).json({error:"body is empty"})}
    const result = await URL.create({
        shortId : shortid(),
        redirectURL : body.url,
        visitHistory : [],
        createdByUser : req.user._id
    })
    res.render("home", {id : result.shortId})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId})
    res.json({
        totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory
    }) 
}

async function handleRedirectURL (req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{$push : {visitHistory : { timestamp : Date.now()}}})
    res.redirect(entry.redirectURL)
}

module.exports = {handleGenerateNewShortURL, handleGetAnalytics , handleRedirectURL}