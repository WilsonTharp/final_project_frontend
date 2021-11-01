import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';
import Cart from './Cart';


const Total = ({total, setTotal, render}) => {

    
    const [myCart, setMyCart] = useState([]);
  
    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
            const Id =userData.id;

            const data = await API.makeRequest(`/cart/inProcess/${Id}`, 'GET');
			  console.log("data",data)
					setMyCart(data); 
            
        } catch (error) {
            throw error;
        } 
    }, [render]);
	const itemsPrice = myCart.reduce((a, c) => a + c.quantity * c.price, 0);
		const taxPrice = itemsPrice * 0.08;
		const shippingPrice = itemsPrice > 35 ? 0 : 5;
		const totalPrice = itemsPrice + taxPrice + shippingPrice;
		setTotal(totalPrice)

        

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>Cart total</h3>
            <div>Subtotal:{itemsPrice} </div>
            <div>Tax:{taxPrice} </div>
            <div>Shipping:{shippingPrice} </div>
			<div><h4>Total:{total}</h4></div>
			
		</div>
		</div>
		</>
    )
}

export default Total;