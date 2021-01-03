import React, { useState } from 'react'
import firebase from '../firebase'
import {withRouter} from 'react-router-dom'


function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <div className="container auth">
            <div className="input-container">
                <label htmlFor="">Email:</label>
                <input type="text" name="" id="" className="input" onChange={ (e) => setEmail(e.target.value) } />
            </div>
            <div className="input-container">
                <label htmlFor="">Password:</label>
                <input type="password" name="" id="" className="input" onChange={ (e) => setPassword(e.target.value) }/>
            </div>
            <button className="blue-button" onClick={() => onLogin()}>Login</button>
            <span className="auth-span">Don't have an account? <span className="auth-span-link" onClick={() => props.changeAuthPage('signup')}>Create an account here.</span></span>
        </div>
    )

    async function onLogin() {
        try {
            await firebase.login(email, password)
            props.history.push('/chat')
        } catch(err) { alert(err.message) }
    }
}

export default withRouter(Login)