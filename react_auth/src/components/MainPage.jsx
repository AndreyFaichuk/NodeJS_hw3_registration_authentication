import React, {useEffect, useState} from "react";
import axios from "axios";

const StartPage = () => {
    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get('http://localhost:3000/main')
            .then(response => setMessage(response.data.message))
    }, [])


    return(
        <div className="answer">
            <h3>Answer from server is: </h3>
            <h1>{message} <span>😊</span></h1>
        </div>
    )
}

export default StartPage