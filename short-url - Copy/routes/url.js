const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURL,handleGetAnalytics,handleRedirectURL} = require("../controllers/url")


router.post("/",handleGenerateNewShortURL)

router.get("/analytic/:shortId",handleGetAnalytics)

router.get("/:shortId",handleRedirectURL)

module.exports = router;
