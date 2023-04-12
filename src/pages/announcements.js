import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import './styles.css';
import { auth, db } from '../Auth/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";


function Announcements() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [allowed, setAllowed] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
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

    const handleDeletePopup = async () => {
        try {
            await deleteDoc(doc(db, "announcements", selectedAnnouncement.id));
        } catch (error) {
            console.error("Error deleting announcement: ", error);
        }
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

    const handleEditSubmit = async e => {
        e.preventDefault();

        const { title, content } = e.target.elements;

        try {
            //await updateDoc(collection(db, "announcements"), { title: title.value, content: content.value, createdAt });
            await updateDoc(doc(db, "announcements", selectedAnnouncement.id), {
                title: title.value, content: content.value, createdAt: selectedAnnouncement.createdAt
              });
        } catch (error) {
            console.error("Error editing announcement: ", error);
        }

        setShowEditForm(false);
        setSelectedAnnouncement(null);
    };

    const handleNewAnnouncementClick = () => {
        setShowForm(true);
    };

    const handleEditAnnouncementClick = () => {
        setShowEditForm(true);
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
                        <div>
                            <button className="small-button" onClick={handleNewAnnouncementClick}>New Announcement</button>
                            <br/>
                            <button className="small-button" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        
                        
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
                        <br />
                        { allowed && (
                            <button className="small-button" onClick={handleDeletePopup}>Delete Announcement</button>
                        )}
                        <br />
                        { allowed && (
                            <button className="small-button" onClick={handleEditAnnouncementClick}>Edit Announcement</button>
                        )}
                    </div>
                </div>
            )}

            {allowed && (
                <div >
                    {showEditForm && (
                        <div className="overlay">
                            <div className="popup">
                                <form onSubmit={handleEditSubmit}>
                                    <div>
                                        <div>
                                            <label htmlFor="title">Title:</label>
                                            <input type="text" id="title" required />
                                        </div>
                                        <div>
                                            <label htmlFor="content">Content:</label>
                                            <textarea id="content" required></textarea>
                                        </div>
                                        <button className="small-button" type="submit">Edit Announcement</button>
                                        <button className="small-button" onClick={() => setShowEditForm(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) }
                </div>
            )}  


            


            



            <Link to="/">
                <button className="back-button">&#60;</button>
            </Link>
        </div>
    );
}

export default Announcements;
