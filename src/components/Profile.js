import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Profile = () => {

    const [myProfile, setMyProfile] = useState([]);
	
	
  
    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
		

            
            setMyProfile(userData);
        } catch (error) {
            throw error;
        } 
    }, []);
	

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>My Profile</h3>
			<div>First name:{myProfile.firstName}</div>
			<div>Last name:{myProfile.lastName}</div>
			<div> Username:{myProfile.username}</div>
			<div> Password:{myProfile.password}</div>
			<div> Location:{myProfile.location}</div>
		</div>
		</div>
		</>
    )
}

export default Profile;