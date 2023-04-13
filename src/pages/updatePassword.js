import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { getAuth, updatePassword } from "firebase/auth";

function UpdatePassword() {

    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();

        // Update password
        updatePassword(auth.currentUser, newPassword).then(() => {
          // Password updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    return (
        <div className="container">
            <h1>Update Password</h1>
            <form onSubmit={handleSubmit}>
                <label className="label-style">
                    New Password:
                    <br />
                    <input type="password" onChange={handlePasswordChange}  />
                </label>
                <br />
                <button className="small-button" type="submit">Update Information</button>
            </form>
            <Link to="/UpdateLoginInfo">
                <button className="back-button">&#60;</button>
            </Link>
        </div>
    );
}

export default UpdatePassword;