import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Profile = ({total}) => {

    const [myProfile, setMyProfile] = useState([]);
	const [processedItems, setProcessedItems] = useState([]);
  
    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
		
			const Id =userData.id;
            
            setMyProfile(userData);
			const data = await API.makeRequest(`/cart/${Id}`, 'GET');
			console.log("data",data)
			setProcessedItems(data); 
        } catch (error) {
            throw error;
        } 
    }, []);


	const processedItemsMap= processedItems.map((item, i)=>
       { return(<div>
            { item.processed ?
			<div key= {`processedItem-item-id-${i}`}>
			 <h2>{item.name}</h2>
        	<h3>${item.price}</h3>
        	<p>{item.description}</p>
			<p>{item.quantity}</p>
        	<img src={require(`../images/${item.picture}`).default}></img>
			</div> 
			:
			<>
			</>
	   }

        </div>)});

    return (
        <>
		<div className="pageContainerLogin">
		<div>
			<h3>My Profile</h3>
			<div>First name:{myProfile.firstName}</div>
			<div>Last name:{myProfile.lastName}</div>
			<div> Username:{myProfile.username}</div>
			<div> Password:{myProfile.password}</div>
			<div> Location:{myProfile.location}</div>
			<div> {processedItemsMap}</div>
		</div>
		</div>
		</>
    )
}

export default Profile;