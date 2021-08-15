import React, {useState} from "react"
import axios from "axios";

const LoginForm = (props) => {
    const [buttonStyle, setButtonStyle] = useState("buttonRegister")
    const [messageOk, setMessageOk] = useState()
    const [messageError, setMessageError] = useState()
    const [inputStyle, setInputStyle] = useState()


    const cleaner = () => {
        setMessageOk()
        setMessageError()
        setInputStyle()
        setButtonStyle("buttonRegister")
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        const {email, password} = e.target.elements

        const user = {
            email: email.value,
            password: password.value
        }

        axios.post('http://localhost:3000/auth/login', user)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_email', response.data.user.email)
                localStorage.setItem('user_role', response.data.user.roles[0])

                setButtonStyle("buttonRegister green")
                setInputStyle("green")
                setTimeout(cleaner, 2000)

                email.value = ''
                password.value = ''

                setMessageOk("You have been you have successfully logged into your account")

                props.check(() => false)

            })
            .catch(error => {
                setInputStyle("red")
                setMessageError(error.response.data.message)
                setButtonStyle("buttonRegister red")
                setTimeout(cleaner, 2000)
            })
    }

    return(
        <>
        <form action="" className="forma" onSubmit={handleSubmitLogin}>
            <h1>Login</h1>
            <input name="email" type="text" placeholder="enter email" className={inputStyle}/>
            <input name="password" type="password" placeholder="enter password" className={inputStyle}/>
            <button type="submit"  className={buttonStyle}>Login Now!</button>
        </form>
            {messageOk ? <h4 className="green_Text">{messageOk}</h4> : ''}
            {messageError ? <h4 className="red_Text">{messageError}</h4> : ''}
        </>
    )
}

export default LoginForm