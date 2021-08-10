import React from "react";

const Logout = (props) => {

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        props.check(() => true)
    }

    const back = () => {
        props.show(() => true)
    }

    return(
        <>
            <div className="logout">
                <h2>Are you sure that you want to logout from your account? <span>🤨</span></h2>
                <div className="button_logout">
                    <button type="button" onClick={logout}>yep, I am sure</button>
                    <button type="button" onClick={back}>I'd rather stay here</button>
                </div>
            </div>
        </>
    )
}

export default Logout