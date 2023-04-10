import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { auth, db } from '../Auth/firebase';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";


function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [allowed, setAllowed] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && user.email === 'testing@testing.com') {
                setAllowed(true);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const announcements = [];
            querySnapshot.forEach((doc) => {
                announcements.push({ id: doc.id, ...doc.data() });
            });
            setAnnouncements(announcements);
        }, (error) => {
            console.error("Error fetching announcements: ", error);
        });

        return () => unsubscribe();
    }, []);

    const handleSubjectClick = (announcement) => {
        setSelectedAnnouncement(announcement);
    };

    const handleClosePopup = () => {
        setSelectedAnnouncement(null);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const { title, content } = e.target.elements;
        const createdAt = new Date();

        try {
            await addDoc(collection(db, "announcements"), { title: title.value, content: content.value, createdAt });
        } catch (error) {
            console.error("Error adding announcement: ", error);
        }

        setShowForm(false);
    };

    const handleNewAnnouncementClick = () => {
        setShowForm(true);
    };

    return (
        <div className="container" style={{ overflow: 'auto'}}>
            <h1>Announcements</h1>
            {allowed && (
                <div >
                    {showForm ? (
                        <div className="overlay">
                            <div className="popup">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div>
                                            <label htmlFor="title">Title:</label>
                                            <input type="text" id="title" required />
                                        </div>
                                        <div>
                                            <label htmlFor="content">Content:</label>
                                            <textarea id="content" required></textarea>
                                        </div>
                                        <button className="small-button" type="submit">Post Announcement</button>
                                        <button className="small-button" onClick={() => setShowForm(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <button className="small-button" onClick={handleNewAnnouncementClick}>New Announcement</button>
                    )}
                </div>
            )}
            {announcements.length > 0 ? (
                announcements.map(announcement => (
                    <div className="announcements" key={announcement.id}>
                        <h2 onClick={() => handleSubjectClick(announcement)}>{announcement.title}</h2>
                    </div>
                ))
            ) : (
                <p>No announcements yet.</p>
            )}
            {selectedAnnouncement && (
                <div className="overlay">
                    <div className="popup">
                        <h2>{selectedAnnouncement.title}</h2>
                        <p>{selectedAnnouncement.content}</p>
                        <button className="small-button" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
            <Link to="/">
                <button className="back-button">&#60;</button>
            </Link>
        </div>
    );
}

export default Announcements;
