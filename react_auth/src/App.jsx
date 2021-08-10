import './App.sass'
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom"
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import StartPage from "./components/MainPage"
import WelcomePage from "./components/WelcomePage"
import Logout from "./components/Logout"


function App() {
    const [login, setLogin] = useState(true)
    const [userFromLS, setUserFromLS] = useState()
    const [show, setShow] = useState(false)

    const user = localStorage.getItem('user')

    useEffect(() => {
        if(user === null) {
            setLogin(true)
        } else {
            setLogin(false)
            setUserFromLS(user)
        }
    }, [])


  return (
      <BrowserRouter>
          {show && <Redirect to='/welcome'/>}
          { login ?
                  <>
                  <div className="reg_login">
                      <Link to="/registration">Registration</Link>
                      <Link to="/login">Login</Link>
                      <Redirect to='/main'/>
                  </div>
                  </>
              :
              <>
                  <div className="reg_login">
                      <Link to="/logout" onClick={() => setShow(false)}>Logout</Link>
                      <Redirect to='/welcome'/>
                  </div>
              </>
          }

          <div className="pages">
              <Link to="/main">Start page</Link>
              <Link to="/welcome">Welcome page (for registered)</Link>
          </div>
    <div className="App">
        <Switch>
            {login ? "" :  <Route  path="/logout"> <Logout check={setLogin} show={setShow}/></Route>}
            <Route  path="/registration" component={RegistrationForm}/>
            <Route  path="/login"> <LoginForm check={setLogin}/> </Route>
            <Route  path="/main" component={StartPage}/>
            <Route  path="/welcome" component={WelcomePage}/>
        </Switch>
    </div>
      </BrowserRouter>
  )
}

export default App
