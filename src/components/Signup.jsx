import React, {useState} from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

function Signup(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return(
        <div className="container auth">
            <div className="input-container">
                <label htmlFor="">Username:</label>
                <input type="text" name="" id="" className="input" onChange={(e) => setUsername(e.target.value) }/>
            </div>
            <div className="input-container">
                <label htmlFor="">Email:</label>
                <input type="text" name="" id="" className="input" onChange={(e) => setEmail(e.target.value) }/>
            </div>
            <div className="input-container">
                <label htmlFor="">Password:</label>
                <input type="password" name="" id="" className="input" onChange={(e) => setPassword(e.target.value) }/>
            </div>
            <div className="input-container">
                <label htmlFor="">Confirm Password:</label>
                <input type="password" name="" id="" className="input"onChange={(e) => setConfirmPassword(e.target.value) }/>
            </div>
            <button onClick={() => onSignup()} className="blue-button">Signup</button>
            <span className="auth-span">Already have an account? <span className="auth-span-link" onClick={() => props.changeAuthPage('login')}>Login here.</span></span>
        </div>
    )

    async function onSignup() {
        try {
            await firebase.signup(email, password, username).then((data) => { console.log(data) })
            props.history.push('/chat')
        } catch(err) { alert(err.message) }
    }
}

export default withRouter(Signup)