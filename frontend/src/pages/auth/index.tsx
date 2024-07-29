import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, } from '@clerk/clerk-react'
import { Navigate } from "react-router-dom";
import "../../App.css";


export const Auth = () => {
    return (
        // bulld the cotainer for signing in using clerks react package
        // clerk supports a modal popup 
        <div className="sign-in-container move-up">
            <SignedOut>
            <h3> Welcome to MERNMoney</h3>
            <h5>A Full Stack MERN App Built using MongoDB, Express, React, Node.js, Clerk</h5>
                <SignUpButton mode="modal"/>
                <SignInButton mode="modal"/>
            </SignedOut>

            <SignedIn>
                <Navigate to="/dashboard" />
                <UserButton />
            </SignedIn>
        </div>
    )
};