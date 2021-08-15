import React, {useState} from "react";
import axios from "axios";

const RegistrationForm = () => {
    const [inputStyle, setInputStyle] = useState()
    const [buttonStyle, setButtonStyle] = useState("buttonRegister")
    const [messageOk, setMessageOk] = useState()
    const [messageError, setMessageError] = useState()
    const [stateSelect, setStateSelect] = useState()

    const cleaner = () => {
        setMessageOk()
        setMessageError()
        setInputStyle()
        setButtonStyle("buttonRegister")
    }


    const handleSubmitRegiter = (e) => {
        e.preventDefault()

        const {first_name, last_name, email, password, select} = e.target.elements

        const user = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: password.value,
            roles:[select.value]
        }


        axios.post('http://localhost:3000/auth/register', user)
            .then(response => {
                const dataMessage = response.data.message

                if(dataMessage === "New user has been registered"){
                    first_name.value = ''
                    last_name.value = ''
                    email.value = ''
                    password.value = ''
                }
                setInputStyle("green")
                setButtonStyle("buttonRegister green")
                setMessageOk(response.data.message)
                setTimeout(cleaner, 2000)
                setStateSelect()
            })
            .catch(error => {
                setInputStyle("red")
                setButtonStyle("buttonRegister red")
                setMessageError(error.response.data.message)
                setTimeout(cleaner, 2000)
            })
    }


    return (
        <>
            <form action="" className="forma" onSubmit={handleSubmitRegiter}>
                <h1>Registration</h1>
                <input name="first_name" type="text" placeholder="enter first name" className={inputStyle}/>
                <input name="last_name" type="text" placeholder="enter last name" className={inputStyle}/>
                <input name="email" type="text" placeholder="enter email" className={inputStyle}/>
                <input name="password" type="password" placeholder="enter password" className={inputStyle}/>
                    <select name="select" value={stateSelect}>
                        <option>choose your role</option>
                        <option value = "USER">user</option>
                        <option value = "ADMIN">admin</option>
                        <option value = "SUPER_ADMIN">super admin</option>
                    </select>
                <button type="submit" className={buttonStyle}>Register Now!</button>
            </form>
            {messageOk ? <h4 className="green_Text">{messageOk}</h4> : ''} {messageError ? <h4 className="red_Text">{messageError}</h4> : ''}
        </>
    )
}

export default RegistrationForm