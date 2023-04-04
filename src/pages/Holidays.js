import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Holidays() {
    return (
        <div className="container">
            <h1>Holidays - Under Maintenance</h1>
            <p>This page is currently under maintenance.</p>
            <Link to="/">
                <button className="back-button">Back to Home Page</button>
            </Link>
        </div>
    );
}

export default Holidays;
