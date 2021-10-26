

import { React, useState, useEffect } from "react";
import { handleItems, handleCreateCart } from "../API/index";
import { useHistory, Link } from "react-router-dom";
//ASK SHANNON, how to have multiple counters on the same page? They all update together
//somehow use the item id to change count? Very confused.
//clickerInUse is null. not sure why.
const IndividualItem = ({ item }) => {
  //moved the count state item into the Clicker since we dont need to access it anywhere inside Items -> only relevant to the clicker
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState();
  const [userId, setUserId] = useState();
  const [items, setItems] = useState([]);
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
      <div className={"singleItem" + item.id}>
        <h2>{item.name}</h2>
        <h3>${item.price}</h3>
        <p>{item.description}</p>
        <img src={require(`../images/${item.picture}`).default}></img>
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
          onClick={() =>
            handleCreateCart(localStorage.getItem(`username`), item.id, count)
          }
        >
          Add to Cart
        </button>
        <hr />
      </div>
    </>
  );
};
const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      Promise.all([handleItems()]).then(([data]) => {
        setItems(data);
        console.log("ITEM ", items);
      }),
        [];
    } catch (error) {
      console.log("ERROR", error);
    }
  }, []);
  return (
    <div>
      <div className="pageContainer">
        <h1 className="pageTitle">Items:</h1>
        <div>
          {items.map((item) => {
            console.log(item);
            return (
              <div key={item.id}>
                <IndividualItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Items;