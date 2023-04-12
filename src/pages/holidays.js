
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import './styles.css';
import { auth, db } from '../Auth/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";
//import { set } from 'core-js/core/dict';

function Holidays() {
   
    const navigate = useNavigate();
    const [annualLeaves, setAnnualLeaves] = useState([]);
    

    const [isManager, setIsManager] = useState(false);

    const [userEmail, setUserEmail] = useState('');

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedLeave, setSelectedLeave] = useState(null);

    
    useEffect(() => {
       
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserEmail(user.email);
            if (user && user.email === 'testing@testing.com') { 
                
                setIsManager(true);
                console.log("manager is set.")
                
            }
        });

        return () => unsubscribe();
    }, []);

    


    useEffect(() => {


        
        const q = query(collection(db, "annualLeaves"), orderBy("createdAt", "desc"));
        console.log("is manager:" + isManager);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const annualLeaves = [];
            
            querySnapshot.forEach((doc) => {
            
                //if (auth.currentUser.email === "testing@testing.com" || doc.data().email === auth.currentUser.email ){
                    
                if (auth.currentUser.email === "testing@testing.com" || doc.data().email === auth.currentUser.email ){
                   
                    annualLeaves.push({ id: doc.id, ...doc.data() });

                    
                }

                
                
            });
            setAnnualLeaves(annualLeaves);
        }, (error) => {
            console.error("Error fetching annual leave requests. ", error);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmitRequest = async e => {
        e.preventDefault();
        setErrorMessage('');
    
        //const { fromDate, toDate } = e.target.elements;
        const createdAt = new Date();
    
        try {
            console.log(fromDate.value);
            await addDoc(collection(db, "annualLeaves"), { fromDate: fromDate, toDate: toDate, email: userEmail, status: "pending", createdAt });
            console.log("Request completed.");
            setErrorMessage('Request successful.');
        } catch (error) {
            console.error("Error submitting request", error);
            setErrorMessage('Error submitting request');
        }
    

    };

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);

    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);

    };

    const handleStatusClick = async (leave, status) => {
        setSelectedLeave(leave);


        try {
            //await updateDoc(collection(db, "announcements"), { title: title.value, content: content.value, createdAt });
            await updateDoc(doc(db, "annualLeaves", leave.id), {
                fromDate: leave.fromDate, toDate: leave.toDate, email: leave.email, status: status, createdAt: leave.createdAt
              });
              console.log("request " + status);

        } catch (error) {
            console.error("Error filing request.", error);
        }

        
        setSelectedLeave(null);
    };


    const handleDeleteLeave = async (leave) => {
        try {
            await deleteDoc(doc(db, "annualLeaves", leave.id));
            console.log("Request deleted.")
        } catch (error) {
            console.error("Error deleting request: ", error);
        }
        setSelectedLeave(null);
    };



    /* const handleStatusDenyClick = (leave) => {
        setSelectedLeave(leave);
        console.log("request denied.");
    }; */
    
    
    


    return (
        <div className="container">
            {  !isManager &&(   
                <div>
                    <h1 >Submit an Annual Leave Request</h1>

                    <form onSubmit={handleSubmitRequest}>
                        <label className="label-style">
                            From:
                            <br />
                            <input type="date" value={fromDate} onChange = {handleFromDateChange} required />
                        </label>
                        <br />
                        <label className="label-style">
                            To:
                            <br />
                            <input type="date" value={toDate} onChange = {handleToDateChange} required />
                        </label>
                        <br />
                        <button className="small-button" type="submit">Submit Request</button>
                        <br />
                        
                        {/* <button className="small-button" onClick={handleSignUp}>Sign Up</button> */}
                    </form>
                    {errorMessage && <p>{errorMessage}</p>} 
                </div>
            )

            }
            <button className="small-button" onClick={() => navigate(-1)}>Back</button>
            <br />
            <table border = "1">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Email</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
            {annualLeaves.length > 0 ? ( 
                annualLeaves.map(leave => (
                    
                    <tr key={leave.id}>
                        <td>{leave.fromDate}</td>
                        <td>{leave.toDate}</td>
                        <td>{leave.email}</td>
                        <td >{leave.status}</td>

                        { isManager && (
                        <td>
                            <button onClick={() => handleStatusClick(leave,"accepted")}>Accept</button> 
                            
                        </td>
                        )  }
                        { isManager && (
                        <td>

                         <button onClick={() => handleStatusClick(leave,"denied")}>Deny</button> 
                        </td>
                        )  }
                        { !isManager && (

                        <td>
                              <button onClick={() => handleDeleteLeave(leave)}>Remove</button> 
                        </td>
                        )}
                    </tr>
                ))
            ) : (
                <p>No requests yet.</p>
            )}
            </tbody>
            </table>
        </div>
    );
}

export default Holidays;
