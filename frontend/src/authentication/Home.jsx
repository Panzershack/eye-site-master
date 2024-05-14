

import { signOut } from "firebase/auth";
import React from "react";
import { database } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const history = useNavigate();

    const handleClick = () => {
        signOut(database).then(() => {
            console.log("Signed out successfully");
            history('/reglog');
        }).catch(error => {
            console.error("Error signing out:", error.message);
        });
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick}>Sign Out</button>
        </div>
    );
}

export default HomeScreen;
