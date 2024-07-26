import {SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton, } from '@clerk/clerk-react'

export const Auth = () => {
    return (
        // bulld the cotainer for signing in using clerks react package
        // clerk supports a modal popup 
        <div className="sign-in-container">
            <SignedOut>
                <SignUpButton mode="modal"/>
                <SignInButton mode="modal"/>
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
};
