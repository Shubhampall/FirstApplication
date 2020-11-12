import React from 'react'
import { Redirect } from 'react-router-dom'

function Logout() {
    localStorage.removeItem("Email")
    localStorage.removeItem("UserEmail")
    localStorage.removeItem("Name")
    localStorage.removeItem("Profile")
    return (<Redirect to="/" />)
}

export default Logout
