import React, { useEffect, useState } from 'react'
import moment from 'moment'

function SentChat(props) {
    const [date, setDate] = useState('Just now')
    useEffect(() => {
        if(props.message.createdAt) {
            const date = props.message.createdAt.toDate()
            const momentDate = moment(date).format('MMM Do y, h:mm a')
            setDate(momentDate)
        }
    }, [])

    return(
        <div className="chat-bubble-container  chat-bubble-container-sent">
            <div className="chat-bubble-img-name-container">
                <img src={props.message.photoURL} alt="" className="profile-pic"/>
                <h4 className="chat-bubble-name h4-black">{props.message.user}</h4>
            </div>
            <div className="chat-bubble sent-bubble">
                <p>{props.message.message}</p>
            </div>
            <p className="chat-bubble-time">{date}</p>
        </div>
    )
}

export default SentChat