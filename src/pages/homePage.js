import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

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
        </div>
    );
}

export default HomePage;
