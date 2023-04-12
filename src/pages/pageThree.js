import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function PageThree() {
    return (
        <div className="container">
            <h1>Page Three - Under Maintenance</h1>
            <p>This page is currently under maintenance.</p>
            <Link to="/">
                <button className="back-button">&#60;</button>
            </Link>
        </div>
    );
}

export default PageThree;
