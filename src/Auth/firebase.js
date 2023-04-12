// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo6Pd0JvQRIFG-NkqHRw6hvMhJZQ4DkDU",
    authDomain: "workwise-portal.firebaseapp.com",
    projectId: "workwise-portal",
    storageBucket: "workwise-portal.appspot.com",
    messagingSenderId: "1008363345920",
    appId: "1:1008363345920:web:121c83973f0fd2628c60e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

