const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})
const secret = process.env.SECRET

module.exports = function (req, res, next) {
    if(req.message === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            res.status(403).json({message: "User is not logged in"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({message: "User is not logged in"})
    }
}

