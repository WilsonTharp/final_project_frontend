import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';


const Cart = () => {

    const [myCart, setMyCart] = useState([]);

    useEffect( async function() {
        try {
            //const username = localStorage.getItem('username');
            const data = await API.makeRequest('/cart', 'GET');
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
        <div id='my-cart'>
            <div className='link-to-cr'>
                
            
            </div>
            
                <h1>My Cart</h1>
            
            <div className='my-cart-list'>
                {/* {cartElements} */}
            </div>
        </div>
    )
}

export default Cart;