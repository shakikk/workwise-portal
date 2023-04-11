import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import SignOutButton from '../Auth/SignOutButton';

function HomePage() {
    return (
        <div className="container">
            <h1>Workwise Portal</h1>
            <div>
                <Link to="/Announcements">
                    <button className="button-style">Announcements</button>
                </Link>
            </div>
            <div>
                <Link to="/Holidays">
                    <button className="button-style">Holidays</button>
                </Link>
            </div>
            <div>
                <Link to="/page-three">
                    <button className="button-style">Page Three</button>
                </Link>
            </div>
            <div>
                <Link to="/Directory">
                    <button className="button-style">Employee Directory</button>
                </Link>
            </div>

            <p1> TO DO: </p1>
            <ul>
                <li>
                    Holidays need to be implemented
                </li>
                <li>
                    Announcements needs to be implemented
                </li>
            </ul>
            <SignOutButton />
        </div>
    );
}

export default HomePage;
