const Router = require("express")
const router = new Router
const controller = require("./authController")
const {check} = require("express-validator")
const authMiddleWare = require("./middleware/authMiddleware")

router.post("/register",[
    check("first_name", "First name field is required!").notEmpty(),
    check("last_name", "Last name field is required!").notEmpty(),
    check("email", "Email field is required!").notEmpty(),
    check("password", "Password must be longer than 5 letters!").isLength({min: 5})
], controller.register)

router.post("/login", controller.login)
router.get("/welcome", authMiddleWare, controller.welcome)

module.exports = router

