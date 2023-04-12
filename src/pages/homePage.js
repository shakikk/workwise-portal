import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import SignOutButton from '../Auth/SignOutButton';
import { auth } from '../Auth/firebase'

function HomePage() {
    const [ Manager, setManager ] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && user.email === 'testing@testing.com') {
                setManager(true);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="container">
            {Manager ? (
                <h1>Workwise Portal - Manager</h1>
            ) : (
                <h1>Welcome Portal - Employee</h1>
            )}
            <div>
                <Link to="/Announcements">
                    <button className="button-style">Announcements</button>
                </Link>
            </div>
            <div>
                <Link to="/Holidays">
                    <button className="button-style">Annual Leave</button>
                </Link>
            </div>
            <div>
                <Link to="/UpdateLoginInfo">
                    <button className="button-style">Update Login Info</button>
                </Link>
            </div>
            <div>
                <Link to="/Directory">
                    <button className="button-style">Employee Directory</button>
                </Link>
            </div>
            <SignOutButton />
        </div>
    );
}

export default HomePage;
