import React, { useState, useEffect, createElement } from 'react';

import API from '../API/api';

const CartIndividualItem = ({ item , quantity, price, setRender, Id, setA, render}) => {
		
	const [count, setCount] = useState(quantity);
	
	async function addCount() {
		 let newCount = count +1
		await setCount(newCount)	
		console.log(count)
	}

	console.log("out side" ,count)

	function subtractCount() {
		count === 0 ? setCount(0) : setCount(count - 1);
	}

	useEffect( async function apiCallToUpdateCart () {
		try {
			const username = localStorage.getItem('username');	
		console.log(count)
			const data=await API.makeRequest(`/cart/editCart/${username}`, 'PATCH', {itemsId:item.itemsId ,quantity:count});
			setRender(data.quantity)
		} catch (error) {
			throw error;
		}
		
	}, [count]);
	async function updateCart(){
		await addCount();
	
	}
    

	async function removeItem(e, id){
		try {
		
			console.log("cartId", id)
			//const data = await API.makeRequest(`/cart/inProcess/${Id}`, 'GET');
			await API.makeRequest(`/cart/${id}`, 'DELETE' );

            console.log(id)
            setRender(id);
            setA(id);
            
		} catch (error) {
			throw error;
		}
	
	}
	return (
	  <>
	  

		<div className="singleItem">
			<div className="itemText">
		  <h2>{item.name}</h2>
		  <h3>${item.price}</h3>
		  <p>{item.description}</p>
		  <div className="quantitySelector">
			<button id={item.id} onClick={subtractCount} className="quantityButton">
			  -
			</button>
			<h3>{ count}</h3>
			
			<button id={item.id} onClick={updateCart} className="quantityButton">
			  +
			</button>
			</div>
				
			
		  
		  
		  <div className="itemsTotal">
		  <p>Items total: {`${ count} X ${item.price}= ${ parseInt( count *item.price)}`}</p>
		  </div>
		  <button id={item.id} onClick={(e) => removeItem(e, item.id)} className="addToCartButton">
			  Remove Item
			</button>
			
			</div>
		  <img src={require(`../images/${item.picture}`).default}></img>
		  
		  
		  <hr />
		</div> 
		
	  
	  </>
	);
  };

  export default CartIndividualItem;