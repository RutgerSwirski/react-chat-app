import React, { useEffect, useRef, useState } from 'react'
import firebase from '../firebase'
import Navbar from '../components/Navbar'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import RecievedChat from '../components/RecievedChat'
import SentChat from '../components/SentChat'

function Chat() {
    const [message, setMessage] = useState('')
    const dummy = useRef()
    const scrollToBottom = () => { dummy.current.scrollIntoView({ behavior: 'smooth' }) }
    const query = firebase.messagesRef.orderBy('createdAt', 'asc').limitToLast(25)
    const [messages] = useCollectionData(query, { idField: 'id' })
    const currentUserID = firebase.auth.currentUser.uid

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return(
        <div className="container chat-container">
            <Navbar />
            <div className="chat">
                <div className="chat-messages-container">
                    { messages && messages.map(message => {
                        return message.uid === currentUserID ? (
                            <SentChat message={message} />
                        ) : (
                            <RecievedChat message={message} />
                        )
                    }) }
                    <span ref={dummy}></span>
                </div>
                <div className="chat-bottom-container">
                    <textarea onKeyPress={(e) => handleKeyPress(e) } value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write Something..." cols="30" rows="10" className="chat-input"></textarea>
                    <button onClick={() => sendMessage()} className="blue-button">Send</button>
                </div>
            </div>
        </div>
    )

    async function sendMessage() {
        const { displayName, uid, photoURL } = firebase.auth.currentUser
        if(message !== '') {
            try {
                await firebase.sendMessage(displayName, uid, photoURL, message)
                if(dummy.current) {
                    dummy.current.scrollIntoView({ behavior: 'smooth' })
                }
                setMessage('')
            } catch(err) { alert(err.message) }
        } else { alert('Please enter a message!') }
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            sendMessage()
        }
    }
}

export default Chat