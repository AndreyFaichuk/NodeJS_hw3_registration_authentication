import axios from "axios";
import React, {useEffect, useState} from "react";
import lock from "../pictures/483408.png";
import {BrowserRouter, Route, Link} from "react-router-dom"



const User = (props) => {

    const deleteUser = async () =>{
        let id = props.data._id

        let token = localStorage.getItem('token')

       await axios.delete('http://localhost:3000/auth/admin/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        await axios.get('http://localhost:3000/auth/admin', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => props.state(res.data))

    }


    return (
        <div className="usersList">
            <h3>Name: <span>{props.data.first_name}</span></h3>
            <h3>Id: <span>{props.data._id}</span></h3>
            <h3>Email: <span>{props.data.email}</span></h3>
            <button type="button" onClick={deleteUser}>delete user</button>
        </div>
    )
}

const ListOfUsers = (props) => {
    const [listOfUsers, setListOfUsers] = useState([])
    const [error, setError] = useState()
    const [start, setStart] = useState()

    const close = () => {
        props.close(() => false)
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        axios.get('http://localhost:3000/auth/admin', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setListOfUsers(res.data)
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    },[])


    return(
        <>
            <div className="wrap">
                {listOfUsers.map((user) => <User key = {'good_' + user._id} data = {user} state = {setListOfUsers}/>)}
            </div>
            {
                error ? <h2>{error}</h2> : ''
            }
            <button type="button" className="buttonUser" onClick={close}> Close</button>
        </>
    )
}

const WelcomePage = (props) => {
    const [showList, setShowList] = useState(false)


    useEffect( () => {
        let token = localStorage.getItem('token')
        axios.get('http://localhost:3000/auth/welcome', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }, [])


    return(
        <div className="answer">
            <h3>Answer from server is: </h3>
            {props.check ?
                <>
                    <h2 className="red_Text">User is not logged in<span>😱</span></h2>
                    <img src={lock} alt="pic" />
                </>
                :
                <>
                    <h2 className="green_Text">Hello registered user!!</h2>
                    <BrowserRouter>
                        <Link to="/admin" onClick={() => setShowList(true)}>List of users (admin only)</Link>
                        { showList && <Route  path="/admin"> <ListOfUsers close={setShowList}/> </Route>}
                    </BrowserRouter>
                </>
            }
        </div>
    )
}

export default WelcomePage