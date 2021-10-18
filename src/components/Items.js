import {React, useState, useEffect} from 'react';
import {handleItems} from '../API/index';
import {useHistory, Link} from 'react-router-dom'

const Items = () => {
	const [items, setItems] = useState([]);
	
	// async function handleAddToCart(event) {
	// 	event.preventDefault();
	// 	await creatCart(items.id);
	// }

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
				return (
					<>
					<div className="singleItem">
						<h2>{item.name}</h2>
						<h3>${item.price}</h3>
						<p>{item.description}</p>
						<button>
							
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