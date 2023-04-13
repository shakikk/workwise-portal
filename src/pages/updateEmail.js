import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { getAuth, updateEmail } from "firebase/auth";

function UpdateEmail() {

    const [newEmail, setNewEmail] = useState("");

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
    };

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    return (
        <div className="container">
            <h1>Update Email</h1>
            <form onSubmit={handleSubmit}>
                <label className="label-style">
                    Email:
                    <br />
                    <input type="email" onChange={handleEmailChange}  />
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

export default UpdateEmail;