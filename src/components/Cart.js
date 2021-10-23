import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Cart = () => {

    const [myCart, setMyCart] = useState([]);
	
  const [cartItems, setCartItems] = useState([]);
  
    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
			const Id =userData.id;

            const data = await API.makeRequest(`/cart/${Id}`, 'GET');
            setMyCart(data);
        } catch (error) {
            throw error;
        } 
    }, []);
	const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
	const onAdd = (myCart) => {
		const exist = cartItems.find((x) => x.id === myCart.itemsId);
		if (exist) {
		  setCartItems(
			cartItems.map((x) =>
			  x.id === myCart.itemsId ? { ...exist, qty: exist.qty + 1 } : x
			)
		  );
		} else {
		  setCartItems([...cartItems, { ...myCart, qty: 1 }]);
		}
	  };
	//   const onRemove = (product) => {
	// 	const exist = cartItems.find((x) => x.id === product.id);
	// 	if (exist.qty === 1) {
	// 	  setCartItems(cartItems.filter((x) => x.id !== product.id));
	// 	} else {
	// 	  setCartItems(
	// 		cartItems.map((x) =>
	// 		  x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
	// 		)
	// 	  );
	// 	}
	//   };
	

    // const cartElements = myCart.map((item, i)=>
    //     <div  className='cart-container'key= {`cart-id-${i}`}>
    //         <p>{item.name}</p>
           
    //     </div>);
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
			<button>Edit cart</button>
			<button>Checkout</button>
		</div>
		</div>
		</>
    )
}

export default Cart;