import firebase from 'firebase/app'

import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.messagesRef = this.db.collection('messages')
    }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    async signup(email, password, username) {
        return await this.auth.createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            if(userCredentials.user) {
                userCredentials.user.updateProfile({
                    displayName: username,
                    photoURL: 'https://images.unsplash.com/photo-1609433635932-6571b56f4fd4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                })
            }
        })
    }

    async sendMessage(displayName, uid, photoURL, message) {
        return await this.messagesRef.add({
            user: displayName,
            message: message,
            createdAt: new Date(),
            uid: uid,
            photoURL: photoURL
        })
    }

    async logout() {
        return await this.auth.signOut()
    }
}


export default new Firebase()