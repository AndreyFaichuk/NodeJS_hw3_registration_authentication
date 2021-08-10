const {Auth_Reg} = require("./mongoSettings")

const bcrypt = require('bcrypt')
const saltRounds = 10

async function addNewUser (body) {
    return (async () => {

       const hash = await bcrypt.hash(body.password, saltRounds)

        body.password = hash

        const newUser = new Auth_Reg(body)

        await newUser.save().then(user => console.log(user))

        return newUser
    })()
}

async function logUser (body) {
    let emailError = "wrong email"
    let passwordError = "wrong password"
    return (async () => {

       return  Auth_Reg.find({email: body.email}).then(async (user) => {
           if(user[0] !== undefined){
               const compare = await bcrypt.compare(body.password, user[0].password)

               if(compare){
                   return user[0]
               } return passwordError
           } else {
               return emailError
           }

        })
    })()
}


module.exports = {addNewUser, logUser}