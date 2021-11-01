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
	  

		<div className={"singleItem" + item.id}>
		  <h2>{item.name}</h2>
		  <h3>${item.price}</h3>
		  <p>{item.description}</p>
		  <div className="quantitySelector">
			<button id={item.id} onClick={subtractCount}>
			  -
			</button>
			<p>Quantity { count}</p>
			
			<button id={item.id} onClick={updateCart}>
			  +
			</button>
			<div>
			<button id={item.id} onClick={(e) => removeItem(e, item.id)}>
			  Remove Item
			</button>	
			</div>
		  </div>
		  <p>Items total: {`${ count} X ${item.price}= ${ parseInt( count *item.price)}`}</p>
		  <img src={require(`../images/${item.picture}`).default}></img>
		  
		  
		  <hr />
		</div> 
		
	  
	  </>
	);
  };

  export default CartIndividualItem;