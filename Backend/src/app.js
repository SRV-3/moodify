const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

/*
*routes
*/
const authRoutes = require('./routes/auth.routes')

app.use("/api/auth", authRoutes)

module.exports = app