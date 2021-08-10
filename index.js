const express = require('express')
const controller = require("./authController")
const authRouter = require("./authRouter")
const mongoose = require("mongoose")

const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})

const URL_MONGO = process.env.URL_MONGODB
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.use("/auth", authRouter)

app.get("/main", controller.main)
// app.delete("/logout", controller.logout)

const start = async () => {
    try{
        await mongoose.connect(URL_MONGO, {useUnifiedTopology: true, useNewUrlParser: true}, () => console.log('Connect with MongoDB is ok'))
        app.listen(PORT, () => console.log('Server started on port: ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()

