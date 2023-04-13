import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import HomePage from './pages/homePage';
import Announcements from './pages/announcements';
import Holidays from './pages/holidays';
import UpdateLoginInfo from './pages/updateLoginInfo';
import UpdateEmail from './pages/updateEmail';
import UpdatePassword from './pages/updatePassword';
import { auth } from './Auth/firebase';
import Directory from './pages/directory';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        setErrorMessage('');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    return (
        <div className="container">
            <h1 >Login or Sign Up</h1>
            <form onSubmit={handleLogin}>
                <label className="label-style">
                    Email:
                    <br />
                    <input type="email" value={email} onChange={handleEmailChange} required />
                </label>
                <br />
                <label className="label-style">
                    Password:
                    <br />
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </label>
                <br />
                <button className="small-button" type="submit">Login</button>
                <button className="small-button" onClick={handleSignUp}>Sign Up</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/announcements" element={user ? <Announcements /> : <Navigate to="/login" />} />
                    <Route path="/holidays" element={user ? <Holidays /> : <Navigate to="/login" />} />
                    <Route path="/updateEmail" element={user ? <UpdateEmail/> : <Navigate to="/updateEmail" />} />
                    <Route path="/updatePassword" element={user ? <UpdatePassword/> : <Navigate to="/updatePassword" />} />
                    <Route path="/updateLoginInfo" element={user ? <UpdateLoginInfo /> : <Navigate to="/login" />} />
                    <Route path="/directory" element={user ? <Directory/> : <Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;