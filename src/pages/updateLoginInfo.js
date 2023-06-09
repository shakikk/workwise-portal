import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

function UpdateLoginInfo() {

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();

        // Update email
        updateEmail(auth.currentUser, newEmail).then(() => {
          // Email updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });

        // Update password
        updatePassword(auth.currentUser, newPassword).then(() => {
          // Password updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
    };

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    return (
        <div className="container">
            <h1>Update Personal Information</h1>
                <div>
                    <Link to="/UpdateEmail">
                        <button className="button-style">Update Email</button>
                    </Link>
                </div>
                <div>
                    <Link to="/UpdatePassword">
                        <button className="button-style">Update Password</button>
                    </Link>
                </div>
            <Link to="/">
                <button className="back-button">&#60;</button>
            </Link>
        </div>
    );
}

export default UpdateLoginInfo;