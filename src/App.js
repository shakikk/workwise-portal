import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Announcements from './pages/announcements';
import Holidays from './pages/Holidays';
import PageThree from './pages/pageThree';
import HomePage from './pages/homePage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Announcements" element={<Announcements />} />
                    <Route path="/Holidays" element={<Holidays />} />
                    <Route path="/page-three" element={<PageThree />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
