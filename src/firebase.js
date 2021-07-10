import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAhw9V_xNBEq_afBNCgF-A802bvsRk4pHU",
    authDomain: "the-pandect.firebaseapp.com",
    databaseURL: "https://the-pandect.firebaseio.com",
    projectId: "the-pandect",
    storageBucket: "the-pandect.appspot.com",
    messagingSenderId: "334050973195",
    appId: "1:334050973195:web:f85cbe7e7f874b89f0990e"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

const auth = firebase.auth()


const provider = new firebase.auth.GoogleAuthProvider()

export { storage, auth, provider }