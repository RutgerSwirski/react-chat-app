import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import wave from '../images/wave.svg'

function Landing() {
    const [authPage, setAuthPage] = useState('login')
    return(
        <div className="container landing">
            <h1 className="h1-white landing-header">A Simple Chat App.</h1>
            { authPage === 'login' ? <Login changeAuthPage={changeAuthPage} /> : <Signup changeAuthPage={changeAuthPage} /> }
            <img src={wave} alt="" className="landing-wave"/>
        </div>
    )

    function changeAuthPage(newPage) {
        setAuthPage(newPage)
    }
}

export default Landing