import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Cart = (total, setTotal) => {

    const [myCart, setMyCart] = useState([]);
  const username = localStorage.getItem('username');
    useEffect( async function() {
        try {
            
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
			const Id =userData.id;
		
			setCheckout({
				usersId: Id,
				processed : true, 
				inProcess : false,
				
				
			  })

			  const data = await API.makeRequest(`/cart/${Id}`, 'GET');
			  setMyCart(data);
        } catch (error) {
            throw error;
        } 
    }, []);
	
	

    const CartIndividualItem = ({ item , quantity}) => {
		
		const [count, setCount] = useState(quantity);
		
		
		const addCount = (qty) => {

		  setCount(count + 1);
		};
		const subtractCount = () => {
		  {
			count === 0 ? setCount(0) : setCount(count - 1);
		  }
		};

		
		return (
		  <>
			<div className={"singleItem" + item.id}>
			  <h2>{item.name}</h2>
			  <h3>${item.price}</h3>
			  <p>{item.description}</p>
			  <p>{item.quantity}</p>
			  <div className="quantitySelector">
				<button id={item.id} onClick={subtractCount}>
				  -
				</button>
				<p>Quantity { count}</p>
				
				<button id={item.id} onClick={addCount}>
				  +
				</button>
			  </div>
			  <p>Items total: {`${ count} X ${item.price}= ${ parseInt( count *item.price)}`}</p>
			  <img src={require(`../images/${item.picture}`).default}></img>
			  
			  
			  <hr />
			</div>
		  </>
		);
	  };


	const [checkout, setCheckout] = useState({
		usersId: null,
		processed : true, 
		inProcess : false,
		
		
	  });
	  
	  async function onCheckout(e) {
		  
        try {
            await API.makeRequest(`/cart/cartCheckout/${username}`, 'PATCH', checkout);
			alert("checkout successful");
        } catch (error) {
            throw error;
        }
        
    }
	
	const cartElements= myCart.map((item, i)=>
       { return(<div  key= {`cart-item-id-${i}`}>
            

                <CartIndividualItem item={item} quantity={item.quantity} />
			
        </div>)});

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>My cart</h3>
			<div>{cartElements}</div>
			<div>Total: {}</div>

		
			<button onClick={(e) => onCheckout(e)}>Checkout</button>
		</div>
		</div>
		</>
    )
}

export default Cart;