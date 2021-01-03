import React, { useRef, useEffect, useState } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

function Navbar(props) {
    const currentUser = firebase.auth.currentUser
    const navbarRef = useRef()
    const [open, setOpen] = useState(true)

    const handleClickOutside = (e) => {
        if(navbarRef.current && navbarRef.current.contains(e.target)) {
            return
        }
        setOpen(false)
    }

    useEffect(() => {
        if(window.screen.width <= 1024) {
            setOpen(false)
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [])


    return(
        <>
            <div className="navbar-responsive-menu">
                <div className="navbar-responsive" onClick={() => setOpen(true)}>
                    <div className="navbar-hamburger-bar"></div>
                    <div className="navbar-hamburger-bar"></div>
                    <div className="navbar-hamburger-bar"></div>
                </div>
            </div>
            { open && (
                <div ref={navbarRef} className="container navbar">
                    <div className="navbar-username-container">
                        <img src={currentUser.photoURL} alt="" className="profile-pic"/>
                        <h4>{currentUser.displayName}</h4>
                    </div>
                    <h1 className="h1-white navbar-header">Chat App.</h1>
                    {/* <ul className="navbar-ul">
                        <li className="navbar-li">Link 1</li>
                        <li className="navbar-li">Link 2</li>
                        <li className="navbar-li">Link 3</li>
                        <li className="navbar-li">Link 4</li>
                    </ul> */}
                    <h3 className="h3-white navbar-logout" onClick={() => handleLogout()}>Logout</h3>
                </div>
            ) }
        </>
    )

    async function handleLogout() {
        try {
            await firebase.logout()
            props.history.push('/')
        } catch(err) { alert(err.message) }
    }
}

export default withRouter(Navbar)