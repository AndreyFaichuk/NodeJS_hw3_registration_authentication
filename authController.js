const User = require("./models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})

const secret = process.env.SECRET

const generateToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,secret,{expiresIn: "24h"})

}

class AuthController{
    async register(req, res) {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: "Registration error", errors})
            }
            const{first_name, last_name, email, password} = req.body
            const condidate = await User.findOne({email})

            if(condidate){
               return res.status(400).json({message: "User with this email is already exists"})
            } else {
                const hashPassword = bcrypt.hashSync(password, 10)

                const user = new User({
                    first_name,
                    last_name,
                    email,
                    password: hashPassword
                })

                await user.save()

                return res.json({message: "New user has been registered"})
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error", e})
        }
    }

    async login(req, res) {
        try{
            let {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                if(email === ""){
                    return res.status(400).json({message: "Email field is required!"})
                }
                return res.status(400).json({message: `User with email ${email} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword){
                if(password === ""){
                    return res.status(400).json({message: "Password field is required!"})
                }
                return res.status(400).json({message: "Wrong password"})
            }

            const token = generateToken(user._id, user.roles)
            return res.json({token, user})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async welcome(req, res) {
        try{
            res.json({message: "Hello registered user!!"})
        } catch (e) {
            console.log(e)
        }
    }

    async main(req, res) {
        try{
            res.json({message: "Hello user, this page is available to everyone!"})
        } catch (e) {
            console.log(e)
        }
    }

    // async logout(req, res) {
    //     try{
    //         let {email} = req.body
    //         console.log(req.body)
    //         const user =  await User.deleteOne({email})
    //         if(user.deletedCount){
    //             return res.status(200).json({message: "successfully logouted from account"})
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = new AuthController()