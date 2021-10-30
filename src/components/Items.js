
import { React, useState, useEffect } from "react";
import { handleItems, handleCreateCart } from "../API/index";
import { useHistory, Link } from "react-router-dom";
import API from '../API/api';

const IndividualItem = ({ item, userId }) => {
  //moved the count state item into the Clicker since we dont need to access it anywhere inside Items -> only relevant to the clicker
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState(0);
  
  //moved both functions inside the Clicker
  const addCount = () => {
    setCount(count + 1);
  };
  const subtractCount = () => {
    {
      count === 0 ? setCount(0) : setCount(count - 1);
    }
	
	
  };
  return (
    <>
      <div className="singleItem">
        <div className="itemText">
        <h2>{item.name}</h2>
        <h3>${item.price}</h3>
        <p>{item.description}</p>
        <div className="quantitySelector">
          <button id={item.id} onClick={subtractCount}>
            -
          </button>
          <p>Quantity {count}</p>
          <button id={item.id} onClick={addCount}>
            +
          </button>
          </div>
          <button
	
  onClick={() => {
// setItemId(item.id);
    handleCreateCart(userId, item.id, count)
  }}
>
  Add to Cart
</button>
        
        </div>
        <img src={require(`../images/${item.picture}`).default}></img>
        
       
        <hr />
      </div>
    </>
  );
};

const Items = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect( async function() {
	try {
		const username = localStorage.getItem('username');
			const userData = await API.makeRequest(`/users/${username}`, 'GET');
			console.log("USERDATA",userData);
			setUserId(userData.id);
				
		
		} catch (error) {
			throw error;
		} 
	}, []);

console.log('userId is', userId)

  useEffect(() => {
    try {
      Promise.all([handleItems()]).then(([data]) => {
        setItems(data);
      }),
        [];
    } catch (error) {
      console.log("ERROR", error);
    }
  }, []);
  return (
    <div>
      <div className="pageContainerLogin">
        <h1 className="pageTitle">Items:</h1>
        <div>
          {items.map((item) => {
            console.log(item);
            return (
              <div key={item.id}>
                <IndividualItem item={item}
				userId= {userId} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Items;