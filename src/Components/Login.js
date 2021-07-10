import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import GoogleIcon from '../googleIcon';
import "../Css/Login.css"
import { useStateValue } from '../StateProvider'
import { auth, provider } from "../firebase"
import Axios from "./axios"
function Login(props) {
    const [{ user }, dispatch] = useStateValue()



    const signIn = () => {

        auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var userTemp = result.user;
            Axios.post("/newuser", {
                email: userTemp.email,
                name: userTemp.displayName,
                dp: userTemp.photoURL
            })
                .then(res => (
                    console.log(res.data)
                ))
                .catch(e => (
                    console.log(e)
                ))
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    return (
        <div>
            <Modal
                animation
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                // centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ display: "flex", justifyContent: "center" }} id="contained-modal-title-vcenter">
                        SIGN IN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "grid", placeItems: "center" }}>
                    <h4 style={{ padding: "10px" }}>Stay Connected with us</h4>
                    <div>
                        <Button id="signInButton" onClick={() => {
                            signIn();
                            props.onHide();
                        }}
                            style={{ backgroundColor: "black" }}>
                            <div style={{ display: "flex", padding: "11px 10px 0" }}>
                                <GoogleIcon style={{ marginRight: "10px" }} />
                                <p>Sign In with Google</p>
                            </div>
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Later</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login

