import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD6S_Kxavxjn0uV7nMGt8mDSndE2Oxbrmg",
    authDomain: "homework6-5334a.firebaseapp.com",
    databaseURL: "https://homework6-5334a.firebaseio.com",
    projectId: "homework6-5334a",
    storageBucket: "",
    messagingSenderId: "25388366355"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()