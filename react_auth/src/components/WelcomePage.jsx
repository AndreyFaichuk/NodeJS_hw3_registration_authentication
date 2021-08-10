import axios from "axios";
import React, {useEffect, useState} from "react";
import ok from "../pictures/download.png";
import lock from "../pictures/483408.png";

const WelcomePage = () => {
    const [messageOk, setMessageOk] = useState()
    const [messageError, setMessageError] = useState()

    let token = localStorage.getItem('token')


    useEffect(() => {
        axios.get('http://localhost:3000/auth/welcome', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => setMessageOk(response.data.message))
            .catch(error => setMessageError(error.response.data.message))

    },[])

    return(
        <div className="answer">
            <h3>Answer from server is: </h3>
            {messageOk &&
                <>
                    <h2 className="green_Text">{messageOk} </h2>
                    <img src={ok} alt="pic" />
                </>}

            {messageError &&
                <>
                    <h2 className="red_Text">{messageError}<span>😱</span></h2>
                    <img src={lock} alt="pic" />
                </>}
        </div>
    )
}

export default WelcomePage