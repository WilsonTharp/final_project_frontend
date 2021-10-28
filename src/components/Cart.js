import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';
import Total from './Total';
const CartIndividualItem = ({ item , quantity, price, setRender, Id}) => {
		
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
			const data=await API.makeRequest(`/cart/editCart/${username}`, 'PATCH', {itemsId:item.id ,quantity:count});
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
const Cart = ({total, setTotal}) => {

    const [myCart, setMyCart] = useState([]);
	const [Id, setId] = useState("");
	const [render, setRender]= useState("")

    useEffect( async function() {
        try {
            const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData)
			const Id =userData.id;
		
			setId(userData.id);
            setCheckout({
				usersId: Id,
				processed :true, 
				inProcess :false,

			})
			  const data = await API.makeRequest(`/cart/inProcess/${Id}`, 'GET');
			  console.log("data",data)
					setMyCart(data); 
        } catch (error) {
            throw error;
        } 
    }, []);
	

	
	  const [checkout, setCheckout] =useState({usersId: 1,
		processed :true, 
		inProcess :false,}) 
	  async function onCheckout(e) {
		  
        try {
			const username = localStorage.getItem('username');
            await API.makeRequest(`/cart/cartCheckout/${username}`, 'PATCH', checkout);
			
			alert("checkout successful");
        } catch (error) {
            throw error;
        }
        
    }
	console.log(myCart)
	const cartElements= myCart.map((item, i)=>
       { return(<div  key= {`cart-item-id-${i}`}>
             <CartIndividualItem item={item} quantity={item.quantity} price={item.price} setRender={setRender} Id={Id} />
			
        </div>)});

    return (
        <>
		<div className="pageContainer">
		<div>
			<h3>My cart</h3>
			<div>{cartElements}</div>
			<Total total={total} setTotal={setTotal} render={render}/>
			<button onClick={(e) => onCheckout(e)}>Checkout</button>
		</div>
		</div>
		</>
    )
}

export default Cart;

