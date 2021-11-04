import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Profile = () => {

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
       { return(<div key= {`processedItem-item-id-${i}`}>
            { item.processed ?
			<div className="singleItem" key= {`processedItem-item-id-${i}`}>
			<div className="itemText">
			 <h2>{item.name}</h2>
        	<h3>Price:${item.price}</h3>
        	<p>{item.description}</p>
			<p>Quantity:{item.quantity}</p>
			</div>
        	<img src={require(`../images/${item.picture}`).default}></img>
			</div> 
			:
			<>
			</>
	   }

        </div>)});

    return (
        <>
		<div className="pageContainerLogin4">

		<div className="profileText" key= {`profile-id-${myProfile.id}`}>

			<h3>My Profile</h3>
			<div>First name:{myProfile.firstName}</div>
			<div>Last name:{myProfile.lastName}</div>
			<div> Username:{myProfile.username}</div>
			<div> Password:{myProfile.password}</div>
			<div> Location:{myProfile.location}</div>
			</div>
			<div className="pageBreak"></div>
			<div className="pastOrdersTitle">
			<h3>Past Orders</h3>
			</div>
			<div className="individualItem"> {processedItemsMap}</div>
			
		</div>
		
		</>
    )
}

export default Profile;