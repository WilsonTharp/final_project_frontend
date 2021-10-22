import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Cart = () => {

    const [myCart, setMyCart] = useState([]);

    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			const id =userData.userId
            const data = await API.makeRequest(`/cart/${Id}`, 'GET');
            setMyCart(data);
        } catch (error) {
            throw error;
        } 
    }, []);

    // const cartElements = myCart. map((item, i)=>
    //     <div  className='cart-container'key= {`cart-id-${i}`}>
    //         <p>{item.itemsId}</p>
           
    //     </div>);

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>My cart</h3>
			<p>{myCart.name}</p>
		</div>
		</div>
		</>
    )
}

export default Cart;