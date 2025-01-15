const express = require("express");
const app = express();
const {connectMongoDB} = require("./connection");
const cookieParser = require("cookie-parser")


const {restictToLoginUsersOnly,checkAuth} = require("./middlewares/auth")

const URL = require("./models/url");

const path = require("path");
const PORT = 8001;

const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRouter = require("./routes/user")

//connecting Database
connectMongoDB("mongodb://127.0.0.1:27017/learnDB").then(()=>{console.log("Connected To database")})

// Some Code for Using EJS
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// HANDLING MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//Routes
app.use("/",checkAuth,staticRoute)
app.use("/url",restictToLoginUsersOnly,urlRouter)
app.use("/user",userRouter)

app.listen(PORT,()=>{console.log("Server Started at PORT :", PORT)});

