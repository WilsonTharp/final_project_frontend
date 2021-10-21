import {React, useState, useEffect} from 'react';
import {handleItems, handleCreateCart} from '../API/index';
import {useHistory, Link} from 'react-router-dom'

//ASK SHANNON, how to have multiple counters on the same page? They all update together
//somehow use the item id to change count? Very confused. 

const Clicker = ({
	addCount,
	subtractCount,
	id
}) => {
	return (
		<>
		<button onClick={subtractCount}>-</button>
		<button onClick={addCount}>+</button>
		</>
	)
}

const Counter = ({
	count
}) => {
	return (
		<p>Quantity {count}</p>
	)
}



const Items = () => {
	const [count, setCount] = useState(0);
	const [items, setItems] = useState([]);

	const addCount = () => {
		setCount(count +1);
	}

	const subtractCount = () => {
		{count === 0 ? setCount(0) : setCount(count -1) }
	}


	useEffect(() => {
		try {
			Promise.all([handleItems()]).then(([data]) => {
				setItems(data);
				console.log(data);
			}), [];
		} catch (error) {
			console.log("ERROR", error);
		}
	}, []);

	
//need to work on the onclick for the Add to cart button
	return (
		<div>
			
		<div className="pageContainer">
		<h1 className="pageTitle">Items:</h1>
		<div>
			{items.map((item, id) => {
				console.log(item)
				return (
					<>
					<div className="singleItem">
						<h2>{item.name}</h2>
						<h3>${item.price}</h3>
						<p>{item.description}</p>
						<img src={`../../images/${item.picture}`}></img>
						<div className="quantitySelector">
							<Clicker id = {item.id}
									addCount = {addCount}
									 subtractCount = {subtractCount}	
							/>
							<Counter count={count}
							/>
						</div>
						
						<button onClick={handleCreateCart(user.id, item.id, count )}>
							
						Add to Cart</button>
						
						<hr />
					</div>

				
					</>
				)
			})}
		</div>
		</div>
	</div>
)
}

export default Items;