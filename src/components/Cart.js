import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Cart = () => {

    const [myCart, setMyCart] = useState([]);
	
  const [checkout, setCheckout] = useState([]);
  const username = localStorage.getItem('username');
    useEffect( async function() {
        try {
            
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
			const Id =userData.id;

            const data = await API.makeRequest(`/cart/${Id}`, 'GET');
            setMyCart(data);
        } catch (error) {
            throw error;
        } 
    }, []);
	// const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
	

	//   async function onCheckout(e) {
    //     try {
    //         await API.makeRequest(`/cart/cartCheckout/${username}`, 'POST', activityData);
	// 		alert("checkout successful");
    //     } catch (error) {
    //         throw error;
    //     }
        
    // }
	
	const cartElements= myCart.map((item, i)=>
       { return(<div  key= {`cart-item-id-${i}`}>
            <p>{item.name}</p>
            <p>{item.description}</p>
			<p>Price:{item.price}</p>
			<div className="col-2 text-right">
              {item.qty} x ${item.price}
            </div>

			{/* <button onClick={() => onRemove(item)} className="remove">
                Remove 
              </button>{' '} */}
              <button onClick={() => onAdd(item)} className="add">
                Add
              </button>
        </div>)});

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>My cart</h3>
			<div>{cartElements}</div>
		
			<button onClick={(e) => onCheckout(e)}>Checkout</button>
		</div>
		</div>
		</>
    )
}

export default Cart;