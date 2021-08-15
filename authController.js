const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})

const secret = process.env.SECRET

const generateToken = (_id, roles) =>{
    const payload = {
        _id,
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
            const {first_name, last_name, email, password, roles} = req.body
            const condidate = await User.findOne({email})

            if(condidate){
               return res.status(400).json({message: "User with this email is already exists"})
            } else {
                const hashPassword = bcrypt.hashSync(password, 10)
                const userRoleFromDB = await Role.findOne({value: roles[0]})


                const user = new User({
                    first_name,
                    last_name,
                    email,
                    password: hashPassword,
                    roles:[userRoleFromDB.value]
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

    async admin(req, res) {
        try{
            const token = req.headers.authorization.split(" ")[1]
            const {_id, roles} = jwt.verify(token, secret)

            if(roles[0] === "ADMIN"){
                const users = await User.find({_id: {$ne: _id}, roles: {$nin : ["ADMIN", "SUPER_ADMIN"]}})

                res.json(users)
            }

            if(roles[0] === "SUPER_ADMIN"){
                const users = await User.find({_id: {$ne: _id}, roles: {$ne: "SUPER_ADMIN"} })

                res.json(users)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(req, res) {
        try{
            const {userId} = req.params

            const user = await User.deleteOne({_id: userId})
            if (!user) {
                res.status(404).json({message: 'User not found'})
                return
            }
            return res.status(200).json({message: "User has been deleted"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()