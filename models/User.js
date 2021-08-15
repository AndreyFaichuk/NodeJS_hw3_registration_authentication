const {Schema, model} = require("mongoose")
const Role = require("./Role")

const User = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{type: String, ref: "Role"}]
}, {versionKey: false})

module.exports = model("User", User)