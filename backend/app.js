import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app= express();

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials:true,
    
// }))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import movieRouter from "./routes/movie.route.js"

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/movies",movieRouter)


export{app}