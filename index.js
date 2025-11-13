import express from "express"
import http from "http"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import googleAuthRouter from "./routes/passport.js"

dotenv.config()
const app = express()

const server = http.createServer(app); 
app.use(express.json())
app.use(cookieParser())
app.use(session({
 secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/user",userRouter)
app.use("/api/googleAuth",googleAuthRouter)
mongoose.connect(process.env.DB_URL,{dbName:process.env.DB_NAME})
.then(()=>{
    const port = process.env.PORT || 5050;
    server.listen(port,()=>{
    console.log(`server run on port ${port}`)
    console.log("database connected")
})
}) .catch((err) => {
    console.log("❌ DB connection failed:", err.message);
  });
